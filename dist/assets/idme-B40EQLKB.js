import{s as k}from"./supabaseClient-CL6H8VOx.js";import{A as N}from"./AdminNavbar-ObVEf85P.js";import{r as q}from"./adminAuth-Dn35BI8v.js";import{s as f}from"./toast-DRvdR0y9.js";import{s as A}from"./sendEmail-89Z52C2k.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function h(t){if(!t)return"";const l=new Date(t);return l.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+l.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function B(t){return t?t.startsWith("http")?t:`https://biyuydrbirwsbtnymakk.supabase.co/storage/v1/object/public/idme-documents/${t}`:null}function I(t){const l={pending:'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Pending</span>',under_review:'<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Under Review</span>',manual_review:'<span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Manual Review</span>',approved:'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Approved</span>',rejected:'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Rejected</span>',expired:'<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">Expired</span>'};return l[t]||l.pending}function S(t){return{passport:'<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Passport</span>',drivers_license:`<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Driver's License</span>`,national_id:'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">National ID</span>',visa:'<span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">Visa</span>'}[t]||`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${t}</span>`}function V(t,l){return`
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
        ${t.map(i=>{const b=l.find(g=>g.id===i.user_id);return`
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 animate-fade-in">
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">${i.first_name} ${i.last_name}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${b?.email||"N/A"}</p>
              </div>
              ${I(i.submission_status)}
            </div>
            <div class="space-y-1 text-sm mb-3">
              <div><b>ID Type:</b> ${S(i.id_type)}</div>
              <div><b>ID #:</b> ${i.id_number}</div>
              <div><b>Submitted:</b> ${h(i.submitted_at)}</div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${i.id}">View Details</button>
              ${i.submission_status==="pending"?`
                <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${i.id}">Start Review</button>
              `:""}
              ${i.submission_status==="manual_review"?`
                <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${i.id}">Approve</button>
                <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${i.id}">Reject</button>
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
            ${t.map(i=>{const b=l.find(g=>g.id===i.user_id);return`
              <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-6 py-4 font-medium">${i.first_name} ${i.last_name}</td>
                <td class="px-6 py-4 text-sm">${b?.email||"N/A"}</td>
                <td class="px-6 py-4">${S(i.id_type)}</td>
                <td class="px-6 py-4 text-sm font-mono">${i.id_number}</td>
                <td class="px-6 py-4">${I(i.submission_status)}</td>
                <td class="px-6 py-4 text-sm">${h(i.submitted_at)}</td>
                <td class="px-6 py-4 flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${i.id}">View</button>
                  ${i.submission_status==="pending"?`
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${i.id}">Start Review</button>
                  `:""}
                  ${i.submission_status==="manual_review"?`
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${i.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${i.id}">Reject</button>
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
          <button class="idme-detail-tab px-0 py-3 border-b-2 border-transparent font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 mr-6 whitespace-nowrap" data-tab="credentials">IDME Credentials</button>
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
                <p>${S(t.id_type)}</p>
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

          <!-- IDME Credentials Tab -->
          <div class="idme-detail-content hidden" data-tab="credentials">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800/50">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">IDME Email</p>
                <div class="flex items-center gap-2">
                  <p class="font-mono text-gray-900 dark:text-white break-all">${t.idme_email||"Not provided"}</p>
                  ${t.idme_email?`<button class="copy-credential text-blue-600 hover:text-blue-800 text-sm" data-value="${t.idme_email}" title="Copy"><i class="fa fa-copy"></i></button>`:""}
                </div>
              </div>

              <div class="p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800/50">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Social Security Number (SSN)</p>
                <div class="flex items-center gap-2">
                  <p class="font-mono text-gray-900 dark:text-white">${t.idme_ssn||"Not provided"}</p>
                  ${t.idme_ssn?`<button class="copy-credential text-blue-600 hover:text-blue-800 text-sm" data-value="${t.idme_ssn}" title="Copy"><i class="fa fa-copy"></i></button>`:""}
                </div>
              </div>

              <div class="p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800/50 md:col-span-2">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">IDME Password</p>
                <div class="flex items-center gap-2">
                  <input type="password" id="idme-password-field" value="${t.idme_password||"Not provided"}" readonly class="flex-1 font-mono px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-600">
                  ${t.idme_password?`
                    <button id="toggle-password-visibility" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition" title="Toggle visibility"><i class="fa fa-eye"></i></button>
                    <button class="copy-credential px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition" data-value="${t.idme_password}" title="Copy"><i class="fa fa-copy"></i></button>
                  `:""}
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">⚠️ Handle passwords with care. Never share outside secure channels.</p>
              </div>
            </div>

            <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p class="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2"><i class="fa fa-lock mr-2"></i>Security Note</p>
              <p class="text-blue-800 dark:text-blue-300 text-sm">All sensitive credentials are encrypted at rest. Only admins can view this information. Ensure you comply with security and privacy policies.</p>
            </div>
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
  `}function R(t){return`
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
  `}function P(t,l){const i=["Name","Email","ID Type","ID Number","Status","Submitted Date"],b=t.map(x=>{const E=l.find($=>$.id===x.user_id);return[`${x.first_name} ${x.last_name}`,E?.email||"",x.id_type,x.id_number,x.submission_status,h(x.submitted_at)].map($=>`"${$}"`).join(",")}),g=[i.join(","),...b].join(`
`),v=new Blob([g],{type:"text/csv"}),_=URL.createObjectURL(v),y=document.createElement("a");y.href=_,y.download=`idme-submissions-${new Date().toISOString().split("T")[0]}.csv`,y.click(),URL.revokeObjectURL(_)}const D=["pending","under_review","manual_review","approved","rejected","expired"],K=async()=>{if(!await q())return{html:"",pageEvents:()=>{}};let{data:t=[]}=await k.from("idme_submissions").select("*").order("submitted_at",{ascending:!1}),{data:l=[]}=await k.from("profiles").select("id,email,full_name"),i=t,b="idme",g=!1,v=localStorage.getItem("admin_dark")==="true",_=(await k.auth.getSession()).data.session.user.id;function y(){document.getElementById("app").innerHTML=`
      ${N({activeItem:b,isCollapsed:g,isDark:v})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">ID.ME Verification Management</h1>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Review and manage identity verification submissions</p>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${V(i,l)}
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <div id="idme-detail-panel"></div>
      <div id="reject-panel"></div>
      <div id="start-review-panel"></div>
    `,x()}function x(){document.getElementById("admin-sidebar");const o=document.getElementById("admin-sidebar-overlay"),d=document.getElementById("admin-sidebar-toggle"),e=document.getElementById("admin-sidebar-close");function s(){g=!1,y()}function r(){g=!0,y()}d?.addEventListener("click",s),e?.addEventListener("click",r),o?.addEventListener("click",r),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{v=!v,localStorage.setItem("admin_dark",v?"true":"false"),v?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),y()}),document.querySelectorAll("[data-nav]").forEach(u=>{u.addEventListener("click",j=>{j.preventDefault(),b=u.getAttribute("data-nav"),window.location.href=`/admin/${b}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),v?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const a=document.getElementById("idme-search"),c=document.getElementById("idme-status-filter");function m(){const u=a.value.trim().toLowerCase(),j=c.value;if(i=t.filter(p=>{const n=l.find(L=>L.id===p.user_id);let w=!0;return u&&(w=`${p.first_name} ${p.last_name}`.toLowerCase().includes(u)||n?.email?.toLowerCase().includes(u)||p.id_number?.toLowerCase().includes(u)||p.id_type?.toLowerCase().includes(u)),j&&p.submission_status!==j&&(w=!1),w}),window.innerWidth<768){const p=document.querySelector(".block.md\\:hidden");p&&(p.innerHTML=i.map(n=>{const w=l.find(L=>L.id===n.user_id);return`
              <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 animate-fade-in">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">${n.first_name} ${n.last_name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${w?.email||"N/A"}</p>
                  </div>
                  ${I(n.submission_status)}
                </div>
                <div class="space-y-1 text-sm mb-3">
                  <div><b>ID Type:</b> ${S(n.id_type)}</div>
                  <div><b>ID #:</b> ${n.id_number}</div>
                  <div><b>Submitted:</b> ${h(n.submitted_at)}</div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${n.id}">View Details</button>
                  ${n.submission_status==="pending"?`
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${n.id}">Start Review</button>
                  `:""}
                  ${n.submission_status==="manual_review"?`
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${n.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${n.id}">Reject</button>
                  `:""}
                </div>
              </div>
            `}).join(""),E())}else{const p=document.getElementById("idme-table-body");p&&(p.innerHTML=i.map(n=>{const w=l.find(L=>L.id===n.user_id);return`
              <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-6 py-4 font-medium">${n.first_name} ${n.last_name}</td>
                <td class="px-6 py-4 text-sm">${w?.email||"N/A"}</td>
                <td class="px-6 py-4">${S(n.id_type)}</td>
                <td class="px-6 py-4 text-sm font-mono">${n.id_number}</td>
                <td class="px-6 py-4">${I(n.submission_status)}</td>
                <td class="px-6 py-4 text-sm">${h(n.submitted_at)}</td>
                <td class="px-6 py-4 flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${n.id}">View</button>
                  ${n.submission_status==="pending"?`
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${n.id}">Start Review</button>
                  `:""}
                  ${n.submission_status==="manual_review"?`
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${n.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${n.id}">Reject</button>
                  `:""}
                </td>
              </tr>
            `}).join("")),E()}}[a,c].forEach(u=>{u&&(u.addEventListener("input",m),u.addEventListener("change",m))}),document.getElementById("idme-export-csv")?.addEventListener("click",()=>{P(i,l)}),E()}function E(){document.querySelectorAll(".idme-view").forEach(o=>{o.addEventListener("click",async()=>{const d=o.getAttribute("data-id"),e=t.find(a=>a.id===d),s=l.find(a=>a.id===e.user_id),r=document.getElementById("idme-detail-panel");r.innerHTML=O(e,s),document.getElementById("close-idme-detail")?.addEventListener("click",()=>{r.innerHTML=""}),document.querySelectorAll(".copy-credential").forEach(a=>{a.addEventListener("click",c=>{const m=a.getAttribute("data-value");navigator.clipboard.writeText(m).then(()=>{const u=a.innerHTML;a.innerHTML='<i class="fa fa-check"></i>',setTimeout(()=>{a.innerHTML=u},2e3)})})}),document.getElementById("toggle-password-visibility")?.addEventListener("click",a=>{const c=document.getElementById("idme-password-field"),m=a.currentTarget.querySelector("i");c.type==="password"?(c.type="text",m.classList.remove("fa-eye"),m.classList.add("fa-eye-slash")):(c.type="password",m.classList.remove("fa-eye-slash"),m.classList.add("fa-eye"))}),document.querySelectorAll(".idme-detail-tab").forEach(a=>{a.addEventListener("click",async()=>{const c=a.getAttribute("data-tab");document.querySelectorAll(".idme-detail-tab").forEach(u=>{u.classList.remove("active","border-blue-600"),u.classList.add("border-transparent","text-gray-600","dark:text-gray-400")}),document.querySelectorAll(".idme-detail-content").forEach(u=>{u.classList.add("hidden")}),a.classList.add("active","border-blue-600"),a.classList.remove("border-transparent","text-gray-600","dark:text-gray-400"),document.querySelector(`.idme-detail-content[data-tab="${c}"]`)?.classList.remove("hidden"),c==="documents"?await $(e):c==="history"&&await H(e.id)})}),document.getElementById("idme-approve-btn")?.addEventListener("click",async()=>{const a=prompt("Approval notes (optional):")||"";await T(e.id,e.user_id,s.email,e,a),r.innerHTML=""}),document.getElementById("idme-reject-btn")?.addEventListener("click",()=>{const a=document.getElementById("reject-panel");a.innerHTML=R(e.id),document.getElementById("cancel-reject")?.addEventListener("click",()=>{a.innerHTML=""}),document.getElementById("reject-reason-form")?.addEventListener("submit",async c=>{c.preventDefault();const m=c.target.reason.value.trim();if(!m)return f("Reason required","error");await M(e.id,e.user_id,s.email,e,m),a.innerHTML="",r.innerHTML=""})})})}),document.querySelectorAll(".idme-start-review").forEach(o=>{o.addEventListener("click",()=>{const d=o.getAttribute("data-id"),e=document.getElementById("start-review-panel");e.innerHTML=U(d),document.getElementById("confirm-start-review")?.addEventListener("click",async()=>{await C(d),e.innerHTML=""}),document.getElementById("cancel-start-review")?.addEventListener("click",()=>{e.innerHTML=""})})}),document.querySelectorAll(".idme-approve").forEach(o=>{o.addEventListener("click",async()=>{const d=o.getAttribute("data-id"),e=t.find(a=>a.id===d),s=l.find(a=>a.id===e.user_id),r=prompt("Approval notes (optional):")||"";await T(e.id,e.user_id,s.email,e,r)})}),document.querySelectorAll(".idme-reject").forEach(o=>{o.addEventListener("click",()=>{const d=o.getAttribute("data-id"),e=document.getElementById("reject-panel");e.innerHTML=R(d),document.getElementById("cancel-reject")?.addEventListener("click",()=>{e.innerHTML=""}),document.getElementById("reject-reason-form")?.addEventListener("submit",async s=>{s.preventDefault();const r=s.target.reason.value.trim();if(!r)return f("Reason required","error");const a=t.find(m=>m.id===d),c=l.find(m=>m.id===a.user_id);await M(d,a.user_id,c.email,a,r),e.innerHTML=""})})})}async function $(o){const d=document.getElementById("idme-documents-loader"),e=document.getElementById("idme-documents-container");if(!(!d||!e)){d.classList.remove("hidden"),e.classList.add("hidden");try{await new Promise(r=>setTimeout(r,500));const s=[{url:o.primary_id_front_url,label:"ID Front",key:"front"},{url:o.primary_id_back_url,label:"ID Back",key:"back"},{url:o.selfie_url,label:"Selfie",key:"selfie"}];e.innerHTML=s.map(r=>r.url?`
            <div class="border dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src="${B(r.url)}" 
                alt="${r.label}" 
                class="w-full h-48 object-cover"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage not available%3C/text%3E%3C/svg%3E'"
              >
              <div class="p-3 bg-gray-50 dark:bg-slate-800">
                <p class="text-sm font-medium">${r.label}</p>
                <a href="${B(r.url)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 text-xs mt-1 inline-block">↗ View Full Size</a>
              </div>
            </div>
          `:`<div class="border-2 border-dashed dark:border-gray-700 rounded-lg p-8 text-center text-gray-500 bg-gray-50 dark:bg-slate-800/50">${r.label}: Not uploaded</div>`).join(""),d.classList.add("hidden"),e.classList.remove("hidden")}catch(s){console.error("Error loading documents:",s),e.innerHTML='<div class="col-span-full text-center text-red-600">Error loading documents</div>',d.classList.add("hidden"),e.classList.remove("hidden")}}}async function H(o){const d=document.getElementById("idme-history-container");if(d)try{const e=t.find(r=>r.id===o);if(!e)return;const s=[];if(s.push({time:e.submitted_at,event:"Submission Created",color:"blue"}),e.updated_at&&e.updated_at!==e.submitted_at&&s.push({time:e.updated_at,event:"Last Updated",color:"orange"}),e.reviewed_at){const r=l.find(a=>a.id===e.reviewed_by);s.push({time:e.reviewed_at,event:`Reviewed by ${r?.full_name||"Admin"}`,color:e.submission_status==="approved"?"green":"red"})}d.innerHTML=`
        <div class="space-y-3">
          ${s.map(r=>`
            <div class="flex items-center gap-3 p-3 border-l-4 border-${r.color}-500 bg-${r.color}-50 dark:bg-${r.color}-900/20 rounded">
              <span class="text-xs text-gray-500 whitespace-nowrap">${h(r.time)}</span>
              <span class="font-medium text-gray-900 dark:text-white">${r.event}</span>
            </div>
          `).join("")}
        </div>
      `}catch(e){console.error("Error loading history:",e),d.innerHTML='<p class="text-red-600">Error loading history</p>'}}async function C(o){try{const d="manual_review";if(!D.includes(d))throw new Error(`Invalid status: ${d}`);const{error:e}=await k.from("idme_submissions").update({submission_status:d,updated_at:new Date().toISOString()}).eq("id",o);if(e)throw e;f("✓ Submission marked for manual review","success"),await new Promise(s=>setTimeout(s,1500)),window.location.reload()}catch(d){console.error("Error:",d),f("Error: "+(d.message||"Failed"),"error")}}async function T(o,d,e,s,r){try{const a="approved";if(!D.includes(a))throw new Error(`Invalid status: ${a}`);const{error:c}=await k.from("idme_submissions").update({submission_status:a,reviewed_at:new Date().toISOString(),reviewed_by:_,updated_at:new Date().toISOString()}).eq("id",o);if(c)throw c;await A({to:e,subject:"Identity Verification Approved",html:`
          <p>Dear ${s.first_name} ${s.last_name},</p>
          <p>Your identity verification submission has been <strong>approved</strong>.</p>
          <ul>
            <li><strong>ID Type:</strong> ${s.id_type.replace(/_/g," ")}</li>
            <li><strong>ID Number:</strong> ${s.id_number}</li>
            <li><strong>Status:</strong> Approved</li>
            ${r?`<li><strong>Notes:</strong> ${r}</li>`:""}
          </ul>
          <p>You can now proceed with full account functionality.</p>
          <p>Best regards,<br>Zenus Bank Verification Team</p>
        `}),f("✓ Submission approved and user notified","success"),await new Promise(m=>setTimeout(m,1500)),window.location.reload()}catch(a){console.error("Error:",a),f("Error: "+(a.message||"Failed"),"error")}}async function M(o,d,e,s,r){try{const a="rejected";if(!D.includes(a))throw new Error(`Invalid status: ${a}`);const{error:c}=await k.from("idme_submissions").update({submission_status:a,rejection_reason:r,reviewed_at:new Date().toISOString(),reviewed_by:_,updated_at:new Date().toISOString()}).eq("id",o);if(c)throw c;await A({to:e,subject:"Identity Verification Rejected",html:`
          <p>Dear ${s.first_name} ${s.last_name},</p>
          <p>Your identity verification submission has been <strong>rejected</strong> and will need to be resubmitted.</p>
          <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 12px; margin: 16px 0;">
            <strong style="color: #991b1b;">Reason:</strong>
            <p style="color: #7f1d1d; margin: 8px 0 0 0;">${r}</p>
          </div>
          <p>Please review the rejection reason and resubmit with the necessary corrections.</p>
          <p>Best regards,<br>Zenus Bank Verification Team</p>
        `}),f("✓ Submission rejected and user notified","success"),await new Promise(m=>setTimeout(m,1500)),window.location.reload()}catch(a){console.error("Error:",a),f("Error: "+(a.message||"Failed"),"error")}}return{html:"",pageEvents:()=>y()}};export{K as default};
