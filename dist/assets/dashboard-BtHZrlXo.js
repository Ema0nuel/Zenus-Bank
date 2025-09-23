import{s as a}from"./supabaseClient-B1HaFb4P.js";import{n as b}from"./Navbar-DzFN-yR7.js";import{r as y}from"./reset-CYKpHJhn.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./toast-Dx2DSKhR.js";import"./logo-yCyWWFG1.js";const _=async()=>{y("Zenus Bank | Dashboard");const l=b(),c=await a.auth.getSession();if(!c.data.session){window.location.href="/login";return}const{user:r}=c.data.session,{data:x}=await a.from("profiles").select("*").eq("id",r.id).single(),{data:e}=await a.from("accounts").select("*").eq("user_id",r.id).single(),{data:d}=await a.from("transactions").select("*").eq("user_id",r.id).order("created_at",{ascending:!1}).limit(3),{data:i}=await a.from("transactions").select("*").eq("account_id",e?.id).eq("type","transfer").order("created_at",{ascending:!1}).limit(5),{data:n}=await a.from("transactions").select("*").eq("account_id",e?.id).order("created_at",{ascending:!1}).limit(10),s=t=>typeof t=="number"?t.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):t||"$0.00",g=d&&d.length?d.sort((t,o)=>new Date(o.created_at)-new Date(t.created_at)).slice(0,5).map(t=>`
      <div class="rounded bg-green-100 dark:bg-green-900/60 text-green-900 dark:text-green-100 px-3 py-2 mb-2 shadow text-xs font-normal">
        <span class="font-semibold">${t.type?.toUpperCase()}</span>
        <div class="text-[11px]">${t.description||""}</div>
        <div class="text-[10px] text-gray-500 dark:text-gray-300">${t.created_at?.slice(0,16).replace("T"," ")}</div>
        <div class="text-[10px] font-semibold text-yellow-500">${t.status==="completed"?"Completed":t.status}</div>
      </div>
    `).join(""):'<div class="text-gray-400 dark:text-gray-500 text-xs">No notifications yet.</div>',p=i&&i.length?i.sort((t,o)=>new Date(o.created_at)-new Date(t.created_at)).slice(0,5).map(t=>`
      <tr>
        <td class="px-2 py-1 text-xs">${t.created_at?.slice(0,16).replace("T"," ")}</td>
        <td class="px-2 py-1 text-xs">${t.beneficiary_bank||"-"}</td>
        <td class="px-2 py-1 text-xs">${t.beneficiary_name||"-"}</td>
        <td class="px-2 py-1 text-xs">${t.beneficiary_account||"-"}</td>
        <td class="px-2 py-1 font-semibold text-yellow-500 text-xs">${s(t.amount)}</td>
      </tr>
    `).join(""):'<tr><td colspan="5" class="text-center text-gray-400 dark:text-gray-500 py-2 text-xs">No transfers found.</td></tr>',m=n&&n.length?n.map(t=>`
      <tr>
        <td class="px-2 py-1 text-xs">${t.created_at?.slice(0,16).replace("T"," ")}</td>
        <td class="px-2 py-1 text-xs">${t.type}</td>
        <td class="px-2 py-1 text-xs">${t.description||"-"}</td>
        <td class="px-2 py-1 font-semibold text-yellow-500 text-xs">${s(t.amount)}</td>
        <td class="px-2 py-1 text-xs">${s(t.balance_after)}</td>
      </tr>
    `).join(""):'<tr><td colspan="5" class="text-center text-gray-400 dark:text-gray-500 py-2 text-xs">No transactions found.</td></tr>';function f(){l.pageEvents?.()}return{html:`
        <div class=relative">
      ${l.html}
      <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
        <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
          <div class="p-4">
            <div class="mb-4">
              <nav class="flex items-center space-x-2 text-xs">
                <i class="fa fa-home text-gray-500 text-xs"></i>
                <span class="text-gray-500">/</span>
                <span class="text-gray-700 dark:text-gray-300">Dashboard</span>
              </nav>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div class="p-4 rounded bg-green-100 dark:bg-green-900 transition-all hover:shadow text-xs">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-semibold text-green-800 dark:text-green-300">${e?.is_active?"Active":"Inactive"}</h3>
                    <p class="text-xs text-green-600 dark:text-green-400 font-normal">Account Status</p>
                  </div>
                  <div class="p-2 rounded-full bg-green-200 dark:bg-green-800">
                    <i class="fa fa-cog text-green-700 dark:text-green-300 text-sm"></i>
                  </div>
                </div>
              </div>
              <div class="p-4 rounded bg-orange-100 dark:bg-orange-900 transition-all hover:shadow text-xs">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-semibold text-orange-800 dark:text-orange-300">${e?.account_type||"USD SAVING"}</h3>
                    <p class="text-xs text-orange-600 dark:text-orange-400 font-normal">Account Type</p>
                  </div>
                  <div class="p-2 rounded-full bg-orange-200 dark:bg-orange-800">
                    <i class="fa fa-star text-orange-700 dark:text-orange-300 text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm mb-6 text-xs">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white">${x.full_name}</h2>
                  <p class="text-xs text-red-600 dark:text-red-400 mt-1 font-normal">Account Holder</p>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white">${e?.account_number||""}</h2>
                  <p class="text-xs text-red-600 dark:text-red-400 mt-1 font-normal">Account Number</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-center text-xs">
                <i class="fa fa-briefcase mx-auto mb-2 text-red-600 dark:text-red-400" style="font-size:22px"></i>
                <h3 class="text-xs font-normal text-gray-700 dark:text-gray-300 mb-1">Account Balance</h3>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">${s(e?.balance)}</p>
              </div>
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-center text-xs">
                <i class="fa fa-dollar-sign mx-auto mb-2 text-red-600 dark:text-red-400" style="font-size:22px"></i>
                <h3 class="text-xs font-normal text-gray-700 dark:text-gray-300 mb-1">Mortgage Balance</h3>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">$0.00</p>
              </div>
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-center text-xs">
                <i class="fa fa-credit-card mx-auto mb-2 text-red-600 dark:text-red-400" style="font-size:22px"></i>
                <h3 class="text-xs font-normal text-gray-700 dark:text-gray-300 mb-1">Loan Balance</h3>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">$0.00</p>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-xs">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-envelope mr-2"></i> Latest Bank Notification</h3>
                </div>
                <div class="p-2 rounded bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700">
                  ${g}
                </div>
              </div>
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-xs">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-exchange mr-2"></i> Latest Transfer Made</h3>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs text-gray-700 dark:text-gray-300">
                    <thead>
                      <tr class="border-b border-gray-200 dark:border-gray-700">
                        <th class="text-left p-1">Date and Time</th>
                        <th class="text-left p-1">Beneficiary Bank</th>
                        <th class="text-left p-1">Beneficiary Name</th>
                        <th class="text-left p-1">Beneficiary Account</th>
                        <th class="text-left p-1">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${p}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-xs">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-money mr-2"></i> Financial Statement Review</h3>
                <a href="/account-summary" data-nav class="btn btn-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-blue-900 transition text-xs font-normal"><i class="fa fa-receipt"></i> View Account Statement</a>
              </div>
              <h4 class="text-xs font-semibold text-gray-900 dark:text-white mb-2">Credit and Debit Statements</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full text-xs">
                  <thead>
                    <tr class="bg-yellow-100 dark:bg-blue-900/30">
                      <th class="px-1 py-1 text-left">Date</th>
                      <th class="px-1 py-1 text-left">Type</th>
                      <th class="px-1 py-1 text-left">Description</th>
                      <th class="px-1 py-1 text-left">Amount</th>
                      <th class="px-1 py-1 text-left">Balance After</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${m}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <footer class="p-4 text-center text-gray-600 dark:text-gray-400 text-xs">
            <p>
              <strong>Copyright © ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.
            </p>
          </footer>
        </div>
      </div>
      </div>
    `,pageEvents:f}};export{_ as default};
