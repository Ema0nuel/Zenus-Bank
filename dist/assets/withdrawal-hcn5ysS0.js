import{s as n}from"./supabaseClient-CL6H8VOx.js";import{n as _}from"./Navbar-DMGlxEFS.js";import{s as l}from"./toast-DRvdR0y9.js";import{s as w}from"./sendEmail-89Z52C2k.js";import{r as T}from"./reset-CYKpHJhn.js";import"./logo-yCyWWFG1.js";const I=async()=>{const g=_();T("Zenus Bank | Withdrawal");const v=await n.auth.getSession();if(!v.data.session){window.location.href="/login";return}const{user:d}=v.data.session,{data:c}=await n.from("profiles").select("*").eq("id",d.id).single(),{data:i}=await n.from("accounts").select("*").eq("user_id",d.id).single(),o=t=>typeof t=="number"?t.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):t||"$0.00";async function y(t,s,a="info"){await n.from("notifications").insert([{user_id:d.id,title:t,message:s,type:a,read:!1}])}function k(){g.pageEvents?.();const t=document.getElementById("withdrawal-form");t&&(t.onsubmit=async function(s){s.preventDefault();const a=parseFloat(this.amount.value),u=this.desc.value.trim(),p=this.bank.value.trim(),b=this.account_number.value.trim(),f=this.account_name.value.trim(),x=this.type.value;if(a<200)return l("Minimum withdrawal is $200","error");if(!p||!b||!f)return l("All bank details required.","error");const m=i.balance||0,e=m-a,r=Math.floor(1e5+Math.random()*9e5).toString();window.__withdrawOtp=r,await w({to:c.email,subject:"Withdrawal OTP Verification",html:`
                        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                            <h2 style="color:#2563eb;">Withdrawal OTP Verification</h2>
                            <p>Hello <b>${c.full_name}</b>,</p>
                            <p>Your OTP for withdrawal of <b>${o(a)}</b> is:</p>
                            <div style="font-size:2rem;font-weight:bold;letter-spacing:4px;color:#16a34a;margin:16px 0;">${r}</div>
                            <p>For: <b>${u}</b></p>
                            <p>Account: <b>${i.account_number}</b></p>
                            <p style="color:#888;font-size:12px;">If you did not initiate this, please contact support immediately.</p>
                            <hr style="margin:16px 0;">
                            <div style="font-size:11px;color:#aaa;">Zenus Bank</div>
                        </div>
                    `}),await y("Withdrawal OTP Verification",`Your OTP for withdrawal of ${o(a)} is: ${r}`,"info"),$({amount:a,desc:u,bank:p,accNum:b,accName:f,type:x,otp:r,balance_before:m,balance_after:e})})}function $({amount:t,desc:s,bank:a,accNum:u,accName:p,type:b,otp:f,balance_before:x,balance_after:m}){let e=document.getElementById("withdrawal-otp-modal");e||(e=document.createElement("div"),e.id="withdrawal-otp-modal",document.body.appendChild(e)),e.innerHTML=`
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button id="close-otp-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
                    <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">Withdrawal OTP Verification</h4>
                    <div class="mb-2 text-xs text-gray-500 dark:text-gray-300">Enter the OTP sent to your email to confirm your withdrawal.</div>
                    <form id="otp-form" class="space-y-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1 font-semibold">OTP</label>
                            <input type="text" name="otp" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" maxlength="6" required>
                        </div>
                        <div class="flex justify-end gap-2 pt-2">
                            <button type="submit" class="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold"><i class="fa fa-check"></i> Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        `,e.className="",document.getElementById("close-otp-modal").onclick=()=>{e.innerHTML="",e.className="hidden"},document.getElementById("otp-form").onsubmit=async function(r){if(r.preventDefault(),this.otp.value.trim()!==window.__withdrawOtp){l("Invalid OTP!","error");return}const{error:h}=await n.from("transactions").insert([{account_id:i.id,user_id:d.id,type:"withdrawal",amount:t,description:s,balance_before:x,balance_after:m,status:"pending"}]);if(h){l("Withdrawal failed: "+h.message,"error");return}await w({to:c.email,subject:"Withdrawal Request Initiated",html:`
                    <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                        <h2 style="color:#2563eb;">Withdrawal Request Initiated</h2>
                        <p>Hello <b>${c.full_name}</b>,</p>
                        <p>Your withdrawal request has been received:</p>
                        <ul style="margin:12px 0 16px 18px;padding:0;font-size:15px;">
                            <li><b>Amount:</b> ${o(t)}</li>
                            <li><b>Description:</b> ${s}</li>
                            <li><b>Bank:</b> ${a}</li>
                            <li><b>Account Number:</b> ${u}</li>
                            <li><b>Account Name:</b> ${p}</li>
                            <li><b>Type:</b> ${b}</li>
                            <li><b>Date/Time:</b> ${new Date().toLocaleString()}</li>
                        </ul>
                        <p style="color:#888;font-size:12px;">We will notify you once your withdrawal is confirmed.</p>
                        <hr style="margin:16px 0;">
                        <div style="font-size:11px;color:#aaa;">Zenus Bank</div>
                    </div>
                `}),await y("Withdrawal Request Initiated",`Your withdrawal request of ${o(t)} has been received and is pending approval, contact our customer support on the website to complete any pending transaction.`,"info"),l("Withdrawal submitted, Contact Support to complete the transaction ","warning"),e.innerHTML="",e.className="hidden",setTimeout(()=>window.location.href="/account-summary",2e3)}}return{html:`
        ${g.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
            <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
                <div class="p-4 max-w-6xl mx-auto">
                    <nav class="flex items-center space-x-2 text-xs mb-4">
                        <i class="fa fa-home text-gray-500"></i>
                        <span class="text-gray-500">/</span>
                        <span class="text-gray-700 dark:text-gray-300">Withdrawal</span>
                    </nav>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <div class="bg-green-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-briefcase text-green-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-green-800">${o(i?.balance)}</div>
                                <div class="text-[10px] text-green-600">Account Balance</div>
                            </div>
                        </div>
                        <div class="bg-blue-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-refresh text-blue-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-blue-800">${i?.is_active?"Active":"Inactive"}</div>
                                <div class="text-[10px] text-blue-600">Account Status</div>
                            </div>
                        </div>
                        <div class="bg-orange-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-star text-orange-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-orange-800">${i?.account_type||"-"}</div>
                                <div class="text-[10px] text-orange-600">Account Type</div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-bank mr-2"></i> Withdrawal</h3>
                        </div>
                        <form id="withdrawal-form" class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-xs mb-1">Amount</label>
                                    <div class="relative">
                                        <input type="number" min="200" name="amount" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" placeholder="$500" required>
                                        <span class="absolute right-2 top-2 text-gray-400"><i class="fa fa-money"></i></span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-xs mb-1">Description</label>
                                    <div class="relative">
                                        <textarea name="desc" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" placeholder="Description" required></textarea>
                                        <span class="absolute right-2 top-2 text-gray-400"><i class="fa fa-envelope"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-xs mb-1">Bank</label>
                                    <input type="text" name="bank" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" required>
                                </div>
                                <div>
                                    <label class="block text-xs mb-1">Account Number</label>
                                    <input type="text" name="account_number" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" required>
                                </div>
                                <div>
                                    <label class="block text-xs mb-1">Account Name</label>
                                    <input type="text" name="account_name" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" required>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs mb-1">Account Type</label>
                                <select name="type" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" required>
                                    <option value="local">Local Account</option>
                                    <option value="foreign">Foreign Account</option>
                                </select>
                            </div>
                            <div class="flex gap-2">
                                <button type="submit" class="btn bg-blue-600 text-white px-4 py-1 rounded text-xs"><i class="fa fa-donate"></i> Withdraw</button>
                                <button type="reset" class="btn bg-gray-200 text-gray-700 px-4 py-1 rounded text-xs"><i class="fa fa-refresh"></i> Refresh</button>
                            </div>
                        </form>
                    </div>
                </div>
                <footer class="p-4 text-center text-gray-600 dark:text-gray-400 text-xs">
                    <p>
                        <strong>Copyright � ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.
                    </p>
                </footer>
            </div>
        </div>
        `,pageEvents:k}};export{I as default};
