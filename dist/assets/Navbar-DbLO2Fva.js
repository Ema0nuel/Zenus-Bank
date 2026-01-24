import{s as g}from"./supabaseClient-CL6H8VOx.js";import{s as k}from"./toast-DRvdR0y9.js";import{L as w}from"./logo-yCyWWFG1.js";async function E(){const{data:{session:o}}=await g.auth.getSession();if(!o||!o.user)return null;const d=o.user.id,{data:s,error:n}=await g.from("profiles").select("*").eq("id",d).single();if(n||!s)return null;const{data:c,error:b}=await g.from("accounts").select("*").eq("user_id",d).single();return{user:o.user,profile:s,account:c||null}}const I="/assets/user-lhKlZH-X.png",S=()=>{let o=[],d={},s=localStorage.getItem("hrcu_dark")==="true",n=localStorage.getItem("hrcu_sidebar")==="true",c=!1;async function b(e){const{data:a}=await g.from("notifications").select("*").eq("user_id",e).order("created_at",{ascending:!1}).limit(10);o=a||[]}function f(){const e=document.getElementById("notif-list");if(!e)return;e.innerHTML=o.length?o.map(t=>`
                <div class="p-2 border-b ${s?"border-gray-700 hover:bg-gray-700":"border-gray-200 hover:bg-gray-50"} transition-colors cursor-pointer js-message-item" data-id="${t.id}">
                    <div class="flex items-start space-x-2">
                        <div class="p-1 rounded ${t.type==="danger"?s?"bg-red-900":"bg-red-100":s?"bg-blue-900":"bg-blue-100"}">
                            <i class="fa ${t.type==="danger"?"fa-exclamation-circle text-red-600":"fa-envelope text-blue-600"} text-xs"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-xs font-semibold ${s?"text-white":"text-gray-900"}">
                                ${t.title||"Message"}
                            </p>
                            <p class="text-[11px] ${s?"text-gray-300":"text-gray-700"} truncate">
                                ${t.message?.slice(0,60)||""}${t.message&&t.message.length>60?"...":""}
                            </p>
                            <p class="text-[10px] ${s?"text-gray-400":"text-gray-500"} mt-0.5">
                                ${t.created_at?.slice(0,16).replace("T"," ")}
                            </p>
                        </div>
                        ${t.read?"":'<span class="ml-2 mt-1 inline-block w-2 h-2 rounded-full bg-blue-500"></span>'}
                    </div>
                </div>
            `).join(""):'<div class="text-gray-400 dark:text-gray-500 text-xs p-2">No messages yet.</div>';const a=document.getElementById("notif-badge");a&&(a.textContent=o.filter(t=>!t.read).length||"")}function y(e){let a=document.getElementById("message-detail-modal");a||(a=document.createElement("div"),a.id="message-detail-modal",document.body.appendChild(a)),a.innerHTML=`
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                    <button id="close-message-detail-modal" class="absolute top-2 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-lg">&times;</button>
                    <h4 class="text-base font-semibold mb-2 text-gray-900 dark:text-white">
                        ${e.title||"Message"}
                    </h4>
                    <div class="mb-2 text-xs text-gray-500 dark:text-gray-300">
                        ${e.created_at?.slice(0,16).replace("T"," ")}
                    </div>
                    <div class="mb-4 text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line">
                        ${e.message}
                    </div>
                    <div class="flex justify-end">
                        <button id="close-message-detail-modal-btn" class="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `,a.className="";const t=()=>{a.innerHTML="",a.className="hidden"};document.getElementById("close-message-detail-modal").onclick=t,document.getElementById("close-message-detail-modal-btn").onclick=t}function p(){document.querySelectorAll("#sidebar .sidebar-text").forEach(e=>{e.style.display=n?"none":"block"})}function u(e){s=e,localStorage.setItem("hrcu_dark",e?"true":"false"),document.documentElement.classList.toggle("dark",s),document.getElementById("navbar-root").className=`fixed top-0 left-0 right-0 z-50 h-12 ${s?"bg-gray-900 border-gray-700":"bg-white border-gray-200"} border-b shadow-sm font-sans`,document.getElementById("sidebar").className=`fixed left-0 top-12 bottom-0 z-40 ${n?"w-14":"w-56"} ${s?"bg-gray-900 border-gray-700":"bg-white border-gray-200"} border-r shadow-sm transition-all duration-300 font-sans`,document.getElementById("main-content").className=`${n?"ml-14":"ml-56"} pt-14 transition-all duration-300 font-sans min-h-screen`,p(),f()}function x(e){const a=document.getElementById("sidebar"),t=document.getElementById("toggle-sidebar-btn");if(!a){n=e,localStorage.setItem("hrcu_sidebar",e?"true":"false");return}e?(a.classList.add("hidden","md:relative"),t&&(t.textContent="☰")):(a.classList.remove("hidden"),t&&(t.textContent="✕")),n=e,localStorage.setItem("hrcu_sidebar",e?"true":"false")}async function h(){const e=await E();e&&e.profile&&(d=e.profile,document.querySelector(".user-name").textContent=d.full_name,document.querySelector(".user-img").src=d.avatar_url||"/src/images/user/user.png",await b(e.user.id),f()),document.getElementById("sidebar-toggle").onclick=()=>{x(!n)};function a(){window.innerWidth<768?x(!0):x(!1)}window.addEventListener("resize",a),a(),document.querySelectorAll(".js-sub-menu-toggle").forEach(r=>{r.onclick=function(i){i.preventDefault(),n&&x(!1);const m=this.nextElementSibling;m&&m.classList.toggle("hidden");const l=this.querySelector(".toggle-icon");l&&l.classList.toggle("rotate-90")}}),document.getElementById("notif-btn").onclick=r=>{r.stopPropagation(),c=!c,document.getElementById("notif-dropdown").classList.toggle("hidden",!c)},document.addEventListener("click",r=>{const i=document.getElementById("notif-dropdown");i&&!i.contains(r.target)&&r.target!==document.getElementById("notif-btn")&&(i.classList.add("hidden"),c=!1)}),document.getElementById("notif-list").onclick=async function(r){const i=r.target.closest(".js-message-item");if(i){const m=i.getAttribute("data-id"),l=o.find(v=>v.id===m);l&&(y(l),l.read||(await g.from("notifications").update({read:!0}).eq("id",m),l.read=!0,f()))}},document.getElementById("user-menu-btn").onclick=r=>{r.stopPropagation(),document.getElementById("user-menu-dropdown").classList.toggle("hidden")},document.addEventListener("click",r=>{!document.getElementById("user-menu-dropdown").contains(r.target)&&r.target!==document.getElementById("user-menu-btn")&&document.getElementById("user-menu-dropdown").classList.add("hidden")}),document.getElementById("theme-toggle").onclick=()=>{u(!s)},u(s),x(n);const t=async()=>{await g.auth.signOut(),k("You have been logged out.","success"),setTimeout(()=>window.location.href="/",1e3)};document.getElementById("logout")?.addEventListener("click",t),document.getElementById("log-out")?.addEventListener("click",t)}return{html:`
        <div id="navbar-root" class="fixed top-0 left-0 right-0 z-50 h-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm font-sans">
            <div class="flex items-center justify-between h-full px-3">
                <div class="flex items-center space-x-2">
                    <button id="sidebar-toggle" class="p-1 rounded text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-5xl md:text-base">
                        <i class="fa fa-bars text-3xl md:text-base"></i>
                    </button>
                    <a href="/dashboard" class="flex items-center space-x-2">
                        <img src="${w}" alt="Logo" class="h-7 w-auto" />
                        <span class="hidden sm:inline-block text-lg font-semibold text-gray-900 dark:text-white">
                            Zenus Bank
                        </span>
                    </a>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="relative">
                        <button id="notif-btn" class="p-1 rounded text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base">
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
                        <button id="user-menu-btn" class="flex items-center space-x-2 focus:outline-none">
                            <img src="${I}" alt="User" class="user-img h-7 w-7 rounded-full object-cover" />
                            <span class="hidden sm:inline-block user-name text-xs font-normal text-gray-900 dark:text-gray-100"></span>
                            <i class="fa fa-caret-down text-gray-500 dark:text-gray-300 text-xs"></i>
                        </button>
                        <ul id="user-menu-dropdown" class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 hidden">
                            <li>
                                <a href="/profile" data-nav class="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                    <i class="fa fa-user mr-2"></i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a id="log-out" class="cursor-pointer flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                    <i class="fa fa-power-off mr-2"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button id="theme-toggle" class="p-1 rounded text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base">
                        <span id="theme-icon">${s?'<i class="fa fa-sun text-yellow-500"></i>':'<i class="fa fa-moon text-blue-500"></i>'}</span>
                    </button>
                </div>
            </div>
        </div>
        <div id="sidebar" class="fixed left-0 top-12 bottom-0 z-40 ${n?"w-14":"w-56"} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 font-sans">
            <div class="h-full overflow-y-auto">
                <nav class="pt-2">
                    <ul class="space-y-1">
                        <li>
                            <a href="/dashboard" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa fa-home mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/profile" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa fa-user mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">My Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="/idme" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa fa-id-card mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Idme</span>
                            </a>
                        </li>
                        <li>
                            <a href="/account-summary" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa fa-briefcase mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">History</span>
                            </a>
                        </li>
                        <li>
                            <a href="/deposit" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa fa-dollar-sign mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Deposit</span>
                            </a>
                        </li>
                        <li>
                            <a href="/card-payment" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fas fa-credit-card mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Card Deposit</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-3xl md:text-base font-normal js-sub-menu-toggle">
                                <i class="fa fa-credit-card mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Funds Transfer</span>
                                <i class="toggle-icon fa fa-angle-left ml-auto transition-transform text-base"></i>
                            </a>
                            <ul class="sub-menu ml-7 mt-1 space-y-1 hidden">
                                <li>
                                    <a href="/interbank-transfer" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-bank mr-2 text-3xl md:text-base"></i>
                                        <span class="sidebar-text">Inter-Bank Transfer</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/local-transfer" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-street-view mr-2 text-3xl md:text-base"></i>
                                        <span class="sidebar-text">Local Transfer</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/wire-transfer" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-coins mr-2 text-3xl md:text-base"></i>
                                        <span class="sidebar-text">Wire Transfer</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/crypto" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-coins mr-2 text-3xl md:text-base"></i>
                                        <span class="sidebar-text">Crypto Transfer</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-3xl md:text-base font-normal js-sub-menu-toggle">
                                <i class="fa fa-cog mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Settings</span>
                                <i class="toggle-icon fa fa-angle-left ml-auto text-base transition-transform"></i>
                            </a>
                            <ul class="sub-menu ml-7 mt-1 space-y-1 hidden">
                                <li>
                                    <a href="/edit-profile" data-nav class="flex items-center px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-normal">
                                        <i class="fa fa-edit mr-2 text-3xl md:text-base"></i>
                                        <span class="sidebar-text">Edit Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/withdrawal" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa fa-dollar-sign mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Withdrawal</span>
                            </a>
                        </li>
                        <li>
                            <a href="/loan" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa-solid fa-landmark mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Loan</span>
                            </a>
                        </li>
                        <li>
                            <a href="/cards" data-nav class="flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa-solid fa-credit-card mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Credit Cards</span>
                            </a>
                        </li>
                        <li>
                            <a id="logout" class="cursor-pointer flex items-center px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-normal">
                                <i class="fa fa-power-off mr-2 text-3xl md:text-base"></i>
                                <span class="sidebar-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        `,pageEvents:h}};export{S as n};
