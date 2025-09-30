import{s as e}from"./supabaseClient-B1HaFb4P.js";import{A as m}from"./AdminNavbar-DXVtneOk.js";import{r as u}from"./adminAuth-Dn35BI8v.js";import{s as b}from"./toast-DRvdR0y9.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";const x=async t=>{if(!await u())return;const{data:i}=await e.from("profiles").select("*").eq("id",t).single(),{data:d}=await e.from("accounts").select("*").eq("user_id",t).single(),{data:o}=await e.from("kyc_requests").select("*").eq("user_id",t).order("created_at",{ascending:!1}).limit(1).single(),{data:l}=await e.from("transactions").select("*").eq("user_id",t).order("created_at",{ascending:!1}).limit(10);return{html:`
      ${m("users")}
      <div class="pt-20 px-8">
        <h1 class="text-xl font-bold mb-4">User Details</h1>
        <div class="bg-white rounded shadow p-4 mb-4">
          <div class="flex items-center gap-4">
            <img src="${i.avatar_url||"/default-user.png"}" class="w-16 h-16 rounded-full border" />
            <div>
              <div class="font-bold">${i.full_name}</div>
              <div class="text-xs text-gray-500">${i.email}</div>
              <div class="text-xs">${i.phone||"-"}</div>
            </div>
          </div>
          <div class="mt-4">
            <div><b>Account Number:</b> ${d?.account_number||"-"}</div>
            <div><b>Balance:</b> $${d?.balance??"0.00"}</div>
            <div><b>Status:</b> ${d?.is_active?"Active":"Inactive"}</div>
          </div>
        </div>
        <div class="bg-white rounded shadow p-4 mb-4">
          <h2 class="font-semibold mb-2">KYC Status</h2>
          <div>${o?.status||"Not submitted"}</div>
          <div class="text-xs text-gray-500">${o?.created_at||""}</div>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h2 class="font-semibold mb-2">Recent Transactions</h2>
          <table class="min-w-full text-xs">
            <thead>
              <tr>
                <th>Date</th><th>Type</th><th>Amount</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${(l||[]).map(a=>`
                <tr>
                  <td>${a.created_at?.slice(0,16).replace("T"," ")}</td>
                  <td>${a.type}</td>
                  <td>$${a.amount}</td>
                  <td>${a.status}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <div class="bg-white rounded shadow p-4 mt-4">
          <h2 class="font-semibold mb-2">Send Notification / Fund Account</h2>
          <form id="admin-action-form" class="space-y-2">
            <input type="hidden" name="user_id" value="${t}" />
            <label>Message</label>
            <input type="text" name="message" class="border rounded px-2 py-1 w-full" required />
            <label>Fund Amount ($)</label>
            <input type="number" name="fund" class="border rounded px-2 py-1 w-full" min="0" step="0.01" />
            <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded">Send / Fund</button>
          </form>
        </div>
      </div>
    `,pageEvents:()=>{document.getElementById("admin-action-form").onsubmit=async function(a){a.preventDefault();const r=this.message.value.trim(),n=parseFloat(this.fund.value);if(await e.from("notifications").insert([{user_id:t,title:"Admin Message",message:r,type:"info"}]),n>0){const{data:s}=await e.from("accounts").select("*").eq("user_id",t).single();if(s){const c=parseFloat(s.balance)+n;await e.from("accounts").update({balance:c}).eq("id",s.id),await e.from("transactions").insert([{account_id:s.id,user_id:t,type:"deposit",description:"Admin funding",amount:n,balance_before:s.balance,balance_after:c,status:"completed"}])}}b("Action completed.","success"),window.location.reload()}}}};export{x as default};
