import{s}from"./supabaseClient-B1HaFb4P.js";import{A as T}from"./AdminNavbar-DXVtneOk.js";import{r as L}from"./adminAuth-Dn35BI8v.js";import{s as c}from"./toast-Dx2DSKhR.js";import{s as $}from"./sendEmail-89Z52C2k.js";import{s as M}from"./signupHandler-GAfh3TFo.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";import"./email-cNRN05tX.js";const I="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmb2RicXlnc2Nkc3h4bHhmanh3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODQ3MzEyOCwiZXhwIjoyMDc0MDQ5MTI4fQ.hgTFx1O5bbgwJvTJlY4xXG3DS7eh1m1QRReLoefSD0E",A="https://ifodbqygscdsxxlxfjxw.supabase.co";async function B(a){return(await fetch(`${A}/auth/v1/admin/users/${a}`,{method:"DELETE",headers:{apikey:I,Authorization:`Bearer ${I}`,"Content-Type":"application/json"}})).ok}function _(){return`<div class="flex justify-center items-center py-16 animate-fade-in">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>`}function x(a){if(!a)return"";const e=new Date(a);return e.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function g(a){return a==="active"||a===!0?'<span title="Active" class="text-green-600 text-lg">✅</span>':a==="suspended"||a===!1?'<span title="Suspended" class="text-red-600 text-lg">❌</span>':'<span title="Pending" class="text-yellow-600 text-lg">⏸</span>'}function k({mode:a,user:e={}}){return`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in" style="backdrop-filter: blur(2px)">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto p-6 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-user-form">&times;</button>
        <h2 class="text-xl font-bold mb-4">${a==="edit"?"Edit":"Create"} User Profile</h2>
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
            ${a==="create"?`
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
          <div class="flex justify-end mt-6">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded">${a==="edit"?"Save Changes":"Create Profile"}</button>
          </div>
        </form>
      </div>
    </div>
  `}function D({name:a}){return`
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in" style="backdrop-filter: blur(2px)">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-delete-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Delete Profile</h2>
        <p class="mb-6">Are you sure you want to delete <b>${a}</b>? This action cannot be undone.</p>
        <div class="flex justify-end gap-2">
          <button id="cancel-delete" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button id="confirm-delete" class="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  `}function C(a){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center justify-between">
      <input type="text" id="user-search" placeholder="Search users..." class="border px-3 py-2 rounded w-full md:w-64" />
      <button id="add-user-btn" class="bg-green-600 text-white px-4 py-2 rounded ml-auto">+ Create Profile</button>
    </div>
    <div>
      <div class="block md:hidden">
        ${a.map((e,m)=>`
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">${e.full_name}</span>
              ${g(e.is_active)}
            </div>
            <div class="text-xs text-gray-400 mb-1">${e.email}</div>
            <div class="mb-1"><b>Account Type:</b> ${e.account_type||"-"}</div>
            <div class="mb-1"><b>Last Login:</b> ${x(e.last_login)}</div>
            <div class="flex flex-wrap gap-2 mt-2">
              <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${e.id}">Edit</button>
              <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${e.id}">Delete</button>
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
              <th>Account Type</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="user-table-body">
            ${a.map((e,m)=>`
              <tr>
                <td>${m+1}</td>
                <td>${e.full_name}</td>
                <td>${e.email}</td>
                <td>${g(e.is_active)}</td>
                <td>${e.account_type||"-"}</td>
                <td>${x(e.last_login)}</td>
                <td>
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${e.id}">Edit</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${e.id}">Delete</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}const J=async()=>{if(!await L())return{html:"",pageEvents:()=>{}};let{data:a=[]}=await s.from("profiles").select("*").order("created_at",{ascending:!1}),{data:e=[]}=await s.from("accounts").select("*"),{data:m=[]}=await s.from("login_otps").select("*"),u=a.map(o=>{const f=e.find(i=>i.user_id===o.id)||{},v=m.filter(i=>i.user_id===o.id),E=v.length>0?v.sort((i,y)=>new Date(y.created_at)-new Date(i.created_at))[0].created_at:o.created_at;return{...o,account_type:f.account_type||"-",is_active:f.is_active!==!1&&o.is_active!==!1,last_login:E}}),p=u,h="users",w=!1,r=localStorage.getItem("admin_dark")==="true";function b(){document.getElementById("app").innerHTML=`
    ${T({activeItem:h,isCollapsed:w,isDark:r})}
    <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
      <div class="p-4 md:p-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold mb-6">User Management</h1>
          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
            ${C(p)}
          </div>
        </div>
      </div>
    </div>
    <div id="user-modal-panel"></div>
  `,document.getElementById("admin-sidebar");const o=document.getElementById("admin-sidebar-overlay"),f=document.getElementById("admin-sidebar-toggle"),v=document.getElementById("admin-sidebar-close");function E(){w=!1,b()}function i(){w=!0,b()}f?.addEventListener("click",E),v?.addEventListener("click",i),o?.addEventListener("click",i),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{r=!r,localStorage.setItem("admin_dark",r?"true":"false"),r?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),b()}),document.querySelectorAll("[data-nav]").forEach(d=>{d.addEventListener("click",t=>{t.preventDefault(),h=d.getAttribute("data-nav"),window.location.href=`/admin/${h}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),r?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),document.getElementById("user-search").addEventListener("input",function(){const d=this.value.trim().toLowerCase();p=u.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(d)||t.email&&t.email.toLowerCase().includes(d)),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=p.map((t,n)=>`
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">${t.full_name}</span>
              ${g(t.is_active)}
            </div>
            <div class="text-xs text-gray-400 mb-1">${t.email}</div>
            <div class="mb-1"><b>Account Type:</b> ${t.account_type||"-"}</div>
            <div class="mb-1"><b>Last Login:</b> ${x(t.last_login)}</div>
            <div class="flex flex-wrap gap-2 mt-2">
              <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${t.id}">Edit</button>
              <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${t.id}">Delete</button>
            </div>
          </div>
        `).join(""):document.getElementById("user-table-body").innerHTML=p.map((t,n)=>`
          <tr>
            <td>${n+1}</td>
            <td>${t.full_name}</td>
            <td>${t.email}</td>
            <td>${g(t.is_active)}</td>
            <td>${t.account_type||"-"}</td>
            <td>${x(t.last_login)}</td>
            <td>
              <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded user-edit" data-id="${t.id}">Edit</button>
              <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded user-delete" data-id="${t.id}">Delete</button>
            </td>
          </tr>
        `).join(""),y()}),document.getElementById("add-user-btn").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=k({mode:"create"}),document.getElementById("close-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("user-form").onsubmit=async function(d){d.preventDefault(),document.getElementById("user-modal-panel").innerHTML+=_();const t=Object.fromEntries(new FormData(this));try{await M({...t,acctype:t.account_type,username:`${t.firstname} ${t.lastname}`},"admin"),c("Profile created and email sent!","success"),location.reload()}catch(n){c(n.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}};function y(){document.querySelectorAll(".user-edit").forEach(d=>{d.onclick=()=>{const t=u.find(n=>n.id===d.dataset.id);document.getElementById("user-modal-panel").innerHTML=k({mode:"edit",user:t}),document.getElementById("close-user-form").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("user-form").onsubmit=async function(n){n.preventDefault(),document.getElementById("user-modal-panel").innerHTML+=_();const l=Object.fromEntries(new FormData(this));try{await s.from("profiles").update({full_name:l.full_name,title:l.title,firstname:l.firstname,lastname:l.lastname,phone:l.phone,country_code:l.country_code,nationality:l.nationality,address:l.address,city:l.city,state:l.state,zip:l.zip,dob:l.dob,occupation:l.occupation,ssn:l.ssn,marital_status:l.marital_status,gender:l.gender}).eq("id",t.id),await s.from("accounts").update({account_type:l.account_type,is_active:l.is_active==="true"}).eq("user_id",t.id),await $({to:t.email,subject:"Profile Updated",html:`<p>Hello <b>${l.full_name}</b>,<br>Your profile was updated by an admin.</p>`}),c("Profile updated!","success"),location.reload()}catch(S){c(S.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}}}),document.querySelectorAll(".user-delete").forEach(d=>{d.onclick=async()=>{const t=u.find(n=>n.id===d.dataset.id);document.getElementById("user-modal-panel").innerHTML=D({name:t.full_name}),document.getElementById("close-delete-modal").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("cancel-delete").onclick=()=>{document.getElementById("user-modal-panel").innerHTML=""},document.getElementById("confirm-delete").onclick=async()=>{document.getElementById("user-modal-panel").innerHTML+=_();try{await s.from("login_otps").delete().eq("user_id",t.id),await s.from("accounts").delete().eq("user_id",t.id),await s.from("profiles").delete().eq("id",t.id),await B(t.id),await $({to:t.email,subject:"Profile Deleted",html:`<p>Hello <b>${t.full_name}</b>,<br>Your profile has been deleted by an admin.</p>`}),c("Profile deleted!","success"),location.reload()}catch(n){c("Failed to delete user: "+n.message,"error"),document.querySelector(".flex.justify-center.items-center.py-16")?.remove()}}}})}y()}return{html:"",pageEvents:()=>b()}};export{J as default};
