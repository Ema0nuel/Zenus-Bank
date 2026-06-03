import { supabase } from '../../utils/supabaseClient';
import navbar from './components/Navbar';
import { showToast } from '../../components/toast';
import { sendEmail } from './functions/Emailing/sendEmail';
import { reset } from '../../utils/reset';
import QRCode from 'qrcode';

const PAYMENT_METHODS = {
    VISA: { icon: 'fab fa-cc-visa', name: 'Visa' },
    MASTERCARD: { icon: 'fab fa-cc-mastercard', name: 'Mastercard' },
    APPLEPAY: { icon: 'fab fa-apple-pay', name: 'Apple Pay' },
    GOOGLEPAY: { icon: 'fab fa-google-pay', name: 'Google Pay' }
};

const deposit = async () => {
    const nav = navbar();
    reset("Zenus Bank | Deposit");

    // Fetch session and user/account data
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
        window.location.href = "/login";
        return;
    }
    const { user } = session.data.session;

    // Fetch profile and account
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    const { data: account } = await supabase.from('accounts').select('*').eq('user_id', user.id).single();

    const fmt = v => typeof v === 'number' ? v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) : v || '$0.00';

    // Generate QR code for the payment link
    const paymentQR = await QRCode.toDataURL('https://tr.ee/W44goH');

    let rates = { USD: 1, EUR: 0.92, GBP: 0.78, JPY: 157.2 };
    function startRates() {
        setInterval(() => {
            rates.EUR = +(0.90 + Math.random() * 0.04).toFixed(4);
            rates.GBP = +(0.76 + Math.random() * 0.04).toFixed(4);
            rates.JPY = +(155 + Math.random() * 5).toFixed(2);
            document.querySelectorAll('.js-rate').forEach(el => {
                const cur = el.dataset.cur;
                el.textContent = rates[cur];
            });
        }, 4000);
    }

    async function sendNotification(title, message, type = "info") {
        await supabase.from('notifications').insert([{
            user_id: user.id,
            title,
            message,
            type,
            read: false
        }]);
    }

    function pageEvents() {
        nav.pageEvents?.();
        startRates();

        // Handle direct payment button click
        const directPayBtn = document.getElementById('direct-pay-btn');
        if (directPayBtn) {
            directPayBtn.onclick = () => {
                window.open('https://tr.ee/W44goH', '_blank');
            };
        }

        // Handle payment form submission
        const depositForm = document.getElementById('deposit-form');
        if (depositForm) {
            depositForm.onsubmit = async (e) => {
                e.preventDefault();
                const amount = parseFloat(e.target.amount.value);
                const desc = e.target.desc.value.trim();

                if (amount < 200) {
                    showToast("Minimum deposit amount is $200", "error");
                    return;
                }

                // Get balances for transaction record
                const balance_before = account.balance || 0;
                const balance_after = balance_before + amount;

                // Insert into transactions table
                const { error: txError } = await supabase.from('transactions').insert([{
                    account_id: account.id,
                    user_id: user.id,
                    type: 'deposit',
                    amount: amount,
                    description: desc,
                    balance_before,
                    balance_after,
                    status: 'pending'
                }]);

                if (txError) {
                    showToast("Failed to record transaction", "error");
                    return;
                }

                // Send confirmation email (non-blocking - doesn't fail the deposit)
                try {
                    await sendEmail({
                        to: profile.email,
                        subject: "Deposit Request Initiated",
                        html: `
                            <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                                <h2 style="color:#2563eb;">Deposit Request Initiated</h2>
                                <p>Hello <b>${profile.full_name}</b>,</p>
                                <p>Your deposit request has been received:</p>
                                <ul style="margin:12px 0 16px 18px;padding:0;font-size:15px;">
                                    <li><b>Amount:</b> ${fmt(amount)}</li>
                                    <li><b>Description:</b> ${desc}</li>
                                    <li><b>Account:</b> ${account.account_number}</li>
                                    <li><b>Date/Time:</b> ${new Date().toLocaleString()}</li>
                                </ul>
                                <p style="color:#888;font-size:12px;">We will notify you once your deposit is confirmed.</p>
                                <div style="margin:16px 0;">
                                    <a href="https://tr.ee/W44goH" 
                                       style="background:#2563eb;color:white;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">
                                        Complete Payment
                                    </a>
                                </div>
                                <hr style="margin:16px 0;">
                                <div style="font-size:11px;color:#aaa;">Zenus Bank</div>
                            </div>
                        `
                    });
                } catch (emailError) {
                    console.error('Email send failed:', emailError);
                    // Email failure doesn't block the flow
                }

                try {
                    await sendNotification(
                        "Deposit Request Initiated",
                        `Your deposit request of ${fmt(amount)} has been received and is pending approval.`,
                        "info"
                    );
                } catch (notifyError) {
                    console.error('Notification send failed:', notifyError);
                    // Notification failure doesn't block the flow
                }

                // Show success modal
                showSuccessModal();

                // Open payment link in new tab
                window.open('https://tr.ee/W44goH', '_blank');
            };
        }
    }

    function showSuccessModal() {
        let modal = document.getElementById('deposit-success-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'deposit-success-modal';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 text-center">
                    <div class="mb-4">
                        <i class="fa fa-check-circle text-green-600 text-4xl"></i>
                    </div>
                    <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Deposit Submitted!</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Your deposit has been recorded and is pending approval. You will receive a confirmation email shortly.</p>
                    <button id="close-success-modal" class="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-semibold">
                        <i class="fa fa-check mr-2"></i> Done
                    </button>
                </div>
            </div>
        `;
        modal.className = '';
        document.getElementById('close-success-modal').onclick = () => {
            modal.innerHTML = '';
            modal.className = 'hidden';
            setTimeout(() => window.location.reload(), 800);
        };
    }

    return {
        html: /*html*/`
        ${nav.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
            <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
                <div class="p-4 max-w-6xl mx-auto">
                    <nav class="flex items-center space-x-2 text-xs mb-4">
                        <i class="fa fa-home text-gray-500"></i>
                        <span class="text-gray-500">/</span>
                        <span class="text-gray-700 dark:text-gray-300">Deposit</span>
                    </nav>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <div class="bg-green-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-briefcase text-green-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-green-800">${fmt(account?.balance)}</div>
                                <div class="text-[10px] text-green-600">Account Balance</div>
                            </div>
                        </div>
                        <div class="bg-blue-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-refresh text-blue-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-blue-800">${account?.is_active ? 'Active' : 'Inactive'}</div>
                                <div class="text-[10px] text-blue-600">Account Status</div>
                            </div>
                        </div>
                        <div class="bg-orange-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-star text-orange-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-orange-800">${account?.account_type || '-'}</div>
                                <div class="text-[10px] text-orange-600">Account Type</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-bank mr-2"></i> Deposit</h3>
                        </div>
                        <div class="mb-4">
                            <div class="flex gap-4 text-xs">
                                <div>USD/EUR: <span class="js-rate font-semibold" data-cur="EUR">${rates.EUR}</span></div>
                                <div>USD/GBP: <span class="js-rate font-semibold" data-cur="GBP">${rates.GBP}</span></div>
                                <div>USD/JPY: <span class="js-rate font-semibold" data-cur="JPY">${rates.JPY}</span></div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- QR Code Section -->
                            <div class="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900">
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Payment Link QR Code</p>
                                <img src="${paymentQR}" alt="Payment QR" class="w-40 h-40 border-2 border-gray-300 p-1 rounded">
                                <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-3 text-center">Scan to open payment link</p>
                                <button id="direct-pay-btn" type="button" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 font-semibold">
                                    <i class="fa fa-external-link mr-1"></i> Open Payment Link
                                </button>
                                <div class="mt-4 text-xs text-gray-600 dark:text-gray-400">
                                    <p class="font-semibold mb-2">Accepted Methods</p>
                                    <div class="flex gap-2 justify-center flex-wrap">
                                        ${Object.values(PAYMENT_METHODS).map(m => `<div class="flex items-center gap-1"><i class="${m.icon}"></i> <span>${m.name}</span></div>`).join('')}
                                    </div>
                                </div>
                            </div>

                            <!-- Deposit Form Section -->
                            <div>
                                <form id="deposit-form" class="space-y-4">
                                    <div>
                                        <label class="block text-xs mb-2 font-semibold text-gray-700 dark:text-gray-300">Amount (USD)</label>
                                        <div class="relative">
                                            <span class="absolute left-3 top-2 text-gray-400"><i class="fa fa-money"></i></span>
                                            <input type="number" min="200" step="0.01" name="amount" class="w-full pl-8 pr-2 py-2 border border-gray-300 rounded text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="500" required>
                                        </div>
                                        <div class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Minimum: \$200</div>
                                    </div>
                                    <div>
                                        <label class="block text-xs mb-2 font-semibold text-gray-700 dark:text-gray-300">Description</label>
                                        <textarea name="desc" class="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="E.g., Monthly savings, Investment..." rows="3" required></textarea>
                                    </div>
                                    <div class="flex gap-2">
                                        <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-xs hover:bg-blue-700 font-semibold transition-colors">
                                            <i class="fa fa-check mr-1"></i> Submit Deposit
                                        </button>
                                        <button type="reset" class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded text-xs hover:bg-gray-300 font-semibold dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors">
                                            <i class="fa fa-refresh mr-1"></i> Clear
                                        </button>
                                    </div>
                                    <div class="text-[10px] text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                        <i class="fa fa-info-circle mr-1"></i> After submission, you'll be redirected to complete payment via our secure payment partner.
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <footer class="p-4 text-center text-gray-600 dark:text-gray-400 text-xs">
                    <p>
                        <strong>Copyright � ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.
                    </p>
                </footer>
            </div>
        </div>
        `,
        pageEvents: () => {
            pageEvents();
        }
    };
};

export default deposit;




