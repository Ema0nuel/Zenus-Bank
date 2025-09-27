import{s as d}from"./supabaseClient-B1HaFb4P.js";import{n as H}from"./Navbar-CwWpEmJu.js";import{s as i}from"./toast-Dx2DSKhR.js";import{r as P}from"./reset-CYKpHJhn.js";import{s as y}from"./spinner-KTJn75tI.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";const M="/assets/btc-Z8n5mdFU.png",I="/assets/eth-DxLoo2KM.png",x="/assets/bnb-DEkEK04Y.png",U="/assets/sol-C-K0-JsS.png",p={BTC:{name:"Bitcoin",symbol:"BTC",networks:["BTC"],addresses:{BTC:["1P2xvf43ragZWBKRacXVLsHb7Q6nqGqYis","bc1q02e9fsglke2pymcsfgs7shqmcwn0a0acuex7hu"]},minDeposit:.001,logo:M},ETH:{name:"Ethereum",symbol:"ETH",networks:["ETH"],addresses:{ETH:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"]},minDeposit:.01,logo:I},SOL:{name:"Solana",symbol:"SOL",networks:["SOL"],addresses:{SOL:["CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2","DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe"]},minDeposit:.1,logo:U},USDC:{name:"USD Coin",symbol:"USDC",networks:["ERC20","BEP20"],addresses:{ERC20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"],BEP20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36"]},minDeposit:10,logo:x},USDT:{name:"Tether USD",symbol:"USDT",networks:["TRC20","ERC20","SOL"],addresses:{TRC20:["TJUg7dQcUD8CLzh8kU8hegr6inmYFrTXnb","TXnXtYTjj6QoaZeMKcTMPS5JZvK3hCcHLo"],ERC20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"],SOL:["CkMpPKkjPc9QaboNxDZFHGcBzjDtUCzL2ESWaVGDw3i2","DtxfHCWDfiivNJPmnY8g6PRgJMAkcsMCLWTgK7GKmEEe"]},minDeposit:10,logo:x},BNB:{name:"Binance Coin",symbol:"BNB",networks:["BEP20"],addresses:{BEP20:["0xe0f4f3bbb7dc16d8da05dba50924a10a03ff4b36","0x88122Ac589A8b5a98e5FFE0c24117FB746A41DA8"]},minDeposit:.1,logo:x}},Y=async()=>{P("Zenus Bank | Crypto Transfer");const v=H();async function g(){try{const t=await(await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,usd-coin,tether,binancecoin&vs_currencies=usd")).json();return{BTC:t.bitcoin.usd,ETH:t.ethereum.usd,SOL:t.solana.usd,USDC:t["usd-coin"].usd,USDT:t.tether.usd,BNB:t.binancecoin.usd}}catch{return i("Failed to fetch prices","error"),{BTC:0,ETH:0,SOL:0,USDC:1,USDT:1,BNB:0}}}const w=await d.auth.getSession();if(!w.data.session){window.location.href="/login";return}const{user:m}=w.data.session,[A,E,D]=await Promise.all([d.from("profiles").select("*").eq("id",m.id).single(),d.from("accounts").select("*").eq("user_id",m.id).single(),d.from("transactions").select("*").eq("user_id",m.id).eq("method","crypto").order("created_at",{ascending:!1}).limit(5)]);A.data;const r=E.data,h=D.data,S=e=>typeof e=="number"?e.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):e||"$0.00",$=(e,t)=>`${parseFloat(e).toFixed(8)} ${t}`,T=h?.length?h.map(e=>`
            <tr class="border-b border-gray-700">
                <td class="p-2 text-xs">${e.created_at?.slice(0,16).replace("T"," ")}</td>
                <td class="p-2 text-xs">${e.direction}</td>
                <td class="p-2 text-xs">${e.crypto_symbol}</td>
                <td class="p-2 text-xs">${$(e.crypto_amount,e.crypto_symbol)}</td>
                <td class="p-2 text-xs">${S(e.fiat_amount)}</td>
                <td class="p-2 text-xs">
                    <span class="px-2 py-1 rounded text-xs ${e.status==="completed"?"bg-green-900/30 text-green-400":e.status==="pending"?"bg-yellow-900/30 text-yellow-400":"bg-red-900/30 text-red-400"}">
                        ${e.status}
                    </span>
                </td>
            </tr>
        `).join(""):'<tr><td colspan="6" class="text-center p-4 text-gray-500">No crypto transactions found</td></tr>';let c=await g();async function B(e){e.preventDefault();const t=e.target,s=p[t.cryptoSelect.value],o=t.networkSelect.value,a=parseFloat(t.amount.value),n=t.txHash.value.trim();if(!s||!o||!a||!n){i("Please fill all fields","error");return}if(a<s.minDeposit){i(`Minimum deposit is ${s.minDeposit} ${s.symbol}`,"error");return}y.start();try{const l=a*c[s.symbol],{error:u}=await d.from("transactions").insert({user_id:m.id,account_id:r.id,type:"crypto",method:"crypto",amount:l,description:`Crypto deposit: ${a} ${s.symbol} via ${o}`,status:"pending",direction:"crypto-to-fiat",crypto_symbol:s.symbol,crypto_amount:a,fiat_amount:l,wallet_address:s.addresses[o][0],tx_hash:n,balance_before:r?.balance||0,balance_after:r?.balance||0,created_at:new Date().toISOString()});if(u)throw u;i("Deposit submitted successfully","success"),t.reset(),window.location.reload()}catch(l){console.error(l),i("Failed to submit deposit","error")}finally{y.stop()}}async function k(){c=await g(),f()}async function C(){c=await g(),f()}async function f(){const e=document.getElementById("fromAsset").value,t=document.getElementById("toAsset").value,s=parseFloat(document.getElementById("swapAmount").value)||0,o=document.getElementById("swapPreview");if(!e||!t||!s){o.innerHTML="";return}const a=c[t]/c[e],n=s*a*.99,l=s*.01;o.innerHTML=`
            <div class="bg-gray-700 p-4 rounded-lg space-y-3">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Exchange Rate</span>
                    <span class="text-white">1 ${e} = ${a.toFixed(8)} ${t}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Fee (1%)</span>
                    <span class="text-white">${l.toFixed(8)} ${e}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">You'll Receive</span>
                    <span class="text-green-500">${n.toFixed(8)} ${t}</span>
                </div>
            </div>
        `}async function F(e){e.preventDefault();const t=e.target,s=t.fromAsset.value,o=t.toAsset.value,a=parseFloat(t.amount.value);if(!s||!o||!a){i("Please fill all fields","error");return}const n=c[o]/c[s],l=a*n*.99,u=a*c[s];y.start();try{const{error:b}=await d.from("transactions").insert({user_id:m.id,account_id:r.id,type:"crypto",method:"crypto",amount:u,description:`Swap ${a} ${s} to ${l.toFixed(8)} ${o}`,status:"pending",direction:"crypto-to-crypto",crypto_symbol:s,crypto_amount:a,to_crypto_symbol:o,to_crypto_amount:l,balance_before:r?.balance||0,balance_after:r?.balance||0,created_at:new Date().toISOString()});if(b)throw b;i("Swap submitted successfully","success"),t.reset(),window.location.reload()}catch(b){console.error(b),i("Failed to submit swap","error")}finally{y.stop()}}function L(e){const t=p[e.target.value],s=document.getElementById("networkSelect"),o=document.getElementById("addressDisplay");t?(s.innerHTML=`
                <option value="">Select Network</option>
                ${t.networks.map(a=>`
                    <option value="${a}">${a}</option>
                `).join("")}
            `,s.disabled=!1,o.innerHTML=""):(s.innerHTML='<option value="">Select Network</option>',s.disabled=!0,o.innerHTML="")}function _(e){const t=p[document.getElementById("cryptoSelect").value],s=e.target.value,o=document.getElementById("addressDisplay");if(t&&s){const a=t.addresses[s];o.innerHTML=`
                <div class="bg-gray-700 p-4 rounded-lg mt-4">
                    <div class="flex items-center gap-3 mb-4">
                        <img src="${t.logo}" alt="${t.symbol}" class="w-8 h-8">
                        <div>
                            <h3 class="font-medium text-white">${t.name}</h3>
                            <p class="text-sm text-gray-400">${s} Network</p>
                        </div>
                    </div>
                    ${a.map(n=>`
                        <div class="bg-gray-800 p-3 rounded-lg mb-2 flex items-center justify-between">
                            <code class="text-sm text-yellow-500 break-all">${n}</code>
                            <button type="button" class="p-2 hover:bg-gray-700 rounded-lg copy-btn" data-address="${n}">
                                <i class="fas fa-copy text-gray-400"></i>
                            </button>
                        </div>
                    `).join("")}
                    <div class="mt-4 text-yellow-500 text-sm flex items-center gap-2">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Minimum deposit: ${t.minDeposit} ${t.symbol}</span>
                    </div>
                </div>
            `,setTimeout(()=>{document.querySelectorAll(".copy-btn").forEach(n=>{n.onclick=()=>{navigator.clipboard.writeText(n.getAttribute("data-address")),i("Wallet address copied!","success")}})},100)}else o.innerHTML=""}function j(){v.pageEvents?.(),document.getElementById("cryptoSelect")?.addEventListener("change",L),document.getElementById("networkSelect")?.addEventListener("change",_),document.getElementById("depositForm")?.addEventListener("submit",B),document.getElementById("fromAsset")?.addEventListener("change",k),document.getElementById("toAsset")?.addEventListener("change",C),document.getElementById("swapAmount")?.addEventListener("input",f),document.getElementById("swapForm")?.addEventListener("submit",F)}return{html:`
            ${v.html}
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
                                        <h3 class="text-lg font-semibold text-white">${r?.account_number}</h3>
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
                                        <h3 class="text-lg font-semibold text-white">${S(r?.balance)}</h3>
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
                                            ${r?.is_active?"Active":"Inactive"}
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
                                            ${Object.values(p).map(e=>`
                                                <option value="${e.symbol}">${e.name} (${e.symbol})</option>
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
                                            ${Object.values(p).map(e=>`
                                                <option value="${e.symbol}">${e.name} (${e.symbol})</option>
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
                                            ${Object.values(p).map(e=>`
                                                <option value="${e.symbol}">${e.name} (${e.symbol})</option>
                                            `).join("")}
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
                                            ${T}
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
        `,pageEvents:j}};export{Y as default};
