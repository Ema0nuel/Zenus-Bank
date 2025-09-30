import{s}from"./supabaseClient-B1HaFb4P.js";import{A as B}from"./AdminNavbar-DXVtneOk.js";import{r as T}from"./adminAuth-Dn35BI8v.js";import{s as r}from"./toast-DRvdR0y9.js";import{s as h}from"./sendEmail-89Z52C2k.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";const I="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2RicXlnc2Nkc3h4bHhmanh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ3MzEyOCwiZXhwIjoyMDc0MDQ5MTI4fQ.hgTFx1O5bbgwJvTJlY4xXG3DS7eh1m1QRReLoefSD0E",L="https://ifodbqygscdsxxlxfjxw.supabase.co";async function F(l){return(await fetch(`${L}/auth/v1/admin/users/${l}`,{method:"DELETE",headers:{apikey:I,Authorization:`Bearer ${I}`,"Content-Type":"application/json"}})).ok}function w(){return`<div class="flex justify-center items-center py-16 animate-fade-in">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>`}function E(l){if(!l)return"";const t=new Date(l);return t.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function f(l){return l==="active"||l===!0?'<span title="Active" class="text-green-600 text-lg">?</span>':l==="suspended"||l===!1?'<span title="Suspended" class="text-red-600 text-lg">?</span>':'<span title="Pending" class="text-yellow-600 text-lg">?</span>'}function S({mode:l,user:t={}}){return`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in" style="backdrop-filter: blur(2px)">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto p-6 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-user-form">&times;</button>
        <h2 class="text-xl font-bold mb-4">${l==="edit"?"Edit":"Create"} User Profile</h2>
        <form id="user-form">
          <input type="hidden" name="id" value="${t.id||""}">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs mb-1">Full Name</label>
              <input type="text" name="full_name" class="w-full border px-2 py-1 rounded" value="${t.full_name||""}" required>
            </div>
            <div>
              <label class="block text-xs mb-1">Title</label>
              <input type="text" name="title" class="w-full border px-2 py-1 rounded" value="${t.title||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">First Name</label>
              <input type="text" name="firstname" class="w-full border px-2 py-1 rounded" value="${t.firstname||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Last Name</label>
              <input type="text" name="lastname" class="w-full border px-2 py-1 rounded" value="${t.lastname||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Phone</label>
              <input type="text" name="phone" class="w-full border px-2 py-1 rounded" value="${t.phone||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Country Code</label>
              <input type="text" name="country_code" class="w-full border px-2 py-1 rounded" value="${t.country_code||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Nationality</label>
              <input type="text" name="nationality" class="w-full border px-2 py-1 rounded" value="${t.nationality||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Address</label>
              <input type="text" name="address" class="w-full border px-2 py-1 rounded" value="${t.address||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">City</label>
              <input type="text" name="city" class="w-full border px-2 py-1 rounded" value="${t.city||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">State</label>
              <input type="text" name="state" class="w-full border px-2 py-1 rounded" value="${t.state||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Zip</label>
              <input type="text" name="zip" class="w-full border px-2 py-1 rounded" value="${t.zip||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">DOB</label>
              <input type="date" name="dob" class="w-full border px-2 py-1 rounded" value="${t.dob||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Occupation</label>
              <input type="text" name="occupation" class="w-full border px-2 py-1 rounded" value="${t.occupation||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">SSN</label>
              <input type="text" name="ssn" class="w-full border px-2 py-1 rounded" value="${t.ssn||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Marital Status</label>
              <input type="text" name="marital_status" class="w-full border px-2 py-1 rounded" value="${t.marital_status||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Gender</label>
              <select name="gender" class="w-full border px-2 py-1 rounded">
                <option value="">Select</option>
                <option value="Male" ${t.gender==="Male"?"selected":""}>Male</option>
                <option value="Female" ${t.gender==="Female"?"selected":""}>Female</option>
                <option value="Other" ${t.gender==="Other"?"selected":""}>Other</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1">Account Type</label>
              <select name="account_type" class="w-full border px-2 py-1 rounded">
                <option value="">Select</option>
                <option value="USD SAVING" ${t.account_type==="USD SAVING"?"selected":""}>USD SAVING</option>
                <option value="USD CURRENT" ${t.account_type==="USD CURRENT"?"selected":""}>USD CURRENT</option>
                <option value="MONEY MARKET" ${t.account_type==="MONEY MARKET"?"selected":""}>MONEY MARKET</option>
                <option value="IRA" ${t.account_type==="IRA"?"selected":""}>IRA</option>
                <option value="INVESTMENT ACCOUNT" ${t.account_type==="INVESTMENT ACCOUNT"?"selected":""}>INVESTMENT ACCOUNT</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1">Status</label>
              <select name="is_active" class="w-full border px-2 py-1 rounded">
                <option value="true" ${t.is_active?"selected":""}>Active</option>
                <option value="false" ${t.is_active===!1?"selected":""}>Suspended</option>
              </select>
            </div>
            ${l==="create"?`
            <div class="md:col-span-2">
              <label class="block text-xs mb-1">Email</label>
              <input type="email" name="email" class="w-full border px-2 py-1 rounded" required>
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs mb-1">Password</label>
              <input type="password" name="password" class="w-full border px-2 py-1 rounded" required>
            </div>
            `:`
            <div class="md:col-span-2">
              <label class="block text-xs mb-1">Email</label>
              <input type="email" name="email" class="w-full border px-2 py-1 rounded bg-gray-100 dark:bg-slate-800" value="${t.email||""}" disabled>
            </div>
            `}
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs mb-1">Fiat Balance</label>
            <input type="number" name="balance" step="0.01" class="w-full border px-2 py-1 rounded" value="${t.balance||0}">
          </div>
          <div class="md:col-span-2">
            <h3 class="text-sm font-bold mb-2">Crypto Balances</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs mb-1">BTC Balance</label>
                <input type="number" name="btc_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${t.btc_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">ETH Balance</label>
                <input type="number" name="eth_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${t.eth_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">USDT Balance</label>
                <input type="number" name="usdt_balance" step="0.000001" class="w-full border px-2 py-1 rounded" value="${t.usdt_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">USDC Balance</label>
                <input type="number" name="usdc_balance" step="0.000001" class="w-full border px-2 py-1 rounded" value="${t.usdc_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">BNB Balance</label>
                <input type="number" name="bnb_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${t.bnb_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">SOL Balance</label>
                <input type="number" name="sol_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${t.sol_balance||0}">
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded">${l==="edit"?"Save Changes":"Create Profile"}</button>
          </div>
        </form>
      </div>
    </div>
  `}function D({name:l}){return`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in" style="backdrop-filter: blur(2px)">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-delete-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Delete Profile</h2>
        <p class="mb-6">Are you sure you want to delete <b>${l}</b>? This action cannot be undone.</p>
        <div class="flex justify-end gap-2">
          <button id="cancel-delete" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button id="confirm-delete" class="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  `}function M(l){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <input type="text" id="user-search" placeholder="Search users..." class="border px-3 py-2 rounded w-full md:w-64" />
      <button id="add-user-btn" class="bg-green-600 text-white px-4 py-2 rounded ml-auto">+ Create Profile</button>
    </div>
    <div>
      <div class="block md:hidden">
        ${l.map((t,m)=>`
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">${t.full_name}</span>
              ${f(t.is_active)}
            </div>
            <div class="text-xs text-gray-400 mb-1">${t.email}</div>
            <div class="mb-1"><b>Account Type:</b> ${t.account_type||"-"}</div>
            <div class="mb-1"><b>Last Login:</b> ${E(t.last_login)}</div>
            <div class="flex flex-wrap gap-2 mt-2">
              <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${t.id}">Edit</button>
              <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${t.id}">Delete</button>
            </div>
          </div>
        `).join("")}
      </div>
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full text-xs">
          <thead>
            <tr class="bg-blue-100">
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="user-table-body">
            ${l.map((t,m)=>`
              <tr>
                <td>${m+1}</td>
                <td>${t.full_name}</td>
                <td>${t.email}</td>
                <td>${f(t.is_active)}</td>
                <td>$${parseFloat(t.balance).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
                <td>
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${t.id}">Edit</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${t.id}">Delete</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}const H=async()=>{if(!await T())return{html:"",pageEvents:()=>{}};let{data:l=[]}=await s.from("profiles").select("*").order("created_at",{ascending:!1}),{data:t=[]}=await s.from("accounts").select("*"),{data:m=[]}=await s.from("crypto_balances").select("*"),p=l.map(c=>{const u=t.find(b=>b.user_id===c.id)||{},i=m.find(b=>b.user_id===c.id)||{};return{...c,account_type:u.account_type||"-",is_active:u.is_active!==!1&&c.is_active!==!1,balance:parseFloat(u.balance||0).toFixed(2),btc_balance:parseFloat(i.btc_balance||0).toFixed(8),eth_balance:parseFloat(i.eth_balance||0).toFixed(8),usdt_balance:parseFloat(i.usdt_balance||0).toFixed(6),usdc_balance:parseFloat(i.usdc_balance||0).toFixed(6),bnb_balance:parseFloat(i.bnb_balance||0).toFixed(8),sol_balance:parseFloat(i.sol_balance||0).toFixed(8)}}),v=p,y="users",g=!1,o=localStorage.getItem("admin_dark")==="true";function x(){document.getElementById("app").innerHTML=`
    ${B({activeItem:y,isCollapsed:g,isDark:o})}
    <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
      <div class="p-4 md:p-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold mb-6">User Management</h1>
          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
            ${M(v)}
          </div>
        </div>
      </div>
    </div>
    <div id="user-modal-panel"></div>
  `,document.getElementById("admin-sidebar");const c=document.getElementById("admin-sidebar-overlay"),u=document.getElementById("admin-sidebar-toggle"),i=document.getElementById("admin-sidebar-close");function b(){g=!1,x()}function $(){g=!0,x()}u?.addEventListener("click",b),i?.addEventListener("click",$),c?.addEventListener("click",$),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{o=!o,localStorage.setItem("admin_dark",o?"true":"false"),o?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),x()}),document.querySelectorAll("[data-nav]").forEach(d=>{d.addEventListener("click",e=>{e.preventDefault(),y=d.getAttribute("data-nav"),window.location.href=`/admin/${y}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),o?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),document.getElementById("user-search").addEventListener("input",function(){const d=this.value.trim().toLowerCase();v=p.filter(e=>e.full_name&&e.full_name.toLowerCase().includes(d)||e.email&&e.email.toLowerCase().includes(d)),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=v.map((e,n)=>`
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">${e.full_name}</span>
              ${f(e.is_active)}
            </div>
            <div class="text-xs text-gray-400 mb-1">${e.email}</div>
            <div class="mb-1"><b>Account Type:</b> ${e.account_type||"-"}</div>
            <div class="mb-1"><b>Last Login:</b> ${E(e.last_login)}</div>
            <div class="flex flex-wrap gap-2 mt-2">
              <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${e.id}">Edit</button>
              <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${e.id}">Delete</button>
            </div>
          </div>
        `).join(""):document.getElementById("user-table-body").innerHTML=v.map((e,n)=>`
          <tr>
            <td>${n+1}</td>
            <td>${e.full_name}</td>
            <td>${e.email}</td>
            <td>${f(e.is_active)}</td>
            <td>${e.account_type||"-"}</td>
            <td>${E(e.last_login)}</td>
            <td>
              <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${e.id}">Edit</button>
              <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${e.id}">Delete</button>
            </td>
          </tr>
        `).join(""),k()}),document.getElementById("add-user-btn").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=S({mode:"create"}),document.getElementById("close-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("user-form").onsubmit=async function(d){d.preventDefault(),document.getElementById("user-modal-panel").innerHTML+=w();const e=Object.fromEntries(new FormData(this));try{await s.from("profiles").update({full_name:e.full_name,title:e.title,firstname:e.firstname,lastname:e.lastname,phone:e.phone,country_code:e.country_code,nationality:e.nationality,address:e.address,city:e.city,state:e.state,zip:e.zip,dob:e.dob,occupation:e.occupation,ssn:e.ssn,marital_status:e.marital_status,gender:e.gender}).eq("id",user.id),await s.from("accounts").update({account_type:e.account_type,is_active:e.is_active==="true",balance:parseFloat(e.balance)||0}).eq("user_id",user.id);const n={user_id:user.id,account_id:t.find(_=>_.user_id===user.id)?.id,btc_balance:parseFloat(e.btc_balance)||0,eth_balance:parseFloat(e.eth_balance)||0,usdt_balance:parseFloat(e.usdt_balance)||0,usdc_balance:parseFloat(e.usdc_balance)||0,bnb_balance:parseFloat(e.bnb_balance)||0,sol_balance:parseFloat(e.sol_balance)||0},{data:a}=await s.from("crypto_balances").select().eq("user_id",user.id).single();a?await s.from("crypto_balances").update(n).eq("user_id",user.id):await s.from("crypto_balances").insert([n]),await h({to:user.email,subject:"Profile Updated",html:`
                <p>Hello <b>${e.full_name}</b>,</p>
                <p>Your profile and balances were updated.</p>
                <p>New fiat balance: $${parseFloat(e.balance).toLocaleString()}</p>
                <p>If you did not expect this change, please contact support immediately.</p>
              `}),r("Profile and balances updated!","success"),location.reload()}catch(n){r(n.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}};function k(){document.querySelectorAll(".user-edit").forEach(d=>{d.onclick=()=>{const e=p.find(n=>n.id===d.dataset.id);document.getElementById("user-modal-panel").innerHTML=S({mode:"edit",user:e}),document.getElementById("close-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("user-form").onsubmit=async function(n){n.preventDefault(),document.getElementById("user-modal-panel").innerHTML+=w();const a=Object.fromEntries(new FormData(this));try{await s.from("profiles").update({full_name:a.full_name,title:a.title,firstname:a.firstname,lastname:a.lastname,phone:a.phone,country_code:a.country_code,nationality:a.nationality,address:a.address,city:a.city,state:a.state,zip:a.zip,dob:a.dob,occupation:a.occupation,ssn:a.ssn,marital_status:a.marital_status,gender:a.gender}).eq("id",e.id),await s.from("accounts").update({account_type:a.account_type,is_active:a.is_active==="true"}).eq("user_id",e.id),await h({to:e.email,subject:"Profile Updated",html:`<p>Hello <b>${a.full_name}</b>,<br>Your profile was updated by an admin.</p>`}),r("Profile updated!","success"),location.reload()}catch(_){r(_.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}}}),document.querySelectorAll(".user-delete").forEach(d=>{d.onclick=async()=>{const e=p.find(n=>n.id===d.dataset.id);document.getElementById("user-modal-panel").innerHTML=D({name:e.full_name}),document.getElementById("close-delete-modal").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("cancel-delete").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("confirm-delete").onclick=async()=>{document.getElementById("user-modal-panel").innerHTML+=w();try{await s.from("login_otps").delete().eq("user_id",e.id),await s.from("accounts").delete().eq("user_id",e.id),await s.from("profiles").delete().eq("id",e.id),await F(e.id),await h({to:e.email,subject:"Profile Deleted",html:`<p>Hello <b>${e.full_name}</b>,<br>Your profile has been deleted by an admin.</p>`}),r("Profile deleted!","success"),location.reload()}catch(n){r("Failed to delete user: "+n.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}}})}k()}return{html:"",pageEvents:()=>x()}};export{H as default};
