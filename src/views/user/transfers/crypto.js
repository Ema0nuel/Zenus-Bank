import { supabase } from '../../../utils/supabaseClient';
import navbar from '../components/Navbar';
import { showToast } from '../../../components/toast';
import { reset } from '../../../utils/reset';
import spinner from '../../../utils/spinner';
import BTC from '../../../images/welcome/btc.png';
import ETH from '../../../images/welcome/eth.png';
import BNB from '../../../images/welcome/bnb.png';
import SOL from '../../../images/welcome/sol.png';

const SUPPORTED_ASSETS = {
    BTC: {
        name: 'Bitcoin',
        symbol: 'BTC',
        networks: ['BTC'],
        addresses: {
            BTC: ['1P2xvf43ragZWBKRacXVLsHb7Q6nqGqYis', 'bc1q02e9fsglke2pymcsfgs7shqmcwn0a0acuex7hu']
        },
        minDeposit: 0.001,
        logo: BTC
    },
    ETH: {
        name: 'Ethereum',
        symbol: 'ETH',
        networks: ['ETH'],
        addresses: {
            ETH: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8']
        },
        minDeposit: 0.01,
        logo: ETH
    },
    SOL: {
        name: 'Solana',
        symbol: 'SOL',
        networks: ['SOL'],
        addresses: {
            SOL: ['CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2', 'DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe']
        },
        minDeposit: 0.1,
        logo: SOL
    },
    USDC: {
        name: 'USD Coin',
        symbol: 'USDC',
        networks: ['ERC20', 'BEP20'],
        addresses: {
            ERC20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8'],
            BEP20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36']
        },
        minDeposit: 10,
        logo: BNB
    },
    USDT: {
        name: 'Tether USD',
        symbol: 'USDT',
        networks: ['TRC20', 'ERC20', 'SOL'],
        addresses: {
            TRC20: ['TJUg7dQcUD8CLzh8kU8hegr6inmYFrTXnb', 'TXnXtYTjj6QoaZeMKcTMPS5JZvK3hCcHLo'],
            ERC20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8'],
            SOL: ['CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2', 'DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe']
        },
        minDeposit: 10,
        logo: BNB
    },
    BNB: {
        name: 'Binance Coin',
        symbol: 'BNB',
        networks: ['BEP20'],
        addresses: {
            BEP20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8']
        },
        minDeposit: 0.1,
        logo: BNB
    }
};

