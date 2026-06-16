import{s as o}from"./supabaseClient-CL6H8VOx.js";import{n as D}from"./Navbar-Bss5hsHn.js";import{s as x}from"./toast-DRvdR0y9.js";import{s as E}from"./sendEmail-89Z52C2k.js";import{r as P}from"./reset-CYKpHJhn.js";import{Q as $}from"./browser-PKbp9UYK.js";import"./logo-yCyWWFG1.js";const S={VISA:{icon:"fab fa-cc-visa",name:"Visa"},MASTERCARD:{icon:"fab fa-cc-mastercard",name:"Mastercard"},APPLEPAY:{icon:"fab fa-apple-pay",name:"Apple Pay"},GOOGLEPAY:{icon:"fab fa-google-pay",name:"Google Pay"}},j=async()=>{const c=D();P("Zenus Bank | Deposit");const p=await o.auth.getSession();if(!p.data.session){window.location.href="/login";return}const{user:n}=p.data.session,{data:m}=await o.from("profiles").select("*").eq("id",n.id).single(),{data:a}=await o.from("accounts").select("*").eq("user_id",n.id).single(),d=e=>typeof e=="number"?e.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):e||"$0.00",f=await $.toDataURL("https://tr.ee/W44goH");let t={USD:1,EUR:.92,GBP:.78,JPY:157.2};function g(){setInterval(()=>{t.EUR=+(.9+Math.random()*.04).toFixed(4),t.GBP=+(.76+Math.random()*.04).toFixed(4),t.JPY=+(155+Math.random()*5).toFixed(2),document.querySelectorAll(".js-rate").forEach(e=>{const s=e.dataset.cur;e.textContent=t[s]})},4e3)}async function y(e,s,i="info"){await o.from("notifications").insert([{user_id:n.id,title:e,message:s,type:i,read:!1}])}function v(){c.pageEvents?.(),g();const e=document.getElementById("direct-pay-btn");e&&(e.onclick=()=>{window.open("https://tr.ee/W44goH","_blank")});const s=document.getElementById("deposit-form");s&&(s.onsubmit=async i=>{i.preventDefault();const r=parseFloat(i.target.amount.value),u=i.target.desc.value.trim();if(r<200){x("Minimum deposit amount is $200","error");return}const b=a.balance||0,k=b+r,{error:w}=await o.from("transactions").insert([{account_id:a.id,user_id:n.id,type:"deposit",amount:r,description:u,balance_before:b,balance_after:k,status:"pending"}]);if(w){x("Failed to record transaction","error");return}try{await E({to:[m.email,"zenusbanking@gmail.com"],subject:"Deposit Request Initiated",html:`
                            <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                                <h2 style="color:#2563eb;">Deposit Request Initiated</h2>
                                <p>Hello <b>${m.full_name}</b>,</p>
                                <p>Your deposit request has been received:</p>
                                <ul style="margin:12px 0 16px 18px;padding:0;font-size:15px;">
                                    <li><b>Amount:</b> ${d(r)}</li>
                                    <li><b>Description:</b> ${u}</li>
                                    <li><b>Account:</b> ${a.account_number}</li>
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
                        `})}catch(l){console.error("Email send failed:",l)}try{await y("Deposit Request Initiated",`Your deposit request of ${d(r)} has been received and is pending approval.`,"info")}catch(l){console.error("Notification send failed:",l)}h(),window.open("https://tr.ee/W44goH","_blank")})}function h(){let e=document.getElementById("deposit-success-modal");e||(e=document.createElement("div"),e.id="deposit-success-modal",document.body.appendChild(e)),e.innerHTML=`
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 text-center">
                    <div class="mb-4">
                        <i class="fa fa-clock text-amber-500 text-4xl animate-spin"></i>
                    </div>
                    <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Deposit Pending</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Your deposit has been recorded and is pending approval. You will receive a confirmation email shortly.</p>
                    <button id="close-success-modal" class="px-6 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 font-semibold">
                        <i class="fa fa-check mr-2"></i> Done
                    </button>
                </div>
            </div>
        `,e.className="",document.getElementById("close-success-modal").onclick=()=>{e.innerHTML="",e.className="hidden",setTimeout(()=>window.location.reload(),800)}}return{html:`
        ${c.html}
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
                                <div class="text-xs font-semibold text-green-800">${d(a?.balance)}</div>
                                <div class="text-[10px] text-green-600">Account Balance</div>
                            </div>
                        </div>
                        <div class="bg-blue-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-refresh text-blue-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-blue-800">${a?.is_active?"Active":"Inactive"}</div>
                                <div class="text-[10px] text-blue-600">Account Status</div>
                            </div>
                        </div>
                        <div class="bg-orange-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-star text-orange-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-orange-800">${a?.account_type||"-"}</div>
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
                                <div>USD/EUR: <span class="js-rate font-semibold" data-cur="EUR">${t.EUR}</span></div>
                                <div>USD/GBP: <span class="js-rate font-semibold" data-cur="GBP">${t.GBP}</span></div>
                                <div>USD/JPY: <span class="js-rate font-semibold" data-cur="JPY">${t.JPY}</span></div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- QR Code Section -->
                            <div class="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-900">
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Payment Link QR Code</p>
                                <img src="${f}" alt="Payment QR" class="w-40 h-40 border-2 border-gray-300 p-1 rounded">
                                <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-3 text-center">Scan to open payment link</p>
                                <button id="direct-pay-btn" type="button" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 font-semibold">
                                    <i class="fa fa-external-link mr-1"></i> Open Payment Link
                                </button>
                                <div class="mt-4 text-xs text-gray-600 dark:text-gray-400">
                                    <p class="font-semibold mb-2">Accepted Methods</p>
                                    <div class="flex gap-2 justify-center flex-wrap">
                                        ${Object.values(S).map(e=>`<div class="flex items-center gap-1"><i class="${e.icon}"></i> <span>${e.name}</span></div>`).join("")}
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
                                        <div class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Minimum: $200</div>
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
        `,pageEvents:()=>{v()}}};export{j as default};
