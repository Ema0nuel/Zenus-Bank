import{s as g}from"./supabaseClient-CL6H8VOx.js";import{A as I}from"./AdminNavbar-ObVEf85P.js";import{r as A}from"./adminAuth-Dn35BI8v.js";import{s as p}from"./toast-DRvdR0y9.js";import{s as L}from"./sendEmail-89Z52C2k.js";import{c as w,g as D}from"./cardStatus-CgdHr1-A.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function v(a){return D(a||"pending")}function S(a,i){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="card-search" placeholder="Search by user, card number, type..." class="border px-3 py-2 rounded w-full md:w-64" />
      <button id="card-export-csv" class="ml-auto bg-blue-600 text-white px-3 py-2 rounded">Export CSV</button>
    </div>
    <div>
      <div class="block md:hidden">
        ${a.map(t=>{const o=i.find(l=>l.id===t.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${o?.full_name||"Unknown"}</span>
                ${v(t.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${o?.email||""}</div>
              <div class="mb-1"><b>Card Number:</b> ${t.card_number||"-"}</div>
              <div class="mb-1"><b>Type:</b> ${t.card_type||"-"}</div>
              <div class="mb-1"><b>Expiry:</b> ${t.expiry_date||"-"}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${t.id}">View Details</button>
                ${w(t.status)?`
                <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${t.id}">Mark Approved</button>
                <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${t.id}">Mark Declined</button>
                `:""}
              </div>
            </div>
          `}).join("")}
      </div>
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full text-xs">
          <thead>
            <tr>
              <th>User</th>
              <th>Card Number</th>
              <th>Type</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="card-table-body">
            ${a.map(t=>{const o=i.find(l=>l.id===t.user_id);return`
                <tr>
                  <td>
                    <span class="font-semibold">${o?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${o?.email||""}</div>
                  </td>
                  <td>${t.card_number||"-"}</td>
                  <td>${t.card_type||"-"}</td>
                  <td>${t.expiry_date||"-"}</td>
                  <td>${v(t.status)}</td>
                  <td>
                    <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${t.id}">View</button>
                    ${w(t.status)?`
                    <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${t.id}">Approve</button>
                    <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${t.id}">Decline</button>
                    `:""}
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function q(a,i){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="card-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-card-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Card Details</h2>
        <div class="mb-2"><b>User:</b> ${i?.full_name||"Unknown"} (${i?.email||""})</div>
        <div class="mb-2"><b>Card Number:</b> ${a.card_number||"-"}</div>
        <div class="mb-2"><b>Type:</b> ${a.card_type||"-"}</div>
        <div class="mb-2"><b>Status:</b> ${v(a.status)}</div>
        <div class="mb-2"><b>Expiry Date:</b> ${a.expiry_date||"-"}</div>
        <div class="mb-2"><b>CVV:</b> ${a.cvv||"-"}</div>
      </div>
    </div>
  `}function j(a){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="decline-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-decline-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Decline Card Request</h2>
        <form id="decline-form">
          <input type="hidden" name="card_id" value="${a}" />
          <div class="mb-3">
            <label class="block text-sm mb-1">Reason</label>
            <textarea name="reason" class="w-full border px-3 py-2 rounded" rows="3" required></textarea>
          </div>
          <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded">Decline</button>
        </form>
      </div>
    </div>
  `}function T(a,i){const t=["User","Email","Card Number","Type","Expiry"],o=a.map(b=>{const f=i.find(h=>h.id===b.user_id);return[f?.full_name||"",f?.email||"",b.card_number||"",b.card_type||"",b.expiry_date||""].join(",")}),l=[t.join(","),...o].join(`
`),c=new Blob([l],{type:"text/csv"}),u=URL.createObjectURL(c),m=document.createElement("a");m.href=u,m.download="cards.csv",m.click(),URL.revokeObjectURL(u)}const O=async()=>{if(!await A())return{html:"",pageEvents:()=>{}};let{data:a=[]}=await g.from("cards").select("*").order("issued_at",{ascending:!1}).limit(100),{data:i=[]}=await g.from("profiles").select("id,full_name,email"),t=a,o="cards",l=!1,c=localStorage.getItem("admin_dark")==="true";function u(){document.getElementById("app").innerHTML=`
      ${I({activeItem:o,isCollapsed:l,isDark:c})}
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
    `,document.getElementById("admin-sidebar");const m=document.getElementById("admin-sidebar-overlay"),b=document.getElementById("admin-sidebar-toggle"),f=document.getElementById("admin-sidebar-close");function h(){l=!1,u()}function $(){l=!0,u()}b?.addEventListener("click",h),f?.addEventListener("click",$),m?.addEventListener("click",$),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{c=!c,localStorage.setItem("admin_dark",c?"true":"false"),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),u()}),document.querySelectorAll("[data-nav]").forEach(d=>{d.addEventListener("click",e=>{e.preventDefault(),o=d.getAttribute("data-nav"),window.location.href=`/admin/${o}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const E=document.getElementById("card-search"),_=document.getElementById("card-table-body");function k(){let d=E.value.trim().toLowerCase();t=a.filter(e=>{const r=i.find(n=>n.id===e.user_id);let s=!0;return d&&(s=r?.full_name?.toLowerCase().includes(d)||r?.email?.toLowerCase().includes(d)||(e.card_number||"").includes(d)||(e.card_type||"").toLowerCase().includes(d)),s}),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=t.map(e=>{const r=i.find(s=>s.id===e.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${r?.full_name||"Unknown"}</span>
                ${v(e.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${r?.email||""}</div>
              <div class="mb-1"><b>Card Number:</b> ${e.card_number||"-"}</div>
              <div class="mb-1"><b>Type:</b> ${e.card_type||"-"}</div>
              <div class="mb-1"><b>Expiry:</b> ${e.expiry_date||"-"}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${e.id}">View Details</button>
                ${w(e.status)?`
                <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${e.id}">Mark Approved</button>
                <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${e.id}">Mark Declined</button>
                `:""}
              </div>
            </div>
          `}).join(""):_&&(_.innerHTML=t.map(e=>{const r=i.find(s=>s.id===e.user_id);return`
            <tr>
              <td>
                <span class="font-semibold">${r?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${r?.email||""}</div>
              </td>
              <td>${e.card_number||"-"}</td>
              <td>${e.card_type||"-"}</td>
              <td>${e.expiry_date||"-"}</td>
              <td>${v(e.status)}</td>
              <td>
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${e.id}">View</button>
                ${w(e.status)?`
                <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${e.id}">Approve</button>
                <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${e.id}">Decline</button>
                `:""}
              </td>
            </tr>
          `}).join("")),C()}[E].forEach(d=>{d&&d.addEventListener("input",k),d&&d.addEventListener("change",k)}),document.getElementById("card-export-csv").onclick=()=>T(t,i);function C(){document.querySelectorAll(".card-view").forEach(d=>{d.onclick=()=>{const e=d.getAttribute("data-id"),r=a.find(n=>n.id===e),s=i.find(n=>n.id===r.user_id);document.getElementById("card-detail-panel").innerHTML=q(r,s),document.getElementById("close-card-detail").onclick=()=>{document.getElementById("card-detail-panel").innerHTML=""}}}),document.querySelectorAll(".card-approve").forEach(d=>{d.onclick=async()=>{const e=d.getAttribute("data-id"),r=a.find(n=>n.id===e),s=i.find(n=>n.id===r.user_id);try{const{error:n}=await g.from("cards").update({status:"approved"}).eq("id",e);if(n)throw n;try{await L({to:s.email,subject:"Card Request Approved",html:`<p>Dear ${s.full_name},<br>Your card request has been approved. Card Number: <b>${r.card_number}</b>, Type: <b>${r.card_type}</b>.<br>We will notify you when your card is ready for pickup.</p>`})}catch(x){console.warn("Email send failed, but continuing:",x)}}catch(n){console.error("Card approval error:",n),p("Failed to approve card","error");return}p("Card approved and user notified.","success"),window.location.reload()}}),document.querySelectorAll(".card-decline").forEach(d=>{d.onclick=()=>{const e=d.getAttribute("data-id"),r=a.find(n=>n.id===e),s=i.find(n=>n.id===r.user_id);document.getElementById("decline-panel").innerHTML=j(e),document.getElementById("close-decline-modal").onclick=()=>{document.getElementById("decline-panel").innerHTML=""},document.getElementById("decline-form").onsubmit=async function(n){n.preventDefault();const x=this.reason.value.trim();if(!x)return p("Reason required","error");try{const{error:y}=await g.from("cards").update({status:"declined"}).eq("id",e);if(y)throw y;try{await L({to:s.email,subject:"Card Request Declined",html:`<p>Dear ${s.full_name},<br>Your card request was declined. Reason: <b>${x}</b></p>`})}catch(B){console.warn("Email send failed, but continuing:",B)}}catch(y){console.error("Card decline error:",y),p("Failed to decline card","error");return}p("Card declined and user notified.","success"),window.location.reload()}}})}C()}return{html:"",pageEvents:()=>u()}};export{O as default};
