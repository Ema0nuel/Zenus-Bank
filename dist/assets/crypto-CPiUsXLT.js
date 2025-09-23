import{s as u}from"./supabaseClient-B1HaFb4P.js";import{n as x}from"./Navbar-DzFN-yR7.js";import{s as p}from"./toast-Dx2DSKhR.js";import{r as v}from"./reset-CYKpHJhn.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";const g=[{symbol:"BTC",name:"Bitcoin"},{symbol:"ETH",name:"Ethereum"},{symbol:"USDT",name:"Tether USD"},{symbol:"BNB",name:"Binance Coin"}],h=async()=>{try{const s=await(await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd")).json();return{BTC:s.bitcoin.usd,ETH:s.ethereum.usd,USDT:s.tether.usd,BNB:s.binancecoin.usd}}catch{return{}}},k=async()=>{const c=x();v("Zenus Bank | Crypto Transfer");const s=await u.auth.getSession();if(!s.data.session){window.location.href="/login";return}const{user:m}=s.data.session,{data:y}=await u.from("accounts").select("*").eq("user_id",m.id).single();let i=await h();function b(){c.pageEvents?.();const r=()=>{const l=document.getElementById("transfer-type").value,e=document.getElementById("crypto-symbol").value,t=parseFloat(document.getElementById("amount").value)||0,o=document.getElementById("crypto-preview");if(!e||!t){o.innerHTML="";return}let a="";l==="fiat-to-crypto"?a=`You will receive <b>${(t/i[e]).toFixed(8)} ${e}</b> for $${t}`:l==="crypto-to-fiat"&&(a=`You will receive <b>$${(t*i[e]).toFixed(2)}</b> for ${t} ${e}`),o.innerHTML=`<div class="p-3 bg-brand-black/10 rounded text-sm">${a}</div>`};document.getElementById("transfer-type").onchange=r,document.getElementById("crypto-symbol").onchange=r,document.getElementById("amount").oninput=r,document.getElementById("crypto-form").onsubmit=async function(l){l.preventDefault();const e=this["transfer-type"].value,t=this["crypto-symbol"].value,o=parseFloat(this.amount.value),a=this.wallet.value.trim();if(!t||!o||!a){p("All fields are required.","error");return}let n=0,d=0;e==="fiat-to-crypto"?(n=o,d=o/i[t]):(d=o,n=o*i[t]);const{error:f}=await u.from("transactions").insert([{user_id:m.id,account_id:y.id,type:"crypto",direction:e,crypto_symbol:t,crypto_amount:d,fiat_amount:n,wallet_address:a,status:"pending"}]);if(f){p("Failed to submit transaction.","error");return}p("Crypto transaction submitted and pending approval.","success"),setTimeout(()=>window.location.reload(),1200)}}return{html:`
        ${c.html}
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
                                    ${g.map(r=>`<option value="${r.symbol}">${r.name} (${r.symbol})</option>`).join("")}
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
        `,pageEvents:b}};export{k as default};
