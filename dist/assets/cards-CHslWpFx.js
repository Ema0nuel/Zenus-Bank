import{s as v}from"./supabaseClient-CvVHAHOf.js";import{A as q}from"./AdminNavbar-DXVtneOk.js";import{r as B}from"./adminAuth-Dn35BI8v.js";import{s as u}from"./toast-DRvdR0y9.js";import{s as _}from"./sendEmail-89Z52C2k.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function x(d){if(!d)return"";const i=new Date(d);return i.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+i.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function y(d){return d==="pending"?'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>':d==="approved"?'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Approved</span>':d==="printing"?'<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Printing</span>':d==="issued"?'<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Issued</span>':d==="declined"?'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Declined</span>':`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${d}</span>`}function S(d,i){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="card-search" placeholder="Search by user, card number, type..." class="border px-3 py-2 rounded w-full md:w-64" />
      <select id="card-status-filter" class="border px-2 py-2 rounded">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="printing">Printing</option>
        <option value="issued">Issued</option>
        <option value="declined">Declined</option>
      </select>
      <button id="card-export-csv" class="ml-auto bg-blue-600 text-white px-3 py-2 rounded">Export CSV</button>
    </div>
    <div>
      <div class="block md:hidden">
        ${d.map(t=>{const o=i.find(l=>l.id===t.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${o?.full_name||"Unknown"}</span>
                ${y(t.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${o?.email||""}</div>
              <div class="mb-1"><b>Card Number:</b> ${t.card_number||"-"}</div>
              <div class="mb-1"><b>Type:</b> ${t.card_type||"-"}</div>
              <div class="mb-1"><b>Issued:</b> ${x(t.issued_at)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                ${t.status==="pending"?`
                  <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${t.id}">Approve</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${t.id}">Decline</button>
                `:""}
                ${t.status==="approved"?`
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-print" data-id="${t.id}">Mark Printing</button>
                `:""}
                ${t.status==="printing"?`
                  <button class="btn btn-xs bg-purple-600 text-white px-2 py-1 rounded card-issue" data-id="${t.id}">Issue Card</button>
                `:""}
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded card-view" data-id="${t.id}">View</button>
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
              <th>Card Number</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="card-table-body">
            ${d.map(t=>{const o=i.find(l=>l.id===t.user_id);return`
                <tr>
                  <td>${x(t.issued_at)}</td>
                  <td>
                    <span class="font-semibold">${o?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${o?.email||""}</div>
                  </td>
                  <td>${t.card_number||"-"}</td>
                  <td>${t.card_type||"-"}</td>
                  <td>${y(t.status)}</td>
                  <td>
                    ${t.status==="pending"?`
                      <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${t.id}">Approve</button>
                      <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${t.id}">Decline</button>
                    `:""}
                    ${t.status==="approved"?`
                      <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-print" data-id="${t.id}">Mark Printing</button>
                    `:""}
                    ${t.status==="printing"?`
                      <button class="btn btn-xs bg-purple-600 text-white px-2 py-1 rounded card-issue" data-id="${t.id}">Issue Card</button>
                    `:""}
                    <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded card-view" data-id="${t.id}">View</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function j(d,i){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="card-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-card-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Card Details</h2>
        <div class="mb-2"><b>User:</b> ${i?.full_name||"Unknown"} (${i?.email||""})</div>
        <div class="mb-2"><b>Card Number:</b> ${d.card_number||"-"}</div>
        <div class="mb-2"><b>Type:</b> ${d.card_type||"-"}</div>
        <div class="mb-2"><b>Status:</b> ${y(d.status)}</div>
        <div class="mb-2"><b>Issued At:</b> ${x(d.issued_at)}</div>
        <div class="mb-2"><b>Expiry Date:</b> ${d.expiry_date?x(d.expiry_date):"-"}</div>
        <div class="mb-2"><b>CVV:</b> ${d.cvv||"-"}</div>
        <div class="mb-2"><b>Active:</b> ${d.is_active?"Yes":"No"}</div>
      </div>
    </div>
  `}function M(d){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="decline-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-decline-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Decline Card Request</h2>
        <form id="decline-form">
          <input type="hidden" name="card_id" value="${d}" />
          <div class="mb-3">
            <label class="block text-sm mb-1">Reason</label>
            <textarea name="reason" class="w-full border px-3 py-2 rounded" rows="3" required></textarea>
          </div>
          <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded">Decline</button>
        </form>
      </div>
    </div>
  `}function T(d,i){const t=["Date","User","Card Number","Type","Status"],o=d.map(m=>{const w=i.find(h=>h.id===m.user_id);return[x(m.issued_at),w?.full_name||"",m.card_number||"",m.card_type||"",m.status].join(",")}),l=[t.join(","),...o].join(`
`),c=new Blob([l],{type:"text/csv"}),p=URL.createObjectURL(c),g=document.createElement("a");g.href=p,g.download="cards.csv",g.click(),URL.revokeObjectURL(p)}const O=async()=>{if(!await B())return{html:"",pageEvents:()=>{}};let{data:d=[]}=await v.from("cards").select("*").order("issued_at",{ascending:!1}).limit(100),{data:i=[]}=await v.from("profiles").select("id,full_name,email"),t=d,o="cards",l=!1,c=localStorage.getItem("admin_dark")==="true";function p(){document.getElementById("app").innerHTML=`
      ${q({activeItem:o,isCollapsed:l,isDark:c})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Card Management</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${S(t,i)}
            </div>
          </div>
        </div>
      </div>
      <div id="card-detail-panel"></div>
      <div id="decline-panel"></div>
    `,document.getElementById("admin-sidebar");const g=document.getElementById("admin-sidebar-overlay"),m=document.getElementById("admin-sidebar-toggle"),w=document.getElementById("admin-sidebar-close");function h(){l=!1,p()}function E(){l=!0,p()}m?.addEventListener("click",h),w?.addEventListener("click",E),g?.addEventListener("click",E),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{c=!c,localStorage.setItem("admin_dark",c?"true":"false"),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),p()}),document.querySelectorAll("[data-nav]").forEach(n=>{n.addEventListener("click",r=>{r.preventDefault(),o=n.getAttribute("data-nav"),window.location.href=`/admin/${o}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const k=document.getElementById("card-search"),C=document.getElementById("card-status-filter"),I=document.getElementById("card-table-body");function L(){let n=k.value.trim().toLowerCase(),r=C.value;t=d.filter(e=>{const a=i.find(b=>b.id===e.user_id);let s=!0;return n&&(s=a?.full_name?.toLowerCase().includes(n)||a?.email?.toLowerCase().includes(n)||(e.card_number||"").includes(n)||(e.card_type||"").toLowerCase().includes(n)),r&&e.status!==r&&(s=!1),s}),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=t.map(e=>{const a=i.find(s=>s.id===e.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${a?.full_name||"Unknown"}</span>
                ${y(e.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${a?.email||""}</div>
              <div class="mb-1"><b>Card Number:</b> ${e.card_number||"-"}</div>
              <div class="mb-1"><b>Type:</b> ${e.card_type||"-"}</div>
              <div class="mb-1"><b>Issued:</b> ${x(e.issued_at)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                ${e.status==="pending"?`
                  <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${e.id}">Approve</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${e.id}">Decline</button>
                `:""}
                ${e.status==="approved"?`
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-print" data-id="${e.id}">Mark Printing</button>
                `:""}
                ${e.status==="printing"?`
                  <button class="btn btn-xs bg-purple-600 text-white px-2 py-1 rounded card-issue" data-id="${e.id}">Issue Card</button>
                `:""}
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded card-view" data-id="${e.id}">View</button>
              </div>
            </div>
          `}).join(""):I&&(I.innerHTML=t.map(e=>{const a=i.find(s=>s.id===e.user_id);return`
            <tr>
              <td>${x(e.issued_at)}</td>
              <td>
                <span class="font-semibold">${a?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${a?.email||""}</div>
              </td>
              <td>${e.card_number||"-"}</td>
              <td>${e.card_type||"-"}</td>
              <td>${y(e.status)}</td>
              <td>
                ${e.status==="pending"?`
                  <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${e.id}">Approve</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${e.id}">Decline</button>
                `:""}
                ${e.status==="approved"?`
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-print" data-id="${e.id}">Mark Printing</button>
                `:""}
                ${e.status==="printing"?`
                  <button class="btn btn-xs bg-purple-600 text-white px-2 py-1 rounded card-issue" data-id="${e.id}">Issue Card</button>
                `:""}
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded card-view" data-id="${e.id}">View</button>
              </td>
            </tr>
          `}).join("")),A()}[k,C].forEach(n=>{n&&n.addEventListener("input",L),n&&n.addEventListener("change",L)}),document.getElementById("card-export-csv").onclick=()=>T(t,i);function A(){document.querySelectorAll(".card-view").forEach(n=>{n.onclick=()=>{const r=n.getAttribute("data-id"),e=d.find(s=>s.id===r),a=i.find(s=>s.id===e.user_id);document.getElementById("card-detail-panel").innerHTML=j(e,a),document.getElementById("close-card-detail").onclick=()=>{document.getElementById("card-detail-panel").innerHTML=""}}}),document.querySelectorAll(".card-approve").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-id"),e=prompt("Enter card number (16 digits):");if(!e||e.length<12)return u("Card number required","error");const a=prompt("Enter card type (debit/credit):","debit");if(!a)return u("Card type required","error");const s=prompt("Enter expiry date (YYYY-MM-DD):");if(!s)return u("Expiry date required","error");const b=prompt("Enter CVV (3 digits):");if(!b||b.length<3)return u("CVV required","error");await v.from("cards").update({status:"approved",card_number:e,card_type:a,expiry_date:s,cvv:b,is_active:!0,issued_at:new Date().toISOString()}).eq("id",r);const f=d.find($=>$.id===r),D=i.find($=>$.id===f.user_id);await _({to:D.email,subject:"Card Request Approved",html:`<p>Dear ${D.full_name},<br>Your card request has been approved. Card Number: <b>${e}</b>, Type: <b>${a}</b>.<br>We will notify you when your card is ready.</p>`}),u("Card approved and user notified.","success"),window.location.reload()}}),document.querySelectorAll(".card-print").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-id");await v.from("cards").update({status:"printing"}).eq("id",r),u("Card marked as printing.","success"),window.location.reload()}}),document.querySelectorAll(".card-issue").forEach(n=>{n.onclick=async()=>{const r=n.getAttribute("data-id");await v.from("cards").update({status:"issued"}).eq("id",r);const e=d.find(s=>s.id===r),a=i.find(s=>s.id===e.user_id);await _({to:a.email,subject:"Your Card is Ready",html:`<p>Dear ${a.full_name},<br>Your card is now ready for pickup/use.</p>`}),u("Card issued and user notified.","success"),window.location.reload()}}),document.querySelectorAll(".card-decline").forEach(n=>{n.onclick=()=>{const r=n.getAttribute("data-id");document.getElementById("decline-panel").innerHTML=M(r),document.getElementById("close-decline-modal").onclick=()=>{document.getElementById("decline-panel").innerHTML=""},document.getElementById("decline-form").onsubmit=async function(e){e.preventDefault();const a=this.reason.value.trim();if(!a)return u("Reason required","error");await v.from("cards").update({status:"declined",notes:a}).eq("id",r);const s=d.find(f=>f.id===r),b=i.find(f=>f.id===s.user_id);await _({to:b.email,subject:"Card Request Declined",html:`<p>Dear ${b.full_name},<br>Your card request was declined. Reason: <b>${a}</b></p>`}),u("Card declined and user notified.","success"),window.location.reload()}}})}A()}return{html:"",pageEvents:()=>p()}};export{O as default};
