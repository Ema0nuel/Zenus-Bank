import{s as y}from"./supabaseClient-CL6H8VOx.js";import{A as G}from"./AdminNavbar-ObVEf85P.js";import{r as Y}from"./adminAuth-Dn35BI8v.js";import{s as m}from"./toast-DRvdR0y9.js";import{s as K}from"./sendEmail-89Z52C2k.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";function B(e){if(!e)return"";const o=new Date(e);return o.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})+" "+o.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"})}function S(e){return e==="completed"?'<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Completed</span>':e==="pending"?'<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pending</span>':e==="failed"?'<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Failed</span>':e==="reversed"?'<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Reversed</span>':`<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${e}</span>`}const N=["E9876567","G0876578","8767898H","K2387651","456L7890","1M234567","987654N3","O2345678","98765P43","Q1987654","R7654321","567S1234","T3456789","876543U1","V1234567","345678W9","X2345678","9Y876543","Z3456781","234567A8","B3456781","123456C7","D2345678","876E5432","5678F123","6789G123","7890H234","8901I345","9012J456","0123K567","K4561237","L5672348","M6783459","N7894560","O8905671","P9016782","Q0127893","R1238904","S2349015","T3450126","U4561237","V5672348","W6783459","X7894560","Y8905671","Z9016782","A0127893","B1238904","C2349015","D3450126","E4561237","F5672348","G6783459","H7894560","I8905671","J9016782","K0127893","L1238904","M2349015","N3450126","O4561237","P5672348","Q6783459","R7894560","S8905671","T9016782","U0127893","V1238904","W2349015","X3450126","Y4561237","Z5672348","A6783459","B7894560","C8905671","D9016782","E0127893","F1238904","G2349015","H3450126","I4561237","J5672348","K6783459","L7894560","M8905671","N9016782","O0127893","P1238904","Q2349015","R3450126","S4561237","T5672348","U6783459","V7894560","W8905671","X9016782","Y0127893","Z1238904","A2349015","B3450126","C4561237","D5672348","E6783459","F7894560","G8905671","H9016782","I0127893","J1238904","K2349015","L3450126","M4561237","N5672348","O6783459","P7894560","Q8905671","R9016782","S0127893","T1238904","U2349015","V3450126","W4561237","X5672348","Y6783459","Z7894560","A8905671","B9016782","C0127893","D1238904","E2349015","F3450126","G4561237","H5672348","I6783459","J7894560","K8905671","L9016782","M0127893","N1238904","O2349015","P3450126"];function T(){return N[Math.floor(Math.random()*N.length)]}function P({cot:e,imf:o,vat:n,user:t}){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="codes-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-codes-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Generated Codes</h2>
        <div class="mb-2 flex items-center justify-between">
          <span><b>COT:</b> <span id="cot-code">${e}</span></span>
          <button class="copy-code-btn" data-code="${e}">Copy</button>
        </div>
        <div class="mb-2 flex items-center justify-between">
          <span><b>IMF:</b> <span id="imf-code">${o}</span></span>
          <button class="copy-code-btn" data-code="${o}">Copy</button>
        </div>
        <div class="mb-4 flex items-center justify-between">
          <span><b>VAT:</b> <span id="vat-code">${n}</span></span>
          <button class="copy-code-btn" data-code="${n}">Copy</button>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded send-codes-email w-full mt-2" data-email="${t.email}" data-cot="${e}" data-imf="${o}" data-vat="${n}">Send Codes to User Email</button>
      </div>
    </div>
  `}function Z({tx:e,users:o,accounts:n}){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="tx-edit-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-tx-edit">&times;</button>
        <h2 class="text-xl font-bold mb-4">Edit Transaction</h2>
        <form id="tx-edit-form">
          <div class="mb-3">
            <label class="block text-sm mb-1">User</label>
            <select name="user_id" class="w-full border px-3 py-2 rounded" required>
              ${o.map(t=>`<option value="${t.id}" ${e.user_id===t.id?"selected":""}>${t.full_name} (${t.email})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Account</label>
            <select name="account_id" class="w-full border px-3 py-2 rounded" required>
              ${n.map(t=>`<option value="${t.id}" ${e.account_id===t.id?"selected":""}>${t.account_number} (${t.account_type})</option>`).join("")}
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
  `}function J(e,o,n){return`
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
        ${e.map(t=>{const f=o.find(p=>p.id===t.user_id),r=n.find(p=>p.id===t.account_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${f?.full_name||"Unknown"}</span>
                ${S(t.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${f?.email||""}</div>
              <div class="mb-1"><b>Account:</b> <span class="font-mono">${r?.account_number||"-"}</span> <span class="text-xs text-gray-400">(${r?.account_type||""})</span></div>
              <div class="mb-1"><b>Type:</b> ${t.type}</div>
              <div class="mb-1"><b>Amount:</b> $${parseFloat(t.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
              <div class="mb-1"><b>Date:</b> ${B(t.created_at)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${t.id}">View</button>
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${t.id}">Edit</button>
                ${t.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${t.id}">Approve</button>`:""}
                ${t.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${t.id}">Retry</button>`:""}
                ${t.status==="completed"&&t.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${t.id}">Reverse</button>`:""}
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
            ${e.map(t=>{const f=o.find(p=>p.id===t.user_id),r=n.find(p=>p.id===t.account_id);return`
                <tr>
                  <td>${B(t.created_at)}</td>
                  <td>
                    <span class="font-semibold">${f?.full_name||"Unknown"}</span>
                    <div class="text-xs text-gray-400">${f?.email||""}</div>
                  </td>
                  <td>
                    <span class="font-mono">${r?.account_number||"-"}</span>
                    <div class="text-xs text-gray-400">${r?.account_type||""}</div>
                  </td>
                  <td>${t.type}</td>
                  <td>$${parseFloat(t.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
                  <td>${S(t.status)}</td>
                  <td>
                    <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${t.id}">View</button>
                    <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${t.id}">Edit</button>
                    ${t.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${t.id}">Approve</button>`:""}
                    ${t.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${t.id}">Retry</button>`:""}
                    ${t.status==="completed"&&t.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${t.id}">Reverse</button>`:""}
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function Q(e,o,n){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="tx-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-tx-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Transaction Details</h2>
        <div class="mb-2"><b>User:</b> ${o?.full_name||"Unknown"} (${o?.email||""})</div>
        <div class="mb-2"><b>Account:</b> ${n?.account_number||"-"} (${n?.account_type||""})</div>
        <div class="mb-2"><b>Type:</b> ${e.type}</div>
        <div class="mb-2"><b>Amount:</b> $${parseFloat(e.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
        <div class="mb-2"><b>Status:</b> ${S(e.status)}</div>
        <div class="mb-2"><b>Description:</b> ${e.description||"-"}</div>
        <div class="mb-2"><b>Created:</b> ${B(e.created_at)}</div>
        <div class="mb-2"><b>Balance Before:</b> $${e.balance_before||"-"}</div>
        <div class="mb-2"><b>Balance After:</b> $${e.balance_after||"-"}</div>
        <div class="flex gap-2 mt-4 flex-wrap">
          ${e.status==="pending"?`<button class="bg-green-600 text-white px-3 py-2 rounded tx-approve" data-txid="${e.id}">Approve</button>`:""}
          ${e.status==="failed"?`<button class="bg-yellow-600 text-white px-3 py-2 rounded tx-retry" data-txid="${e.id}">Retry</button>`:""}
          ${e.status==="completed"&&e.type!=="reversed"?`<button class="bg-red-600 text-white px-3 py-2 rounded tx-reverse" data-txid="${e.id}">Reverse</button>`:""}
        </div>
      </div>
    </div>
  `}function X(e,o){return`
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="manual-tx-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-manual-tx">&times;</button>
        <h2 class="text-xl font-bold mb-4">Manual Transaction</h2>
        <form id="manual-tx-form">
          <div class="mb-3">
            <label class="block text-sm mb-1">User</label>
            <select name="user_id" id="manual-user-select" class="w-full border px-3 py-2 rounded" required>
              <option value="">Select user</option>
              ${e.map(n=>`<option value="${n.id}">${n.full_name} (${n.email})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Account</label>
            <select name="account_id" id="manual-account-select" class="w-full border px-3 py-2 rounded" required>
              <option value="">Select account</option>
              ${o.map(n=>`<option value="${n.id}" data-user="${n.user_id}">${n.account_number} (${n.account_type})</option>`).join("")}
            </select>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Type</label>
            <select name="type" id="manual-type-select" class="w-full border px-3 py-2 rounded" required>
              <option value="deposit">Fiat Deposit</option>
              <option value="withdrawal">Fiat Withdrawal</option>
              <option value="manual">Manual Adjustment</option>
              <option value="crypto">Crypto Transaction</option>
            </select>
          </div>
          <div id="crypto-fields" class="hidden">
            <div class="mb-3">
              <label class="block text-sm mb-1">Crypto Asset</label>
              <select name="crypto_asset" class="w-full border px-3 py-2 rounded">
                ${Object.entries(ee).map(([n,t])=>`<option value="${n}">${t.name} (${n})</option>`).join("")}
              </select>
            </div>
            <div class="mb-3">
              <label class="block text-sm mb-1">Transaction Direction</label>
              <select name="crypto_direction" class="w-full border px-3 py-2 rounded">
                <option value="credit">Credit (Add)</option>
                <option value="debit">Debit (Subtract)</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1" id="amount-label">Amount</label>
            <input type="number" name="amount" step="any" min="0" class="w-full border px-3 py-2 rounded" required />
          </div>
          <div class="mb-3">
            <label class="block text-sm mb-1">Description</label>
            <textarea name="description" class="w-full border px-3 py-2 rounded" rows="2"></textarea>
          </div>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit Transaction</button>
        </form>
      </div>
    </div>
  `}function z(e,o,n){const t=["Date","User","Account","Type","Amount","Status","Description"],f=e.map(g=>{const k=o.find(_=>_.id===g.user_id),$=n.find(_=>_.id===g.account_id);return[B(g.created_at),k?.full_name||"",$?.account_number||"",g.type,g.amount,g.status,g.description||""].join(",")}),r=[t.join(","),...f].join(`
`),p=new Blob([r],{type:"text/csv"}),b=URL.createObjectURL(p),w=document.createElement("a");w.href=b,w.download="transactions.csv",w.click(),URL.revokeObjectURL(b)}const ee={BTC:{name:"Bitcoin",decimals:8},ETH:{name:"Ethereum",decimals:8},USDT:{name:"Tether USD",decimals:6},USDC:{name:"USD Coin",decimals:6},BNB:{name:"BNB",decimals:8},SOL:{name:"Solana",decimals:8}};async function te(e,o,n,t,f){let{data:r}=await y.from("crypto_balances").select("*").eq("user_id",e).eq("account_id",o).single();if(!r){const{data:k,error:$}=await y.from("crypto_balances").insert({user_id:e,account_id:o,btc_balance:0,eth_balance:0,usdt_balance:0,usdc_balance:0,bnb_balance:0,sol_balance:0}).select().single();if($)throw $;r=k}const p=`${n.toLowerCase()}_balance`,b=parseFloat(r[p])||0,w=f==="credit"?b+parseFloat(t):b-parseFloat(t),{error:g}=await y.from("crypto_balances").update({[p]:w}).eq("id",r.id);if(g)throw g;return w}const ce=async()=>{if(!await Y())return{html:"",pageEvents:()=>{}};let{data:e=[]}=await y.from("transactions").select("*").order("created_at",{ascending:!1}).limit(100),{data:o=[]}=await y.from("profiles").select("id,full_name,email"),{data:n=[]}=await y.from("accounts").select("*"),t="transactions",f=!1,r=localStorage.getItem("admin_dark")==="true",p=e;function b(){document.getElementById("app").innerHTML=`
      ${G({activeItem:t,isCollapsed:f,isDark:r})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Transaction Management</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 sm:p-6">
              ${J(p,o,n)}
            </div>
          </div>
        </div>
      </div>
      <div id="tx-detail-panel"></div>
      <div id="manual-tx-panel"></div>
      <div id="codes-panel"></div>
    `,document.getElementById("admin-sidebar");const w=document.getElementById("admin-sidebar-overlay"),g=document.getElementById("admin-sidebar-toggle"),k=document.getElementById("admin-sidebar-close");function $(){f=!1,b()}function _(){f=!0,b()}g?.addEventListener("click",$),k?.addEventListener("click",_),w?.addEventListener("click",_),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{r=!r,localStorage.setItem("admin_dark",r?"true":"false"),r?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),b()}),document.querySelectorAll("[data-nav]").forEach(s=>{s.addEventListener("click",l=>{l.preventDefault(),t=s.getAttribute("data-nav"),window.location.href=`/admin/${t}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),r?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark");const L=document.getElementById("tx-search"),C=document.getElementById("tx-type-filter"),D=document.getElementById("tx-status-filter"),F=document.getElementById("tx-date-from"),q=document.getElementById("tx-date-to"),M=document.getElementById("tx-table-body");function j(){let s=L.value.trim().toLowerCase(),l=C.value,v=D.value,i=F.value,d=q.value;p=e.filter(a=>{const u=o.find(E=>E.id===a.user_id),x=n.find(E=>E.id===a.account_id);let c=!0;return s&&(c=u?.full_name?.toLowerCase().includes(s)||u?.email?.toLowerCase().includes(s)||x?.account_number?.includes(s)||a.type?.includes(s)),l&&a.type!==l&&(c=!1),v&&a.status!==v&&(c=!1),i&&new Date(a.created_at)<new Date(i)&&(c=!1),d&&new Date(a.created_at)>new Date(d+"T23:59:59")&&(c=!1),c}),window.innerWidth<640?document.querySelector(".block.sm\\:hidden").innerHTML=p.map(a=>{const u=o.find(c=>c.id===a.user_id),x=n.find(c=>c.id===a.account_id);return`
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${u?.full_name||"Unknown"}</span>
                ${S(a.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${u?.email||""}</div>
              <div class="mb-1"><b>Account:</b> <span class="font-mono">${x?.account_number||"-"}</span> <span class="text-xs text-gray-400">(${x?.account_type||""})</span></div>
              <div class="mb-1"><b>Type:</b> ${a.type}</div>
              <div class="mb-1"><b>Amount:</b> $${parseFloat(a.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</div>
              <div class="mb-1"><b>Date:</b> ${B(a.created_at)}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${a.id}">View</button>
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${a.id}">Edit</button>
                ${a.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${a.id}">Approve</button>`:""}
                ${a.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${a.id}">Retry</button>`:""}
                ${a.status==="completed"&&a.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${a.id}">Reverse</button>`:""}
              </div>
            </div>
          `}).join(""):M&&(M.innerHTML=p.map(a=>{const u=o.find(c=>c.id===a.user_id),x=n.find(c=>c.id===a.account_id);return`
            <tr>
              <td>${B(a.created_at)}</td>
              <td>
                <span class="font-semibold">${u?.full_name||"Unknown"}</span>
                <div class="text-xs text-gray-400">${u?.email||""}</div>
              </td>
              <td>
                <span class="font-mono">${x?.account_number||"-"}</span>
                <div class="text-xs text-gray-400">${x?.account_type||""}</div>
              </td>
              <td>${a.type}</td>
              <td>$${parseFloat(a.amount).toLocaleString(void 0,{minimumFractionDigits:2})}</td>
              <td>${S(a.status)}</td>
              <td>
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded tx-view" data-txid="${a.id}">View</button>
                <button class="btn btn-xs bg-gray-600 text-white px-2 py-1 rounded tx-edit" data-txid="${a.id}">Edit</button>
                ${a.status==="pending"?`<button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded tx-approve" data-txid="${a.id}">Approve</button>`:""}
                ${a.status==="failed"?`<button class="btn btn-xs bg-yellow-600 text-white px-2 py-1 rounded tx-retry" data-txid="${a.id}">Retry</button>`:""}
                ${a.status==="completed"&&a.type!=="reversed"?`<button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded tx-reverse" data-txid="${a.id}">Reverse</button>`:""}
              </td>
            </tr>
          `}).join("")),R()}[L,C,D,F,q].forEach(s=>{s&&s.addEventListener("input",j),s&&s.addEventListener("change",j)}),document.getElementById("tx-export-csv").onclick=()=>z(p,o,n),document.getElementById("tx-create-manual").onclick=()=>{document.getElementById("manual-tx-panel").innerHTML=X(o,n),document.getElementById("close-manual-tx").onclick=()=>{document.getElementById("manual-tx-panel").innerHTML=""};const s=document.getElementById("manual-user-select"),l=document.getElementById("manual-account-select");s.addEventListener("change",function(){const v=this.value,i=Array.from(l.options).find(d=>d.dataset.user===v);i?l.value=i.value:l.value=""}),document.getElementById("manual-tx-form").onsubmit=async function(v){v.preventDefault();const i=Object.fromEntries(new FormData(this));try{if(i.type==="crypto"){const d=await te(i.user_id,i.account_id,i.crypto_asset,parseFloat(i.amount),i.crypto_direction);await y.from("transactions").insert({user_id:i.user_id,account_id:i.account_id,type:"crypto",method:"crypto",crypto_symbol:i.crypto_asset,crypto_amount:parseFloat(i.amount),direction:i.crypto_direction,description:`${i.crypto_direction==="credit"?"Credit":"Debit"} ${i.amount} ${i.crypto_asset} - ${i.description}`,status:"completed"}),m(`Crypto balance updated successfully! New balance: ${d} ${i.crypto_asset}`,"success")}else{const d=this.user_id.value,a=this.account_id.value,u=this.type.value,x=parseFloat(this.amount.value),c=this.description.value;if(!d||!a||!u||!x)return m("Fill all fields","error");const E=n.find(h=>h.id===a),A=o.find(h=>h.id===d);if(!E||!A)return m("Invalid user/account","error");const U=parseFloat(E.balance);let I=U;(u==="deposit"||u==="manual")&&(I+=x),u==="withdrawal"&&(I-=x);const{error:W}=await y.from("transactions").insert([{user_id:d,account_id:a,type:u,amount:x,description:c,balance_before:U,balance_after:I,status:"completed"}]);if(W)return m("Failed to create transaction","error");await y.from("accounts").update({balance:I}).eq("id",a);const H=T(),O=T(),V=T();document.getElementById("codes-panel").innerHTML=P({cot:H,imf:O,vat:V,user:A}),document.querySelectorAll(".copy-code-btn").forEach(h=>{h.onclick=()=>{navigator.clipboard.writeText(h.dataset.code),m("Code copied!","success")}}),document.getElementById("close-codes-modal").onclick=()=>{document.getElementById("codes-panel").innerHTML="",b()},document.querySelector(".send-codes-email").onclick=async function(){const h=`
            <div style="font-family:sans-serif">
              <h2>Transaction Codes</h2>
              <p>Dear ${A.full_name},</p>
              <p>Your transaction codes:</p>
              <ul>
                <li>COT: <b>${H}</b></li>
                <li>IMF: <b>${O}</b></li>
                <li>VAT: <b>${V}</b></li>
              </ul>
              <p>Keep these codes safe. Contact support if you did not request this.</p>
              <p>Zenus Bank</p>
            </div>
          `;try{await K({to:A.email,subject:"Transaction Codes",html:h}),m("Codes sent to user email!","success")}catch{m("Failed to send codes email","error")}}}document.getElementById("manual-tx-panel").innerHTML="",location.reload()}catch(d){console.error(d),m("Transaction failed","error")}}},document.getElementById("manual-type-select")?.addEventListener("change",function(){const s=document.getElementById("crypto-fields"),l=document.getElementById("amount-label");this.value==="crypto"?(s.classList.remove("hidden"),l.textContent="Crypto Amount"):(s.classList.add("hidden"),l.textContent="Amount")}),document.getElementById("tx-generate-codes").onclick=()=>{const s=o[0]||{email:"demo@demo.com",full_name:"Demo User"},l=T(),v=T(),i=T();document.getElementById("codes-panel").innerHTML=P({cot:l,imf:v,vat:i,user:s}),document.querySelectorAll(".copy-code-btn").forEach(d=>{d.onclick=()=>{navigator.clipboard.writeText(d.dataset.code),m("Code copied!","success")}}),document.getElementById("close-codes-modal").onclick=()=>{document.getElementById("codes-panel").innerHTML=""},document.querySelector(".send-codes-email").onclick=async function(){const d=`
          <div style="font-family:sans-serif">
            <h2>Transaction Codes</h2>
            <p>Dear ${s.full_name},</p>
            <p>Your transaction codes:</p>
            <ul>
              <li>COT: <b>${l}</b></li>
              <li>IMF: <b>${v}</b></li>
              <li>VAT: <b>${i}</b></li>
            </ul>
            <p>Keep these codes safe. Contact support if you did not request this.</p>
            <p>Zenus Bank</p>
          </div>
        `;try{await K({to:s.email,subject:"Transaction Codes",html:d}),m("Codes sent to user email!","success")}catch{m("Failed to send codes email","error")}}};function R(){document.querySelectorAll(".tx-edit").forEach(s=>{s.onclick=()=>{const l=s.getAttribute("data-txid"),v=e.find(i=>i.id===l);document.getElementById("tx-detail-panel").innerHTML=Z({tx:v,users:o,accounts:n}),document.getElementById("close-tx-edit").onclick=()=>{document.getElementById("tx-detail-panel").innerHTML=""},document.getElementById("tx-edit-form").onsubmit=async function(i){i.preventDefault();const d=Object.fromEntries(new FormData(this)),a=parseFloat(d.amount),u=d.balance_before?parseFloat(d.balance_before):null,x=d.balance_after?parseFloat(d.balance_after):null,c=d.created_at?new Date(d.created_at).toISOString():v.created_at;await y.from("transactions").update({user_id:d.user_id,account_id:d.account_id,type:d.type,amount:a,status:d.status,description:d.description,balance_before:u,balance_after:x,created_at:c}).eq("id",l),m("Transaction updated!","success"),document.getElementById("tx-detail-panel").innerHTML="",location.reload()}}}),document.querySelectorAll(".tx-view").forEach(s=>{s.onclick=()=>{const l=s.getAttribute("data-txid"),v=e.find(c=>c.id===l),i=o.find(c=>c.id===v.user_id),d=n.find(c=>c.id===v.account_id);document.getElementById("tx-detail-panel").innerHTML=Q(v,i,d),document.getElementById("close-tx-detail").onclick=()=>{document.getElementById("tx-detail-panel").innerHTML=""};const a=document.querySelector("#tx-detail-panel .tx-approve");a&&(a.onclick=async()=>{await y.from("transactions").update({status:"completed"}).eq("id",l),m("Transaction approved","success"),b()});const u=document.querySelector("#tx-detail-panel .tx-retry");u&&(u.onclick=async()=>{await y.from("transactions").update({status:"pending"}).eq("id",l),m("Transaction set to pending","success"),b()});const x=document.querySelector("#tx-detail-panel .tx-reverse");x&&(x.onclick=async()=>{await y.from("transactions").update({status:"reversed",type:"reversed"}).eq("id",l),m("Transaction reversed","success"),b()})}}),document.querySelectorAll(".tx-approve").forEach(s=>{s.onclick=async()=>{const l=s.getAttribute("data-txid");await y.from("transactions").update({status:"completed"}).eq("id",l),m("Transaction approved","success"),b()}}),document.querySelectorAll(".tx-retry").forEach(s=>{s.onclick=async()=>{const l=s.getAttribute("data-txid");await y.from("transactions").update({status:"pending"}).eq("id",l),m("Transaction set to pending","success"),b()}}),document.querySelectorAll(".tx-reverse").forEach(s=>{s.onclick=async()=>{const l=s.getAttribute("data-txid");await y.from("transactions").update({status:"reversed",type:"reversed"}).eq("id",l),m("Transaction reversed","success"),b()}})}R()}return{html:"",pageEvents:()=>b()}};export{ce as default};
