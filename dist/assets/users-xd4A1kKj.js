import{s as n}from"./supabaseClient-CL6H8VOx.js";import{A as w}from"./AdminNavbar-ObVEf85P.js";import{r as E}from"./adminAuth-Dn35BI8v.js";import{s as u}from"./toast-DRvdR0y9.js";import{s as v}from"./sendEmail-89Z52C2k.js";import{s as $}from"./signupHandler-xMopLo1w.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";import"./email-cNRN05tX.js";const f="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2RicXlnc2Nkc3h4bHhmanh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ3MzEyOCwiZXhwIjoyMDc0MDQ5MTI4fQ.hgTFx1O5bbgwJvTJlY4xXG3DS7eh1m1QRReLoefSD0E",I="https://biyuydrbirwsbtnymakk.supabase.co";async function S(l){return(await fetch(`${I}/auth/v1/admin/users/${l}`,{method:"DELETE",headers:{apikey:f,Authorization:`Bearer ${f}`,"Content-Type":"application/json"}})).ok}function x(){return`<div class="flex justify-center items-center py-16">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>`}function B(l){return l==="active"||l===!0?'<span title="Active" class="text-green-600 text-lg">●</span>':l==="suspended"||l===!1?'<span title="Suspended" class="text-red-600 text-lg">●</span>':'<span title="Pending" class="text-yellow-600 text-lg">●</span>'}function g({mode:l,user:e={}}){return`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" style="backdrop-filter: blur(2px)">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto p-6 relative">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-user-form">&times;</button>
        <h2 class="text-xl font-bold mb-4">${l==="edit"?"Edit":"Create"} User Profile</h2>
        <form id="user-form">
          <input type="hidden" name="id" value="${e.id||""}">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs mb-1">Full Name</label>
              <input type="text" name="full_name" class="w-full border px-2 py-1 rounded" value="${e.full_name||""}" required>
            </div>
            <div>
              <label class="block text-xs mb-1">Title</label>
              <input type="text" name="title" class="w-full border px-2 py-1 rounded" value="${e.title||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">First Name</label>
              <input type="text" name="firstname" class="w-full border px-2 py-1 rounded" value="${e.firstname||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Last Name</label>
              <input type="text" name="lastname" class="w-full border px-2 py-1 rounded" value="${e.lastname||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Phone</label>
              <input type="text" name="phone" class="w-full border px-2 py-1 rounded" value="${e.phone||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Country Code</label>
              <input type="text" name="country_code" class="w-full border px-2 py-1 rounded" value="${e.country_code||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Nationality</label>
              <input type="text" name="nationality" class="w-full border px-2 py-1 rounded" value="${e.nationality||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Address</label>
              <input type="text" name="address" class="w-full border px-2 py-1 rounded" value="${e.address||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">City</label>
              <input type="text" name="city" class="w-full border px-2 py-1 rounded" value="${e.city||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">State</label>
              <input type="text" name="state" class="w-full border px-2 py-1 rounded" value="${e.state||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Zip</label>
              <input type="text" name="zip" class="w-full border px-2 py-1 rounded" value="${e.zip||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">DOB</label>
              <input type="date" name="dob" class="w-full border px-2 py-1 rounded" value="${e.dob||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Occupation</label>
              <input type="text" name="occupation" class="w-full border px-2 py-1 rounded" value="${e.occupation||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">SSN</label>
              <input type="text" name="ssn" class="w-full border px-2 py-1 rounded" value="${e.ssn||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Marital Status</label>
              <input type="text" name="marital_status" class="w-full border px-2 py-1 rounded" value="${e.marital_status||""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Gender</label>
              <select name="gender" class="w-full border px-2 py-1 rounded">
                <option value="">Select</option>
                <option value="Male" ${e.gender==="Male"?"selected":""}>Male</option>
                <option value="Female" ${e.gender==="Female"?"selected":""}>Female</option>
                <option value="Other" ${e.gender==="Other"?"selected":""}>Other</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1">Account Type</label>
              <select name="account_type" class="w-full border px-2 py-1 rounded">
                <option value="">Select</option>
                <option value="USD SAVING" ${e.account_type==="USD SAVING"?"selected":""}>USD SAVING</option>
                <option value="USD CURRENT" ${e.account_type==="USD CURRENT"?"selected":""}>USD CURRENT</option>
                <option value="MONEY MARKET" ${e.account_type==="MONEY MARKET"?"selected":""}>MONEY MARKET</option>
                <option value="IRA" ${e.account_type==="IRA"?"selected":""}>IRA</option>
                <option value="INVESTMENT ACCOUNT" ${e.account_type==="INVESTMENT ACCOUNT"?"selected":""}>INVESTMENT ACCOUNT</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1">Status</label>
              <select name="is_active" class="w-full border px-2 py-1 rounded">
                <option value="true" ${e.is_active?"selected":""}>Active</option>
                <option value="false" ${e.is_active===!1?"selected":""}>Suspended</option>
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
              <input type="email" name="email" class="w-full border px-2 py-1 rounded bg-gray-100 dark:bg-slate-800" value="${e.email||""}" disabled>
            </div>
            `}
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs mb-1">Fiat Balance</label>
            <input type="number" name="balance" step="0.01" class="w-full border px-2 py-1 rounded" value="${e.balance||0}">
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs mb-1">Mortgage Balance</label>
            <input type="number" name="mortgage" step="0.01" class="w-full border px-2 py-1 rounded" value="${e.mortgage||0}">
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs mb-1">Loan Balance</label>
            <input type="number" name="loan" step="0.01" class="w-full border px-2 py-1 rounded" value="${e.loan||0}">
          </div>
          <div class="md:col-span-2">
            <h3 class="text-sm font-bold mb-2">Crypto Balances</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs mb-1">BTC Balance</label>
                <input type="number" name="btc_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${e.btc_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">ETH Balance</label>
                <input type="number" name="eth_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${e.eth_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">USDT Balance</label>
                <input type="number" name="usdt_balance" step="0.000001" class="w-full border px-2 py-1 rounded" value="${e.usdt_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">USDC Balance</label>
                <input type="number" name="usdc_balance" step="0.000001" class="w-full border px-2 py-1 rounded" value="${e.usdc_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">BNB Balance</label>
                <input type="number" name="bnb_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${e.bnb_balance||0}">
              </div>
              <div>
                <label class="block text-xs mb-1">SOL Balance</label>
                <input type="number" name="sol_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${e.sol_balance||0}">
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <button type="button" class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded mr-2" id="cancel-user-form">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded">${l==="edit"?"Save Changes":"Create Profile"}</button>
          </div>
        </form>
      </div>
    </div>
  `}function T(l){return`
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Account Type</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fiat Balance</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Mortgage</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Loan</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Crypto</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          ${l.map(e=>`
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4">${e.full_name}</td>
              <td class="px-6 py-4">${e.email}</td>
              <td class="px-6 py-4">${e.account_type}</td>
              <td class="px-6 py-4 text-right">$${parseFloat(e.balance).toLocaleString()}</td>
              <td class="px-6 py-4 text-right">$${parseFloat(e.mortgage||0).toLocaleString()}</td>
              <td class="px-6 py-4 text-right">$${parseFloat(e.loan||0).toLocaleString()}</td>
              <td class="px-6 py-4 text-right">
                ${e.btc_balance>0?`${e.btc_balance} BTC<br>`:""}
                ${e.eth_balance>0?`${e.eth_balance} ETH<br>`:""}
                ${e.usdt_balance>0?`${e.usdt_balance} USDT`:""}
              </td>
              <td class="px-6 py-4 text-center">${B(e.is_active)}</td>
              <td class="px-6 py-4 text-center">
                <button class="user-edit text-blue-600 dark:text-blue-400 hover:text-blue-800 mx-2" data-id="${e.id}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="user-delete text-red-600 dark:text-red-400 hover:text-red-800 mx-2" data-id="${e.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `}const R=async()=>{if(!await E())return{html:"",pageEvents:()=>{}};let l="users",e=!1,d=localStorage.getItem("admin_dark")==="true",{data:_=[]}=await n.from("profiles").select("*").order("created_at",{ascending:!1}),{data:h=[]}=await n.from("accounts").select("*"),{data:k=[]}=await n.from("crypto_balances").select("*"),m=_.map(p=>{const c=h.find(s=>s.user_id===p.id)||{},i=k.find(s=>s.user_id===p.id)||{};return{...p,account_type:c.account_type||"-",account_id:c.id,is_active:c.is_active!==!1&&p.is_active!==!1,balance:parseFloat(c.balance||0).toFixed(2),mortgage:parseFloat(c.mortgage||0).toFixed(2),loan:parseFloat(c.loan||0).toFixed(2),btc_balance:parseFloat(i.btc_balance||0).toFixed(8),eth_balance:parseFloat(i.eth_balance||0).toFixed(8),usdt_balance:parseFloat(i.usdt_balance||0).toFixed(6),usdc_balance:parseFloat(i.usdc_balance||0).toFixed(6),bnb_balance:parseFloat(i.bnb_balance||0).toFixed(8),sol_balance:parseFloat(i.sol_balance||0).toFixed(8)}}),y=m;function r(){document.getElementById("app").innerHTML=`
    ${w({activeItem:l,isCollapsed:e,isDark:d})}
    <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
      <div class="p-4 md:p-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold mb-6">User Management</h1>
          <div class="flex justify-end mb-4">
            <button id="add-user-btn" class="hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-plus mr-2"></i> Add User
            </button>
          </div>
          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
            ${T(y)}
          </div>
        </div>
      </div>
    </div>
    <div id="user-modal-panel"></div>
  `,document.getElementById("admin-sidebar");const p=document.getElementById("admin-sidebar-overlay"),c=document.getElementById("admin-sidebar-toggle"),i=document.getElementById("admin-sidebar-close");c?.addEventListener("click",()=>{e=!1,r()}),i?.addEventListener("click",()=>{e=!0,r()}),p?.addEventListener("click",()=>{e=!0,r()}),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{d=!d,localStorage.setItem("admin_dark",d?"true":"false"),document.documentElement.classList.toggle("dark",d),r()}),document.getElementById("admin-theme-toggle-desktop")?.addEventListener("click",()=>{d=!d,localStorage.setItem("admin_dark",d?"true":"false"),document.documentElement.classList.toggle("dark",d),r()}),document.getElementById("user-search")?.addEventListener("input",function(){const s=this.value.trim().toLowerCase();y=m.filter(a=>a.full_name&&a.full_name.toLowerCase().includes(s)||a.email&&a.email.toLowerCase().includes(s)),r()}),document.getElementById("add-user-btn")?.addEventListener("click",()=>{document.getElementById("user-modal-panel").innerHTML=g({mode:"create"}),document.getElementById("close-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("cancel-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("user-form").onsubmit=async function(s){s.preventDefault(),document.getElementById("user-modal-panel").innerHTML+=x();const a=Object.fromEntries(new FormData(this));try{await $(a,"admin"),u("User created!","success"),location.reload()}catch(o){u(o.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}}),document.querySelectorAll(".user-edit").forEach(s=>{s.onclick=()=>{const a=m.find(o=>o.id===s.dataset.id);document.getElementById("user-modal-panel").innerHTML=g({mode:"edit",user:a}),document.getElementById("close-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("cancel-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("user-form").onsubmit=async function(o){o.preventDefault(),document.getElementById("user-modal-panel").innerHTML+=x();const t=Object.fromEntries(new FormData(this));try{await n.from("profiles").update({full_name:t.full_name,title:t.title,firstname:t.firstname,lastname:t.lastname,phone:t.phone,country_code:t.country_code,nationality:t.nationality,address:t.address,city:t.city,state:t.state,zip:t.zip,dob:t.dob,occupation:t.occupation,ssn:t.ssn,marital_status:t.marital_status,gender:t.gender}).eq("id",a.id),await n.from("accounts").update({account_type:t.account_type,is_active:t.is_active==="true",balance:parseFloat(t.balance)||0,mortgage:parseFloat(t.mortgage)||0,loan:parseFloat(t.loan)||0}).eq("user_id",a.id);const{data:b}=await n.from("crypto_balances").select("id").eq("user_id",a.id).eq("account_id",a.account_id).single();await n.from("crypto_balances").upsert([{id:b?.id,user_id:a.id,account_id:a.account_id,btc_balance:parseFloat(t.btc_balance)||0,eth_balance:parseFloat(t.eth_balance)||0,usdt_balance:parseFloat(t.usdt_balance)||0,usdc_balance:parseFloat(t.usdc_balance)||0,bnb_balance:parseFloat(t.bnb_balance)||0,sol_balance:parseFloat(t.sol_balance)||0}]),await v({to:a.email,subject:"Profile Updated",html:`<p>Hello <b>${t.full_name}</b>,<br>Your profile was updated by an admin.</p>`}),u("Profile updated!","success"),location.reload()}catch(b){u(b.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}}}),document.querySelectorAll(".user-delete").forEach(s=>{s.onclick=async()=>{const a=m.find(o=>o.id===s.dataset.id);if(confirm(`Delete ${a.full_name}? This cannot be undone.`)){document.getElementById("user-modal-panel").innerHTML+=x();try{await n.from("login_otps").delete().eq("user_id",a.id),await n.from("crypto_balances").delete().eq("user_id",a.id),await n.from("accounts").delete().eq("user_id",a.id),await n.from("profiles").delete().eq("id",a.id),await S(a.id),await v({to:a.email,subject:"Profile Deleted",html:`<p>Hello <b>${a.full_name}</b>,<br>Your profile has been deleted by an admin.</p>`}),u("Profile deleted!","success"),location.reload()}catch(o){u("Failed to delete user: "+o.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}}}),document.documentElement.classList.toggle("dark",d)}return{html:"",pageEvents:()=>r()}};export{R as default};
