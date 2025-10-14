import { supabase } from '../../../utils/supabaseClient';
import navbar from '../components/Navbar';
import { showToast } from '../../../components/toast';
import { reset } from '../../../utils/reset';
import spinner from '../../../utils/spinner';
import BTC from '../../../images/welcome/btc.png';
import ETH from '../../../images/welcome/eth.png';
import BNB from '../../../images/welcome/bnb.png';
import SOL from '../../../images/welcome/sol.png';

// Rate cache configuration
const RATE_CACHE_DURATION = 30000; // 30 seconds
const rateCache = new Map();

// Crypto configuration
const CRYPTO_CONFIG = {
    BTC: {
        id: 'bitcoin',
        name: 'Bitcoin',
        decimals: 8,
        minAmount: 0.001,
        logo: BTC,
        networks: ['BTC'],
        addresses: {
            BTC: ['1P2xvf43ragZWBKRacXVLsHb7Q6nqGqYis', 'bc1q02e9fsglke2pymcsfgs7shqmcwn0a0acuex7hu']
        }
    },
    ETH: {
        id: 'ethereum',
        name: 'Ethereum',
        decimals: 8,
        minAmount: 0.01,
        logo: ETH,
        networks: ['ETH'],
        addresses: {
            ETH: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8']
        }
    },
    SOL: {
        id: 'solana',
        name: 'Solana',
        decimals: 8,
        minAmount: 0.1,
        logo: SOL,
        networks: ['SOL'],
        addresses: {
            SOL: ['CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2', 'DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe']
        }
    },
    USDC: {
        id: 'usd-coin',
        name: 'USD Coin',
        decimals: 6,
        minAmount: 10,
        logo: BNB,
        networks: ['ERC20', 'BEP20'],
        addresses: {
            ERC20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8'],
            BEP20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36']
        }
    },
    USDT: {
        id: 'tether',
        name: 'Tether USD',
        decimals: 6,
        minAmount: 10,
        logo: BNB,
        networks: ['TRC20', 'ERC20', 'SOL'],
        addresses: {
            TRC20: ['TJUg7dQcUD8CLzh8kU8hegr6inmYFrTXnb', 'TXnXtYTjj6QoaZeMKcTMPS5JZvK3hCcHLo'],
            ERC20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8'],
            SOL: ['CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2', 'DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe']
        }
    },
    BNB: {
        id: 'binancecoin',
        name: 'Binance Coin',
        decimals: 8,
        minAmount: 0.1,
        logo: BNB,
        networks: ['BEP20'],
        addresses: {
            BEP20: ['0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36', '0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8']
        }
    }
};

const CRYPTO_PAIRS = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    USDT: 'tether',
    USDC: 'usd-coin',
    BNB: 'binancecoin',
    SOL: 'solana'
};

// Function to get real-time crypto rates
async function getCryptoRate(cryptoSymbol) {
    try {
        const coinId = CRYPTO_PAIRS[cryptoSymbol.toUpperCase()];
        if (!coinId) throw new Error('Unsupported cryptocurrency');

        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
        );

        if (!response.ok) throw new Error('Failed to fetch rate');

        const data = await response.json();
        if (!data[coinId]?.usd) throw new Error('Rate not available');

        return data[coinId].usd;
    } catch (error) {
        console.error('Error fetching crypto rate:', error);
        throw error;
    }
}

// Function to calculate crypto amount from fiat
async function calculateCryptoAmount(fiatAmount, cryptoSymbol) {
    const rate = await getCryptoRate(cryptoSymbol);
    const amount = parseFloat(fiatAmount) / rate;

    switch (cryptoSymbol.toUpperCase()) {
        case 'BTC':
        case 'ETH':
        case 'BNB':
        case 'SOL':
            return amount.toFixed(8);
        case 'USDT':
        case 'USDC':
            return amount.toFixed(6);
        default:
            return amount.toFixed(8);
    }
}

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

// Rate calculation and caching functions
class RateManager {
    static async getCachedRate(symbol) {
        const cachedData = rateCache.get(symbol);
        if (cachedData && Date.now() - cachedData.timestamp < RATE_CACHE_DURATION) {
            return cachedData.rate;
        }
        return null;
    }

