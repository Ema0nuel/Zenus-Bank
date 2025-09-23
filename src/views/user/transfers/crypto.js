import { supabase } from '../../../utils/supabaseClient';
import navbar from '../components/Navbar';
import { showToast } from '../../../components/toast';
import { reset } from '../../../utils/reset';

const SUPPORTED_CRYPTOS = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'USDT', name: 'Tether USD' },
    { symbol: 'BNB', name: 'Binance Coin' }
];

const fetchCryptoPrices = async () => {
    try {
        const res = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd"
        );
        const data = await res.json();
        return {
            BTC: data.bitcoin.usd,
            ETH: data.ethereum.usd,
            USDT: data.tether.usd,
            BNB: data.binancecoin.usd,
        };
    } catch {
        return {};
    }
};

const cryptoTransfer = async () => {
    const nav = navbar();
    reset("Zenus Bank | Crypto Transfer");

    // Fetch session and user/account data
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
        window.location.href = "/login";
        return;
    }
    const { user } = session.data.session;
    const { data: account } = await supabase.from('accounts').select('*').eq('user_id', user.id).single();

    let prices = await fetchCryptoPrices();

    function pageEvents() {
        nav.pageEvents?.();

        // Update price preview
        const updatePreview = () => {
            const type = document.getElementById('transfer-type').value;
            const crypto = document.getElementById('crypto-symbol').value;
            const amount = parseFloat(document.getElementById('amount').value) || 0;
            const preview = document.getElementById('crypto-preview');
            if (!crypto || !amount) {
                preview.innerHTML = '';
                return;
            }
            let result = '';
            if (type === 'fiat-to-crypto') {
                const cryptoAmount = amount / prices[crypto];
                result = `You will receive <b>${cryptoAmount.toFixed(8)} ${crypto}</b> for $${amount}`;
            } else if (type === 'crypto-to-fiat') {
                const usdAmount = amount * prices[crypto];
                result = `You will receive <b>$${usdAmount.toFixed(2)}</b> for ${amount} ${crypto}`;
            }
            preview.innerHTML = `<div class="p-3 bg-brand-black/10 rounded text-sm">${result}</div>`;
        };

        document.getElementById('transfer-type').onchange = updatePreview;
        document.getElementById('crypto-symbol').onchange = updatePreview;
        document.getElementById('amount').oninput = updatePreview;

        // Handle form submit
        document.getElementById('crypto-form').onsubmit = async function (e) {
            e.preventDefault();
            const type = this['transfer-type'].value;
            const crypto = this['crypto-symbol'].value;
            const amount = parseFloat(this.amount.value);
            const wallet = this.wallet.value.trim();

            if (!crypto || !amount || !wallet) {
                showToast("All fields are required.", "error");
                return;
            }

            let fiatAmount = 0, cryptoAmount = 0;
            if (type === 'fiat-to-crypto') {
                fiatAmount = amount;
                cryptoAmount = amount / prices[crypto];
            } else {
                cryptoAmount = amount;
                fiatAmount = amount * prices[crypto];
            }

            // Insert transaction
            const { error } = await supabase.from('transactions').insert([{
                user_id: user.id,
                account_id: account.id,
                type: 'crypto',
                direction: type,
                crypto_symbol: crypto,
                crypto_amount: cryptoAmount,
                fiat_amount: fiatAmount,
                wallet_address: wallet,
                status: 'pending'
            }]);
            if (error) {
                showToast("Failed to submit transaction.", "error");
                return;
            }
            showToast("Crypto transaction submitted and pending approval.", "success");
            setTimeout(() => window.location.reload(), 1200);
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
                        <span class="text-gray-700 dark:text-gray-300">Crypto Transfer</span>
                    </nav>
                    <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-btc mr-2"></i> Crypto Transfer</h3>
                        </div>
                        <form id="crypto-form" class="space-y-4">
                            <div>
                                <label class="block text-xs mb-1">Transfer Type</label>
                                <select id="transfer-type" name="transfer-type" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" required>
                                    <option value="fiat-to-crypto">Fiat to Crypto</option>
                                    <option value="crypto-to-fiat">Crypto to Fiat</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs mb-1">Cryptocurrency</label>
                                <select id="crypto-symbol" name="crypto-symbol" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" required>
                                    <option value="">Select Crypto</option>
                                    ${SUPPORTED_CRYPTOS.map(c => `<option value="${c.symbol}">${c.name} (${c.symbol})</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs mb-1">Amount</label>
                                <input type="number" id="amount" name="amount" min="0.0001" step="any" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" placeholder="Amount" required>
                            </div>
                            <div>
                                <label class="block text-xs mb-1">Wallet Address</label>
                                <input type="text" name="wallet" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" placeholder="Your wallet address" required>
                            </div>
                            <div id="crypto-preview" class="mb-2"></div>
                            <div class="flex gap-2">
                                <button type="submit" class="btn bg-green-600 text-white px-4 py-1 rounded text-xs"><i class="fa fa-btc"></i> Submit</button>
                                <button type="reset" class="btn bg-gray-200 text-gray-700 px-4 py-1 rounded text-xs"><i class="fa fa-refresh"></i> Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
                <footer class="p-4 text-center text-gray-600 dark:text-gray-400 text-xs">
                    <p>
                        <strong>Copyright © ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.
                    </p>
                </footer>
            </div>
        </div>
        `,
        pageEvents
    };
};

export default cryptoTransfer;