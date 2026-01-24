import{s as _}from"./supabaseClient-CL6H8VOx.js";import{A as q}from"./AdminNavbar-ObVEf85P.js";import{r as N}from"./adminAuth-Dn35BI8v.js";import{s as f}from"./toast-DRvdR0y9.js";import{s as A}from"./sendEmail-89Z52C2k.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function h(t){if(!t)return"";const l=new Date(t);return l.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+l.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function B(t){return t?t.startsWith("http")?t:`https://biyuydrbirwsbtnymakk.supabase.co/storage/v1/object/public/idme-documents/${t}`:null}function I(t){const l={pending:'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Pending</span>',under_review:'<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Under Review</span>',manual_review:'<span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Manual Review</span>',approved:'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Approved</span>',rejected:'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Rejected</span>',expired:'<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">Expired</span>'};return l[t]||l.pending}function j(t){return{passport:'<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Passport</span>',drivers_license:`<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Driver's License</span>`,national_id:'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">National ID</span>',visa:'<span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">Visa</span>'}[t]||`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${t}</span>`}function V(t,l){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="idme-search" placeholder="Search by name, email, ID number..." class="border dark:border-gray-700 dark:bg-slate-800 px-3 py-2 rounded w-full md:w-64" />
      <select id="idme-status-filter" class="border dark:border-gray-700 dark:bg-slate-800 px-2 py-2 rounded">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="under_review">Under Review</option>
        <option value="manual_review">Manual Review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="expired">Expired</option>
      </select>
      <button id="idme-export-csv" class="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition">Export CSV</button>
    </div>
    <div>
      <!-- Mobile Cards -->
      <div class="block md:hidden space-y-4">
        ${t.map(r=>{const b=l.find(g=>g.id===r.user_id);return`
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 animate-fade-in">
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">${r.first_name} ${r.last_name}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${b?.email||"N/A"}</p>
              </div>
              ${I(r.submission_status)}
            </div>
            <div class="space-y-1 text-sm mb-3">
              <div><b>ID Type:</b> ${j(r.id_type)}</div>
              <div><b>ID #:</b> ${r.id_number}</div>
              <div><b>Submitted:</b> ${h(r.submitted_at)}</div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${r.id}">View Details</button>
              ${r.submission_status==="pending"?`
                <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${r.id}">Start Review</button>
              `:""}
              ${r.submission_status==="manual_review"?`
                <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${r.id}">Approve</button>
                <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${r.id}">Reject</button>
              `:""}
            </div>
          </div>
        `}).join("")}
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 dark:bg-slate-800 border-b dark:border-gray-700">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Name</th>
              <th class="px-6 py-3 text-left font-semibold">Email</th>
              <th class="px-6 py-3 text-left font-semibold">ID Type</th>
              <th class="px-6 py-3 text-left font-semibold">ID Number</th>
              <th class="px-6 py-3 text-left font-semibold">Status</th>
              <th class="px-6 py-3 text-left font-semibold">Submitted</th>
              <th class="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody id="idme-table-body">
            ${t.map(r=>{const b=l.find(g=>g.id===r.user_id);return`
              <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-6 py-4 font-medium">${r.first_name} ${r.last_name}</td>
                <td class="px-6 py-4 text-sm">${b?.email||"N/A"}</td>
                <td class="px-6 py-4">${j(r.id_type)}</td>
                <td class="px-6 py-4 text-sm font-mono">${r.id_number}</td>
                <td class="px-6 py-4">${I(r.submission_status)}</td>
                <td class="px-6 py-4 text-sm">${h(r.submitted_at)}</td>
                <td class="px-6 py-4 flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${r.id}">View</button>
                  ${r.submission_status==="pending"?`
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${r.id}">Start Review</button>
                  `:""}
                  ${r.submission_status==="manual_review"?`
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${r.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${r.id}">Reject</button>
                  `:""}
                </td>
              </tr>
            `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function O(t,l){return`
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto" id="idme-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full my-8 animate-fade-in">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 class="text-2xl font-bold text-white">${t.first_name} ${t.last_name}</h2>
          <button id="close-idme-detail" class="text-white hover:text-blue-100 text-2xl font-bold">&times;</button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b dark:border-gray-700 px-6 overflow-x-auto">
          <button class="idme-detail-tab active px-0 py-3 border-b-2 border-blue-600 font-medium text-gray-900 dark:text-white mr-6 whitespace-nowrap" data-tab="overview">Overview</button>
          <button class="idme-detail-tab px-0 py-3 border-b-2 border-transparent font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 mr-6 whitespace-nowrap" data-tab="documents">Documents</button>
          <button class="idme-detail-tab px-0 py-3 border-b-2 border-transparent font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 whitespace-nowrap" data-tab="history">History</button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Overview Tab -->
          <div class="idme-detail-content active" data-tab="overview">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                <p class="font-medium text-gray-900 dark:text-white">${l?.email||"N/A"}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <p>${I(t.submission_status)}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">ID Type</p>
                <p>${j(t.id_type)}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">ID Number</p>
                <p class="font-mono text-gray-900 dark:text-white">${t.id_number}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Date of Birth</p>
                <p class="text-gray-900 dark:text-white">${new Date(t.date_of_birth).toLocaleDateString()}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Issuing Country</p>
                <p class="text-gray-900 dark:text-white">${t.issuing_country}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Expiry Date</p>
                <p class="text-gray-900 dark:text-white">${new Date(t.expiry_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Submitted</p>
                <p class="text-gray-900 dark:text-white">${h(t.submitted_at)}</p>
              </div>
            </div>

            ${t.rejection_reason?`
              <div class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p class="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">Rejection Reason</p>
                <p class="text-red-800 dark:text-red-300">${t.rejection_reason}</p>
              </div>
            `:""}

            ${t.submission_status==="manual_review"?`
              <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
                <h3 class="font-bold text-yellow-900 dark:text-yellow-200 mb-4">Manual Review Required</h3>
                <div class="flex flex-wrap gap-3">
                  <button id="idme-approve-btn" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-sm transition">✓ Approve</button>
                  <button id="idme-reject-btn" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium text-sm transition">✕ Reject</button>
                </div>
              </div>
            `:""}
          </div>

          <!-- Documents Tab -->
          <div class="idme-detail-content hidden" data-tab="documents">
            <div id="idme-documents-loader" class="flex items-center justify-center py-12">
              <div class="flex flex-col items-center gap-4">
                <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading document images...</p>
              </div>
            </div>
            <div id="idme-documents-container" class="hidden grid grid-cols-1 md:grid-cols-3 gap-4"></div>
          </div>

          <!-- History Tab -->
          <div class="idme-detail-content hidden" data-tab="history">
            <div id="idme-history-container" class="space-y-3">
              <p class="text-gray-500">Loading history...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function M(t){return`
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" id="reject-reason-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Reject Submission</h2>
        <form id="reject-reason-form">
          <input type="hidden" name="submission_id" value="${t}" />
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Rejection</label>
            <textarea name="reason" class="w-full border dark:border-gray-700 dark:bg-slate-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" rows="4" placeholder="e.g., Document unclear, ID expired, etc." required></textarea>
          </div>
          <div class="flex gap-3">
            <button type="submit" class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">Reject</button>
            <button type="button" id="cancel-reject" class="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `}function U(t){return`
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" id="start-review-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Start Manual Review</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">This submission will be marked for manual review. Continue?</p>
        <div class="flex gap-3">
          <button id="confirm-start-review" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition" data-id="${t}">Continue</button>
          <button id="cancel-start-review" class="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition">Cancel</button>
        </div>
      </div>
    </div>
  `}function P(t,l){const r=["Name","Email","ID Type","ID Number","Status","Submitted Date"],b=t.map(x=>{const $=l.find(E=>E.id===x.user_id);return[`${x.first_name} ${x.last_name}`,$?.email||"",x.id_type,x.id_number,x.submission_status,h(x.submitted_at)].map(E=>`"${E}"`).join(",")}),g=[r.join(","),...b].join(`
`),v=new Blob([g],{type:"text/csv"}),k=URL.createObjectURL(v),y=document.createElement("a");y.href=k,y.download=`idme-submissions-${new Date().toISOString().split("T")[0]}.csv`,y.click(),URL.revokeObjectURL(k)}const D=["pending","under_review","manual_review","approved","rejected","expired"],K=async()=>{if(!await N())return{html:"",pageEvents:()=>{}};let{data:t=[]}=await _.from("idme_submissions").select("*").order("submitted_at",{ascending:!1}),{data:l=[]}=await _.from("profiles").select("id,email,full_name"),r=t,b="idme",g=!1,v=localStorage.getItem("admin_dark")==="true",k=(await _.auth.getSession()).data.session.user.id;function y(){document.getElementById("app").innerHTML=`
      ${q({activeItem:b,isCollapsed:g,isDark:v})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">ID.ME Verification Management</h1>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Review and manage identity verification submissions</p>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${V(r,l)}
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <div id="idme-detail-panel"></div>
      <div id="reject-panel"></div>
      <div id="start-review-panel"></div>
    `,x()}function x(){document.getElementById("admin-sidebar");const o=document.getElementById("admin-sidebar-overlay"),d=document.getElementById("admin-sidebar-toggle"),e=document.getElementById("admin-sidebar-close");function n(){g=!1,y()}function i(){g=!0,y()}d?.addEventListener("click",n),e?.addEventListener("click",i),o?.addEventListener("click",i),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{v=!v,localStorage.setItem("admin_dark",v?"true":"false"),v?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),y()}),document.querySelectorAll("[data-nav]").forEach(m=>{m.addEventListener("click",S=>{S.preventDefault(),b=m.getAttribute("data-nav"),window.location.href=`/admin/${b}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),v?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const a=document.getElementById("idme-search"),c=document.getElementById("idme-status-filter");function u(){const m=a.value.trim().toLowerCase(),S=c.value;if(r=t.filter(p=>{const s=l.find(L=>L.id===p.user_id);let w=!0;return m&&(w=`${p.first_name} ${p.last_name}`.toLowerCase().includes(m)||s?.email?.toLowerCase().includes(m)||p.id_number?.toLowerCase().includes(m)||p.id_type?.toLowerCase().includes(m)),S&&p.submission_status!==S&&(w=!1),w}),window.innerWidth<768){const p=document.querySelector(".block.md\\:hidden");p&&(p.innerHTML=r.map(s=>{const w=l.find(L=>L.id===s.user_id);return`
              <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 animate-fade-in">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">${s.first_name} ${s.last_name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${w?.email||"N/A"}</p>
                  </div>
                  ${I(s.submission_status)}
                </div>
                <div class="space-y-1 text-sm mb-3">
                  <div><b>ID Type:</b> ${j(s.id_type)}</div>
                  <div><b>ID #:</b> ${s.id_number}</div>
                  <div><b>Submitted:</b> ${h(s.submitted_at)}</div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${s.id}">View Details</button>
                  ${s.submission_status==="pending"?`
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${s.id}">Start Review</button>
                  `:""}
                  ${s.submission_status==="manual_review"?`
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${s.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${s.id}">Reject</button>
                  `:""}
                </div>
              </div>
            `}).join(""),$())}else{const p=document.getElementById("idme-table-body");p&&(p.innerHTML=r.map(s=>{const w=l.find(L=>L.id===s.user_id);return`
              <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-6 py-4 font-medium">${s.first_name} ${s.last_name}</td>
                <td class="px-6 py-4 text-sm">${w?.email||"N/A"}</td>
                <td class="px-6 py-4">${j(s.id_type)}</td>
                <td class="px-6 py-4 text-sm font-mono">${s.id_number}</td>
                <td class="px-6 py-4">${I(s.submission_status)}</td>
                <td class="px-6 py-4 text-sm">${h(s.submitted_at)}</td>
                <td class="px-6 py-4 flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${s.id}">View</button>
                  ${s.submission_status==="pending"?`
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${s.id}">Start Review</button>
                  `:""}
                  ${s.submission_status==="manual_review"?`
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${s.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${s.id}">Reject</button>
                  `:""}
                </td>
              </tr>
            `}).join("")),$()}}[a,c].forEach(m=>{m&&(m.addEventListener("input",u),m.addEventListener("change",u))}),document.getElementById("idme-export-csv")?.addEventListener("click",()=>{P(r,l)}),$()}function $(){document.querySelectorAll(".idme-view").forEach(o=>{o.addEventListener("click",async()=>{const d=o.getAttribute("data-id"),e=t.find(a=>a.id===d),n=l.find(a=>a.id===e.user_id),i=document.getElementById("idme-detail-panel");i.innerHTML=O(e,n),document.getElementById("close-idme-detail")?.addEventListener("click",()=>{i.innerHTML=""}),document.querySelectorAll(".idme-detail-tab").forEach(a=>{a.addEventListener("click",async()=>{const c=a.getAttribute("data-tab");document.querySelectorAll(".idme-detail-tab").forEach(m=>{m.classList.remove("active","border-blue-600"),m.classList.add("border-transparent","text-gray-600","dark:text-gray-400")}),document.querySelectorAll(".idme-detail-content").forEach(m=>{m.classList.add("hidden")}),a.classList.add("active","border-blue-600"),a.classList.remove("border-transparent","text-gray-600","dark:text-gray-400"),document.querySelector(`.idme-detail-content[data-tab="${c}"]`)?.classList.remove("hidden"),c==="documents"?await E(e):c==="history"&&await H(e.id)})}),document.getElementById("idme-approve-btn")?.addEventListener("click",async()=>{const a=prompt("Approval notes (optional):")||"";await T(e.id,e.user_id,n.email,e,a),i.innerHTML=""}),document.getElementById("idme-reject-btn")?.addEventListener("click",()=>{const a=document.getElementById("reject-panel");a.innerHTML=M(e.id),document.getElementById("cancel-reject")?.addEventListener("click",()=>{a.innerHTML=""}),document.getElementById("reject-reason-form")?.addEventListener("submit",async c=>{c.preventDefault();const u=c.target.reason.value.trim();if(!u)return f("Reason required","error");await R(e.id,e.user_id,n.email,e,u),a.innerHTML="",i.innerHTML=""})})})}),document.querySelectorAll(".idme-start-review").forEach(o=>{o.addEventListener("click",()=>{const d=o.getAttribute("data-id"),e=document.getElementById("start-review-panel");e.innerHTML=U(d),document.getElementById("confirm-start-review")?.addEventListener("click",async()=>{await C(d),e.innerHTML=""}),document.getElementById("cancel-start-review")?.addEventListener("click",()=>{e.innerHTML=""})})}),document.querySelectorAll(".idme-approve").forEach(o=>{o.addEventListener("click",async()=>{const d=o.getAttribute("data-id"),e=t.find(a=>a.id===d),n=l.find(a=>a.id===e.user_id),i=prompt("Approval notes (optional):")||"";await T(e.id,e.user_id,n.email,e,i)})}),document.querySelectorAll(".idme-reject").forEach(o=>{o.addEventListener("click",()=>{const d=o.getAttribute("data-id"),e=document.getElementById("reject-panel");e.innerHTML=M(d),document.getElementById("cancel-reject")?.addEventListener("click",()=>{e.innerHTML=""}),document.getElementById("reject-reason-form")?.addEventListener("submit",async n=>{n.preventDefault();const i=n.target.reason.value.trim();if(!i)return f("Reason required","error");const a=t.find(u=>u.id===d),c=l.find(u=>u.id===a.user_id);await R(d,a.user_id,c.email,a,i),e.innerHTML=""})})})}async function E(o){const d=document.getElementById("idme-documents-loader"),e=document.getElementById("idme-documents-container");if(!(!d||!e)){d.classList.remove("hidden"),e.classList.add("hidden");try{await new Promise(i=>setTimeout(i,500));const n=[{url:o.primary_id_front_url,label:"ID Front",key:"front"},{url:o.primary_id_back_url,label:"ID Back",key:"back"},{url:o.selfie_url,label:"Selfie",key:"selfie"}];e.innerHTML=n.map(i=>i.url?`
            <div class="border dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src="${B(i.url)}" 
                alt="${i.label}" 
                class="w-full h-48 object-cover"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage not available%3C/text%3E%3C/svg%3E'"
              >
              <div class="p-3 bg-gray-50 dark:bg-slate-800">
                <p class="text-sm font-medium">${i.label}</p>
                <a href="${B(i.url)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 text-xs mt-1 inline-block">↗ View Full Size</a>
              </div>
            </div>
          `:`<div class="border-2 border-dashed dark:border-gray-700 rounded-lg p-8 text-center text-gray-500 bg-gray-50 dark:bg-slate-800/50">${i.label}: Not uploaded</div>`).join(""),d.classList.add("hidden"),e.classList.remove("hidden")}catch(n){console.error("Error loading documents:",n),e.innerHTML='<div class="col-span-full text-center text-red-600">Error loading documents</div>',d.classList.add("hidden"),e.classList.remove("hidden")}}}async function H(o){const d=document.getElementById("idme-history-container");if(d)try{const e=t.find(i=>i.id===o);if(!e)return;const n=[];if(n.push({time:e.submitted_at,event:"Submission Created",color:"blue"}),e.updated_at&&e.updated_at!==e.submitted_at&&n.push({time:e.updated_at,event:"Last Updated",color:"orange"}),e.reviewed_at){const i=l.find(a=>a.id===e.reviewed_by);n.push({time:e.reviewed_at,event:`Reviewed by ${i?.full_name||"Admin"}`,color:e.submission_status==="approved"?"green":"red"})}d.innerHTML=`
        <div class="space-y-3">
          ${n.map(i=>`
            <div class="flex items-center gap-3 p-3 border-l-4 border-${i.color}-500 bg-${i.color}-50 dark:bg-${i.color}-900/20 rounded">
              <span class="text-xs text-gray-500 whitespace-nowrap">${h(i.time)}</span>
              <span class="font-medium text-gray-900 dark:text-white">${i.event}</span>
            </div>
          `).join("")}
        </div>
      `}catch(e){console.error("Error loading history:",e),d.innerHTML='<p class="text-red-600">Error loading history</p>'}}async function C(o){try{const d="manual_review";if(!D.includes(d))throw new Error(`Invalid status: ${d}`);const{error:e}=await _.from("idme_submissions").update({submission_status:d,updated_at:new Date().toISOString()}).eq("id",o);if(e)throw e;f("✓ Submission marked for manual review","success"),await new Promise(n=>setTimeout(n,1500)),window.location.reload()}catch(d){console.error("Error:",d),f("Error: "+(d.message||"Failed"),"error")}}async function T(o,d,e,n,i){try{const a="approved";if(!D.includes(a))throw new Error(`Invalid status: ${a}`);const{error:c}=await _.from("idme_submissions").update({submission_status:a,reviewed_at:new Date().toISOString(),reviewed_by:k,updated_at:new Date().toISOString()}).eq("id",o);if(c)throw c;await A({to:e,subject:"Identity Verification Approved",html:`
          <p>Dear ${n.first_name} ${n.last_name},</p>
          <p>Your identity verification submission has been <strong>approved</strong>.</p>
          <ul>
            <li><strong>ID Type:</strong> ${n.id_type.replace(/_/g," ")}</li>
            <li><strong>ID Number:</strong> ${n.id_number}</li>
            <li><strong>Status:</strong> Approved</li>
            ${i?`<li><strong>Notes:</strong> ${i}</li>`:""}
          </ul>
          <p>You can now proceed with full account functionality.</p>
          <p>Best regards,<br>Zenus Bank Verification Team</p>
        `}),f("✓ Submission approved and user notified","success"),await new Promise(u=>setTimeout(u,1500)),window.location.reload()}catch(a){console.error("Error:",a),f("Error: "+(a.message||"Failed"),"error")}}async function R(o,d,e,n,i){try{const a="rejected";if(!D.includes(a))throw new Error(`Invalid status: ${a}`);const{error:c}=await _.from("idme_submissions").update({submission_status:a,rejection_reason:i,reviewed_at:new Date().toISOString(),reviewed_by:k,updated_at:new Date().toISOString()}).eq("id",o);if(c)throw c;await A({to:e,subject:"Identity Verification Rejected",html:`
          <p>Dear ${n.first_name} ${n.last_name},</p>
          <p>Your identity verification submission has been <strong>rejected</strong> and will need to be resubmitted.</p>
          <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 12px; margin: 16px 0;">
            <strong style="color: #991b1b;">Reason:</strong>
            <p style="color: #7f1d1d; margin: 8px 0 0 0;">${i}</p>
          </div>
          <p>Please review the rejection reason and resubmit with the necessary corrections.</p>
          <p>Best regards,<br>Zenus Bank Verification Team</p>
        `}),f("✓ Submission rejected and user notified","success"),await new Promise(u=>setTimeout(u,1500)),window.location.reload()}catch(a){console.error("Error:",a),f("Error: "+(a.message||"Failed"),"error")}}return{html:"",pageEvents:()=>y()}};export{K as default};