    static async fetchAndCacheRate(symbol) {
        try {
            const config = CRYPTO_CONFIG[symbol];
            if (!config) throw new Error(`Unsupported cryptocurrency: ${symbol}`);

            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${config.id}&vs_currencies=usd`
            );

            if (!response.ok) throw new Error('Failed to fetch rate');

            const data = await response.json();
            const rate = data[config.id]?.usd;

            if (!rate) throw new Error('Rate not available');

            // Cache the rate
            rateCache.set(symbol, {
                rate,
                timestamp: Date.now()
            });

            return rate;
        } catch (error) {
            console.error(`Error fetching ${symbol} rate:`, error);
            throw error;
        }
    }

    static async getRate(symbol) {
        try {
            const cachedRate = await this.getCachedRate(symbol);
            if (cachedRate !== null) return cachedRate;
            return await this.fetchAndCacheRate(symbol);
        } catch (error) {
            // For stablecoins, return 1 as fallback
            if (symbol === 'USDT' || symbol === 'USDC') return 1;
            throw error;
        }
    }

    static async calculateSwap(fromSymbol, toSymbol, amount) {
        const [fromRate, toRate] = await Promise.all([
            this.getRate(fromSymbol),
            this.getRate(toSymbol)
        ]);

        const usdValue = amount * fromRate;
        const swappedAmount = usdValue / toRate;
        const fee = swappedAmount * 0.01; // 1% fee
        const finalAmount = swappedAmount - fee;

        return {
            fromRate,
            toRate,
            usdValue,
            swappedAmount: finalAmount,
            fee,
            exchangeRate: toRate / fromRate
        };
    }

    static formatCryptoAmount(amount, symbol) {
        const config = CRYPTO_CONFIG[symbol];
        return config ? Number(amount).toFixed(config.decimals) : '0';
    }

    static validateAmount(amount, symbol) {
        const config = CRYPTO_CONFIG[symbol];
        if (!config) throw new Error(`Invalid cryptocurrency: ${symbol}`);
        if (amount < config.minAmount) {
            throw new Error(`Minimum amount for ${symbol} is ${config.minAmount}`);
        }
        return true;
    }
}

const cryptoTransfer = async () => {
    reset("Zenus Bank | Crypto Transfer");
    const nav = navbar();

    // Cache initial rates for common pairs
    async function initializeRates() {
        try {
            await Promise.all(
                Object.keys(CRYPTO_CONFIG).map(symbol =>
                    RateManager.getRate(symbol).catch(() => { })
                )
            );
        } catch (error) {
            console.error('Error initializing rates:', error);
        }
    }

    async function fetchPrices() {
        try {
            const rates = await Promise.all(
                Object.keys(CRYPTO_PAIRS).map(symbol =>
                    getCryptoRate(symbol).catch(err => {
                        console.error(`Error fetching ${symbol} rate:`, err);
                        return symbol === 'USDT' || symbol === 'USDC' ? 1 : 0;
                    })
                )
            );

            return Object.fromEntries(
                Object.keys(CRYPTO_PAIRS).map((symbol, index) => [symbol, rates[index]])
            );
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
        const symbol = form.cryptoSelect.value;
        const config = CRYPTO_CONFIG[symbol];
        const network = form.networkSelect.value;
        const amount = parseFloat(form.amount.value);
        const txHash = form.txHash.value.trim();

        if (!config || !network || !amount || !txHash) {
            showToast("Please fill all fields", "error");
            return;
        }

        spinner.start();
        try {
            // Validate amount
            RateManager.validateAmount(amount, symbol);

            // Get current rate and calculate USD value
            const rate = await RateManager.getRate(symbol);
            const usdValue = amount * rate;

            const { error } = await supabase.from('transactions').insert({
                user_id: user.id,
                account_id: account.id,
                type: 'crypto',
                method: 'crypto',
                amount: usdValue,
                description: `Crypto deposit: ${RateManager.formatCryptoAmount(amount, symbol)} ${symbol} via ${network}`,
                status: 'pending',
                direction: 'crypto-to-fiat',
                crypto_symbol: symbol,
                crypto_amount: amount,
                fiat_amount: usdValue,
                rate_at_transaction: rate,
                wallet_address: config.addresses[network][0],
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
            showToast(err.message || "Failed to submit deposit", "error");
        } finally {
            spinner.stop();
        }
    }

    // Swap handlers with improved rate calculation
    async function updateSwapPreview() {
        const fromSymbol = document.getElementById('fromAsset').value;
        const toSymbol = document.getElementById('toAsset').value;
        const amount = parseFloat(document.getElementById('swapAmount').value) || 0;
        const previewElement = document.getElementById('swapPreview');

        if (!fromSymbol || !toSymbol || !amount) {
            previewElement.innerHTML = '';
            return;
        }

        try {
            const swapDetails = await RateManager.calculateSwap(fromSymbol, toSymbol, amount);

            previewElement.innerHTML = `
                <div class="bg-gray-700 p-4 rounded-lg space-y-3">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Exchange Rate</span>
                        <span class="text-white">1 ${fromSymbol} = ${swapDetails.exchangeRate.toFixed(8)} ${toSymbol}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">USD Value</span>
                        <span class="text-white">$${swapDetails.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Fee (1%)</span>
                        <span class="text-white">${RateManager.formatCryptoAmount(swapDetails.fee, toSymbol)} ${toSymbol}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">You'll Receive</span>
                        <span class="text-green-500">${RateManager.formatCryptoAmount(swapDetails.swappedAmount, toSymbol)} ${toSymbol}</span>
                    </div>
                </div>
            `;
        } catch (error) {
            previewElement.innerHTML = `
                <div class="bg-red-900/30 text-red-400 p-4 rounded-lg">
                    ${error.message}
                </div>
            `;
        }
    }

    // Debounce function for rate updates
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const debouncedUpdateSwapPreview = debounce(updateSwapPreview, 500);

    // Update the handleSwap function
    async function handleSwap(e) {
        e.preventDefault();
        const form = e.target;
        const fromSymbol = form.fromAsset.value;
        const toSymbol = form.toAsset.value;
        const amount = parseFloat(form.amount.value);

        if (!fromSymbol || !toSymbol || !amount) {
            showToast("Please fill all fields", "error");
            return;
        }

        spinner.start();
        try {
            // Validate amount
            RateManager.validateAmount(amount, fromSymbol);

            // Calculate swap details
            const swapDetails = await RateManager.calculateSwap(fromSymbol, toSymbol, amount);

            const { error } = await supabase.from('transactions').insert({
                user_id: user.id,
                account_id: account.id,
                type: 'crypto',
                method: 'crypto',
                amount: swapDetails.usdValue,
                description: `Swap ${RateManager.formatCryptoAmount(amount, fromSymbol)} ${fromSymbol} to ${RateManager.formatCryptoAmount(swapDetails.swappedAmount, toSymbol)} ${toSymbol}`,
                status: 'pending',
                direction: 'crypto-to-crypto',
                crypto_symbol: fromSymbol,
                crypto_amount: amount,
                to_crypto_symbol: toSymbol,
                to_crypto_amount: swapDetails.swappedAmount,
                from_rate: swapDetails.fromRate,
                to_rate: swapDetails.toRate,
                fee_amount: RateManager.formatCryptoAmount(swapDetails.fee, toSymbol),
                fee_currency: toSymbol,
                exchange_rate: swapDetails.exchangeRate,
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
            showToast(err.message || "Failed to submit swap", "error");
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

    // Update deposit preview
    async function updateDepositPreview() {
        const cryptoSelect = document.getElementById('cryptoSelect');
        const amountInput = document.querySelector('input[name="amount"]');
        const rateDisplay = document.getElementById('deposit-rate-display');
        const cryptoAmountDisplay = document.getElementById('deposit-crypto-amount');

        if (cryptoSelect.value && amountInput.value) {
            try {
                const rate = await getCryptoRate(cryptoSelect.value);
                const cryptoAmount = await calculateCryptoAmount(amountInput.value, cryptoSelect.value);

                rateDisplay.textContent = `1 ${cryptoSelect.value} = $${rate.toLocaleString()} USD`;
                cryptoAmountDisplay.textContent = `${cryptoAmount} ${cryptoSelect.value}`;
            } catch (error) {
                showToast("Error calculating rate: " + error.message, "error");
            }
        }
    }

    // Update live rate on crypto selection
    function handleDepositCryptoSelect(e) {
        handleAssetSelect(e);
        updateDepositPreview();
    }

    // Update live rate on amount change
    function handleDepositAmountInput() {
        updateDepositPreview();
    }

    // Initialize page
    async function initialize() {
        await initializeRates();
        pageEvents();
    }

    function pageEvents() {
        nav.pageEvents?.();

        // Deposit form handlers
        document.getElementById('cryptoSelect')?.addEventListener('change', handleDepositCryptoSelect);
        document.getElementById('networkSelect')?.addEventListener('change', handleNetworkSelect);
        document.getElementById('depositForm')?.addEventListener('submit', handleDeposit);
        document.querySelector('input[name="amount"]')?.addEventListener('input', handleDepositAmountInput);

        // Swap form handlers
        document.getElementById('fromAsset')?.addEventListener('change', () => {
            debouncedUpdateSwapPreview();
        });
        document.getElementById('toAsset')?.addEventListener('change', () => {
            debouncedUpdateSwapPreview();
        });
        document.getElementById('swapAmount')?.addEventListener('input', () => {
            debouncedUpdateSwapPreview();
        });
        document.getElementById('swapForm')?.addEventListener('submit', handleSwap);

        // Initialize tooltips and copy buttons
        setTimeout(() => {
            document.querySelectorAll('.copy-btn').forEach(btn => {
                btn.onclick = () => {
                    navigator.clipboard.writeText(btn.getAttribute('data-address'));
                    showToast("Wallet address copied!", "success");
                };
            });
        }, 100);
    } return {
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
                                        <div class="mt-2 space-y-1">
                                            <div id="deposit-rate-display" class="text-sm text-gray-400"></div>
                                            <div id="deposit-crypto-amount" class="font-mono text-yellow-500"></div>
                                        </div>
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
                                        <div class="mt-2 space-y-1">
                                            <div id="swap-rate-display" class="text-sm text-gray-400"></div>
                                            <div id="swap-crypto-amount" class="font-mono text-yellow-500"></div>
                                        </div>
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
                        <p>Copyright � ${new Date().getFullYear()} All rights reserved | Zenus Bank</p>
                    </footer>
                </div>
            </div>
        `,
        pageEvents
    };
};

export default cryptoTransfer;
