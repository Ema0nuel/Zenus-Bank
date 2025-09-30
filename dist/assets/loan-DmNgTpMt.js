import{s as o}from"./supabaseClient-B1HaFb4P.js";import{n as D}from"./Navbar-DiGZTYQT.js";import{s as n}from"./toast-DRvdR0y9.js";import{r as R}from"./reset-CYKpHJhn.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";function y(a){if(!a)return"";const t=new Date(a);return`${t.getMonth()+1}/${t.getFullYear().toString().slice(-2)}`}function S(){return(Math.random()*4+6).toFixed(2)}function B(a){const t=new Date;return t.setMonth(t.getMonth()+a),t.toISOString().slice(0,10)}const Y=async()=>{R("Zenus Bank | Loan");const a=D(),t=await o.auth.getSession();if(!t.data.session){window.location.href="/login";return}const{user:r}=t.data.session,{data:m}=await o.from("profiles").select("*").eq("id",r.id).single();let{data:h}=await o.from("accounts").select("*").eq("user_id",r.id).single(),{data:x}=await o.from("loan").select("*").eq("user_id",r.id).order("created_at",{ascending:!1});const v=(x||[]).length?x.map(e=>`
      <tr class="hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer">
        <td class="px-2 py-1 text-xs">${e.amount}</td>
        <td class="px-2 py-1 text-xs">${e.interest_rate}%</td>
        <td class="px-2 py-1 text-xs">${e.status}</td>
        <td class="px-2 py-1 text-xs">${y(e.created_at)}</td>
        <td class="px-2 py-1 text-xs">${y(e.due_date)}</td>
        <td class="px-2 py-1 text-xs">${e.repaid_amount||0}</td>
      </tr>
    `).join(""):'<tr><td colspan="6" class="text-center text-gray-400 dark:text-gray-500 py-2 text-xs">No loan requests yet.</td></tr>';function w(){a.pageEvents?.();const e=document.getElementById("loan-request-form"),u=document.getElementById("loan-spinner"),c=document.getElementById("loan-status-msg"),q=document.getElementById("loan-amount"),$=document.getElementById("loan-reason"),k=document.getElementById("loan-duration");e.onsubmit=async function(L){L.preventDefault();const s=parseFloat(q.value),f=$.value.trim(),p=parseInt(k.value,10);if(!s||s<100){n("Enter a valid loan amount (min $100).","error");return}if(!f){n("Enter a reason for the loan.","error");return}if(!p){n("Select a loan duration.","error");return}let g="";const i=document.createElement("div");i.innerHTML=`
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-xs p-6 relative">
            <button id="close-loan-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
            <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white"><i class="fa fa-lock mr-2"></i>Confirm Password</h4>
            <form id="loan-password-form" class="space-y-3">
              <input type="password" name="password" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Enter your password" required />
              <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"><i class="fa fa-check"></i> Confirm</button>
            </form>
          </div>
        </div>
      `,document.body.appendChild(i),document.getElementById("close-loan-modal").onclick=()=>{i.remove()},document.getElementById("loan-password-form").onsubmit=async function(E){if(E.preventDefault(),g=this.password.value,!g){n("Password required.","error"),i.remove();return}i.remove(),u.classList.remove("hidden"),c.textContent="Processing loan request...",setTimeout(async()=>{const d=Math.random()>.2,l=d?"pending":"rejected",b=S(),I=B(p),{data:j,error:_}=await o.from("loan").insert([{user_id:r.id,account_id:h.id,amount:s,interest_rate:b,status:l,due_date:I,repaid_amount:0}]).select().single();if(_){n("Failed to submit loan request.","error"),u.classList.add("hidden"),c.textContent="";return}await o.from("notifications").insert([{user_id:r.id,title:"Loan Request Submitted",message:`Your loan request of $${s} is ${l==="pending"?"pending approval":"rejected"}.`,type:l==="pending"?"info":"danger",read:!1}]),fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:m.email,subject:"Loan Request Status",html:`
                <h2>Your Loan Request</h2>
                <p>Dear ${m.full_name},</p>
                <p>Your loan request of <b>$${s}</b> for <b>${f}</b> is <b>${l}</b>.</p>
                <ul>
                  <li>Amount: $${s}</li>
                  <li>Interest Rate: ${b}%</li>
                  <li>Duration: ${p} months</li>
                  <li>Status: ${l}</li>
                </ul>
                <p>We will notify you once your loan is approved and disbursed.</p>
                <br>
                <b>Zenus Bank</b>
              `})}),u.classList.add("hidden"),c.textContent=d?"Loan request submitted! Awaiting approval.":"Loan request rejected. Try again later.",n(d?"Loan request submitted! Awaiting approval.":"Loan request rejected.",d?"success":"error"),setTimeout(()=>window.location.reload(),2e3)},1800)}}}return{html:`
      <div class="relative">
        ${a.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
          <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
            <div class="p-4">
              <div class="mb-4">
                <nav class="flex items-center space-x-2 text-xs">
                  <i class="fa fa-home text-gray-500 text-xs"></i>
                  <span class="text-gray-500">/</span>
                  <span class="text-gray-700 dark:text-gray-300">Loan</span>
                </nav>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"><i class="fa fa-landmark mr-2"></i> Request a Loan</h3>
                  <form id="loan-request-form" class="space-y-4">
                    <div>
                      <label class="block text-xs font-semibold mb-1">Loan Amount</label>
                      <input type="number" id="loan-amount" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Enter amount (min $100)" min="100" required />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1">Purpose / Reason</label>
                      <input type="text" id="loan-reason" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="E.g. Home Renovation" required />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1">Loan Duration</label>
                      <select id="loan-duration" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" required>
                        <option value="">Select Duration</option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="24">24 months</option>
                      </select>
                    </div>
                    <div class="flex space-x-2">
                      <button type="submit" class="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"><i class="fa fa-money"></i> Request Loan</button>
                    </div>
                    <div id="loan-spinner" class="hidden flex items-center space-x-2 mt-2">
                      <span class="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-600"></span>
                      <span class="text-xs text-gray-600 dark:text-gray-300">Processing...</span>
                    </div>
                    <div id="loan-status-msg" class="text-xs text-gray-600 dark:text-gray-300 mt-2"></div>
                  </form>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"><i class="fa fa-list mr-2"></i> Your Loan Requests</h3>
                  <div class="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
                    <table class="min-w-full text-xs">
                      <thead>
                        <tr class="bg-blue-100 dark:bg-blue-900/30">
                          <th class="px-2 py-1 text-left">Amount</th>
                          <th class="px-2 py-1 text-left">Interest</th>
                          <th class="px-2 py-1 text-left">Status</th>
                          <th class="px-2 py-1 text-left">Requested</th>
                          <th class="px-2 py-1 text-left">Due</th>
                          <th class="px-2 py-1 text-left">Repaid</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${v}
                      </tbody>
                    </table>
                  </div>
                  <div class="text-xs text-gray-400 mt-2">Loan requests are subject to approval. Status will update automatically.</div>
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
      </div>
    `,pageEvents:w}};export{Y as default};
