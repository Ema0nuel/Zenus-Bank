import{s as u}from"./supabaseClient-B1HaFb4P.js";import{n as T}from"./Navbar-DzFN-yR7.js";import{s as o}from"./toast-Dx2DSKhR.js";import{r as $}from"./reset-CYKpHJhn.js";import{N}from"./logo-nobg-BVMQOOtC.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";const I=["E9876567","G0876578","8767898H","K2387651","456L7890","1M234567","987654N3","O2345678","98765P43","Q1987654","R7654321","567S1234","T3456789","876543U1","V1234567","345678W9","X2345678","9Y876543","Z3456781","234567A8","B3456781","123456C7","D2345678","876E5432","5678F123","6789G123","7890H234","8901I345","9012J456","0123K567","K4561237","L5672348","M6783459","N7894560","O8905671","P9016782","Q0127893","R1238904","S2349015","T3450126","U4561237","V5672348","W6783459","X7894560","Y8905671","Z9016782","A0127893","B1238904","C2349015","D3450126","E4561237","F5672348","G6783459","H7894560","I8905671","J9016782","K0127893","L1238904","M2349015","N3450126","O4561237","P5672348","Q6783459","R7894560","S8905671","T9016782","U0127893","V1238904","W2349015","X3450126","Y4561237","Z5672348","A6783459","B7894560","C8905671","D9016782","E0127893","F1238904","G2349015","H3450126","I4561237","J5672348","K6783459","L7894560","M8905671","N9016782","O0127893","P1238904","Q2349015","R3450126","S4561237","T5672348","U6783459","V7894560","W8905671","X9016782","Y0127893","Z1238904","A2349015","B3450126","C4561237","D5672348","E6783459","F7894560","G8905671","H9016782","I0127893","J1238904","K2349015","L3450126","M4561237","N5672348","O6783459","P7894560","Q8905671","R9016782","S0127893","T1238904","U2349015","V3450126","W4561237","X5672348","Y6783459","Z7894560","A8905671","B9016782","C0127893","D1238904","E2349015","F3450126","G4561237","H5672348","I6783459","J7894560","K8905671","L9016782","M0127893","N1238904","O2349015","P3450126"];function B(){return Math.floor(1e5+Math.random()*9e5).toString()}async function P(){try{return await(await fetch("https://ipapi.co/json/")).json()}catch{return{}}}function y(a={}){const e={...{title:"Inter-Bank Transfer Receipt",receiptId:x(),date:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString(),amount:"0.00",currency:"$",description:"Inter-Bank Transfer",senderName:"",recipientName:"",bankName:"",accountNumber:"",transactionType:"Inter-Bank Transfer",status:"Pending",referenceNumber:"",fees:"0.00",totalAmount:"",companyName:"Zenus Bank",companyAddress:"123 Main St, City, Country",companyPhone:"+1 (555) 123-4567",companyEmail:"zenusbanking@gmail.com",additionalFields:{},showFooter:!0,footerText:"Thank you for banking with us!"},...a};if(!e.totalAmount){const r=parseFloat(e.amount)||0,n=parseFloat(e.fees)||0;e.totalAmount=(r+n).toFixed(2)}return`
    <div class="receipt-container font-mono">
      <div class="text-center mb-4">
        <img src="${N}" alt="Zenus Bank" class="h-10 mx-auto mb-2" />
        <h2 class="font-bold text-2xl text-gray-900 dark:text-white mb-1">${e.title}</h2>
        <div class="text-base text-gray-700 dark:text-gray-300">${e.companyName}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">${e.companyAddress}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">${e.companyPhone} | ${e.companyEmail}</div>
      </div>
      <div class="mb-4 border-b border-dashed border-gray-300 dark:border-gray-700 pb-3">
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Receipt ID:</span><span>${e.receiptId}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Date:</span><span>${e.date}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Time:</span><span>${e.time}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Type:</span><span>${e.transactionType}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="font-semibold">Status:</span>
          <span class="font-bold" style="color:${e.status==="Completed"?"#16a34a":e.status==="Pending"?"#f59e42":"#dc2626"};">
            ${e.status}
          </span>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-center text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Transaction Details</h3>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">From:</span><span>${e.senderName}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">To:</span><span>${e.recipientName}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Account:</span><span>${e.accountNumber}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Description:</span><span>${e.description}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="font-semibold">Reference:</span><span>${e.referenceNumber}</span>
        </div>
      </div>
      <div class="mb-4 border-t border-dashed border-gray-300 dark:border-gray-700 pt-3">
        <div class="flex justify-between text-sm mb-1">
          <span class="font-semibold">Amount:</span><span>${e.currency}${e.amount}</span>
        </div>
        ${parseFloat(e.fees)>0?`<div class="flex justify-between text-sm mb-1">
                  <span class="font-semibold">Fees:</span><span>${e.currency}${e.fees}</span>
                </div>`:""}
        <div class="flex justify-between text-base font-bold border-t border-gray-300 dark:border-gray-700 pt-2">
          <span>Total:</span><span>${e.currency}${e.totalAmount}</span>
        </div>
      </div>
      ${Object.keys(e.additionalFields).length>0?`<div class="mb-4 border-t border-dashed border-gray-300 dark:border-gray-700 pt-3">
                ${Object.entries(e.additionalFields).map(([r,n])=>`
                      <div class="flex justify-between text-xs mb-1">
                        <span class="font-semibold">${r}:</span><span>${n}</span>
                      </div>
                    `).join("")}
              </div>`:""}
      ${e.showFooter?`<div class="text-center mt-4 pt-3 border-t-2 border-dashed border-gray-300 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <div>${e.footerText}</div>
                <div class="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
                  This is an Zenus Bank-generated receipt
                </div>
              </div>`:""}
    </div>
    `}function x(){const a=Date.now().toString().slice(-6),c=Math.random().toString(36).substr(2,4).toUpperCase();return`RCP-${a}-${c}`}function g(a,c){let e=document.getElementById("code-modal");e||(e=document.createElement("div"),e.id="code-modal",document.body.appendChild(e)),e.className="",e.innerHTML=`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <button id="close-code-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
        <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">
          <i class="fa fa-key mr-2"></i>Enter ${a} Code
        </h4>
        <div class="mb-2 text-xs text-gray-500 dark:text-gray-300">
          Please enter your ${a} code to proceed.<br>
          <span class="text-red-500">Contact <a href="/contact" target="_blank" class="underline">Support</a> to get your code or chat with admin live.</span>
        </div>
        <form id="code-form" class="space-y-3">
          <input type="text" name="code" maxlength="12"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            placeholder="Enter ${a} Code" required />
          <button type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            <i class="fa fa-check"></i> Validate
          </button>
        </form>
      </div>
    </div>
  `,document.getElementById("close-code-modal").onclick=()=>{e.innerHTML="",e.className="hidden"},document.getElementById("code-form").onsubmit=async function(r){r.preventDefault();const n=this.code.value.trim();I.includes(n)?(e.innerHTML="",e.className="hidden",c()):o("Invalid code. Please contact support.","error")}}function A(){let a=document.getElementById("success-modal");a||(a=document.createElement("div"),a.id="success-modal",document.body.appendChild(a)),a.className="",a.innerHTML=`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-xs p-8 flex flex-col items-center relative">
        <canvas id="success-canvas" width="120" height="120" style="display:block;margin-bottom:16px;"></canvas>
        <h3 class="text-lg font-bold text-green-700 dark:text-green-400 mb-2">Transfer Successful!</h3>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2 text-center">Your transfer was made and is <b>awaiting Admin approval</b>.</p>
        <button id="close-success-modal" class="mt-4 px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Close</button>
      </div>
    </div>
    <style>
      #success-canvas { background: transparent; }
    </style>
  `;const e=document.getElementById("success-canvas").getContext("2d");let r=0;function n(){e.clearRect(0,0,120,120),e.lineWidth=6,e.strokeStyle="#16a34a",e.beginPath(),e.arc(60,60,48,Math.PI*.5,Math.PI*(2*r),!1),e.stroke(),r<1?(r+=.03,requestAnimationFrame(n)):(e.beginPath(),e.moveTo(40,65),e.lineTo(55,80),e.lineTo(85,45),e.strokeStyle="#16a34a",e.lineWidth=8,e.stroke())}n(),document.getElementById("close-success-modal").onclick=()=>{a.innerHTML="",a.className="hidden",window.location.reload()}}const O=async()=>{$("Zenus Bank | Inter-Bank Transfer");const a=T(),c=await u.auth.getSession();if(!c.data.session){window.location.href="/login";return}const{user:e}=c.data.session,{data:r}=await u.from("profiles").select("*").eq("id",e.id).single();let{data:n}=await u.from("accounts").select("*").eq("user_id",e.id).single();const f=b=>typeof b=="number"?b.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):b||"$0.00";function v(){a.pageEvents?.(),document.getElementById("interbank-transfer-form").onsubmit=async function(t){t.preventDefault();try{const s=parseFloat(this.amount.value),i=this.accountName.value.trim(),l=this.accountNum.value.trim(),d=this.desc.value.trim();if(!s||!i||!l||!d){o("All fields are required.","error");return}if(s<=0){o("Amount must be greater than zero.","error");return}if(s>n.balance){o("Insufficient balance.","error");return}o("Sending OTP...","info");const m=B(),p=await P(),{error:k}=await u.from("otps").insert([{user_id:e.id,code:m,type:"interbank",expires_at:new Date(Date.now()+10*6e4).toISOString()}]);if(k){o("Database error. Please try again.","error");return}b({amount:s,accountName:i,accountNum:l,desc:d,profile:r,account:n,otp:m,ipLoc:p}),fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:e.email,subject:"Your OTP for Inter-Bank Transfer",html:`
              <h2>Inter-Bank Transfer OTP</h2>
              <p>Your OTP is: <b>${m}</b></p>
              <p>IP: ${p.ip||"N/A"}<br>
              Location: ${p.city||""}, ${p.region||""}, ${p.country_name||""}<br>
              Date: ${new Date().toLocaleString()}</p>
              <hr>
              <h3>Transaction Details</h3>
              <ul>
                <li>Amount: ${f(s)}</li>
                <li>Sender: ${r.full_name}</li>
                <li>Beneficiary: ${i}</li>
                <li>Account Number: ${l}</li>
                <li>Description: ${d}</li>
              </ul>
            `})}).then(w=>{w.ok?o("OTP sent to your email.","success"):o("OTP email failed, but you can still enter the code.","warning")}).catch(()=>{o("OTP email failed, but you can still enter the code.","warning")})}catch{o("An error occurred. Please try again.","error")}};function b(t){let s=document.getElementById("otp-modal");s||(s=document.createElement("div"),s.id="otp-modal",document.body.appendChild(s)),s.className="",s.innerHTML=`
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <button id="close-otp-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
            <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">
              <i class="fa fa-lock mr-2"></i>Enter OTP
            </h4>
            <div class="mb-2 text-xs text-gray-500 dark:text-gray-300">
              Check your email for the OTP code.
            </div>
            <form id="otp-form" class="space-y-3">
              <input type="text" name="otp" maxlength="6" 
                class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" 
                placeholder="Enter OTP" required />
              <button type="submit" 
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                <i class="fa fa-check"></i> Verify
              </button>
            </form>
          </div>
        </div>
      `,document.getElementById("close-otp-modal").onclick=()=>{s.innerHTML="",s.className="hidden"},document.getElementById("otp-form").onsubmit=async function(i){i.preventDefault();const l=this.otp.value.trim(),{data:d,error:m}=await u.from("otps").select("*").eq("user_id",t.profile.id).eq("code",l).eq("type","interbank").order("created_at",{ascending:!1}).limit(1).single();if(m||!d||new Date(d.expires_at)<new Date){o("Invalid or expired OTP.","error");return}h(t)}}function h(t){let s=document.getElementById("otp-modal");s.className="",s.innerHTML=`
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div class="receipt-modal-content bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-2 p-0 relative overflow-auto" style="max-height:90vh;">
            <button id="close-receipt-modal" class="absolute top-3 right-4 text-gray-400 hover:text-red-500 dark:hover:text-white text-2xl font-bold z-10" aria-label="Close">&times;</button>
            <div class="p-6">
              ${y({id:x(),date:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString(),amount:t.amount,currency:"$",description:t.desc,senderName:t.profile.full_name,recipientName:t.accountName,accountNumber:t.accountNum,transactionType:"Inter-Bank Transfer",status:"Pending",referenceNumber:t.accountNum,fees:"0.00",totalAmount:t.amount,additionalFields:{IP:t.ipLoc.ip||"N/A",Location:`${t.ipLoc.city||""}, ${t.ipLoc.region||""}, ${t.ipLoc.country_name||""}`}})}
              <div class="mt-6 flex flex-col gap-2 justify-center">
                <button id="complete-interbank-btn" class="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition font-semibold">
                  Complete Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="code-modal" class="hidden"></div>
        <style>
          .receipt-modal-content::-webkit-scrollbar { width: 8px; background: transparent; }
          .receipt-modal-content::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
          .dark .receipt-modal-content::-webkit-scrollbar-thumb { background: #334155; }
          .receipt-container {
            background: repeating-linear-gradient(135deg, #f8fafc 0px, #e0e7ef 80%, #f8fafc 100%);
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.10);
            padding: 0;
          }
          .dark .receipt-container {
            background: linear-gradient(135deg, #1e293b 0px, #334155 80%, #1e293b 100%);
            box-shadow: 0 4px 24px rgba(0,0,0,0.40);
          }
        </style>
      `,document.getElementById("close-receipt-modal").onclick=()=>{s.innerHTML="",s.className="hidden"},document.getElementById("complete-interbank-btn").onclick=()=>{g("IMF",()=>{g("COT",()=>{g("VAT",async()=>{A();try{const i=parseFloat(t.amount),l=parseFloat(t.account.balance),d=l-i;await u.from("accounts").update({balance:d}).eq("id",t.account.id);const{data:m,error:p}=await u.from("transactions").insert([{account_id:t.account.id,user_id:t.profile.id,type:"interbank",description:t.desc,amount:i,balance_before:l,balance_after:d,status:"pending"}]).select().single();await u.from("notifications").insert([{user_id:t.profile.id,title:"Inter-Bank Transfer Initiated",message:`Your inter-bank transfer of ${f(t.amount)} to ${t.accountName} is awaiting admin approval.`,type:"info",read:!1}]),fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:t.profile.email,subject:"Inter-Bank Transfer Receipt",html:y({amount:t.amount,senderName:t.profile.full_name,recipientName:t.accountName,accountNumber:t.accountNum,description:t.desc,fees:"0.00",status:"Pending",referenceNumber:m?.id||x(),companyName:"Zenus Bank",companyAddress:"123 Main St, City, Country",companyPhone:"+1 (555) 123-4567",companyEmail:"zenusbanking@gmail.com"})})})}catch{o("Failed to process transaction. Please try again.","error")}})})})}}}return{html:`
      <div class="relative">
        ${a.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
          <div id="main-content" class="ml-14 md:ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
            <div class="p-4">
              <div class="mb-4">
                <nav class="flex items-center space-x-2 text-xs">
                  <i class="fa fa-home text-gray-500 text-xs"></i>
                  <span class="text-gray-500">/</span>
                  <span class="text-gray-700 dark:text-gray-300">Inter-Bank Transfer</span>
                </nav>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="p-4 rounded bg-green-100 dark:bg-green-900 transition-all hover:shadow text-xs">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-semibold text-green-800 dark:text-green-300">${f(n?.balance)}</h3>
                      <p class="text-xs text-green-600 dark:text-green-400 font-normal">Account Balance</p>
                    </div>
                    <div class="p-2 rounded-full bg-green-200 dark:bg-green-800">
                      <i class="fa fa-briefcase text-green-700 dark:text-green-300 text-sm"></i>
                    </div>
                  </div>
                </div>
                <div class="p-4 rounded bg-blue-100 dark:bg-blue-900 transition-all hover:shadow text-xs">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-semibold text-blue-800 dark:text-blue-300">${n?.is_active?"Active":"Inactive"}</h3>
                      <p class="text-xs text-blue-600 dark:text-blue-400 font-normal">Account Status</p>
                    </div>
                    <div class="p-2 rounded-full bg-blue-200 dark:bg-blue-800">
                      <i class="fa fa-refresh text-blue-700 dark:text-blue-300 text-sm"></i>
                    </div>
                  </div>
                </div>
                <div class="p-4 rounded bg-orange-100 dark:bg-orange-900 transition-all hover:shadow text-xs">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-semibold text-orange-800 dark:text-orange-300">${n?.account_type||"USD SAVING"}</h3>
                      <p class="text-xs text-orange-600 dark:text-orange-400 font-normal">Account Type</p>
                    </div>
                    <div class="p-2 rounded-full bg-orange-200 dark:bg-orange-800">
                      <i class="fa fa-star text-orange-700 dark:text-orange-300 text-sm"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-6 rounded bg-white dark:bg-gray-800 shadow-sm">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"><i class="fa fa-bank mr-2"></i> Inter-Bank Fund Transfer</h3>
                  <form id="interbank-transfer-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs font-semibold mb-1">Amount</label>
                        <div class="relative">
                          <input type="number" name="amount" id="amount" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Amount" required min="1" step="0.01" />
                          <span class="absolute right-3 top-2.5 text-gray-400"><i class="fa fa-money"></i></span>
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs font-semibold mb-1">Account Holder</label>
                        <div class="relative">
                          <input type="text" name="accountName" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Beneficiary Account Name" required />
                          <span class="absolute right-3 top-2.5 text-gray-400"><i class="fa fa-user"></i></span>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-1">
                      <div>
                        <label class="block text-xs font-semibold mb-1">Account Number</label>
                        <div class="relative">
                          <input type="text" name="accountNum" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Beneficiary Account Number" required />
                          <span class="absolute right-3 top-2.5 text-gray-400"><i class="fa fa-briefcase"></i></span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1">Description</label>
                      <div class="relative">
                        <textarea name="desc" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Description" required></textarea>
                        <span class="absolute right-3 top-2.5 text-gray-400"><i class="fa fa-envelope"></i></span>
                      </div>
                    </div>
                    <div class="flex space-x-2">
                      <button type="submit" class="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"><i class="fa fa-money"></i> Transfer</button>
                      <button type="reset" class="btn btn-default bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"><i class="fa fa-refresh"></i> Clear</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <footer class="p-4 text-center text-gray-600 dark:text-gray-400 text-xs">
              <p>
                <strong>Copyright © ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.
              </p>
            </footer>
          </div>
        </div>
      </div>
      <div id="otp-modal" class="hidden"></div>
      <div id="success-modal" class="hidden"></div>
    `,pageEvents:v}};export{O as default};
