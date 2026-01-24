import{s as f}from"./supabaseClient-CL6H8VOx.js";import{A as S}from"./AdminNavbar-ObVEf85P.js";import{r as B}from"./adminAuth-Dn35BI8v.js";import{s as _}from"./toast-DRvdR0y9.js";import{s as T}from"./sendEmail-89Z52C2k.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function v(s){if(!s)return"";const i=new Date(s);return i.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+i.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function p(s){return s==="success"?'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Success</span>':s==="warning"?'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Warning</span>':s==="danger"?'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Danger</span>':'<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Info</span>'}function U(s,i){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="notif-search" placeholder="Search by user, title, message..." class="border px-3 py-2 rounded w-full md:w-64" />
      <select id="notif-type-filter" class="border px-2 py-2 rounded">
        <option value="">All Types</option>
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="danger">Danger</option>
      </select>
      <button id="notif-export-csv" class="ml-auto bg-blue-600 text-white px-3 py-2 rounded">Export CSV</button>
      <button id="notif-send" class="bg-green-600 text-white px-3 py-2 rounded">Send Notification</button>
    </div>
    <div>
      <div class="block md:hidden">
        ${s.map(t=>{const l=i.find(r=>r.id===t.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${l?.full_name||"Unknown"}</span>
                ${p(t.type)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${l?.email||""}</div>
              <div class="mb-1"><b>Title:</b> ${t.title||"-"}</div>
              <div class="mb-1"><b>Message:</b> ${t.message.length>60?t.message.slice(0,60)+"...":t.message}</div>
              <div class="mb-1"><b>Status:</b> ${t.read?'<span class="text-green-600">Read</span>':'<span class="text-yellow-600">Unread</span>'}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded notif-view" data-id="${t.id}">View</button>
              </div>
            </div>
          `}).join("")}
      </div>
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full text-xs">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Title</th>
              <th>Message</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="notif-table-body">
            ${s.map(t=>{const l=i.find(r=>r.id===t.user_id);return`
                <tr>
                  <td>${v(t.created_at)}</td>
                  <td>
                    <span class="font-semibold">${l?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${l?.email||""}</div>
                  </td>
                  <td>${t.title||"-"}</td>
                  <td>${t.message.length>60?t.message.slice(0,60)+"...":t.message}</td>
                  <td>${p(t.type)}</td>
                  <td>${t.read?'<span class="text-green-600">Read</span>':'<span class="text-yellow-600">Unread</span>'}</td>
                  <td>
                    <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded notif-view" data-id="${t.id}">View</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function j(s,i){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="notif-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-notif-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Notification Details</h2>
        <div class="mb-2"><b>User:</b> ${i?.full_name||"Unknown"} (${i?.email||""})</div>
        <div class="mb-2"><b>Title:</b> ${s.title||"-"}</div>
        <div class="mb-2"><b>Message:</b> ${s.message}</div>
        <div class="mb-2"><b>Type:</b> ${p(s.type)}</div>
        <div class="mb-2"><b>Status:</b> ${s.read?"Read":"Unread"}</div>
        <div class="mb-2"><b>Created:</b> ${v(s.created_at)}</div>
      </div>
    </div>
  `}function M(s){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="notif-send-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-notif-send">&times;</button>
        <h2 class="text-xl font-bold mb-4">Send Notification</h2>
        <form id="notif-send-form">
          <div class="mb-3">
            <label class="block text-sm mb-1">User</label>
            <select name="user_id" class="w-full border px-3 py-2 rounded" required>
              <option value="">Select user</option>
              ${s.map(i=>`<option value="${i.id}">${i.full_name} (${i.email})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Title</label>
            <input type="text" name="title" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Message</label>
            <textarea name="message" class="w-full border px-3 py-2 rounded" rows="4" required></textarea>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Type</label>
            <select name="type" class="w-full border px-3 py-2 rounded" required>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
            </select>
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  `}function D(s,i){const t=["Date","User","Title","Message","Type","Status"],l=s.map(m=>{const g=i.find(x=>x.id===m.user_id);return[v(m.created_at),g?.full_name||"",m.title||"",m.message.replace(/[\r\n]+/g," "),m.type,m.read?"Read":"Unread"].join(",")}),r=[t.join(","),...l].join(`
`),c=new Blob([r],{type:"text/csv"}),u=URL.createObjectURL(c),b=document.createElement("a");b.href=u,b.download="notifications.csv",b.click(),URL.revokeObjectURL(u)}const W=async()=>{if(!await B())return{html:"",pageEvents:()=>{}};let{data:s=[]}=await f.from("notifications").select("*").order("created_at",{ascending:!1}).limit(100),{data:i=[]}=await f.from("profiles").select("id,full_name,email"),t=s,l="notifications",r=!1,c=localStorage.getItem("admin_dark")==="true";function u(){document.getElementById("app").innerHTML=`
      ${S({activeItem:l,isCollapsed:r,isDark:c})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Notifications</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${U(t,i)}
            </div>
          </div>
        </div>
      </div>
      <div id="notif-detail-panel"></div>
      <div id="notif-send-panel"></div>
    `,document.getElementById("admin-sidebar");const b=document.getElementById("admin-sidebar-overlay"),m=document.getElementById("admin-sidebar-toggle"),g=document.getElementById("admin-sidebar-close");function x(){r=!1,u()}function w(){r=!0,u()}m?.addEventListener("click",x),g?.addEventListener("click",w),b?.addEventListener("click",w),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{c=!c,localStorage.setItem("admin_dark",c?"true":"false"),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),u()}),document.querySelectorAll("[data-nav]").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),l=a.getAttribute("data-nav"),window.location.href=`/admin/${l}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const h=document.getElementById("notif-search"),$=document.getElementById("notif-type-filter"),E=document.getElementById("notif-table-body");function k(){let a=h.value.trim().toLowerCase(),o=$.value;t=s.filter(e=>{const n=i.find(y=>y.id===e.user_id);let d=!0;return a&&(d=n?.full_name?.toLowerCase().includes(a)||n?.email?.toLowerCase().includes(a)||(e.title||"").toLowerCase().includes(a)||(e.message||"").toLowerCase().includes(a)),o&&e.type!==o&&(d=!1),d}),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=t.map(e=>{const n=i.find(d=>d.id===e.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${n?.full_name||"Unknown"}</span>
                ${p(e.type)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${n?.email||""}</div>
              <div class="mb-1"><b>Title:</b> ${e.title||"-"}</div>
              <div class="mb-1"><b>Message:</b> ${e.message.length>60?e.message.slice(0,60)+"...":e.message}</div>
              <div class="mb-1"><b>Status:</b> ${e.read?'<span class="text-green-600">Read</span>':'<span class="text-yellow-600">Unread</span>'}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded notif-view" data-id="${e.id}">View</button>
              </div>
            </div>
          `}).join(""):E&&(E.innerHTML=t.map(e=>{const n=i.find(d=>d.id===e.user_id);return`
            <tr>
              <td>${v(e.created_at)}</td>
              <td>
                <span class="font-semibold">${n?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${n?.email||""}</div>
              </td>
              <td>${e.title||"-"}</td>
              <td>${e.message.length>60?e.message.slice(0,60)+"...":e.message}</td>
              <td>${p(e.type)}</td>
              <td>${e.read?'<span class="text-green-600">Read</span>':'<span class="text-yellow-600">Unread</span>'}</td>
              <td>
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded notif-view" data-id="${e.id}">View</button>
              </td>
            </tr>
          `}).join("")),L()}[h,$].forEach(a=>{a&&a.addEventListener("input",k),a&&a.addEventListener("change",k)}),document.getElementById("notif-export-csv").onclick=()=>D(t,i),document.getElementById("notif-send").onclick=()=>{document.getElementById("notif-send-panel").innerHTML=M(i),document.getElementById("close-notif-send").onclick=()=>{document.getElementById("notif-send-panel").innerHTML=""},document.getElementById("notif-send-form").onsubmit=async function(a){a.preventDefault();const o=this.user_id.value,e=this.title.value.trim(),n=this.message.value.trim(),d=this.type.value;if(!o||!e||!n||!d)return _("Fill all fields","error");await f.from("notifications").insert([{user_id:o,title:e,message:n,type:d}]);const y=i.find(I=>I.id===o);await T({to:y.email,subject:e,html:n}),_("Notification sent and user emailed!","success"),window.location.reload()}};function L(){document.querySelectorAll(".notif-view").forEach(a=>{a.onclick=async()=>{const o=a.getAttribute("data-id"),e=s.find(d=>d.id===o),n=i.find(d=>d.id===e.user_id);document.getElementById("notif-detail-panel").innerHTML=j(e,n),document.getElementById("close-notif-detail").onclick=()=>{document.getElementById("notif-detail-panel").innerHTML=""},e.read||await f.from("notifications").update({read:!0}).eq("id",o)}})}L()}return{html:"",pageEvents:()=>u()}};export{W as default};