const cryptoTransfer = async () => {
    reset("Zenus Bank | Crypto Transfer");
    const nav = navbar();

    async function fetchPrices() {
        try {
            const response = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,usd-coin,tether,binancecoin&vs_currencies=usd"
            );
            const data = await response.json();
            return {
                BTC: data.bitcoin.usd,
                ETH: data.ethereum.usd,
                SOL: data.solana.usd,
                USDC: data['usd-coin'].usd,
                USDT: data.tether.usd,
                BNB: data.binancecoin.usd
            };
        } catch (err) {
            showToast("Failed to fetch prices", "error");
            return {
                BTC: 0,
                ETH: 0,
                SOL: 0,
                USDC: 1,
                USDT: 1,
                BNB: 0
            };
        }
    }

    // Fetch session and user/account data
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
        window.location.href = "/login";
        return;
    }
    const { user } = session.data.session;

    // Fetch profile and account data
    const [profileResponse, accountResponse, transactionsResponse] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('accounts').select('*').eq('user_id', user.id).single(),
        supabase.from('transactions')
            .select('*')
            .eq('user_id', user.id)
            .eq('method', 'crypto')
            .order('created_at', { ascending: false })
            .limit(5)
    ]);
    const profile = profileResponse.data;
    const account = accountResponse.data;
    const cryptoTransactions = transactionsResponse.data;

    // Format helpers
    const fmt = v => typeof v === 'number' ?
        v.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) :
        v || '$0.00';
    const fmtCrypto = (amount, symbol) => `${parseFloat(amount).toFixed(8)} ${symbol}`;

    // Generate transaction rows HTML
    const transactionRows = cryptoTransactions?.length ?
        cryptoTransactions.map(tx => `
            <tr class="border-b border-gray-700">
                <td class="p-2 text-xs">${tx.created_at?.slice(0, 16).replace('T', ' ')}</td>
                <td class="p-2 text-xs">${tx.direction}</td>
                <td class="p-2 text-xs">${tx.crypto_symbol}</td>
                <td class="p-2 text-xs">${fmtCrypto(tx.crypto_amount, tx.crypto_symbol)}</td>
                <td class="p-2 text-xs">${fmt(tx.fiat_amount)}</td>
                <td class="p-2 text-xs">
                    <span class="px-2 py-1 rounded text-xs ${tx.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                tx.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
            }">
                        ${tx.status}
                    </span>
                </td>
            </tr>
        `).join('') :
        `<tr><td colspan="6" class="text-center p-4 text-gray-500">No crypto transactions found</td></tr>`;

    let prices = await fetchPrices();

    // Deposit handler
    async function handleDeposit(e) {
        e.preventDefault();
        const form = e.target;
        const asset = SUPPORTED_ASSETS[form.cryptoSelect.value];
        const network = form.networkSelect.value;
        const amount = parseFloat(form.amount.value);
        const txHash = form.txHash.value.trim();

        if (!asset || !network || !amount || !txHash) {
            showToast("Please fill all fields", "error");
            return;
        }

        if (amount < asset.minDeposit) {
            showToast(`Minimum deposit is ${asset.minDeposit} ${asset.symbol}`, "error");
            return;
        }

        spinner.start();
        try {
            // Calculate USD value
            const usdValue = amount * prices[asset.symbol];

            const { error } = await supabase.from('transactions').insert({
                user_id: user.id,
                account_id: account.id,
                type: 'crypto',
                method: 'crypto',
                amount: usdValue, // Required: USD value of transaction
                description: `Crypto deposit: ${amount} ${asset.symbol} via ${network}`,
                status: 'pending',
                direction: 'crypto-to-fiat',
                crypto_symbol: asset.symbol,
                crypto_amount: amount,
                fiat_amount: usdValue,
                wallet_address: asset.addresses[network][0],
                tx_hash: txHash,
                balance_before: account?.balance || 0,
                balance_after: account?.balance || 0,
                created_at: new Date().toISOString()
            });

            if (error) throw error;
            showToast("Deposit submitted successfully", "success");
            form.reset();
            window.location.reload();
        } catch (err) {
            console.error(err);
            showToast("Failed to submit deposit", "error");
        } finally {
            spinner.stop();
        }
    }

    // Swap handlers
    async function handleFromAssetSelect() {
        prices = await fetchPrices();
        updateSwapPreview();
    }

    async function handleToAssetSelect() {
        prices = await fetchPrices();
        updateSwapPreview();
    }

    async function updateSwapPreview() {
        const fromAsset = document.getElementById('fromAsset').value;
        const toAsset = document.getElementById('toAsset').value;
        const amount = parseFloat(document.getElementById('swapAmount').value) || 0;
        const previewElement = document.getElementById('swapPreview');

        if (!fromAsset || !toAsset || !amount) {
            previewElement.innerHTML = '';
            return;
        }

        const rate = prices[toAsset] / prices[fromAsset];
        const receivedAmount = amount * rate * 0.99; // 1% fee
        const fee = amount * 0.01;

        previewElement.innerHTML = `
            <div class="bg-gray-700 p-4 rounded-lg space-y-3">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Exchange Rate</span>
                    <span class="text-white">1 ${fromAsset} = ${rate.toFixed(8)} ${toAsset}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Fee (1%)</span>
                    <span class="text-white">${fee.toFixed(8)} ${fromAsset}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">You'll Receive</span>
                    <span class="text-green-500">${receivedAmount.toFixed(8)} ${toAsset}</span>
                </div>
            </div>
        `;
    }

    // Update the handleSwap function
    async function handleSwap(e) {
        e.preventDefault();
        const form = e.target;
        const fromAsset = form.fromAsset.value;
        const toAsset = form.toAsset.value;
        const amount = parseFloat(form.amount.value);

        if (!fromAsset || !toAsset || !amount) {
            showToast("Please fill all fields", "error");
            return;
        }

        const rate = prices[toAsset] / prices[fromAsset];
        const receivedAmount = amount * rate * 0.99; // 1% fee
        const usdValue = amount * prices[fromAsset]; // USD value of from asset

        spinner.start();
        try {
            const { error } = await supabase.from('transactions').insert({
                user_id: user.id,
                account_id: account.id,
                type: 'crypto',
                method: 'crypto',
                amount: usdValue, // Required: USD value of transaction
                description: `Swap ${amount} ${fromAsset} to ${receivedAmount.toFixed(8)} ${toAsset}`,
                status: 'pending',
                direction: 'crypto-to-crypto',
                crypto_symbol: fromAsset,
                crypto_amount: amount,
                to_crypto_symbol: toAsset,
                to_crypto_amount: receivedAmount,
                balance_before: account?.balance || 0,
                balance_after: account?.balance || 0,
                created_at: new Date().toISOString()
            });

            if (error) throw error;
            showToast("Swap submitted successfully", "success");
            form.reset();
            window.location.reload();
        } catch (err) {
            console.error(err);
            showToast("Failed to submit swap", "error");
        } finally {
            spinner.stop();
        }
    }

    // Deposit asset/network handlers
    function handleAssetSelect(e) {
        const asset = SUPPORTED_ASSETS[e.target.value];
        const networkSelect = document.getElementById('networkSelect');
        const addressDisplay = document.getElementById('addressDisplay');

        if (asset) {
            networkSelect.innerHTML = `
                <option value="">Select Network</option>
                ${asset.networks.map(network => `
                    <option value="${network}">${network}</option>
                `).join('')}
            `;
            networkSelect.disabled = false;
            addressDisplay.innerHTML = '';
        } else {
            networkSelect.innerHTML = '<option value="">Select Network</option>';
            networkSelect.disabled = true;
            addressDisplay.innerHTML = '';
        }
    }

    function handleNetworkSelect(e) {
        const asset = SUPPORTED_ASSETS[document.getElementById('cryptoSelect').value];
        const network = e.target.value;
        const addressDisplay = document.getElementById('addressDisplay');

        if (asset && network) {
            const addresses = asset.addresses[network];
            addressDisplay.innerHTML = `
                <div class="bg-gray-700 p-4 rounded-lg mt-4">
                    <div class="flex items-center gap-3 mb-4">
                        <img src="${asset.logo}" alt="${asset.symbol}" class="w-8 h-8">
                        <div>
                            <h3 class="font-medium text-white">${asset.name}</h3>
                            <p class="text-sm text-gray-400">${network} Network</p>
                        </div>
                    </div>
                    ${addresses.map(address => `
                        <div class="bg-gray-800 p-3 rounded-lg mb-2 flex items-center justify-between">
                            <code class="text-sm text-yellow-500 break-all">${address}</code>
                            <button type="button" class="p-2 hover:bg-gray-700 rounded-lg copy-btn" data-address="${address}">
                                <i class="fas fa-copy text-gray-400"></i>
                            </button>
                        </div>
                    `).join('')}
                    <div class="mt-4 text-yellow-500 text-sm flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Minimum deposit: ${asset.minDeposit} ${asset.symbol}</span>
                    </div>
                </div>
            `;
            // Attach copy event for all copy buttons
            setTimeout(() => {
                document.querySelectorAll('.copy-btn').forEach(btn => {
                    btn.onclick = () => {
                        navigator.clipboard.writeText(btn.getAttribute('data-address'));
                        showToast("Wallet address copied!", "success");
                    };
                });
            }, 100);
        } else {
            addressDisplay.innerHTML = '';
        }
    }

    function pageEvents() {
        nav.pageEvents?.();
        document.getElementById('cryptoSelect')?.addEventListener('change', handleAssetSelect);
        document.getElementById('networkSelect')?.addEventListener('change', handleNetworkSelect);
        document.getElementById('depositForm')?.addEventListener('submit', handleDeposit);
        document.getElementById('fromAsset')?.addEventListener('change', handleFromAssetSelect);
        document.getElementById('toAsset')?.addEventListener('change', handleToAssetSelect);
        document.getElementById('swapAmount')?.addEventListener('input', updateSwapPreview);
        document.getElementById('swapForm')?.addEventListener('submit', handleSwap);
    }

    return {
        html: `
            ${nav.html}
            <div class="bg-gray-50 dark:bg-gray-900 min-h-screen pt-12">
                <div id="main-content" class="ml-56 pt-14 transition-all duration-300">
                    <div class="p-4">
                        <!-- Breadcrumb -->
                        <div class="mb-4">
                            <nav class="flex items-center space-x-2 text-xs">
                                <a href="/dashboard" class="text-gray-500 hover:text-gray-300">
                                    <i class="fa fa-home"></i>
                                </a>
                                <span class="text-gray-500">/</span>
                                <span class="text-gray-300">Crypto</span>
                            </nav>
                        </div>

                        <!-- Account Info Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="p-4 rounded bg-gray-800 shadow-sm">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-xs text-gray-400">Account Number</p>
                                        <h3 class="text-lg font-semibold text-white">${account?.account_number}</h3>
                                    </div>
                                    <div class="p-2 rounded-full bg-gray-700">
                                        <i class="fa fa-university text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 rounded bg-gray-800 shadow-sm">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-xs text-gray-400">Available Balance</p>
                                        <h3 class="text-lg font-semibold text-white">${fmt(account?.balance)}</h3>
                                    </div>
                                    <div class="p-2 rounded-full bg-gray-700">
                                        <i class="fa fa-wallet text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 rounded bg-gray-800 shadow-sm">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-xs text-gray-400">Account Status</p>
                                        <h3 class="text-lg font-semibold text-white">
                                            ${account?.is_active ? 'Active' : 'Inactive'}
                                        </h3>
                                    </div>
                                    <div class="p-2 rounded-full bg-gray-700">
                                        <i class="fa fa-check-circle text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Main Content Grid -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Deposit Section -->
                            <div class="bg-gray-800 rounded-xl p-6">
                                <h2 class="text-xl font-bold text-white mb-6">
                                    <i class="fa fa-download mr-2 text-yellow-500"></i>
                                    Deposit Crypto
                                </h2>
                                <form id="depositForm" class="space-y-4">
                                    <div>
                                        <label class="block text-sm text-gray-400 mb-2">Select Asset</label>
                                        <select id="cryptoSelect" name="cryptoSelect" required
                                                class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white">
                                            <option value="">Select Asset</option>
                                            ${Object.values(SUPPORTED_ASSETS).map(asset => `
                                                <option value="${asset.symbol}">${asset.name} (${asset.symbol})</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm text-gray-400 mb-2">Select Network</label>
                                        <select id="networkSelect" name="networkSelect" required disabled
                                                class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white">
                                            <option value="">Select Network</option>
                                        </select>
                                    </div>
                                    <div id="addressDisplay"></div>
                                    <div>
                                        <label class="block text-sm text-gray-400 mb-2">Amount</label>
                                        <input type="number" name="amount" step="any" required
                                               class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                               placeholder="Enter amount">
                                    </div>
                                    <div>
                                        <label class="block text-sm text-gray-400 mb-2">Transfer wallet</label>
                                        <input type="text" name="txHash" required
                                               class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                               placeholder="Enter transaction hash">
                                    </div>
                                    <button type="submit"
                                            class="w-full bg-yellow-500 text-white rounded-lg p-3 hover:bg-yellow-600
                                                   transition-colors duration-300">
                                        Submit Deposit
                                    </button>
                                </form>
                            </div>

                            <!-- Swap Section -->
                            <div class="bg-gray-800 rounded-xl p-6">
                                <h2 class="text-xl font-bold text-white mb-6">
                                    <i class="fa fa-exchange-alt mr-2 text-yellow-500"></i>
                                    Swap Crypto
                                </h2>
                                <form id="swapForm" class="space-y-4">
                                    <div>
                                        <label class="block text-sm text-gray-400 mb-2">From Asset</label>
                                        <select id="fromAsset" name="fromAsset" required
                                                class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white">
                                            <option value="">Select Asset</option>
                                            ${Object.values(SUPPORTED_ASSETS).map(asset => `
                                                <option value="${asset.symbol}">${asset.name} (${asset.symbol})</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="flex justify-center">
                                        <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                            <i class="fas fa-arrow-down text-yellow-500"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm text-gray-400 mb-2">To Asset</label>
                                        <select id="toAsset" name="toAsset" required
                                                class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white">
                                            <option value="">Select Asset</option>
                                            ${Object.values(SUPPORTED_ASSETS).map(asset => `
                                                <option value="${asset.symbol}">${asset.name} (${asset.symbol})</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm text-gray-400 mb-2">Amount</label>
                                        <input type="number" id="swapAmount" name="amount" step="any" required
                                               class="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                               placeholder="Enter amount">
                                    </div>
                                    <div id="swapPreview"></div>
                                    <button type="submit"
                                            class="w-full bg-yellow-500 text-white rounded-lg p-3 hover:bg-yellow-600
                                                   transition-colors duration-300">
                                        Swap Assets
                                    </button>
                                </form>
                            </div>

                            <!-- Transaction History -->
                            <div class="bg-gray-800 rounded-xl p-6 lg:col-span-2">
                                <h2 class="text-xl font-bold text-white mb-6">
                                    <i class="fa fa-history mr-2 text-yellow-500"></i>
                                    Recent Transactions
                                </h2>
                                <div class="overflow-x-auto">
                                    <table class="w-full">
                                        <thead>
                                            <tr class="bg-gray-700/50 text-gray-400">
                                                <th class="p-2 text-left text-xs">Date & Time</th>
                                                <th class="p-2 text-left text-xs">Direction</th>
                                                <th class="p-2 text-left text-xs">Asset</th>
                                                <th class="p-2 text-left text-xs">Crypto Amount</th>
                                                <th class="p-2 text-left text-xs">Fiat Amount</th>
                                                <th class="p-2 text-left text-xs">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-gray-300">
                                            ${transactionRows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="p-4 text-center text-gray-500 text-xs">
                        <p>Copyright © ${new Date().getFullYear()} All rights reserved | Zenus Bank</p>
                    </footer>
                </div>
            </div>
        `,
        pageEvents
    };
};

export default cryptoTransfer;
