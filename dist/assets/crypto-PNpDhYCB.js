import{s as b}from"./supabaseClient-B1HaFb4P.js";import{n as W}from"./Navbar-DiGZTYQT.js";import{s as m}from"./toast-DRvdR0y9.js";import{r as Y}from"./reset-CYKpHJhn.js";import{s as A}from"./spinner-KTJn75tI.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";const R="/assets/btc-Z8n5mdFU.png",L="/assets/eth-DxLoo2KM.png",g="/assets/bnb-DEkEK04Y.png",_="/assets/sol-C-K0-JsS.png",J=3e4,F=new Map,E={BTC:{id:"bitcoin",name:"Bitcoin",decimals:8,minAmount:.001,logo:R,networks:["BTC"],addresses:{BTC:["1P2xvf43ragZWBKRacXVLsHb7Q6nqGqYis","bc1q02e9fsglke2pymcsfgs7shqmcwn0a0acuex7hu"]}},ETH:{id:"ethereum",name:"Ethereum",decimals:8,minAmount:.01,logo:L,networks:["ETH"],addresses:{ETH:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"]}},SOL:{id:"solana",name:"Solana",decimals:8,minAmount:.1,logo:_,networks:["SOL"],addresses:{SOL:["CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2","DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe"]}},USDC:{id:"usd-coin",name:"USD Coin",decimals:6,minAmount:10,logo:g,networks:["ERC20","BEP20"],addresses:{ERC20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"],BEP20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36"]}},USDT:{id:"tether",name:"Tether USD",decimals:6,minAmount:10,logo:g,networks:["TRC20","ERC20","SOL"],addresses:{TRC20:["TJUg7dQcUD8CLzh8kU8hegr6inmYFrTXnb","TXnXtYTjj6QoaZeMKcTMPS5JZvK3hCcHLo"],ERC20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"],SOL:["CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2","DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe"]}},BNB:{id:"binancecoin",name:"Binance Coin",decimals:8,minAmount:.1,logo:g,networks:["BEP20"],addresses:{BEP20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"]}}},C={BTC:"bitcoin",ETH:"ethereum",USDT:"tether",USDC:"usd-coin",BNB:"binancecoin",SOL:"solana"};async function T(p){try{const o=C[p.toUpperCase()];if(!o)throw new Error("Unsupported cryptocurrency");const s=await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${o}&vs_currencies=usd`);if(!s.ok)throw new Error("Failed to fetch rate");const c=await s.json();if(!c[o]?.usd)throw new Error("Rate not available");return c[o].usd}catch(o){throw console.error("Error fetching crypto rate:",o),o}}async function Z(p,o){const s=await T(o),c=parseFloat(p)/s;switch(o.toUpperCase()){case"BTC":case"ETH":case"BNB":case"SOL":return c.toFixed(8);case"USDT":case"USDC":return c.toFixed(6);default:return c.toFixed(8)}}const v={BTC:{name:"Bitcoin",symbol:"BTC",networks:["BTC"],addresses:{BTC:["1P2xvf43ragZWBKRacXVLsHb7Q6nqGqYis","bc1q02e9fsglke2pymcsfgs7shqmcwn0a0acuex7hu"]},minDeposit:.001,logo:R},ETH:{name:"Ethereum",symbol:"ETH",networks:["ETH"],addresses:{ETH:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"]},minDeposit:.01,logo:L},SOL:{name:"Solana",symbol:"SOL",networks:["SOL"],addresses:{SOL:["CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2","DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe"]},minDeposit:.1,logo:_},USDC:{name:"USD Coin",symbol:"USDC",networks:["ERC20","BEP20"],addresses:{ERC20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"],BEP20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36"]},minDeposit:10,logo:g},USDT:{name:"Tether USD",symbol:"USDT",networks:["TRC20","ERC20","SOL"],addresses:{TRC20:["TJUg7dQcUD8CLzh8kU8hegr6inmYFrTXnb","TXnXtYTjj6QoaZeMKcTMPS5JZvK3hCcHLo"],ERC20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"],SOL:["CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2","DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe"]},minDeposit:10,logo:g},BNB:{name:"Binance Coin",symbol:"BNB",networks:["BEP20"],addresses:{BEP20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"]},minDeposit:.1,logo:g}};class d{static async getCachedRate(o){const s=F.get(o);return s&&Date.now()-s.timestamp<J?s.rate:null}static async fetchAndCacheRate(o){try{const s=E[o];if(!s)throw new Error(`Unsupported cryptocurrency: ${o}`);const c=await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${s.id}&vs_currencies=usd`);if(!c.ok)throw new Error("Failed to fetch rate");const u=(await c.json())[s.id]?.usd;if(!u)throw new Error("Rate not available");return F.set(o,{rate:u,timestamp:Date.now()}),u}catch(s){throw console.error(`Error fetching ${o} rate:`,s),s}}static async getRate(o){try{const s=await this.getCachedRate(o);return s!==null?s:await this.fetchAndCacheRate(o)}catch(s){if(o==="USDT"||o==="USDC")return 1;throw s}}static async calculateSwap(o,s,c){const[f,u]=await Promise.all([this.getRate(o),this.getRate(s)]),h=c*f,l=h/u,y=l*.01,S=l-y;return{fromRate:f,toRate:u,usdValue:h,swappedAmount:S,fee:y,exchangeRate:u/f}}static formatCryptoAmount(o,s){const c=E[s];return c?Number(o).toFixed(c.decimals):"0"}static validateAmount(o,s){const c=E[s];if(!c)throw new Error(`Invalid cryptocurrency: ${s}`);if(o<c.minAmount)throw new Error(`Minimum amount for ${s} is ${c.minAmount}`);return!0}}const st=async()=>{Y("Zenus Bank | Crypto Transfer");const p=W();async function o(){try{const t=await Promise.all(Object.keys(C).map(e=>T(e).catch(a=>(console.error(`Error fetching ${e} rate:`,a),e==="USDT"||e==="USDC"?1:0))));return Object.fromEntries(Object.keys(C).map((e,a)=>[e,t[a]]))}catch{return m("Failed to fetch prices","error"),{BTC:0,ETH:0,SOL:0,USDC:1,USDT:1,BNB:0}}}const s=await b.auth.getSession();if(!s.data.session){window.location.href="/login";return}const{user:c}=s.data.session,[f,u,h]=await Promise.all([b.from("profiles").select("*").eq("id",c.id).single(),b.from("accounts").select("*").eq("user_id",c.id).single(),b.from("transactions").select("*").eq("user_id",c.id).eq("method","crypto").order("created_at",{ascending:!1}).limit(5)]);f.data;const l=u.data,y=h.data,S=t=>typeof t=="number"?t.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):t||"$0.00",P=(t,e)=>`${parseFloat(t).toFixed(8)} ${e}`,U=y?.length?y.map(t=>`
            <tr class="border-b border-gray-700">
                <td class="p-2 text-xs">${t.created_at?.slice(0,16).replace("T"," ")}</td>
                <td class="p-2 text-xs">${t.direction}</td>
                <td class="p-2 text-xs">${t.crypto_symbol}</td>
                <td class="p-2 text-xs">${P(t.crypto_amount,t.crypto_symbol)}</td>
                <td class="p-2 text-xs">${S(t.fiat_amount)}</td>
                <td class="p-2 text-xs">
                    <span class="px-2 py-1 rounded text-xs ${t.status==="completed"?"bg-green-900/30 text-green-400":t.status==="pending"?"bg-yellow-900/30 text-yellow-400":"bg-red-900/30 text-red-400"}">
                        ${t.status}
                    </span>
                </td>
            </tr>
        `).join(""):'<tr><td colspan="6" class="text-center p-4 text-gray-500">No crypto transactions found</td></tr>';await o();async function H(t){t.preventDefault();const e=t.target,a=e.cryptoSelect.value,i=E[a],n=e.networkSelect.value,r=parseFloat(e.amount.value),x=e.txHash.value.trim();if(!i||!n||!r||!x){m("Please fill all fields","error");return}A.start();try{d.validateAmount(r,a);const w=await d.getRate(a),$=r*w,{error:k}=await b.from("transactions").insert({user_id:c.id,account_id:l.id,type:"crypto",method:"crypto",amount:$,description:`Crypto deposit: ${d.formatCryptoAmount(r,a)} ${a} via ${n}`,status:"pending",direction:"crypto-to-fiat",crypto_symbol:a,crypto_amount:r,fiat_amount:$,rate_at_transaction:w,wallet_address:i.addresses[n][0],tx_hash:x,balance_before:l?.balance||0,balance_after:l?.balance||0,created_at:new Date().toISOString()});if(k)throw k;m("Deposit submitted successfully","success"),e.reset(),window.location.reload()}catch(w){console.error(w),m(w.message||"Failed to submit deposit","error")}finally{A.stop()}}async function j(){const t=document.getElementById("fromAsset").value,e=document.getElementById("toAsset").value,a=parseFloat(document.getElementById("swapAmount").value)||0,i=document.getElementById("swapPreview");if(!t||!e||!a){i.innerHTML="";return}try{const n=await d.calculateSwap(t,e,a);i.innerHTML=`
                <div class="bg-gray-700 p-4 rounded-lg space-y-3">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Exchange Rate</span>
                        <span class="text-white">1 ${t} = ${n.exchangeRate.toFixed(8)} ${e}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">USD Value</span>
                        <span class="text-white">$${n.usdValue.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">Fee (1%)</span>
                        <span class="text-white">${d.formatCryptoAmount(n.fee,e)} ${e}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-400">You'll Receive</span>
                        <span class="text-green-500">${d.formatCryptoAmount(n.swappedAmount,e)} ${e}</span>
                    </div>
                </div>
            `}catch(n){i.innerHTML=`
                <div class="bg-red-900/30 text-red-400 p-4 rounded-lg">
                    ${n.message}
                </div>
            `}}function M(t,e){let a;return function(...n){const r=()=>{clearTimeout(a),t(...n)};clearTimeout(a),a=setTimeout(r,e)}}const D=M(j,500);async function I(t){t.preventDefault();const e=t.target,a=e.fromAsset.value,i=e.toAsset.value,n=parseFloat(e.amount.value);if(!a||!i||!n){m("Please fill all fields","error");return}A.start();try{d.validateAmount(n,a);const r=await d.calculateSwap(a,i,n),{error:x}=await b.from("transactions").insert({user_id:c.id,account_id:l.id,type:"crypto",method:"crypto",amount:r.usdValue,description:`Swap ${d.formatCryptoAmount(n,a)} ${a} to ${d.formatCryptoAmount(r.swappedAmount,i)} ${i}`,status:"pending",direction:"crypto-to-crypto",crypto_symbol:a,crypto_amount:n,to_crypto_symbol:i,to_crypto_amount:r.swappedAmount,from_rate:r.fromRate,to_rate:r.toRate,fee_amount:d.formatCryptoAmount(r.fee,i),fee_currency:i,exchange_rate:r.exchangeRate,balance_before:l?.balance||0,balance_after:l?.balance||0,created_at:new Date().toISOString()});if(x)throw x;m("Swap submitted successfully","success"),e.reset(),window.location.reload()}catch(r){console.error(r),m(r.message||"Failed to submit swap","error")}finally{A.stop()}}function O(t){const e=v[t.target.value],a=document.getElementById("networkSelect"),i=document.getElementById("addressDisplay");e?(a.innerHTML=`
                <option value="">Select Network</option>
                ${e.networks.map(n=>`
                    <option value="${n}">${n}</option>
                `).join("")}
            `,a.disabled=!1,i.innerHTML=""):(a.innerHTML='<option value="">Select Network</option>',a.disabled=!0,i.innerHTML="")}function N(t){const e=v[document.getElementById("cryptoSelect").value],a=t.target.value,i=document.getElementById("addressDisplay");if(e&&a){const n=e.addresses[a];i.innerHTML=`
                <div class="bg-gray-700 p-4 rounded-lg mt-4">
                    <div class="flex items-center gap-3 mb-4">
                        <img src="${e.logo}" alt="${e.symbol}" class="w-8 h-8">
                        <div>
                            <h3 class="font-medium text-white">${e.name}</h3>
                            <p class="text-sm text-gray-400">${a} Network</p>
                        </div>
                    </div>
                    ${n.map(r=>`
                        <div class="bg-gray-800 p-3 rounded-lg mb-2 flex items-center justify-between">
                            <code class="text-sm text-yellow-500 break-all">${r}</code>
                            <button type="button" class="p-2 hover:bg-gray-700 rounded-lg copy-btn" data-address="${r}">
                                <i class="fas fa-copy text-gray-400"></i>
                            </button>
                        </div>
                    `).join("")}
                    <div class="mt-4 text-yellow-500 text-sm flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Minimum deposit: ${e.minDeposit} ${e.symbol}</span>
                    </div>
                </div>
            `,setTimeout(()=>{document.querySelectorAll(".copy-btn").forEach(r=>{r.onclick=()=>{navigator.clipboard.writeText(r.getAttribute("data-address")),m("Wallet address copied!","success")}})},100)}else i.innerHTML=""}async function B(){const t=document.getElementById("cryptoSelect"),e=document.querySelector('input[name="amount"]'),a=document.getElementById("deposit-rate-display"),i=document.getElementById("deposit-crypto-amount");if(t.value&&e.value)try{const n=await T(t.value),r=await Z(e.value,t.value);a.textContent=`1 ${t.value} = $${n.toLocaleString()} USD`,i.textContent=`${r} ${t.value}`}catch(n){m("Error calculating rate: "+n.message,"error")}}function q(t){O(t),B()}function K(){B()}function G(){p.pageEvents?.(),document.getElementById("cryptoSelect")?.addEventListener("change",q),document.getElementById("networkSelect")?.addEventListener("change",N),document.getElementById("depositForm")?.addEventListener("submit",H),document.querySelector('input[name="amount"]')?.addEventListener("input",K),document.getElementById("fromAsset")?.addEventListener("change",()=>{D()}),document.getElementById("toAsset")?.addEventListener("change",()=>{D()}),document.getElementById("swapAmount")?.addEventListener("input",()=>{D()}),document.getElementById("swapForm")?.addEventListener("submit",I),setTimeout(()=>{document.querySelectorAll(".copy-btn").forEach(t=>{t.onclick=()=>{navigator.clipboard.writeText(t.getAttribute("data-address")),m("Wallet address copied!","success")}})},100)}return{html:`
            ${p.html}
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
                                        <h3 class="text-lg font-semibold text-white">${l?.account_number}</h3>
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
                                        <h3 class="text-lg font-semibold text-white">${S(l?.balance)}</h3>
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
                                            ${l?.is_active?"Active":"Inactive"}
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
                                            ${Object.values(v).map(t=>`
                                                <option value="${t.symbol}">${t.name} (${t.symbol})</option>
                                            `).join("")}
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
                                            ${Object.values(v).map(t=>`
                                                <option value="${t.symbol}">${t.name} (${t.symbol})</option>
                                            `).join("")}
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
                                            ${Object.values(v).map(t=>`
                                                <option value="${t.symbol}">${t.name} (${t.symbol})</option>
                                            `).join("")}
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
                                            ${U}
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
        `,pageEvents:G}};export{st as default};
