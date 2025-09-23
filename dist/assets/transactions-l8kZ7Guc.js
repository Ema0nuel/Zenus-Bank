import{s as f}from"./supabaseClient-B1HaFb4P.js";import{A as G}from"./AdminNavbar-DXVtneOk.js";import{r as N}from"./adminAuth-Dn35BI8v.js";import{s as p}from"./toast-Dx2DSKhR.js";import{s as V}from"./sendEmail-89Z52C2k.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function E(e){if(!e)return"";const d=new Date(e);return d.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+d.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function T(e){return e==="completed"?'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span>':e==="pending"?'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>':e==="failed"?'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Failed</span>':e==="reversed"?'<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Reversed</span>':`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${e}</span>`}const K=["E9876567","G0876578","8767898H","K2387651","456L7890","1M234567","987654N3","O2345678","98765P43","Q1987654","R7654321","567S1234","T3456789","876543U1","V1234567","345678W9","X2345678","9Y876543","Z3456781","234567A8","B3456781","123456C7","D2345678","876E5432","5678F123","6789G123","7890H234","8901I345","9012J456","0123K567","K4561237","L5672348","M6783459","N7894560","O8905671","P9016782","Q0127893","R1238904","S2349015","T3450126","U4561237","V5672348","W6783459","X7894560","Y8905671","Z9016782","A0127893","B1238904","C2349015","D3450126","E4561237","F5672348","G6783459","H7894560","I8905671","J9016782","K0127893","L1238904","M2349015","N3450126","O4561237","P5672348","Q6783459","R7894560","S8905671","T9016782","U0127893","V1238904","W2349015","X3450126","Y4561237","Z5672348","A6783459","B7894560","C8905671","D9016782","E0127893","F1238904","G2349015","H3450126","I4561237","J5672348","K6783459","L7894560","M8905671","N9016782","O0127893","P1238904","Q2349015","R3450126","S4561237","T5672348","U6783459","V7894560","W8905671","X9016782","Y0127893","Z1238904","A2349015","B3450126","C4561237","D5672348","E6783459","F7894560","G8905671","H9016782","I0127893","J1238904","K2349015","L3450126","M4561237","N5672348","O6783459","P7894560","Q8905671","R9016782","S0127893","T1238904","U2349015","V3450126","W4561237","X5672348","Y6783459","Z7894560","A8905671","B9016782","C0127893","D1238904","E2349015","F3450126","G4561237","H5672348","I6783459","J7894560","K8905671","L9016782","M0127893","N1238904","O2349015","P3450126"];function _(){return K[Math.floor(Math.random()*K.length)]}function P({cot:e,imf:d,vat:s,user:a}){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="codes-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-codes-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Generated Codes</h2>
        <div class="mb-2 flex items-center justify-between">
          <span><b>COT:</b> <span id="cot-code">${e}</span></span>
          <button class="copy-code-btn" data-code="${e}">Copy</button>
        </div>
        <div class="mb-2 flex items-center justify-between">
          <span><b>IMF:</b> <span id="imf-code">${d}</span></span>
          <button class="copy-code-btn" data-code="${d}">Copy</button>
        </div>
        <div class="mb-4 flex items-center justify-between">
          <span><b>VAT:</b> <span id="vat-code">${s}</span></span>
          <button class="copy-code-btn" data-code="${s}">Copy</button>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded send-codes-email w-full mt-2" data-email="${a.email}" data-cot="${e}" data-imf="${d}" data-vat="${s}">Send Codes to User Email</button>
      </div>
    </div>
  `}function Y({tx:e,users:d,accounts:s}){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="tx-edit-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-tx-edit">&times;</button>
        <h2 class="text-xl font-bold mb-4">Edit Transaction</h2>
        <form id="tx-edit-form">
          <div class="mb-3">
            <label class="block text-sm mb-1">User</label>
            <select name="user_id" class="w-full border px-3 py-2 rounded" required>
              ${d.map(a=>`<option value="${a.id}" ${e.user_id===a.id?"selected":""}>${a.full_name} (${a.email})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Account</label>
            <select name="account_id" class="w-full border px-3 py-2 rounded" required>
              ${s.map(a=>`<option value="${a.id}" ${e.account_id===a.id?"selected":""}>${a.account_number} (${a.account_type})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Type</label>
            <select name="type" class="w-full border px-3 py-2 rounded" required>
              <option value="deposit" ${e.type==="deposit"?"selected":""}>Deposit</option>
              <option value="withdrawal" ${e.type==="withdrawal"?"selected":""}>Withdrawal</option>
              <option value="transfer" ${e.type==="transfer"?"selected":""}>Transfer</option>
              <option value="manual" ${e.type==="manual"?"selected":""}>Manual</option>
              <option value="reversed" ${e.type==="reversed"?"selected":""}>Reversed</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Amount</label>
            <input type="number" name="amount" step="0.01" min="0.01" class="w-full border px-3 py-2 rounded" value="${e.amount}" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Status</label>
            <select name="status" class="w-full border px-3 py-2 rounded" required>
              <option value="completed" ${e.status==="completed"?"selected":""}>Completed</option>
              <option value="pending" ${e.status==="pending"?"selected":""}>Pending</option>
              <option value="failed" ${e.status==="failed"?"selected":""}>Failed</option>
              <option value="reversed" ${e.status==="reversed"?"selected":""}>Reversed</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Date</label>
            <input type="datetime-local" name="created_at" class="w-full border px-3 py-2 rounded" value="${e.created_at?new Date(e.created_at).toISOString().slice(0,16):""}" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Description</label>
            <textarea name="description" class="w-full border px-3 py-2 rounded" rows="2">${e.description||""}</textarea>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Balance Before</label>
            <input type="number" name="balance_before" step="0.01" class="w-full border px-3 py-2 rounded" value="${e.balance_before||""}" />
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Balance After</label>
            <input type="number" name="balance_after" step="0.01" class="w-full border px-3 py-2 rounded" value="${e.balance_after||""}" />
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Save Changes</button>
        </form>
      </div>
    </div>
  `}function Z(e,d,s){return`
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="tx-search" placeholder="Search by user, account, type..." class="border px-3 py-2 rounded w-full sm:w-64 focus:ring-2 focus:ring-blue-500" />
      <select id="tx-type-filter" class="border px-2 py-2 rounded">
        <option value="">All Types</option>
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
        <option value="transfer">Transfer</option>
        <option value="manual">Manual</option>
        <option value="reversed">Reversed</option>
      </select>
      <select id="tx-status-filter" class="border px-2 py-2 rounded">
        <option value="">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
        <option value="reversed">Reversed</option>
      </select>
      <input type="date" id="tx-date-from" class="border px-2 py-2 rounded" />
      <input type="date" id="tx-date-to" class="border px-2 py-2 rounded" />
      <button id="tx-export-csv" class="ml-auto bg-blue-600 text-white px-3 py-2 rounded">Export CSV</button>
      <button id="tx-create-manual" class="bg-green-600 text-white px-3 py-2 rounded">Manual Transaction</button>
      <button id="tx-generate-codes" class="bg-orange-600 text-white px-3 py-2 rounded">Generate Codes</button>
    </div>
    <div>
      <div class="block sm:hidden">
        ${e.map(a=>{const y=d.find(m=>m.id===a.user_id),b=s.find(m=>m.id===a.account_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${y?.full_name||"Unknown"}</span>
                ${T(a.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${y?.email||""}</div>
              <div class="mb-1"><b>Account:</b> <span class="font-mono">${b?.account_number||"-"}</span> <span class="text-xs text-gray-400">(${b?.account_type||""})</span></div>
              <div class="mb-1"><b>Type:</b> ${a.type}</div>
              <div class="mb-1"><b>Amount:</b> $${parseFloat(a.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
              <div class="mb-1"><b>Date:</b> ${E(a.created_at)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${a.id}">View</button>
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${a.id}">Edit</button>
                ${a.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${a.id}">Approve</button>`:""}
                ${a.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${a.id}">Retry</button>`:""}
                ${a.status==="completed"&&a.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${a.id}">Reverse</button>`:""}
              </div>
            </div>
          `}).join("")}
      </div>
      <div class="hidden sm:block overflow-x-auto">
        <table class="min-w-full text-xs">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Account</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tx-table-body">
            ${e.map(a=>{const y=d.find(m=>m.id===a.user_id),b=s.find(m=>m.id===a.account_id);return`
                <tr>
                  <td>${E(a.created_at)}</td>
                  <td>
                    <span class="font-semibold">${y?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${y?.email||""}</div>
                  </td>
                  <td>
                    <span class="font-mono">${b?.account_number||"-"}</span>
                    <div class="text-xs text-gray-400">${b?.account_type||""}</div>
                  </td>
                  <td>${a.type}</td>
                  <td>$${parseFloat(a.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
                  <td>${T(a.status)}</td>
                  <td>
                    <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${a.id}">View</button>
                    <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${a.id}">Edit</button>
                    ${a.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${a.id}">Approve</button>`:""}
                    ${a.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${a.id}">Retry</button>`:""}
                    ${a.status==="completed"&&a.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${a.id}">Reverse</button>`:""}
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function J(e,d,s){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="tx-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-tx-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Transaction Details</h2>
        <div class="mb-2"><b>User:</b> ${d?.full_name||"Unknown"} (${d?.email||""})</div>
        <div class="mb-2"><b>Account:</b> ${s?.account_number||"-"} (${s?.account_type||""})</div>
        <div class="mb-2"><b>Type:</b> ${e.type}</div>
        <div class="mb-2"><b>Amount:</b> $${parseFloat(e.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
        <div class="mb-2"><b>Status:</b> ${T(e.status)}</div>
        <div class="mb-2"><b>Description:</b> ${e.description||"-"}</div>
        <div class="mb-2"><b>Created:</b> ${E(e.created_at)}</div>
        <div class="mb-2"><b>Balance Before:</b> $${e.balance_before||"-"}</div>
        <div class="mb-2"><b>Balance After:</b> $${e.balance_after||"-"}</div>
        <div class="flex gap-2 mt-4 flex-wrap">
          ${e.status==="pending"?`<button class="bg-green-600 text-white px-3 py-2 rounded tx-approve" data-txid="${e.id}">Approve</button>`:""}
          ${e.status==="failed"?`<button class="bg-yellow-600 text-white px-3 py-2 rounded tx-retry" data-txid="${e.id}">Retry</button>`:""}
          ${e.status==="completed"&&e.type!=="reversed"?`<button class="bg-red-600 text-white px-3 py-2 rounded tx-reverse" data-txid="${e.id}">Reverse</button>`:""}
        </div>
      </div>
    </div>
  `}function Q(e,d){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="manual-tx-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-manual-tx">&times;</button>
        <h2 class="text-xl font-bold mb-4">Manual Transaction</h2>
        <form id="manual-tx-form">
          <div class="mb-3">
            <label class="block text-sm mb-1">User</label>
            <select name="user_id" id="manual-user-select" class="w-full border px-3 py-2 rounded" required>
              <option value="">Select user</option>
              ${e.map(s=>`<option value="${s.id}">${s.full_name} (${s.email})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Account</label>
            <select name="account_id" id="manual-account-select" class="w-full border px-3 py-2 rounded" required>
              <option value="">Select account</option>
              ${d.map(s=>`<option value="${s.id}" data-user="${s.user_id}">${s.account_number} (${s.account_type})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Type</label>
            <select name="type" class="w-full border px-3 py-2 rounded" required>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Amount</label>
            <input type="number" name="amount" step="0.01" min="0.01" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Description</label>
            <textarea name="description" class="w-full border px-3 py-2 rounded" rows="2"></textarea>
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Send</button>
        </form>
      </div>
    </div>
  `}function X(e,d,s){const a=["Date","User","Account","Type","Amount","Status","Description"],y=e.map(g=>{const I=d.find($=>$.id===g.user_id),A=s.find($=>$.id===g.account_id);return[E(g.created_at),I?.full_name||"",A?.account_number||"",g.type,g.amount,g.status,g.description||""].join(",")}),b=[a.join(","),...y].join(`
`),m=new Blob([b],{type:"text/csv"}),x=URL.createObjectURL(m),k=document.createElement("a");k.href=x,k.download="transactions.csv",k.click(),URL.revokeObjectURL(x)}const ie=async()=>{if(!await N())return{html:"",pageEvents:()=>{}};let{data:e=[]}=await f.from("transactions").select("*").order("created_at",{ascending:!1}).limit(100),{data:d=[]}=await f.from("profiles").select("id,full_name,email"),{data:s=[]}=await f.from("accounts").select("*"),a="transactions",y=!1,b=localStorage.getItem("admin_dark")==="true",m=e;function x(){document.getElementById("app").innerHTML=`
      ${G({activeItem:a,isCollapsed:y,isDark:b})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Transaction Management</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 sm:p-6">
              ${Z(m,d,s)}
            </div>
          </div>
        </div>
      </div>
      <div id="tx-detail-panel"></div>
      <div id="manual-tx-panel"></div>
      <div id="codes-panel"></div>
    `,document.getElementById("admin-sidebar");const k=document.getElementById("admin-sidebar-overlay"),g=document.getElementById("admin-sidebar-toggle"),I=document.getElementById("admin-sidebar-close");function A(){y=!1,x()}function $(){y=!0,x()}g?.addEventListener("click",A),I?.addEventListener("click",$),k?.addEventListener("click",$),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{b=!b,localStorage.setItem("admin_dark",b?"true":"false"),b?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),x()}),document.querySelectorAll("[data-nav]").forEach(n=>{n.addEventListener("click",i=>{i.preventDefault(),a=n.getAttribute("data-nav"),window.location.href=`/admin/${a}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),b?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const S=document.getElementById("tx-search"),L=document.getElementById("tx-type-filter"),D=document.getElementById("tx-status-filter"),C=document.getElementById("tx-date-from"),q=document.getElementById("tx-date-to"),M=document.getElementById("tx-table-body");function F(){let n=S.value.trim().toLowerCase(),i=L.value,u=D.value,c=C.value,o=q.value;m=e.filter(t=>{const r=d.find(w=>w.id===t.user_id),v=s.find(w=>w.id===t.account_id);let l=!0;return n&&(l=r?.full_name?.toLowerCase().includes(n)||r?.email?.toLowerCase().includes(n)||v?.account_number?.includes(n)||t.type?.includes(n)),i&&t.type!==i&&(l=!1),u&&t.status!==u&&(l=!1),c&&new Date(t.created_at)<new Date(c)&&(l=!1),o&&new Date(t.created_at)>new Date(o+"T23:59:59")&&(l=!1),l}),window.innerWidth<640?document.querySelector(".block.sm\\:hidden").innerHTML=m.map(t=>{const r=d.find(l=>l.id===t.user_id),v=s.find(l=>l.id===t.account_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${r?.full_name||"Unknown"}</span>
                ${T(t.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${r?.email||""}</div>
              <div class="mb-1"><b>Account:</b> <span class="font-mono">${v?.account_number||"-"}</span> <span class="text-xs text-gray-400">(${v?.account_type||""})</span></div>
              <div class="mb-1"><b>Type:</b> ${t.type}</div>
              <div class="mb-1"><b>Amount:</b> $${parseFloat(t.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
              <div class="mb-1"><b>Date:</b> ${E(t.created_at)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${t.id}">View</button>
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${t.id}">Edit</button>
                ${t.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${t.id}">Approve</button>`:""}
                ${t.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${t.id}">Retry</button>`:""}
                ${t.status==="completed"&&t.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${t.id}">Reverse</button>`:""}
              </div>
            </div>
          `}).join(""):M&&(M.innerHTML=m.map(t=>{const r=d.find(l=>l.id===t.user_id),v=s.find(l=>l.id===t.account_id);return`
            <tr>
              <td>${E(t.created_at)}</td>
              <td>
                <span class="font-semibold">${r?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${r?.email||""}</div>
              </td>
              <td>
                <span class="font-mono">${v?.account_number||"-"}</span>
                <div class="text-xs text-gray-400">${v?.account_type||""}</div>
              </td>
              <td>${t.type}</td>
              <td>$${parseFloat(t.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
              <td>${T(t.status)}</td>
              <td>
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${t.id}">View</button>
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${t.id}">Edit</button>
                ${t.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${t.id}">Approve</button>`:""}
                ${t.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${t.id}">Retry</button>`:""}
                ${t.status==="completed"&&t.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${t.id}">Reverse</button>`:""}
              </td>
            </tr>
          `}).join("")),R()}[S,L,D,C,q].forEach(n=>{n&&n.addEventListener("input",F),n&&n.addEventListener("change",F)}),document.getElementById("tx-export-csv").onclick=()=>X(m,d,s),document.getElementById("tx-create-manual").onclick=()=>{document.getElementById("manual-tx-panel").innerHTML=Q(d,s),document.getElementById("close-manual-tx").onclick=()=>{document.getElementById("manual-tx-panel").innerHTML=""};const n=document.getElementById("manual-user-select"),i=document.getElementById("manual-account-select");n.addEventListener("change",function(){const u=this.value,c=Array.from(i.options).find(o=>o.dataset.user===u);c?i.value=c.value:i.value=""}),document.getElementById("manual-tx-form").onsubmit=async function(u){u.preventDefault();const c=this.user_id.value,o=this.account_id.value,t=this.type.value,r=parseFloat(this.amount.value),v=this.description.value;if(!c||!o||!t||!r)return p("Fill all fields","error");const l=s.find(h=>h.id===o),w=d.find(h=>h.id===c);if(!l||!w)return p("Invalid user/account","error");const j=parseFloat(l.balance);let B=j;(t==="deposit"||t==="manual")&&(B+=r),t==="withdrawal"&&(B-=r);const{error:W}=await f.from("transactions").insert([{user_id:c,account_id:o,type:t,amount:r,description:v,balance_before:j,balance_after:B,status:"completed"}]);if(W)return p("Failed to create transaction","error");await f.from("accounts").update({balance:B}).eq("id",o);const U=_(),H=_(),O=_();document.getElementById("codes-panel").innerHTML=P({cot:U,imf:H,vat:O,user:w}),document.querySelectorAll(".copy-code-btn").forEach(h=>{h.onclick=()=>{navigator.clipboard.writeText(h.dataset.code),p("Code copied!","success")}}),document.getElementById("close-codes-modal").onclick=()=>{document.getElementById("codes-panel").innerHTML="",x()},document.querySelector(".send-codes-email").onclick=async function(){const h=`
            <div style="font-family:sans-serif">
              <h2>Transaction Codes</h2>
              <p>Dear ${w.full_name},</p>
              <p>Your transaction codes:</p>
              <ul>
                <li>COT: <b>${U}</b></li>
                <li>IMF: <b>${H}</b></li>
                <li>VAT: <b>${O}</b></li>
              </ul>
              <p>Keep these codes safe. Contact support if you did not request this.</p>
              <p>Zenus Bank</p>
            </div>
          `;try{await V({to:w.email,subject:"Transaction Codes",html:h}),p("Codes sent to user email!","success")}catch{p("Failed to send codes email","error")}}}},document.getElementById("tx-generate-codes").onclick=()=>{const n=d[0]||{email:"demo@demo.com",full_name:"Demo User"},i=_(),u=_(),c=_();document.getElementById("codes-panel").innerHTML=P({cot:i,imf:u,vat:c,user:n}),document.querySelectorAll(".copy-code-btn").forEach(o=>{o.onclick=()=>{navigator.clipboard.writeText(o.dataset.code),p("Code copied!","success")}}),document.getElementById("close-codes-modal").onclick=()=>{document.getElementById("codes-panel").innerHTML=""},document.querySelector(".send-codes-email").onclick=async function(){const o=`
          <div style="font-family:sans-serif">
            <h2>Transaction Codes</h2>
            <p>Dear ${n.full_name},</p>
            <p>Your transaction codes:</p>
            <ul>
              <li>COT: <b>${i}</b></li>
              <li>IMF: <b>${u}</b></li>
              <li>VAT: <b>${c}</b></li>
            </ul>
            <p>Keep these codes safe. Contact support if you did not request this.</p>
            <p>Zenus Bank</p>
          </div>
        `;try{await V({to:n.email,subject:"Transaction Codes",html:o}),p("Codes sent to user email!","success")}catch{p("Failed to send codes email","error")}}};function R(){document.querySelectorAll(".tx-edit").forEach(n=>{n.onclick=()=>{const i=n.getAttribute("data-txid"),u=e.find(c=>c.id===i);document.getElementById("tx-detail-panel").innerHTML=Y({tx:u,users:d,accounts:s}),document.getElementById("close-tx-edit").onclick=()=>{document.getElementById("tx-detail-panel").innerHTML=""},document.getElementById("tx-edit-form").onsubmit=async function(c){c.preventDefault();const o=Object.fromEntries(new FormData(this)),t=parseFloat(o.amount),r=o.balance_before?parseFloat(o.balance_before):null,v=o.balance_after?parseFloat(o.balance_after):null,l=o.created_at?new Date(o.created_at).toISOString():u.created_at;await f.from("transactions").update({user_id:o.user_id,account_id:o.account_id,type:o.type,amount:t,status:o.status,description:o.description,balance_before:r,balance_after:v,created_at:l}).eq("id",i),p("Transaction updated!","success"),document.getElementById("tx-detail-panel").innerHTML="",location.reload()}}}),document.querySelectorAll(".tx-view").forEach(n=>{n.onclick=()=>{const i=n.getAttribute("data-txid"),u=e.find(l=>l.id===i),c=d.find(l=>l.id===u.user_id),o=s.find(l=>l.id===u.account_id);document.getElementById("tx-detail-panel").innerHTML=J(u,c,o),document.getElementById("close-tx-detail").onclick=()=>{document.getElementById("tx-detail-panel").innerHTML=""};const t=document.querySelector("#tx-detail-panel .tx-approve");t&&(t.onclick=async()=>{await f.from("transactions").update({status:"completed"}).eq("id",i),p("Transaction approved","success"),x()});const r=document.querySelector("#tx-detail-panel .tx-retry");r&&(r.onclick=async()=>{await f.from("transactions").update({status:"pending"}).eq("id",i),p("Transaction set to pending","success"),x()});const v=document.querySelector("#tx-detail-panel .tx-reverse");v&&(v.onclick=async()=>{await f.from("transactions").update({status:"reversed",type:"reversed"}).eq("id",i),p("Transaction reversed","success"),x()})}}),document.querySelectorAll(".tx-approve").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-txid");await f.from("transactions").update({status:"completed"}).eq("id",i),p("Transaction approved","success"),x()}}),document.querySelectorAll(".tx-retry").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-txid");await f.from("transactions").update({status:"pending"}).eq("id",i),p("Transaction set to pending","success"),x()}}),document.querySelectorAll(".tx-reverse").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-txid");await f.from("transactions").update({status:"reversed",type:"reversed"}).eq("id",i),p("Transaction reversed","success"),x()}})}R()}return{html:"",pageEvents:()=>x()}};export{ie as default};
