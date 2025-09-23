import{s as i}from"./supabaseClient-B1HaFb4P.js";import{s as y}from"./toast-Dx2DSKhR.js";import{L as k}from"./logo-yCyWWFG1.js";async function w(){const{data:{session:n}}=await i.auth.getSession();if(!n||!n.user)return null;const l=n.user.id,{data:a,error:r}=await i.from("profiles").select("*").eq("id",l).single();if(r||!a)return null;const{data:d,error:m}=await i.from("accounts").select("*").eq("user_id",l).single();return{user:n.user,profile:a,account:d||null}}const E="/assets/user-lhKlZH-X.png",L=()=>{let n=[],l={},a=localStorage.getItem("hrcu_dark")==="true",r=localStorage.getItem("hrcu_sidebar")==="true",d=!1;async function m(t){const{data:s}=await i.from("notifications").select("*").eq("user_id",t).order("created_at",{ascending:!1}).limit(10);n=s||[]}function x(){const t=document.getElementById("notif-list");if(!t)return;t.innerHTML=n.length?n.map(e=>`
                <div class="p-2 border-b ${a?"border-gray-700 hover:bg-gray-700":"border-gray-200 hover:bg-gray-50"} transition-colors cursor-pointer js-message-item" data-id="${e.id}">
                    <div class="flex items-start space-x-2">
                        <div class="p-1 rounded ${e.type==="danger"?a?"bg-red-900":"bg-red-100":a?"bg-blue-900":"bg-blue-100"}">
                            <i class="fa ${e.type==="danger"?"fa-exclamation-circle text-red-600":"fa-envelope text-blue-600"} text-xs"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-xs font-semibold ${a?"text-white":"text-gray-900"}">${e.title||"Message"}</p>
                            <p class="text-[11px] ${a?"text-gray-300":"text-gray-700"} truncate">${e.message?.slice(0,60)||""}${e.message&&e.message.length>60?"...":""}</p>
                            <p class="text-[10px] ${a?"text-gray-400":"text-gray-500"} mt-0.5">${e.created_at?.slice(0,16).replace("T"," ")}</p>
                        </div>
                        ${e.read?"":'<span class="ml-2 mt-1 inline-block w-2 h-2 rounded-full bg-blue-500"></span>'}
                    </div>
                </div>
            `).join(""):'<div class="text-gray-400 dark:text-gray-500 text-xs p-2">No messages yet.</div>';const s=document.getElementById("notif-badge");s&&(s.textContent=n.length?n.length:"")}function p(t){let s=document.getElementById("message-detail-modal");s||(s=document.createElement("div"),s.id="message-detail-modal",document.body.appendChild(s)),s.innerHTML=`
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button id="close-message-detail-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
                    <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">${t.title||"Message"}</h4>
                    <div class="mb-2 text-xs text-gray-500 dark:text-gray-300">${t.created_at?.slice(0,16).replace("T"," ")}</div>
                    <div class="mb-4 text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line">${t.message}</div>
                    <div class="flex justify-end">
                        <button id="close-message-detail-modal-btn" class="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs">Close</button>
                    </div>
                </div>
            </div>
        `,s.className="",document.getElementById("close-message-detail-modal").onclick=document.getElementById("close-message-detail-modal-btn").onclick=()=>{s.innerHTML="",s.className="hidden"}}function u(){document.querySelectorAll("#sidebar .sidebar-text").forEach(t=>{t.style.display=r?"none":""})}function b(t){a=t,localStorage.setItem("hrcu_dark",t?"true":"false"),document.documentElement.classList.toggle("dark",a),document.getElementById("navbar-root").className=`fixed top-0 left-0 right-0 z-50 h-12 ${a?"bg-gray-900 border-gray-700":"bg-white border-gray-200"} border-b shadow-sm font-sans`,document.getElementById("sidebar").className=`fixed left-0 top-12 bottom-0 z-40 ${r?"w-14":"w-56"} ${a?"bg-gray-900 border-gray-700":"bg-white border-gray-200"} border-r shadow-sm transition-all duration-300 font-sans`,document.getElementById("main-content").className=`${r?"ml-14":"ml-56"} pt-14 transition-all duration-300 font-sans min-h-screen`,u(),x()}function c(t){r=t,localStorage.setItem("hrcu_sidebar",t?"true":"false"),document.getElementById("sidebar").className=`fixed left-0 top-12 bottom-0 z-40 ${r?"w-14":"w-56"} ${a?"bg-gray-900 border-gray-700":"bg-white border-gray-200"} border-r shadow-sm transition-all duration-300 font-sans`,document.getElementById("main-content").className=`${r?"ml-14":"ml-56"} pt-14 transition-all duration-300 font-sans min-h-screen`,u()}async function h(){const t=await w();t&&t.profile&&(l=t.profile,document.querySelector(".user-name").textContent=l.full_name,document.querySelector(".user-img").src=l.avatar_url||"/src/images/user/user.png",await m(t.user.id),x()),document.getElementById("sidebar-toggle").onclick=()=>{c(!r)};function s(){window.innerWidth<768?c(!0):c(!1)}window.addEventListener("resize",s),s(),document.querySelectorAll(".js-sub-menu-toggle").forEach(e=>{e.onclick=function(o){o.preventDefault(),r&&c(!1);const g=this.nextElementSibling;g&&g.classList.toggle("hidden"),this.querySelector(".toggle-icon")?.classList.toggle("rotate-90")}}),document.getElementById("notif-btn").onclick=e=>{e.stopPropagation(),d=!d,document.getElementById("notif-dropdown").classList.toggle("hidden",!d)},document.addEventListener("click",e=>{const o=document.getElementById("notif-dropdown");o&&!o.contains(e.target)&&e.target!==document.getElementById("notif-btn")&&(o.classList.add("hidden"),d=!1)}),document.getElementById("notif-list").onclick=async function(e){const o=e.target.closest(".js-message-item");if(o){const g=o.getAttribute("data-id"),f=n.find(v=>v.id===g);f&&(p(f),f.read||(await i.from("notifications").update({read:!0}).eq("id",g),f.read=!0,x()))}},document.getElementById("user-menu-btn").onclick=e=>{e.stopPropagation(),document.getElementById("user-menu-dropdown").classList.toggle("hidden")},document.addEventListener("click",e=>{!document.getElementById("user-menu-dropdown").contains(e.target)&&e.target!==document.getElementById("user-menu-btn")&&document.getElementById("user-menu-dropdown").classList.add("hidden")}),document.getElementById("theme-toggle").onclick=()=>{b(!a)},b(a),c(r),document.getElementById("logout").onclick=async()=>{await i.auth.signOut(),y("You have been logged out.","success"),setTimeout(()=>window.location.href="/",1e3)},document.getElementById("log-out").onclick=async()=>{await i.auth.signOut(),y("You have been logged out.","success"),setTimeout(()=>window.location.href="/",1e3)}}return{html:`
        <div id="navbar-root" class="fixed top-0 left-0 right-0 z-50 h-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm font-sans">
            <div class="flex items-center justify-between h-full px-3">
                <div class="flex items-center space-x-2">
                    <button id="sidebar-toggle" class="p-1 rounded text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base">
                        <i class="fa fa-bars"></i>
                    </button>
                    <img src="${k}" alt="Logo" class="h-7 w-auto" />
                </div>
                <div class="flex items-center space-x-2">
                    <div class="relative hidden">
                        <button id="notif-btn" class="relative p-1 rounded text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base">
                            <i class="fa fa-envelope text-base"></i>
                            <span id="notif-badge" class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center"></span>
                        </button>
                        <div id="notif-dropdown" class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 hidden">
                            <div class="p-2 border-b border-gray-200 dark:border-gray-700">
                                <h3 class="font-semibold text-gray-900 dark:text-white text-xs">Recent Messages</h3>
                            </div>
                            <div id="notif-list" class="max-h-80 overflow-y-auto"></div>
                            <div class="p-2 border-t border-gray-200 dark:border-gray-700">
                                <button class="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-normal">View All Messages</button>
                            </div>
                        </div>
                    </div>
                    <div class="relative">
                        <button id="user-menu-btn" class="flex items-center space-x-2 btn btn-link dropdown-toggle focus:outline-none">
                            <img src="${E}" alt="User" class="user-img h-7 w-7 rounded-full object-cover" />
                            <span class="user-name text-xs font-normal text-gray-900 dark:text-gray-100"></span>
                            <i class="fa fa-caret-down text-gray-500 dark:text-gray-300 text-xs"></i>
                        </button>
                        <ul id="user-menu-dropdown" class="dropdown-menu absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 hidden">
                            <li>
                                <a href="/profile" data-nav class="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                    <i class="fa fa-user mr-2"></i> <span class="text">Profile</span>
                                </a>
                            </li>
                            <li>
                                <a class="cursor-pointer flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal" id="log-out">
                                    <i class="fa fa-power-off mr-2"></i> <span class="text">Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button id="theme-toggle" class="p-1 rounded text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base">
                        <span id="theme-icon">🌙</span>
                    </button>
                </div>
            </div>
        </div>
        <div id="sidebar" class="fixed left-0 top-12 bottom-0 z-40 ${r?"w-14":"w-56"} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 font-sans">
            <div class="h-full overflow-y-auto">
                <nav class="pt-2">
                    <ul class="space-y-1">
                        <li>
                            <a href="/dashboard" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fa fa-home mr-2 text-base"></i>
                                <span class="sidebar-text">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/profile" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fa fa-user mr-2 text-base"></i>
                                <span class="sidebar-text">My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="/account-summary" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fa fa-briefcase mr-2 text-base"></i>
                                <span class="sidebar-text">History</span>
                            </a>
                        </li>
                        <li>
                            <a href="/deposit" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fa fa-dollar-sign mr-2 text-base"></i>
                                <span class="sidebar-text">Deposit</span>
                            </a>
                        </li>
                        <li>
                            <a href="/paypal" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fab fa-paypal mr-2 text-base"></i>
                                <span class="sidebar-text">Paypal</span>
                            </a>
                        </li>
                        <li>
                            <a href="/card-payment" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fas fa-credit-card mr-2 text-base"></i>
                                <span class="sidebar-text">Card Deposit</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs js-sub-menu-toggle">
                                <i class="fa fa-credit-card mr-2 text-base"></i>
                                <span class="sidebar-text">Funds Transfer</span>
                                <i class="toggle-icon fa fa-angle-left ml-auto transition-transform text-xs"></i>
                            </a>
                            <ul class="sub-menu ml-7 mt-1 space-y-1 hidden">
                                <li>
                                    <a href="/interbank-transfer" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-bank mr-2 text-xs"></i>
                                        <span class="sidebar-text">Inter-Bank Transfer</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/local-transfer" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-street-view mr-2 text-xs"></i>
                                        <span class="sidebar-text">Local Transfer</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/wire-transfer" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-coins mr-2 text-xs"></i>
                                        <span class="sidebar-text">Wire Transfer</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/crypto" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-coins mr-2 text-xs"></i>
                                        <span class="sidebar-text">Crypto Transfer</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs js-sub-menu-toggle">
                                <i class="fa fa-cog mr-2 text-base"></i>
                                <span class="sidebar-text">Settings</span>
                                <i class="toggle-icon fa fa-angle-left ml-auto transition-transform text-xs"></i>
                            </a>
                            <ul class="sub-menu ml-7 mt-1 space-y-1 hidden">
                                <li>
                                    <a href="/edit-profile" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-edit mr-2 text-xs"></i>
                                        <span class="sidebar-text">Edit Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs js-sub-menu-toggle">
                                <i class="fa fa-bank mr-2 text-base"></i>
                                <span class="sidebar-text">Personal Banking</span>
                                <i class="toggle-icon fa fa-angle-left ml-auto transition-transform text-xs"></i>
                            </a>
                            <ul class="sub-menu ml-7 mt-1 space-y-1 hidden">
                                <li>
                                    <a href="/contact" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-envelope mr-2 text-xs"></i>
                                        <span class="sidebar-text">Contact Us</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/withdrawal" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fa fa-dollar-sign mr-2 text-base"></i>
                                <span class="sidebar-text">Withdrawal</span>
                            </a>
                        </li>
                        <li>
                            <a href="/loan" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fa-solid fa-landmark mr-2 text-base"></i>
                                <span class="sidebar-text">Loan</span>
                            </a>
                        </li>
                        <li>
                            <a href="/cards" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs">
                                <i class="fa-solid fa-credit-card mr-2 text-base"></i>
                                <span class="sidebar-text">Credit Cards</span>
                            </a>
                        </li>
                        <li>
                            <a class="cursor-pointer flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-normal text-xs" id="logout">
                                <i class="fa fa-power-off mr-2 text-base"></i>
                                <span class="sidebar-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        `,pageEvents:h}};export{L as n};
