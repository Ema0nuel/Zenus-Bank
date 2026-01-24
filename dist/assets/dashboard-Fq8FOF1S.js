import{s as a}from"./supabaseClient-CL6H8VOx.js";import{n as v}from"./Navbar-DbLO2Fva.js";import{r as h}from"./reset-CYKpHJhn.js";import"./toast-DRvdR0y9.js";import"./logo-yCyWWFG1.js";const D=async()=>{h("Zenus Bank | Dashboard");const o=v(),g=await a.auth.getSession();if(!g.data.session){window.location.href="/login";return}const{user:i}=g.data.session,{data:p}=await a.from("profiles").select("*").eq("id",i.id).single(),{data:e}=await a.from("accounts").select("*").eq("user_id",i.id).single(),{data:l}=await a.from("transactions").select("*").eq("user_id",i.id).order("created_at",{ascending:!1}).limit(3),{data:c}=await a.from("transactions").select("*").eq("account_id",e?.id).eq("type","transfer").order("created_at",{ascending:!1}).limit(5),{data:x}=await a.from("transactions").select("*").eq("account_id",e?.id).order("created_at",{ascending:!1}).limit(10),{data:s}=await a.from("crypto_balances").select("*").eq("user_id",i.id).single(),n=(t,d=8)=>t?Number(t).toFixed(d):"0.0000",r=t=>typeof t=="number"?t.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):t||"$0.00",f=l&&l.length?l.sort((t,d)=>new Date(d.created_at)-new Date(t.created_at)).slice(0,5).map(t=>`
      <div class="rounded bg-green-100 dark:bg-green-900/60 text-green-900 dark:text-green-100 px-3 py-2 mb-2 shadow text-xs font-normal">
        <span class="font-semibold">${t.type?.toUpperCase()}</span>
        <div class="text-[11px]">${t.description||""}</div>
        <div class="text-[10px] text-gray-500 dark:text-gray-300">${t.created_at?.slice(0,16).replace("T"," ")}</div>
        <div class="text-[10px] font-semibold text-yellow-500">${t.status==="completed"?"Completed":t.status}</div>
      </div>
    `).join(""):'<div class="text-gray-400 dark:text-gray-500 text-xs">No notifications yet.</div>',m=c&&c.length?c.sort((t,d)=>new Date(d.created_at)-new Date(t.created_at)).slice(0,5).map(t=>`
      <tr>
        <td class="px-2 py-1 text-xs">${t.created_at?.slice(0,16).replace("T"," ")}</td>
        <td class="px-2 py-1 text-xs">${t.beneficiary_bank||"-"}</td>
        <td class="px-2 py-1 text-xs">${t.beneficiary_name||"-"}</td>
        <td class="px-2 py-1 text-xs">${t.beneficiary_account||"-"}</td>
        <td class="px-2 py-1 font-semibold text-yellow-500 text-xs">${r(t.amount)}</td>
      </tr>
    `).join(""):'<tr><td colspan="5" class="text-center text-gray-400 dark:text-gray-500 py-2 text-xs">No transfers found.</td></tr>',b=x&&x.length?x.map(t=>`
      <tr>
        <td class="px-2 py-1 text-xs">${t.created_at?.slice(0,16).replace("T"," ")}</td>
        <td class="px-2 py-1 text-xs">${t.type}</td>
        <td class="px-2 py-1 text-xs">${t.description||"-"}</td>
        <td class="px-2 py-1 font-semibold text-yellow-500 text-xs">${r(t.amount)}</td>
        <td class="px-2 py-1 text-xs">${r(t.balance_after)}</td>
      </tr>
    `).join(""):'<tr><td colspan="5" class="text-center text-gray-400 dark:text-gray-500 py-2 text-xs">No transactions found.</td></tr>';function y(){o.pageEvents?.()}return{html:`
        <div class=relative">
      ${o.html}
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
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white">${p.full_name}</h2>
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
                <p class="text-lg font-semibold text-gray-900 dark:text-white">${r(e?.balance)}</p>
              </div>
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-center text-xs">
                <i class="fa fa-dollar-sign mx-auto mb-2 text-red-600 dark:text-red-400" style="font-size:22px"></i>
                <h3 class="text-xs font-normal text-gray-700 dark:text-gray-300 mb-1">Mortgage Balance</h3>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">${r(e?.mortgage)}</p>
              </div>
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-center text-xs">
                <i class="fa fa-credit-card mx-auto mb-2 text-red-600 dark:text-red-400" style="font-size:22px"></i>
                <h3 class="text-xs font-normal text-gray-700 dark:text-gray-300 mb-1">Loan Balance</h3>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">${r(e?.loan)}</p>
              </div>
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-center text-xs">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <i class="fab fa-bitcoin text-yellow-500 dark:text-yellow-400 text-xl mr-2"></i>
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Crypto Assets Balance</h3>
                  </div>
                  <a href="/crypto" data-nav 
                    class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    View All
                  </a>
                </div>
                <div class="space-y-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <i class="fab fa-bitcoin text-yellow-500"></i>
                      <span class="text-xs text-gray-600 dark:text-gray-300">Bitcoin</span>
                    </div>
                    <span class="text-xs font-medium text-gray-900 dark:text-white">
                      ${n(s?.btc_balance)} BTC
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <i class="fab fa-ethereum text-blue-500"></i>
                      <span class="text-xs text-gray-600 dark:text-gray-300">Ethereum</span>
                    </div>
                    <span class="text-xs font-medium text-gray-900 dark:text-white">
                      ${n(s?.eth_balance)} ETH
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-dollar-sign text-green-500"></i>
                      <span class="text-xs text-gray-600 dark:text-gray-300">USDT</span>
                    </div>
                    <span class="text-xs font-medium text-gray-900 dark:text-white">
                      ${n(s?.usdt_balance)} USDT
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-dollar-sign text-blue-500"></i>
                      <span class="text-xs text-gray-600 dark:text-gray-300">USDC</span>
                    </div>
                    <span class="text-xs font-medium text-gray-900 dark:text-white">
                      ${n(s?.usdc_balance)} USDC
                    </span>
                  </div>
                </div>
                <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  Updated ${s?.updated_at?new Date(s.updated_at).toLocaleString():"Never"}
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div class="p-4 rounded bg-white dark:bg-gray-800 shadow-sm text-xs">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-envelope mr-2"></i> Latest Bank Notification</h3>
                </div>
                <div class="p-2 rounded bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700">
                  ${f}
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
                      ${m}
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
                    ${b}
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
    `,pageEvents:y}};export{D as default};
