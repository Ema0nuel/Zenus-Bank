import{s as p}from"./supabaseClient-B1HaFb4P.js";import{A as S}from"./AdminNavbar-DXVtneOk.js";import{r as D}from"./adminAuth-Dn35BI8v.js";import{s as v}from"./toast-Dx2DSKhR.js";import{s as $}from"./sendEmail-89Z52C2k.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function w(e){if(!e)return"";const s=new Date(e);return s.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function x(e){return e==="pending"?'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>':e==="approved"?'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Approved</span>':e==="disbursed"?'<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Disbursed</span>':e==="rejected"?'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Rejected</span>':e==="closed"?'<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Closed</span>':`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${e}</span>`}function B(e,s){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="loan-search" placeholder="Search by user, amount, status..." class="border px-3 py-2 rounded w-full md:w-64" />
      <select id="loan-status-filter" class="border px-2 py-2 rounded">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="disbursed">Disbursed</option>
        <option value="rejected">Rejected</option>
        <option value="closed">Closed</option>
      </select>
      <button id="loan-export-csv" class="ml-auto bg-blue-600 text-white px-3 py-2 rounded">Export CSV</button>
    </div>
    <div>
      <div class="block md:hidden">
        ${e.map(n=>{const r=s.find(u=>u.id===n.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${r?.full_name||"Unknown"}</span>
                ${x(n.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${r?.email||""}</div>
              <div class="mb-1"><b>Amount:</b> $${parseFloat(n.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
              <div class="mb-1"><b>Interest:</b> ${n.interest_rate?n.interest_rate+"%":"-"}</div>
              <div class="mb-1"><b>Status:</b> ${x(n.status)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                ${n.status==="pending"?`
                  <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded loan-approve" data-id="${n.id}">Approve</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded loan-reject" data-id="${n.id}">Reject</button>
                `:""}
                ${n.status==="approved"?`
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded loan-disburse" data-id="${n.id}">Disburse</button>
                `:""}
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded loan-view" data-id="${n.id}">View</button>
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
              <th>Amount</th>
              <th>Interest</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="loan-table-body">
            ${e.map(n=>{const r=s.find(u=>u.id===n.user_id);return`
                <tr>
                  <td>${w(n.created_at)}</td>
                  <td>
                    <span class="font-semibold">${r?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${r?.email||""}</div>
                  </td>
                  <td>$${parseFloat(n.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
                  <td>${n.interest_rate?n.interest_rate+"%":"-"}</td>
                  <td>${x(n.status)}</td>
                  <td>
                    ${n.status==="pending"?`
                      <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded loan-approve" data-id="${n.id}">Approve</button>
                      <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded loan-reject" data-id="${n.id}">Reject</button>
                    `:""}
                    ${n.status==="approved"?`
                      <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded loan-disburse" data-id="${n.id}">Disburse</button>
                    `:""}
                    <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded loan-view" data-id="${n.id}">View</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function R(e,s){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="loan-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-loan-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Loan Details</h2>
        <div class="mb-2"><b>User:</b> ${s?.full_name||"Unknown"} (${s?.email||""})</div>
        <div class="mb-2"><b>Amount:</b> $${parseFloat(e.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
        <div class="mb-2"><b>Interest:</b> ${e.interest_rate?e.interest_rate+"%":"-"}</div>
        <div class="mb-2"><b>Status:</b> ${x(e.status)}</div>
        <div class="mb-2"><b>Created:</b> ${w(e.created_at)}</div>
      </div>
    </div>
  `}function q(e){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="reject-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-reject-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Reject Loan Request</h2>
        <form id="reject-form">
          <input type="hidden" name="loan_id" value="${e}" />
          <div class="mb-3">
            <label class="block text-sm mb-1">Reason</label>
            <textarea name="reason" class="w-full border px-3 py-2 rounded" rows="3" required></textarea>
          </div>
          <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
        </form>
      </div>
    </div>
  `}function F(e,s){const n=["Date","User","Amount","Interest","Status"],r=e.map(f=>{const y=s.find(h=>h.id===f.user_id);return[w(f.created_at),y?.full_name||"",f.amount,f.interest_rate||"",f.status].join(",")}),u=[n.join(","),...r].join(`
`),g=new Blob([u],{type:"text/csv"}),c=URL.createObjectURL(g),m=document.createElement("a");m.href=c,m.download="loans.csv",m.click(),URL.revokeObjectURL(c)}const z=async()=>{if(!await D())return{html:"",pageEvents:()=>{}};let{data:e=[]}=await p.from("loan").select("*").order("created_at",{ascending:!1}).limit(100),{data:s=[]}=await p.from("profiles").select("id,full_name,email"),{data:n=[]}=await p.from("accounts").select("*"),r=e,u="loans",g=!1,c=localStorage.getItem("admin_dark")==="true";function m(){document.getElementById("app").innerHTML=`
      ${S({activeItem:u,isCollapsed:g,isDark:c})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Loan Management</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${B(r,s)}
            </div>
          </div>
        </div>
      </div>
      <div id="loan-detail-panel"></div>
      <div id="reject-panel"></div>
    `,document.getElementById("admin-sidebar");const f=document.getElementById("admin-sidebar-overlay"),y=document.getElementById("admin-sidebar-toggle"),h=document.getElementById("admin-sidebar-close");function I(){g=!1,m()}function _(){g=!0,m()}y?.addEventListener("click",I),h?.addEventListener("click",_),f?.addEventListener("click",_),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{c=!c,localStorage.setItem("admin_dark",c?"true":"false"),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),m()}),document.querySelectorAll("[data-nav]").forEach(a=>{a.addEventListener("click",o=>{o.preventDefault(),u=a.getAttribute("data-nav"),window.location.href=`/admin/${u}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),c?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const L=document.getElementById("loan-search"),j=document.getElementById("loan-status-filter"),E=document.getElementById("loan-table-body");function k(){let a=L.value.trim().toLowerCase(),o=j.value;r=e.filter(t=>{const d=s.find(l=>l.id===t.user_id);let i=!0;return a&&(i=d?.full_name?.toLowerCase().includes(a)||d?.email?.toLowerCase().includes(a)||(t.amount+"").includes(a)||(t.status||"").toLowerCase().includes(a)),o&&t.status!==o&&(i=!1),i}),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=r.map(t=>{const d=s.find(i=>i.id===t.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${d?.full_name||"Unknown"}</span>
                ${x(t.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${d?.email||""}</div>
              <div class="mb-1"><b>Amount:</b> $${parseFloat(t.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
              <div class="mb-1"><b>Interest:</b> ${t.interest_rate?t.interest_rate+"%":"-"}</div>
              <div class="mb-1"><b>Status:</b> ${x(t.status)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                ${t.status==="pending"?`
                  <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded loan-approve" data-id="${t.id}">Approve</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded loan-reject" data-id="${t.id}">Reject</button>
                `:""}
                ${t.status==="approved"?`
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded loan-disburse" data-id="${t.id}">Disburse</button>
                `:""}
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded loan-view" data-id="${t.id}">View</button>
              </div>
            </div>
          `}).join(""):E&&(E.innerHTML=r.map(t=>{const d=s.find(i=>i.id===t.user_id);return`
            <tr>
              <td>${w(t.created_at)}</td>
              <td>
                <span class="font-semibold">${d?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${d?.email||""}</div>
              </td>
              <td>$${parseFloat(t.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
              <td>${t.interest_rate?t.interest_rate+"%":"-"}</td>
              <td>${x(t.status)}</td>
              <td>
                ${t.status==="pending"?`
                  <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded loan-approve" data-id="${t.id}">Approve</button>
                  <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded loan-reject" data-id="${t.id}">Reject</button>
                `:""}
                ${t.status==="approved"?`
                  <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded loan-disburse" data-id="${t.id}">Disburse</button>
                `:""}
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded loan-view" data-id="${t.id}">View</button>
              </td>
            </tr>
          `}).join("")),A()}[L,j].forEach(a=>{a&&a.addEventListener("input",k),a&&a.addEventListener("change",k)}),document.getElementById("loan-export-csv").onclick=()=>F(r,s);function A(){document.querySelectorAll(".loan-view").forEach(a=>{a.onclick=()=>{const o=a.getAttribute("data-id"),t=e.find(i=>i.id===o),d=s.find(i=>i.id===t.user_id);document.getElementById("loan-detail-panel").innerHTML=R(t,d),document.getElementById("close-loan-detail").onclick=()=>{document.getElementById("loan-detail-panel").innerHTML=""}}}),document.querySelectorAll(".loan-approve").forEach(a=>{a.onclick=async()=>{const o=a.getAttribute("data-id"),t=prompt("Enter interest rate (%)","5");if(!t||isNaN(t))return v("Interest rate required","error");await p.from("loan").update({status:"approved",interest_rate:parseFloat(t)}).eq("id",o);const d=e.find(l=>l.id===o),i=s.find(l=>l.id===d.user_id);await $({to:i.email,subject:"Loan Approved",html:`<p>Dear ${i.full_name},<br>Your loan request has been approved. Amount: <b>$${d.amount}</b>, Interest: <b>${t}%</b>.</p>`}),v("Loan approved and user notified.","success"),window.location.reload()}}),document.querySelectorAll(".loan-disburse").forEach(a=>{a.onclick=async()=>{const o=a.getAttribute("data-id"),t=e.find(b=>b.id===o),d=n.find(b=>b.user_id===t.user_id);if(!d)return v("No account found for user","error");const i=parseFloat(d.balance)+parseFloat(t.amount);await p.from("accounts").update({balance:i}).eq("id",d.id),await p.from("loan").update({status:"disbursed"}).eq("id",o),await p.from("transactions").insert([{user_id:t.user_id,account_id:d.id,type:"loan_disbursement",amount:t.amount,description:"Loan disbursed",balance_before:d.balance,balance_after:i,status:"completed"}]);const l=s.find(b=>b.id===t.user_id);await $({to:l.email,subject:"Loan Disbursed",html:`<p>Dear ${l.full_name},<br>Your loan of <b>$${t.amount}</b> has been disbursed to your account.</p>`}),v("Loan disbursed, transaction logged, user notified.","success"),window.location.reload()}}),document.querySelectorAll(".loan-reject").forEach(a=>{a.onclick=()=>{const o=a.getAttribute("data-id");document.getElementById("reject-panel").innerHTML=q(o),document.getElementById("close-reject-modal").onclick=()=>{document.getElementById("reject-panel").innerHTML=""},document.getElementById("reject-form").onsubmit=async function(t){t.preventDefault();const d=this.reason.value.trim();if(!d)return v("Reason required","error");await p.from("loan").update({status:"rejected",reason:d}).eq("id",o);const i=e.find(b=>b.id===o),l=s.find(b=>b.id===i.user_id);await $({to:l.email,subject:"Loan Request Rejected",html:`<p>Dear ${l.full_name},<br>Your loan request was rejected. Reason: <b>${d}</b></p>`}),v("Loan rejected and user notified.","success"),window.location.reload()}}})}A()}return{html:"",pageEvents:()=>m()}};export{z as default};
