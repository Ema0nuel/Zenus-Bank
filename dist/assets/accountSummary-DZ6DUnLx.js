import{s as r}from"./supabaseClient-B1HaFb4P.js";import{n as f}from"./Navbar-CwWpEmJu.js";import{r as u}from"./reset-CYKpHJhn.js";import{N as y}from"./logo-nobg-BVMQOOtC.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./toast-Dx2DSKhR.js";import"./logo-yCyWWFG1.js";function v(a={}){const t={...{title:"Transaction Receipt",receiptId:a.id||"",date:a.date||new Date().toLocaleDateString(),time:a.time||new Date().toLocaleTimeString(),amount:a.amount||"0.00",currency:"$",description:a.description||"",senderName:a.by||"",recipientName:a.to||"",bankName:a.bankName||"",accountNumber:a.accountNumber||"",transactionType:a.type||"",status:a.status||"Completed",referenceNumber:a.id||"",fees:a.fees||"0.00",totalAmount:a.amount||"",companyName:"Zenus Bank",companyAddress:"123 Main St, City, Country",companyPhone:"+1 (555) 123-4567",companyEmail:"zenusbanking@gmail.com",additionalFields:a.additionalFields||{},showFooter:!0,footerText:"Thank you for banking with us!"},...a};return`
    <div class="receipt-container font-mono">
      <div class="text-center mb-4">
        <img src="${y}" alt="Zenus Bank" class="h-10 mx-auto mb-2" />
        <h2 class="font-bold text-2xl text-gray-900 dark:text-white mb-1">${t.title}</h2>
        <div class="text-base text-gray-700 dark:text-gray-300">${t.companyName}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">${t.companyAddress}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">${t.companyPhone} | ${t.companyEmail}</div>
      </div>
      <div class="mb-4 border-b border-dashed border-gray-300 dark:border-gray-700 pb-3">
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Receipt ID:</span><span>${t.receiptId}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Date:</span><span>${t.date}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Time:</span><span>${t.time}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Type:</span><span>${t.transactionType}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="font-semibold">Status:</span>
          <span class="font-bold" style="color:${t.status==="Completed"?"#16a34a":t.status==="Pending"?"#f59e42":"#dc2626"};">
            ${t.status}
          </span>
        </div>
      </div>
      <div class="mb-4">
        <h3 class="text-center text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">Transaction Details</h3>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">From:</span><span>${t.senderName}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">To:</span><span>${t.recipientName}</span>
        </div>
        <div class="flex justify-between text-xs mb-1">
          <span class="font-semibold">Description:</span><span>${t.description}</span>
        </div>
        <div class="flex justify-between text-xs">
          <span class="font-semibold">Reference:</span><span>${t.referenceNumber}</span>
        </div>
      </div>
      <div class="mb-4 border-t border-dashed border-gray-300 dark:border-gray-700 pt-3">
        <div class="flex justify-between text-sm mb-1">
          <span class="font-semibold">Amount:</span><span>${t.currency}${t.amount}</span>
        </div>
        ${parseFloat(t.fees)>0?`<div class="flex justify-between text-sm mb-1">
                  <span class="font-semibold">Fees:</span><span>${t.currency}${t.fees}</span>
                </div>`:""}
        <div class="flex justify-between text-base font-bold border-t border-gray-300 dark:border-gray-700 pt-2">
          <span>Total:</span><span>${t.currency}${t.totalAmount}</span>
        </div>
      </div>
      ${Object.keys(t.additionalFields).length>0?`<div class="mb-4 border-t border-dashed border-gray-300 dark:border-gray-700 pt-3">
                ${Object.entries(t.additionalFields).map(([o,n])=>`
                      <div class="flex justify-between text-xs mb-1">
                        <span class="font-semibold">${o}:</span><span>${n}</span>
                      </div>
                    `).join("")}
              </div>`:""}
      ${t.showFooter?`<div class="text-center mt-4 pt-3 border-t-2 border-dashed border-gray-300 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                <div>${t.footerText}</div>
                <div class="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
                  This is an Zenus Bank-generated receipt
                </div>
              </div>`:""}
    </div>
    `}const A=async()=>{u("Account Summary");const a=f(),c=await r.auth.getSession();if(!c.data.session){window.location.href="/login";return}const{user:t}=c.data.session,{data:o}=await r.from("profiles").select("*").eq("id",t.id).single(),{data:n}=await r.from("accounts").select("*").eq("user_id",t.id).single(),{data:d}=await r.from("transactions").select("*").eq("account_id",n?.id).order("created_at",{ascending:!1}),i=e=>typeof e=="number"?e.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):e||"$0.00",p=d&&d.length?d.map((e,s)=>`
            <tr class="cursor-pointer hover:bg-yellow-50 dark:hover:bg-blue-900/20" data-txid="${e.id}">
                <td class="px-2 py-1 text-xs">${s+1}</td>
                <td class="px-2 py-1 text-xs">${e.created_at?.slice(0,16).replace("T"," ")}</td>
                <td class="px-2 py-1 text-xs">${e.description||"-"}</td>
                <td class="px-2 py-1 text-xs font-semibold text-yellow-500">${i(e.amount)}</td>
                <td class="px-2 py-1 text-xs">${e.type||"-"}</td>
                <td class="px-2 py-1 text-xs">${e.by||"-"}</td>
                <td class="px-2 py-1 text-xs">${e.to||"-"}</td>
                <td class="px-2 py-1 text-xs">${e.reason||"-"}</td>
            </tr>
        `).join(""):'<tr><td colspan="8" class="text-center text-gray-400 dark:text-gray-500 py-2 text-xs">No transactions found.</td></tr>';function x(){a.pageEvents?.(),document.querySelectorAll("tr[data-txid]").forEach(e=>{e.addEventListener("click",()=>{const s=e.getAttribute("data-txid"),l=d.find(b=>b.id===s);l&&m(l)})})}function m(e){let s=document.getElementById("receipt-modal");s||(s=document.createElement("div"),s.id="receipt-modal",document.body.appendChild(s)),s.className="",s.innerHTML=`
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                <div class="receipt-modal-content bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-md mx-2 p-0 relative overflow-auto" style="max-height:90vh;">
                    <button id="close-receipt-modal" class="absolute top-3 right-4 text-gray-400 hover:text-red-500 dark:hover:text-white text-2xl font-bold z-10" aria-label="Close">&times;</button>
                    <div class="p-6">
                        ${v({id:e.id,date:e.created_at?.slice(0,10),time:e.created_at?.slice(11,16),amount:i(e.amount).replace("$",""),currency:"$",description:e.description,by:e.by,to:e.to,type:e.type,status:e.status,referenceNumber:e.id,fees:e.fees||"0.00",totalAmount:i(e.amount).replace("$",""),additionalFields:{Reason:e.reason||"-","Balance Before":i(e.balance_before),"Balance After":i(e.balance_after)}})}
                    </div>
                </div>
            </div>
            <style>
                .receipt-modal-content::-webkit-scrollbar { width: 8px; background: transparent; }
                .receipt-modal-content::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
                .dark .receipt-modal-content::-webkit-scrollbar-thumb { background: #334155; }
                .receipt-container {
                    background: repeating-linear-gradient(135deg, #f8fafc 0px, #e0e7ef 80%, #f8fafc 100%);
                    border-radius: 16px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.10);
                    padding: 0;
                }
                .dark .receipt-container {
                    background: linear-gradient(135deg, #1e293b 0px, #334155 80%, #1e293b 100%);
                    box-shadow: 0 4px 24px rgba(0,0,0,0.40);
                }
            </style>
        `,document.getElementById("close-receipt-modal").onclick=()=>{s.innerHTML="",s.className="hidden"}}return{html:`
        ${a.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
            <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
                <div class="p-4">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <nav class="flex items-center space-x-2 text-xs mb-2 md:mb-0">
                            <i class="fa fa-home text-gray-500"></i>
                            <span class="text-gray-500">/</span>
                            <span class="text-gray-700 dark:text-gray-300">Account Summary</span>
                        </nav>
                        <div class="flex flex-wrap gap-2">
                            <div class="bg-green-100 rounded px-4 py-2 flex items-center gap-2">
                                <i class="fa fa-briefcase text-green-700"></i>
                                <div>
                                    <div class="text-xs font-semibold text-green-800">${i(n?.balance)}</div>
                                    <div class="text-[10px] text-green-600">Account Balance</div>
                                </div>
                            </div>
                            <div class="bg-blue-100 rounded px-4 py-2 flex items-center gap-2">
                                <i class="fa fa-refresh text-blue-700"></i>
                                <div>
                                    <div class="text-xs font-semibold text-blue-800">${n?.is_active?"Active":"Inactive"}</div>
                                    <div class="text-[10px] text-blue-600">Account Status</div>
                                </div>
                            </div>
                            <div class="bg-orange-100 rounded px-4 py-2 flex items-center gap-2">
                                <i class="fa fa-star text-orange-700"></i>
                                <div>
                                    <div class="text-xs font-semibold text-orange-800">${n?.account_type||"-"}</div>
                                    <div class="text-[10px] text-orange-600">Account Type</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="text-base font-semibold text-gray-900 dark:text-white"><i class="fa fa-money mr-2"></i> Account Statement</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full text-xs table-auto">
                                <thead>
                                    <tr class="bg-yellow-100 dark:bg-blue-900/30">
                                        <th class="px-2 py-1 text-left">#</th>
                                        <th class="px-2 py-1 text-left">Date</th>
                                        <th class="px-2 py-1 text-left">Description</th>
                                        <th class="px-2 py-1 text-left">Amount</th>
                                        <th class="px-2 py-1 text-left">Transaction</th>
                                        <th class="px-2 py-1 text-left">By</th>
                                        <th class="px-2 py-1 text-left">To</th>
                                        <th class="px-2 py-1 text-left">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${p}
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
        <div id="receipt-modal" class="hidden"></div>
        `,pageEvents:x}};export{A as default};
