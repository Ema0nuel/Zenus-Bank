import{s as u}from"./supabaseClient-CL6H8VOx.js";import{A as q}from"./AdminNavbar-DXVtneOk.js";import{r as T}from"./adminAuth-Dn35BI8v.js";import{s as f}from"./toast-DRvdR0y9.js";import{s as _}from"./sendEmail-89Z52C2k.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function y(a){if(!a)return"";const s=new Date(a);return s.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+s.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function x(a){return a==="pending"?'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>':a==="approved"?'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Approved</span>':a==="disbursed"?'<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Disbursed</span>':a==="rejected"?'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Rejected</span>':a==="closed"?'<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">Closed</span>':`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${a}</span>`}function U(a,s){return`
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
        ${a.map(n=>{const l=s.find(b=>b.id===n.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${l?.full_name||"Unknown"}</span>
                ${x(n.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${l?.email||""}</div>
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
            ${a.map(n=>{const l=s.find(b=>b.id===n.user_id);return`
                <tr>
                  <td>${y(n.created_at)}</td>
                  <td>
                    <span class="font-semibold">${l?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${l?.email||""}</div>
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
  `}function C(a,s){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="loan-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-loan-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Loan Details</h2>
        <div class="mb-2"><b>User:</b> ${s?.full_name||"Unknown"} (${s?.email||""})</div>
        <div class="mb-2"><b>Amount:</b> $${parseFloat(a.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
        <div class="mb-2"><b>Interest:</b> ${a.interest_rate?a.interest_rate+"%":"-"}</div>
        <div class="mb-2"><b>Status:</b> ${x(a.status)}</div>
        <div class="mb-2"><b>Created:</b> ${y(a.created_at)}</div>
      </div>
    </div>
  `}function M(a){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="reject-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-reject-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Reject Loan Request</h2>
        <form id="reject-form">
          <input type="hidden" name="loan_id" value="${a}" />
          <div class="mb-3">
            <label class="block text-sm mb-1">Reason</label>
            <textarea name="reason" class="w-full border px-3 py-2 rounded" rows="3" required></textarea>
          </div>
          <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
        </form>
      </div>
    </div>
  `}function H(a,s){const n=["Date","User","Amount","Interest","Status"],l=a.map(v=>{const h=s.find($=>$.id===v.user_id);return[y(v.created_at),h?.full_name||"",v.amount,v.interest_rate||"",v.status].join(",")}),b=[n.join(","),...l].join(`
`),g=new Blob([b],{type:"text/csv"}),m=URL.createObjectURL(g),p=document.createElement("a");p.href=m,p.download="loans.csv",p.click(),URL.revokeObjectURL(m)}const G=async()=>{if(!await T())return{html:"",pageEvents:()=>{}};let{data:a=[]}=await u.from("loan").select("*").order("created_at",{ascending:!1}).limit(100),{data:s=[]}=await u.from("profiles").select("id,full_name,email"),{data:n=[]}=await u.from("accounts").select("*"),l=a,b="loans",g=!1,m=localStorage.getItem("admin_dark")==="true";function p(){document.getElementById("app").innerHTML=`
      ${q({activeItem:b,isCollapsed:g,isDark:m})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Loan Management</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${U(l,s)}
            </div>
          </div>
        </div>
      </div>
      <div id="loan-detail-panel"></div>
      <div id="reject-panel"></div>
    `,document.getElementById("admin-sidebar");const v=document.getElementById("admin-sidebar-overlay"),h=document.getElementById("admin-sidebar-toggle"),$=document.getElementById("admin-sidebar-close");function F(){g=!1,p()}function L(){g=!0,p()}h?.addEventListener("click",F),$?.addEventListener("click",L),v?.addEventListener("click",L),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{m=!m,localStorage.setItem("admin_dark",m?"true":"false"),m?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),p()}),document.querySelectorAll("[data-nav]").forEach(o=>{o.addEventListener("click",i=>{i.preventDefault(),b=o.getAttribute("data-nav"),window.location.href=`/admin/${b}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),m?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const E=document.getElementById("loan-search"),j=document.getElementById("loan-status-filter"),k=document.getElementById("loan-table-body");function A(){let o=E.value.trim().toLowerCase(),i=j.value;l=a.filter(t=>{const e=s.find(r=>r.id===t.user_id);let d=!0;return o&&(d=e?.full_name?.toLowerCase().includes(o)||e?.email?.toLowerCase().includes(o)||(t.amount+"").includes(o)||(t.status||"").toLowerCase().includes(o)),i&&t.status!==i&&(d=!1),d}),window.innerWidth<768?document.querySelector(".block.md\\:hidden").innerHTML=l.map(t=>{const e=s.find(d=>d.id===t.user_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${e?.full_name||"Unknown"}</span>
                ${x(t.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${e?.email||""}</div>
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
          `}).join(""):k&&(k.innerHTML=l.map(t=>{const e=s.find(d=>d.id===t.user_id);return`
            <tr>
              <td>${y(t.created_at)}</td>
              <td>
                <span class="font-semibold">${e?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${e?.email||""}</div>
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
          `}).join("")),I()}[E,j].forEach(o=>{o&&o.addEventListener("input",A),o&&o.addEventListener("change",A)}),document.getElementById("loan-export-csv").onclick=()=>H(l,s);function I(){document.querySelectorAll(".loan-view").forEach(o=>{o.onclick=()=>{const i=o.getAttribute("data-id"),t=a.find(d=>d.id===i),e=s.find(d=>d.id===t.user_id);document.getElementById("loan-detail-panel").innerHTML=C(t,e),document.getElementById("close-loan-detail").onclick=()=>{document.getElementById("loan-detail-panel").innerHTML=""}}}),document.querySelectorAll(".loan-approve").forEach(o=>{o.onclick=async()=>{const i=o.getAttribute("data-id"),t=prompt("Enter interest rate (%)","5");if(!t||isNaN(t))return f("Interest rate required","error");try{const e=a.find(w=>w.id===i),d=s.find(w=>w.id===e.user_id),r=n.find(w=>w.user_id===e.user_id);if(!r)return f("No account found for user","error");const c=parseFloat(r.balance||0)+parseFloat(e.amount||0),S=parseFloat(r.loan||0)+parseFloat(e.amount||0),{error:B}=await u.from("loan").update({status:"approved",interest_rate:parseFloat(t)}).eq("id",i);if(B)throw B;const{error:D}=await u.from("accounts").update({balance:c,loan:S}).eq("id",r.id);if(D)throw D;const{error:R}=await u.from("transactions").insert({user_id:e.user_id,account_id:r.id,type:"deposit",amount:parseFloat(e.amount),description:`Loan disbursement - ${t}% interest rate`,balance_before:parseFloat(r.balance||0),balance_after:c,status:"completed"});if(R)throw R;await _({to:d.email,subject:"Loan Approved and Disbursed",html:`
        <p>Dear ${d.full_name},</p>
        <p>Your loan request has been approved and disbursed:</p>
        <ul>
          <li>Amount: <b>$${parseFloat(e.amount).toLocaleString()}</b></li>
          <li>Interest Rate: <b>${t}%</b></li>
          <li>New Account Balance: <b>$${c.toLocaleString()}</b></li>
          <li>Total Loan Balance: <b>$${S.toLocaleString()}</b></li>
        </ul>
        <p>The funds have been added to your account.</p>
      `}),f("Loan approved, disbursed and user notified.","success"),window.location.reload()}catch(e){console.error(e),f("Error processing loan approval: "+e.message,"error")}}}),document.querySelectorAll(".loan-disburse").forEach(o=>{o.onclick=async()=>{const i=o.getAttribute("data-id"),t=a.find(c=>c.id===i),e=n.find(c=>c.user_id===t.user_id);if(!e)return f("No account found for user","error");const d=parseFloat(e.balance)+parseFloat(t.amount);await u.from("accounts").update({balance:d}).eq("id",e.id),await u.from("loan").update({status:"disbursed"}).eq("id",i),await u.from("transactions").insert([{user_id:t.user_id,account_id:e.id,type:"loan_disbursement",amount:t.amount,description:"Loan disbursed",balance_before:e.balance,balance_after:d,status:"completed"}]);const r=s.find(c=>c.id===t.user_id);await _({to:r.email,subject:"Loan Disbursed",html:`<p>Dear ${r.full_name},<br>Your loan of <b>$${t.amount}</b> has been disbursed to your account.</p>`}),f("Loan disbursed, transaction logged, user notified.","success"),window.location.reload()}}),document.querySelectorAll(".loan-reject").forEach(o=>{o.onclick=()=>{const i=o.getAttribute("data-id");document.getElementById("reject-panel").innerHTML=M(i),document.getElementById("close-reject-modal").onclick=()=>{document.getElementById("reject-panel").innerHTML=""},document.getElementById("reject-form").onsubmit=async function(t){t.preventDefault();const e=this.reason.value.trim();if(!e)return f("Reason required","error");await u.from("loan").update({status:"rejected",reason:e}).eq("id",i);const d=a.find(c=>c.id===i),r=s.find(c=>c.id===d.user_id);await _({to:r.email,subject:"Loan Request Rejected",html:`<p>Dear ${r.full_name},<br>Your loan request was rejected. Reason: <b>${e}</b></p>`}),f("Loan rejected and user notified.","success"),window.location.reload()}}})}I()}return{html:"",pageEvents:()=>p()}};export{G as default};
