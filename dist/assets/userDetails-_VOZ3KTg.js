import{s as n}from"./supabaseClient-CL6H8VOx.js";import{A as f}from"./AdminNavbar-ObVEf85P.js";import{r as h}from"./adminAuth-Dn35BI8v.js";import{s as r}from"./toast-DRvdR0y9.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";const c="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2RicXlnc2Nkc3h4bHhmanh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ3MzEyOCwiZXhwIjoyMDc0MDQ5MTI4fQ.hgTFx1O5bbgwJvTJlY4xXG3DS7eh1m1QRReLoefSD0E",b="https://biyuydrbirwsbtnymakk.supabase.co",E=async s=>{if(!await h())return;const{data:o}=await n.from("profiles").select("*").eq("id",s).single(),{data:m}=await n.from("accounts").select("*").eq("user_id",s).single(),{data:u}=await n.from("kyc_requests").select("*").eq("user_id",s).order("created_at",{ascending:!1}).limit(1).single(),{data:p}=await n.from("transactions").select("*").eq("user_id",s).order("created_at",{ascending:!1}).limit(10);return{html:`
      ${f("users")}
      <div class="pt-20 px-8">
        <h1 class="text-xl font-bold mb-4">User Details</h1>
        <div class="bg-white rounded shadow p-4 mb-4">
          <div class="flex items-center gap-4">
            <img src="${o.avatar_url||"/default-user.png"}" class="w-16 h-16 rounded-full border" />
            <div>
              <div class="font-bold">${o.full_name}</div>
              <div class="text-xs text-gray-500">${o.email}</div>
              <div class="text-xs">${o.phone||"-"}</div>
            </div>
          </div>
          <div class="mt-4">
            <div><b>Account Number:</b> ${m?.account_number||"-"}</div>
            <div><b>Balance:</b> $${m?.balance??"0.00"}</div>
            <div><b>Status:</b> ${m?.is_active?"Active":"Inactive"}</div>
          </div>
        </div>
        <div class="bg-white rounded shadow p-4 mb-4">
          <h2 class="font-semibold mb-2">KYC Status</h2>
          <div>${u?.status||"Not submitted"}</div>
          <div class="text-xs text-gray-500">${u?.created_at||""}</div>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h2 class="font-semibold mb-2">Recent Transactions</h2>
          <table class="min-w-full text-xs">
            <thead>
              <tr>
                <th>Date</th><th>Type</th><th>Amount</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${(p||[]).map(i=>`
                <tr>
                  <td>${i.created_at?.slice(0,16).replace("T"," ")}</td>
                  <td>${i.type}</td>
                  <td>$${i.amount}</td>
                  <td>${i.status}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <!-- Account Management -->
        <div class="bg-white rounded shadow p-4 mt-4">
          <h2 class="font-semibold mb-2">Account Management</h2>
          <p class="text-xs text-gray-500 mb-3">Change user email or password. Changes take effect immediately. No confirmation email sent.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Change Email -->
            <div>
              <h3 class="text-sm font-semibold mb-2 flex items-center gap-1">
                <i class="fas fa-envelope text-blue-600"></i> Change Email
              </h3>
              <form id="admin-change-email-form">
                <label class="block text-xs mb-1">Current Email</label>
                <input type="email" value="${o.email}" disabled class="border rounded px-2 py-1 w-full mb-2 bg-gray-100 dark:bg-slate-700 text-sm" />
                <label class="block text-xs mb-1">New Email</label>
                <input type="email" name="new_email" placeholder="user@newemail.com" class="border rounded px-2 py-1 w-full mb-2 text-sm" required />
                <div id="admin-email-feedback" class="text-xs mb-2 hidden"></div>
                <button type="submit" class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm transition-colors">
                  <i class="fas fa-save mr-1"></i> Update Email
                </button>
              </form>
            </div>
            <!-- Change Password -->
            <div>
              <h3 class="text-sm font-semibold mb-2 flex items-center gap-1">
                <i class="fas fa-lock text-green-600"></i> Change Password
              </h3>
              <form id="admin-change-password-form">
                <label class="block text-xs mb-1">New Password</label>
                <input type="password" name="new_password" placeholder="Min 6 characters" class="border rounded px-2 py-1 w-full mb-2 text-sm" required minlength="6" />
                <label class="block text-xs mb-1">Confirm Password</label>
                <input type="password" name="confirm_password" placeholder="Re-enter new password" class="border rounded px-2 py-1 w-full mb-2 text-sm" required />
                <div id="admin-password-feedback" class="text-xs mb-2 hidden"></div>
                <button type="submit" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm transition-colors">
                  <i class="fas fa-save mr-1"></i> Update Password
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="bg-white rounded shadow p-4 mt-4">
          <h2 class="font-semibold mb-2">Send Notification / Fund Account</h2>
          <form id="admin-action-form" class="space-y-2">
            <input type="hidden" name="user_id" value="${s}" />
            <label>Message</label>
            <input type="text" name="message" class="border rounded px-2 py-1 w-full" required />
            <label>Fund Amount ($)</label>
            <input type="number" name="fund" class="border rounded px-2 py-1 w-full" min="0" step="0.01" />
            <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded">Send / Fund</button>
          </form>
        </div>
      </div>
    `,pageEvents:()=>{document.getElementById("admin-change-email-form").onsubmit=async function(i){i.preventDefault();const d=this.new_email,a=document.getElementById("admin-email-feedback"),e=d.value.trim();if(!e){r("Enter a new email address.","error");return}a.className="text-xs mb-2",a.classList.add("hidden"),this.querySelector("button[type=submit]").disabled=!0,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-spinner fa-spin mr-1"></i> Updating...';try{const t=await fetch(`${b}/auth/v1/admin/users/${s}`,{method:"PUT",headers:{apikey:c,Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(!t.ok){const l=await t.json();throw new Error(l.msg||l.error||"Failed to update email")}await n.from("profiles").update({email:e}).eq("id",s),r("Email updated successfully.","success"),window.location.reload()}catch(t){a.textContent="Error: "+t.message,a.classList.remove("hidden","text-green-600"),a.classList.add("text-red-600"),r(t.message,"error")}this.querySelector("button[type=submit]").disabled=!1,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-save mr-1"></i> Update Email'},document.getElementById("admin-change-password-form").onsubmit=async function(i){i.preventDefault();const d=this.new_password.value,a=this.confirm_password.value,e=document.getElementById("admin-password-feedback");if(d!==a){r("Passwords do not match.","error");return}if(d.length<6){r("Password must be at least 6 characters.","error");return}e.className="text-xs mb-2",e.classList.add("hidden"),this.querySelector("button[type=submit]").disabled=!0,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-spinner fa-spin mr-1"></i> Updating...';try{const t=await fetch(`${b}/auth/v1/admin/users/${s}`,{method:"PUT",headers:{apikey:c,Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify({password:d})});if(!t.ok){const l=await t.json();throw new Error(l.msg||l.error||"Failed to update password")}r("Password updated successfully.","success"),this.new_password.value="",this.confirm_password.value="",e.textContent="Password changed successfully.",e.classList.remove("hidden","text-red-600"),e.classList.add("text-green-600")}catch(t){e.textContent="Error: "+t.message,e.classList.remove("hidden","text-green-600"),e.classList.add("text-red-600"),r(t.message,"error")}this.querySelector("button[type=submit]").disabled=!1,this.querySelector("button[type=submit]").innerHTML='<i class="fas fa-save mr-1"></i> Update Password'},document.getElementById("admin-action-form").onsubmit=async function(i){i.preventDefault();const d=this.message.value.trim(),a=parseFloat(this.fund.value);if(await n.from("notifications").insert([{user_id:s,title:"Admin Message",message:d,type:"info"}]),a>0){const{data:e}=await n.from("accounts").select("*").eq("user_id",s).single();if(e){const t=parseFloat(e.balance)+a;await n.from("accounts").update({balance:t}).eq("id",e.id),await n.from("transactions").insert([{account_id:e.id,user_id:s,type:"deposit",description:"Admin funding",amount:a,balance_before:e.balance,balance_after:t,status:"completed"}])}}r("Action completed.","success"),window.location.reload()}}}};export{E as default};
