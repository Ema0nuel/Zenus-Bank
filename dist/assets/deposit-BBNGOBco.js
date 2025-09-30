import{s}from"./supabaseClient-B1HaFb4P.js";import{n as O}from"./Navbar-DiGZTYQT.js";import{s as o}from"./toast-DRvdR0y9.js";import{s as _}from"./sendEmail-89Z52C2k.js";import{r as S}from"./reset-CYKpHJhn.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";const L=async()=>{const h=O();S("Zenus Bank | Deposit");const w=await s.auth.getSession();if(!w.data.session){window.location.href="/login";return}const{user:l}=w.data.session,{data:f}=await s.from("profiles").select("*").eq("id",l.id).single(),{data:r}=await s.from("accounts").select("*").eq("user_id",l.id).single(),p=e=>typeof e=="number"?e.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):e||"$0.00";let n={USD:1,EUR:.92,GBP:.78,JPY:157.2};function E(){setInterval(()=>{n.EUR=+(.9+Math.random()*.04).toFixed(4),n.GBP=+(.76+Math.random()*.04).toFixed(4),n.JPY=+(155+Math.random()*5).toFixed(2),document.querySelectorAll(".js-rate").forEach(e=>{const i=e.dataset.cur;e.textContent=n[i]})},4e3)}async function D(e,i,u="info"){await s.from("notifications").insert([{user_id:l.id,title:e,message:i,type:u,read:!1}])}function P(){h.pageEvents?.(),E();const e=document.getElementById("gift-image"),i=document.getElementById("gift-preview");e&&(e.onchange=m=>{const a=m.target.files[0];a&&i&&(i.src=URL.createObjectURL(a),i.classList.remove("hidden"))});const u=document.getElementById("deposit-form");u&&(u.onsubmit=async function(m){m.preventDefault();const a=parseFloat(this.amount.value),x=this.desc.value.trim(),b=this.method.value;let c=null,t=null;if(a<200)return o("Minimum deposit is $200","error");const g=r.balance||0,k=g+a;if(b==="gift"){t=this.coupon_code.value.trim();const v=this.gift_image.files[0];if(!v||!t)return o("Gift card image and code required.","error");const U=`${l.id}/${Date.now()}_${v.name}`,{data:y,error:T}=await s.storage.from("gift-cards").upload(U,v,{upsert:!0});if(T||!y||!y.path){o("Failed to upload gift card image.","error");return}const{data:I}=s.storage.from("gift-cards").getPublicUrl(y.path);if(c=I?.publicUrl,!c){o("Failed to get gift card image URL.","error");return}const{error:$}=await s.from("gift_card_deposits").insert([{user_id:l.id,image_url:c,coupon_code:t,amount:a,status:"pending"}]);if($){o("Gift card deposit failed: "+$.message,"error");return}}const d=Math.floor(1e5+Math.random()*9e5).toString();window.__depositOtp=d,await _({to:f.email,subject:"Deposit OTP Verification",html:`
                        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                            <h2 style="color:#2563eb;">Deposit OTP Verification</h2>
                            <p>Hello <b>${f.full_name}</b>,</p>
                            <p>Your OTP for deposit of <b>${p(a)}</b> is:</p>
                            <div style="font-size:2rem;font-weight:bold;letter-spacing:4px;color:#16a34a;margin:16px 0;">${d}</div>
                            <p>For: <b>${x}</b></p>
                            <p>Account: <b>${r.account_number}</b></p>
                            <p style="color:#888;font-size:12px;">If you did not initiate this, please contact support immediately.</p>
                            <hr style="margin:16px 0;">
                            <div style="font-size:11px;color:#aaa;">Zenus Bank</div>
                        </div>
                    `}),await D("Deposit OTP Verification",`Your OTP for deposit of ${p(a)} is: ${d}`,"info"),B({amount:a,desc:x,method:b,imageUrl:c,couponCode:t,otp:d,balance_before:g,balance_after:k})})}function B({amount:e,desc:i,method:u,imageUrl:m,couponCode:a,otp:x,balance_before:b,balance_after:c}){let t=document.getElementById("deposit-otp-modal");t||(t=document.createElement("div"),t.id="deposit-otp-modal",document.body.appendChild(t)),t.innerHTML=`
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button id="close-otp-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
                    <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">Deposit OTP Verification</h4>
                    <div class="mb-2 text-xs text-gray-500 dark:text-gray-300">Enter the OTP sent to your email to confirm your deposit.</div>
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
        `,t.className="",document.getElementById("close-otp-modal").onclick=()=>{t.innerHTML="",t.className="hidden"},document.getElementById("otp-form").onsubmit=async function(g){if(g.preventDefault(),this.otp.value.trim()!==window.__depositOtp){o("Invalid OTP!","error");return}const{error:d}=await s.from("transactions").insert([{account_id:r.id,user_id:l.id,type:"deposit",amount:e,description:i,balance_before:b,balance_after:c,status:"pending"}]);if(d){o("Deposit failed: "+d.message,"error");return}await _({to:f.email,subject:"Deposit Request Initiated",html:`
                    <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                        <h2 style="color:#2563eb;">Deposit Request Initiated</h2>
                        <p>Hello <b>${f.full_name}</b>,</p>
                        <p>Your deposit request has been received:</p>
                        <ul style="margin:12px 0 16px 18px;padding:0;font-size:15px;">
                            <li><b>Amount:</b> ${p(e)}</li>
                            <li><b>Description:</b> ${i}</li>
                            <li><b>Account:</b> ${r.account_number}</li>
                            <li><b>Date/Time:</b> ${new Date().toLocaleString()}</li>
                        </ul>
                        <p style="color:#888;font-size:12px;">We will notify you once your deposit is confirmed.</p>
                        <hr style="margin:16px 0;">
                        <div style="font-size:11px;color:#aaa;">Zenus Bank</div>
                    </div>
                `}),await D("Deposit Request Initiated",`Your deposit request of ${p(e)} has been received and is pending approval.`,"info"),o("Deposit submitted and pending approval.","success"),t.innerHTML="",t.className="hidden",setTimeout(()=>window.location.reload(),1200)}}return{html:`
        ${h.html}
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
                                <div class="text-xs font-semibold text-green-800">${p(r?.balance)}</div>
                                <div class="text-[10px] text-green-600">Account Balance</div>
                            </div>
                        </div>
                        <div class="bg-blue-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-refresh text-blue-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-blue-800">${r?.is_active?"Active":"Inactive"}</div>
                                <div class="text-[10px] text-blue-600">Account Status</div>
                            </div>
                        </div>
                        <div class="bg-orange-100 rounded px-4 py-2 flex items-center gap-2">
                            <i class="fa fa-star text-orange-700"></i>
                            <div>
                                <div class="text-xs font-semibold text-orange-800">${r?.account_type||"-"}</div>
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
                                <div>USD/EUR: <span class="js-rate font-semibold" data-cur="EUR">${n.EUR}</span></div>
                                <div>USD/GBP: <span class="js-rate font-semibold" data-cur="GBP">${n.GBP}</span></div>
                                <div>USD/JPY: <span class="js-rate font-semibold" data-cur="JPY">${n.JPY}</span></div>
                            </div>
                        </div>
                        <form id="deposit-form" class="space-y-4">
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
                            <div>
                                <label class="block text-xs mb-1">Deposit Method</label>
                                <select name="method" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" required>
                                    <option value="bank">Bank Transfer</option>
                                    <option value="gift">Gift Card Coupon</option>
                                </select>
                            </div>
                            <div id="gift-card-section" class="hidden">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs mb-1">Gift Card Image</label>
                                        <input type="file" id="gift-image" name="gift_image" accept="image/*" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500">
                                        <img id="gift-preview" class="hidden mt-2 rounded w-32 h-20 object-cover border" />
                                    </div>
                                    <div>
                                        <label class="block text-xs mb-1">Coupon Code</label>
                                        <input type="text" name="coupon_code" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" maxlength="50">
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button type="submit" class="btn bg-blue-600 text-white px-4 py-1 rounded text-xs"><i class="fa fa-money"></i> Deposit</button>
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
        `,pageEvents:()=>{P();const e=document.querySelector('select[name="method"]'),i=document.getElementById("gift-card-section");e&&i&&(e.onchange=()=>{i.classList.toggle("hidden",e.value!=="gift")})}}};export{L as default};
