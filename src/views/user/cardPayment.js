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

const cardPayment = async () => {
    const nav = navbar();
    reset("Zenus Bank | Card Payment");

    // Fetch session and user data
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
        window.location.href = "/login";
        return;
    }
    const { user } = session.data.session;
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    const { data: account } = await supabase.from('accounts').select('*').eq('user_id', user.id).single();

    const fmt = v => typeof v === 'number' ? v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) : v || '$0.00';

    // Generate QR code for the payment link
    const paymentQR = await QRCode.toDataURL('https://flutterwave.com/pay/cardpayment1');

    function pageEvents() {
        nav.pageEvents?.();

        // Handle direct payment button click
        const directPayBtn = document.getElementById('direct-pay-btn');
        if (directPayBtn) {
            directPayBtn.onclick = () => {
                window.open('https://flutterwave.com/pay/cardpayment1', '_blank');
            };
        }

        // Handle payment form submission
        const paymentForm = document.getElementById('payment-form');
        if (paymentForm) {
            paymentForm.onsubmit = async (e) => {
                e.preventDefault();
                const amount = parseFloat(e.target.amount.value);
                const desc = e.target.desc.value.trim();

                if (amount < 200) {
                    showToast("Minimum deposit amount is $200", "error");
                    return;
                }

                // Record the transaction
                const balance_before = account.balance || 0;
                const balance_after = balance_before + amount;

                const { error: txError } = await supabase.from('transactions').insert([{
                    user_id: user.id,
                    account_id: account.id,
                    type: 'card_deposit',
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

                // Send confirmation email
                await sendEmail({
                    to: profile.email,
                    subject: "Card Payment Initiated",
                    html: `
                        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                            <h2 style="color:#2563eb;">Card Payment Initiated</h2>
                            <p>Hello <b>${profile.full_name}</b>,</p>
                            <p>Your card payment has been initiated:</p>
                            <ul style="margin:12px 0;padding:0;list-style:none;">
                                <li><b>Amount:</b> ${fmt(amount)}</li>
                                <li><b>Description:</b> ${desc}</li>
                                <li><b>Date:</b> ${new Date().toLocaleString()}</li>
                            </ul>
                            <p>Please complete the payment using the provided payment link.</p>
                            <div style="margin:16px 0;">
                                <a href="https://flutterwave.com/pay/cardpayment1" 
                                   style="background:#2563eb;color:white;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">
                                    Complete Payment
                                </a>
                            </div>
                            <p style="color:#666;font-size:12px;">If you didn't initiate this payment, please contact support immediately.</p>
                        </div>
                    `
                });

                showToast("Payment initiated. Please complete the payment using the provided link.", "success");
                window.open('https://flutterwave.com/pay/cardpayment1', '_blank');
            };
        }
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
                        <span class="text-gray-700 dark:text-gray-300">Card Payment</span>
                    </nav>

                    <!-- Balance Summary -->
                    <div class="flex flex-wrap gap-2 mb-6">
                        <div class="bg-green-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-briefcase text-green-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-green-800">${fmt(account?.balance)}</div>
                                <div class="text-[10px] text-green-600">Account Balance</div>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Options -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- QR Code Section -->
                        <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                            <h3 class="text-base font-semibold mb-4 text-gray-900 dark:text-white">
                                <i class="fa fa-qrcode mr-2"></i> Scan to Pay
                            </h3>
                            <div class="flex flex-col items-center space-y-4">
                                <img src="${paymentQR}" alt="Payment QR Code" class="w-48 h-48 mb-4">
                                <div class="text-center">
                                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">We Accept:</p>
                                    <div class="flex justify-center space-x-4 text-2xl">
                                        ${Object.values(PAYMENT_METHODS).map(method =>
            `<i class="${method.icon}" title="${method.name}"></i>`
        ).join('')}
                                    </div>
                                </div>
                                <button id="direct-pay-btn" class="btn bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                                    <i class="fa fa-external-link mr-2"></i> Open Payment Link
                                </button>
                            </div>
                        </div>

                        <!-- Payment Form -->
                        <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                            <h3 class="text-base font-semibold mb-4 text-gray-900 dark:text-white">
                                <i class="fa fa-credit-card mr-2"></i> Card Payment Details
                            </h3>
                            <form id="payment-form" class="space-y-4">
                                <div>
                                    <label class="block text-xs mb-1">Amount</label>
                                    <div class="relative">
                                        <input type="number" name="amount" min="200" 
                                            class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:border-blue-500"
                                            placeholder="Enter amount" required>
                                        <span class="absolute right-2 top-2 text-gray-400">
                                            <i class="fa fa-dollar"></i>
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs mb-1">Description</label>
                                    <textarea name="desc" 
                                        class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:border-blue-500"
                                        placeholder="Payment description" required></textarea>
                                </div>

                                <div class="flex gap-2">
                                    <button type="submit" class="btn bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                                        <i class="fa fa-lock mr-2"></i> Proceed to Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <footer class="p-4 text-center text-gray-600 dark:text-gray-400 text-xs">
                    <p><strong>Copyright © ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.</p>
                </footer>
            </div>
        </div>
        `,
        pageEvents
    };
};

export default cardPayment;



