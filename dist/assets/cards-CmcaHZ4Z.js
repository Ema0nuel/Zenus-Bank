import{s as m}from"./supabaseClient-CL6H8VOx.js";import{A as L}from"./AdminNavbar-ObVEf85P.js";import{r as A}from"./adminAuth-Dn35BI8v.js";import{s as g}from"./toast-DRvdR0y9.js";import{s as h}from"./sendEmail-89Z52C2k.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function p(d){if(!d)return"";const i=new Date(d);return i.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+i.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function f(d){return d==="pending"?'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>':d==="approved"?'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Approved</span>':d==="printing"?'<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Printing</span>':d==="issued"?'<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Issued</span>':d==="declined"?'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Declined</span>':`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${d}</span>`}function D(d,i){return`
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
                ${f(t.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${o?.email||""}</div>
              <div class="mb-1"><b>Card Number:</b> ${t.card_number||"-"}</div>
              <div class="mb-1"><b>Type:</b> ${t.card_type||"-"}</div>
              <div class="mb-1"><b>Issued:</b> ${p(t.issued_at)}</div>
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
                  <td>${p(t.issued_at)}</td>
                  <td>
                    <span class="font-semibold">${o?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${o?.email||""}</div>
                  </td>
                  <td>${t.card_number||"-"}</td>
                  <td>${t.card_type||"-"}</td>
                  <td>${f(t.status)}</td>
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
  `}function B(d,i){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="card-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-card-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Card Details</h2>
        <div class="mb-2"><b>User:</b> ${i?.full_name||"Unknown"} (${i?.email||""})</div>
        <div class="mb-2"><b>Card Number:</b> ${d.card_number||"-"}</div>
        <div class="mb-2"><b>Type:</b> ${d.card_type||"-"}</div>
        <div class="mb-2"><b>Status:</b> ${f(d.status)}</div>
        <div class="mb-2"><b>Issued At:</b> ${p(d.issued_at)}</div>
        <div class="mb-2"><b>Expiry Date:</b> ${d.expiry_date?p(d.expiry_date):"-"}</div>
        <div class="mb-2"><b>CVV:</b> ${d.cvv||"-"}</div>
        <div class="mb-2"><b>Active:</b> ${d.is_active?"Yes":"No"}</div>
      </div>
    </div>
  `}function S(d){return`
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
  `}function q(d,i){const t=["Date","User","Card Number","Type","Status"],o=d.map(b=>{const y=i.find(w=>w.id===b.user_id);return[p(b.issued_at),y?.full_name||"",b.card_number||"",b.card_type||"",b.status].join(",")}),l=[t.join(","),...o].join(`
`),u=new Blob([l],{type:"text/csv"}),c=URL.createObjectURL(u),x=document.createElement("a");x.href=c,x.download="cards.csv",x.click(),URL.revokeObjectURL(c)}const V=async()=>{if(!await A())return{html:"",pageEvents:()=>{}};let{data:d=[]}=await m.from("cards").select("*").order("issued_at",{ascending:!1}).limit(100),{data:i=[]}=await m.from("profiles").select("id,full_name,email"),t=d,o="cards",l=!1,u=localStorage.getItem("admin_dark")==="true";function c(){document.getElementById("app").innerHTML=`
      ${L({activeItem:o,isCollapsed:l,isDark:u})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Card Management</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${D(t,i)}
            </div>
          </div>
        </div>
      </div>
      <div id="card-detail-panel"></div>
      <div id="decline-panel"></div>
    `,document.getElementById("admin-sidebar");const x=document.getElementById("admin-sidebar-overlay"),b=document.getElementById("admin-sidebar-toggle"),y=document.getElementById("admin-sidebar-close");function w(){l=!1,c()}function $(){l=!0,c()}b?.addEventListener("click",w),y?.addEventListener("click",$),x?.addEventListener("click",$),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{u=!u,localStorage.setItem("admin_dark",u?"true":"false"),u?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),c()}),document.querySelectorAll("[data-nav]").forEach(a=>{a.addEventListener("click",r=>{r.preventDefault(),o=a.getAttribute("data-nav"),window.location.href=`/admin/${o}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),u?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const _=document.getElementById("card-search"),k=document.getElementById("card-status-filter"),E=document.getElementById("card-table-body");function C(){let a=_.value.trim().toLowerCase(),r=k.value;t=d.filter(e=>{const s=i.find(v=>v.id===e.user_id);let n=!0;return a&&(n=s?.full_name?.toLowerCase().includes(a)||s?.email?.toLowerCase().includes(a)||(e.card_number||"").includes(a)||(e.card_type||"").toLowerCase().includes(a)),r&&e.status!==r&&(n=!1),n}),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=t.map(e=>{const s=i.find(n=>n.id===e.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${s?.full_name||"Unknown"}</span>
                ${f(e.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${s?.email||""}</div>
              <div class="mb-1"><b>Card Number:</b> ${e.card_number||"-"}</div>
              <div class="mb-1"><b>Type:</b> ${e.card_type||"-"}</div>
              <div class="mb-1"><b>Issued:</b> ${p(e.issued_at)}</div>
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
          `}).join(""):E&&(E.innerHTML=t.map(e=>{const s=i.find(n=>n.id===e.user_id);return`
            <tr>
              <td>${p(e.issued_at)}</td>
              <td>
                <span class="font-semibold">${s?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${s?.email||""}</div>
              </td>
              <td>${e.card_number||"-"}</td>
              <td>${e.card_type||"-"}</td>
              <td>${f(e.status)}</td>
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
          `}).join("")),I()}[_,k].forEach(a=>{a&&a.addEventListener("input",C),a&&a.addEventListener("change",C)}),document.getElementById("card-export-csv").onclick=()=>q(t,i);function I(){document.querySelectorAll(".card-view").forEach(a=>{a.onclick=()=>{const r=a.getAttribute("data-id"),e=d.find(n=>n.id===r),s=i.find(n=>n.id===e.user_id);document.getElementById("card-detail-panel").innerHTML=B(e,s),document.getElementById("close-card-detail").onclick=()=>{document.getElementById("card-detail-panel").innerHTML=""}}}),document.querySelectorAll(".card-approve").forEach(a=>{a.onclick=async()=>{const r=a.getAttribute("data-id"),e=d.find(n=>n.id===r),s=i.find(n=>n.id===e.user_id);await m.from("cards").update({status:"approved",is_active:!0}).eq("id",r),await h({to:s.email,subject:"Card Request Approved",html:`<p>Dear ${s.full_name},<br>Your card request has been approved. Card Number: <b>${e.card_number}</b>, Type: <b>${e.card_type}</b>.<br>We will notify you when your card is ready for printing.</p>`}),g("Card approved and user notified.","success"),window.location.reload()}}),document.querySelectorAll(".card-print").forEach(a=>{a.onclick=async()=>{const r=a.getAttribute("data-id");await m.from("cards").update({status:"printing"}).eq("id",r),g("Card marked as printing.","success"),window.location.reload()}}),document.querySelectorAll(".card-issue").forEach(a=>{a.onclick=async()=>{const r=a.getAttribute("data-id");await m.from("cards").update({status:"issued"}).eq("id",r);const e=d.find(n=>n.id===r),s=i.find(n=>n.id===e.user_id);await h({to:s.email,subject:"Your Card is Ready",html:`<p>Dear ${s.full_name},<br>Your card is now ready for pickup/use.</p>`}),g("Card issued and user notified.","success"),window.location.reload()}}),document.querySelectorAll(".card-decline").forEach(a=>{a.onclick=()=>{const r=a.getAttribute("data-id"),e=d.find(n=>n.id===r),s=i.find(n=>n.id===e.user_id);document.getElementById("decline-panel").innerHTML=S(r),document.getElementById("close-decline-modal").onclick=()=>{document.getElementById("decline-panel").innerHTML=""},document.getElementById("decline-form").onsubmit=async function(n){n.preventDefault();const v=this.reason.value.trim();if(!v)return g("Reason required","error");await m.from("cards").update({status:"declined",notes:v}).eq("id",r),await h({to:s.email,subject:"Card Request Declined",html:`<p>Dear ${s.full_name},<br>Your card request was declined. Reason: <b>${v}</b></p>`}),g("Card declined and user notified.","success"),window.location.reload()}}})}I()}return{html:"",pageEvents:()=>c()}};export{V as default};
