import{s as l}from"./supabaseClient-B1HaFb4P.js";import{n as g}from"./Navbar-DiGZTYQT.js";import{s as i}from"./toast-DRvdR0y9.js";import{s as b}from"./sendEmail-89Z52C2k.js";import{r as h}from"./reset-CYKpHJhn.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";const E=async()=>{const p=g();h("Zenus Bank | PayPal Deposit");const c=await l.auth.getSession();if(!c.data.session){window.location.href="/login";return}const{user:n}=c.data.session,{data:o}=await l.from("profiles").select("*").eq("id",n.id).single(),{data:m}=await l.from("accounts").select("*").eq("user_id",n.id).single(),u=t=>typeof t=="number"?t.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):t||"$0.00";function f(){p.pageEvents?.();const t=document.getElementById("paypal-form");t&&(t.onsubmit=async function(r){r.preventDefault();const a=parseFloat(this.amount.value),d=this.desc.value.trim(),e=this.paypal_email.value.trim();if(a<200)return i("Minimum deposit is $200","error");if(!e)return i("PayPal email required.","error");const s=Math.floor(1e5+Math.random()*9e5).toString();window.__paypalOtp=s,await b({to:o.email,subject:"PayPal Deposit OTP Verification",html:`
                        <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                            <h2 style="color:#2563eb;">PayPal Deposit OTP Verification</h2>
                            <p>Hello <b>${o.full_name}</b>,</p>
                            <p>Your OTP for PayPal deposit of <b>${u(a)}</b> is:</p>
                            <div style="font-size:2rem;font-weight:bold;letter-spacing:4px;color:#16a34a;margin:16px 0;">${s}</div>
                            <p>For: <b>${d}</b></p>
                            <p>Account: <b>${m.account_number}</b></p>
                            <p style="color:#888;font-size:12px;">If you did not initiate this, please contact support immediately.</p>
                            <hr style="margin:16px 0;">
                            <div style="font-size:11px;color:#aaa;">Zenus Bank</div>
                        </div>
                    `}),x({amount:a,desc:d,paypalEmail:e,otp:s})})}function x({amount:t,desc:r,paypalEmail:a,otp:d}){let e=document.getElementById("paypal-otp-modal");e||(e=document.createElement("div"),e.id="paypal-otp-modal",document.body.appendChild(e)),e.innerHTML=`
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button id="close-paypal-otp-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
                    <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">PayPal Deposit OTP Verification</h4>
                    <div class="mb-2 text-xs text-gray-500 dark:text-gray-300">Enter the OTP sent to your email to confirm your PayPal deposit.</div>
                    <form id="paypal-otp-form" class="space-y-3">
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
        `,e.className="",document.getElementById("close-paypal-otp-modal").onclick=()=>{e.innerHTML="",e.className="hidden"},document.getElementById("paypal-otp-form").onsubmit=async function(s){if(s.preventDefault(),this.otp.value.trim()!==window.__paypalOtp){i("Invalid OTP!","error");return}const{error:y}=await l.from("transactions").insert([{account_id:m.id,user_id:n.id,type:"deposit",method:"paypal",amount:t,description:r,paypal_email:a,status:"pending"}]);if(y){i("PayPal deposit failed: "+y.message,"error");return}await b({to:o.email,subject:"PayPal Deposit Request Initiated",html:`
                    <div style="font-family:sans-serif;max-width:480px;margin:auto;background:#f9f9f9;padding:24px;border-radius:8px;">
                        <h2 style="color:#2563eb;">PayPal Deposit Request Initiated</h2>
                        <p>Hello <b>${o.full_name}</b>,</p>
                        <p>Your PayPal deposit request has been received:</p>
                        <ul style="margin:12px 0 16px 18px;padding:0;font-size:15px;">
                            <li><b>Amount:</b> ${u(t)}</li>
                            <li><b>Description:</b> ${r}</li>
                            <li><b>PayPal Email:</b> ${a}</li>
                            <li><b>Date/Time:</b> ${new Date().toLocaleString()}</li>
                        </ul>
                        <p style="color:#888;font-size:12px;">We will notify you once your deposit is confirmed.</p>
                        <hr style="margin:16px 0;">
                        <div style="font-size:11px;color:#aaa;">Zenus Bank</div>
                    </div>
                `}),i("PayPal deposit submitted and pending approval.","success"),e.innerHTML="",e.className="hidden",setTimeout(()=>window.location.reload(),1200)}}return{html:`
        ${p.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
            <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
                <div class="p-4 max-w-6xl mx-auto">
                    <nav class="flex items-center space-x-2 text-xs mb-4">
                        <i class="fa fa-home text-gray-500"></i>
                        <span class="text-gray-500">/</span>
                        <span class="text-gray-700 dark:text-gray-300">PayPal Deposit</span>
                    </nav>
                    <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fab fa-paypal mr-2"></i> PayPal Deposit</h3>
                        </div>
                        <form id="paypal-form" class="space-y-4">
                            <div>
                                <label class="block text-xs mb-1">Amount</label>
                                <input type="number" min="200" name="amount" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" placeholder="$500" required>
                            </div>
                            <div>
                                <label class="block text-xs mb-1">Description</label>
                                <textarea name="desc" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" placeholder="Description" required></textarea>
                            </div>
                            <div>
                                <label class="block text-xs mb-1">PayPal Email</label>
                                <input type="email" name="paypal_email" class="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:border-blue-500" placeholder="your@email.com" required>
                            </div>
                            <div class="flex gap-2">
                                <button type="submit" class="btn bg-blue-600 text-white px-4 py-1 rounded text-xs"><i class="fab fa-paypal"></i> Deposit via PayPal</button>
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
        `,pageEvents:f}};export{E as default};
