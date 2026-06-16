import{s as d}from"./supabaseClient-CL6H8VOx.js";import{A as L}from"./AdminNavbar-ObVEf85P.js";import{r as C}from"./adminAuth-Dn35BI8v.js";import{s as o}from"./toast-DRvdR0y9.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";const b="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2RicXlnc2Nkc3h4bHhmanh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ3MzEyOCwiZXhwIjoyMDc0MDQ5MTI4fQ.hgTFx1O5bbgwJvTJlY4xXG3DS7eh1m1QRReLoefSD0E",w="https://biyuydrbirwsbtnymakk.supabase.co",P=async r=>{if(!await C())return{html:"",pageEvents:()=>{}};const{data:c}=await d.from("profiles").select("*").eq("id",r).single(),{data:g}=await d.from("accounts").select("*").eq("user_id",r).single(),{data:x}=await d.from("kyc_requests").select("*").eq("user_id",r).order("created_at",{ascending:!1}).limit(1).single(),{data:y}=await d.from("transactions").select("*").eq("user_id",r).order("created_at",{ascending:!1}).limit(10);let p="users",f=!1,l=localStorage.getItem("admin_dark")==="true";function k(){return`
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <div class="flex items-center gap-4">
          <img src="${c?.avatar_url||"/default-user.png"}" class="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-slate-600" />
          <div>
            <div class="font-bold text-lg text-gray-900 dark:text-white">${c?.full_name||"Unknown"}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">${c?.email||""}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">${c?.phone||"-"}</div>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">Account Number</span>
            <span class="font-semibold text-gray-900 dark:text-white">${g?.account_number||"-"}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">Balance</span>
            <span class="font-semibold text-green-600 dark:text-green-400">$${g?.balance??"0.00"}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">Status</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${g?.is_active?"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200":"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}">${g?.is_active?"Active":"Inactive"}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">KYC</span>
            <span class="font-semibold text-gray-900 dark:text-white">${x?.status||"Not submitted"}</span>
            ${x?.created_at?`<span class="text-xs text-gray-400 block">${x.created_at?.slice(0,10)}</span>`:""}
          </div>
        </div>
      </div>
    `}function v(){return`
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mt-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-800">
              ${(y||[]).length?y.map(i=>`
                <tr class="hover:bg-gray-50 dark:hover:bg-slate-800">
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${i.created_at?.slice(0,16).replace("T"," ")}</td>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white capitalize">${i.type}</td>
                  <td class="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-white">$${parseFloat(i.amount||0).toLocaleString()}</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${i.status==="completed"?"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200":i.status==="pending"?"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200":"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}">${i.status}</span>
                  </td>
                </tr>
              `).join(""):`
                <tr>
                  <td colspan="4" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No transactions found</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `}function E(){return`
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mt-6">
        <h2 class="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Account Management</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Change user email or password. Changes take effect immediately. No confirmation email sent.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Change Email -->
          <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <i class="fas fa-envelope text-blue-600"></i> Change Email
            </h3>
            <form id="admin-change-email-form">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Current Email</label>
              <input type="email" value="${c?.email||""}" disabled class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 text-sm" />
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">New Email</label>
              <input type="email" name="new_email" placeholder="user@newemail.com" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              <div id="admin-email-feedback" class="text-xs mb-2 hidden"></div>
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <i class="fas fa-save mr-1"></i> Update Email
              </button>
            </form>
          </div>
          <!-- Change Password -->
          <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <i class="fas fa-lock text-green-600"></i> Change Password
            </h3>
            <form id="admin-change-password-form">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">New Password</label>
              <input type="password" name="new_password" placeholder="Min 6 characters" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" required minlength="6" />
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Confirm Password</label>
              <input type="password" name="confirm_password" placeholder="Re-enter new password" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <div id="admin-password-feedback" class="text-xs mb-2 hidden"></div>
              <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <i class="fas fa-save mr-1"></i> Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    `}function _(){return`
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mt-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Send Notification / Fund Account</h2>
        <form id="admin-action-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <input type="text" name="message" placeholder="Notification message to user" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fund Amount ($)</label>
            <input type="number" name="fund" placeholder="0.00" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="0" step="0.01" />
          </div>
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <i class="fas fa-paper-plane mr-1"></i> Send / Fund
          </button>
        </form>
      </div>
    `}function u(){document.getElementById("app").innerHTML=`
      ${L({activeItem:p,isCollapsed:f,isDark:l})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-6 lg:p-8">
          <div class="max-w-5xl mx-auto">
            <div class="flex items-center gap-3 mb-6">
              <a href="/admin/users" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-xl">
                <i class="fas fa-arrow-left"></i>
              </a>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">User Details</h1>
            </div>
            ${k()}
            ${E()}
            ${_()}
            ${v()}
          </div>
        </div>
      </div>
    `,document.getElementById("admin-sidebar");const i=document.getElementById("admin-sidebar-overlay"),$=document.getElementById("admin-sidebar-toggle"),S=document.getElementById("admin-sidebar-close");function I(){f=!1,u()}function h(){f=!0,u()}$?.addEventListener("click",I),S?.addEventListener("click",h),i?.addEventListener("click",h),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{l=!l,localStorage.setItem("admin_dark",l?"true":"false"),l?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),u()}),document.querySelectorAll("[data-nav]").forEach(n=>{n.addEventListener("click",s=>{s.preventDefault(),p=n.getAttribute("data-nav"),window.location.href=`/admin/${p}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),l?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),document.getElementById("admin-change-email-form").onsubmit=async function(n){n.preventDefault();const s=this.new_email,a=document.getElementById("admin-email-feedback"),e=s.value.trim();if(!e){o("Enter a new email address.","error");return}a.className="text-xs mb-2",a.classList.add("hidden"),this.querySelector("button[type=submit]").disabled=!0,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-spinner fa-spin mr-1"></i> Updating...';try{const t=await fetch(`${w}/auth/v1/admin/users/${r}`,{method:"PUT",headers:{apikey:b,Authorization:`Bearer ${b}`,"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(!t.ok){const m=await t.json();throw new Error(m.msg||m.error||"Failed to update email")}await d.from("profiles").update({email:e}).eq("id",r),o("Email updated successfully.","success"),window.location.reload()}catch(t){a.textContent="Error: "+t.message,a.classList.remove("hidden","text-green-600"),a.classList.add("text-red-600"),o(t.message,"error")}this.querySelector("button[type=submit]").disabled=!1,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-save mr-1"></i> Update Email'},document.getElementById("admin-change-password-form").onsubmit=async function(n){n.preventDefault();const s=this.new_password.value,a=this.confirm_password.value,e=document.getElementById("admin-password-feedback");if(s!==a){o("Passwords do not match.","error");return}if(s.length<6){o("Password must be at least 6 characters.","error");return}e.className="text-xs mb-2",e.classList.add("hidden"),this.querySelector("button[type=submit]").disabled=!0,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-spinner fa-spin mr-1"></i> Updating...';try{const t=await fetch(`${w}/auth/v1/admin/users/${r}`,{method:"PUT",headers:{apikey:b,Authorization:`Bearer ${b}`,"Content-Type":"application/json"},body:JSON.stringify({password:s})});if(!t.ok){const m=await t.json();throw new Error(m.msg||m.error||"Failed to update password")}o("Password updated successfully.","success"),this.new_password.value="",this.confirm_password.value="",e.textContent="Password changed successfully.",e.classList.remove("hidden","text-red-600"),e.classList.add("text-green-600")}catch(t){e.textContent="Error: "+t.message,e.classList.remove("hidden","text-green-600"),e.classList.add("text-red-600"),o(t.message,"error")}this.querySelector("button[type=submit]").disabled=!1,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-save mr-1"></i> Update Password'},document.getElementById("admin-action-form").onsubmit=async function(n){n.preventDefault();const s=this.message.value.trim(),a=parseFloat(this.fund.value);if(await d.from("notifications").insert([{user_id:r,title:"Admin Message",message:s,type:"info"}]),a>0){const{data:e}=await d.from("accounts").select("*").eq("user_id",r).single();if(e){const t=parseFloat(e.balance)+a;await d.from("accounts").update({balance:t}).eq("id",e.id),await d.from("transactions").insert([{account_id:e.id,user_id:r,type:"deposit",description:"Admin funding",amount:a,balance_before:e.balance,balance_after:t,status:"completed"}])}}o("Action completed.","success"),window.location.reload()}}return{html:"",pageEvents:()=>u()}};export{P as default};
