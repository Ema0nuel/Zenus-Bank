import{N as u}from"./logo-nobg-BVMQOOtC.js";import{L as c}from"./logo-yCyWWFG1.js";function g(){const o=localStorage.getItem("theme"),s=window.matchMedia("(prefers-color-scheme: dark)").matches,t=o||(s?"dark":"light");document.documentElement.classList.toggle("dark",t==="dark");const a=document.createElement("button");return a.setAttribute("aria-label","Toggle Theme"),a.className=`
    px-[8px] pt-[3px] rounded-[50%] ml-3
    bg-brand-sun dark:bg-brand-teal
    text-white shadow-md
    hover:scale-105 transition-transform
  `,a.innerHTML=t==="dark"?'<i class="fas fa-sun text-lg"></i>':'<i class="fas fa-moon text-lg"></i>',a.addEventListener("click",()=>{const n=t==="dark"?"light":"dark";localStorage.setItem("theme",n),document.documentElement.classList.toggle("dark",n==="dark"),location.reload()}),a}const p=()=>{function o(){const s=document.getElementById("nav-actions"),t=g();s.appendChild(t);const a=document.getElementById("mobile-menu-btn-open"),n=document.getElementById("mobile-menu-btn-close"),r=document.getElementById("mobile-menu");let d=!1;const b=()=>{r.classList.add("translate-x-0","opacity-100"),r.classList.remove("-translate-x-full","opacity-0"),a.setAttribute("aria-expanded",!0),d=!0,setTimeout(()=>{document.addEventListener("mousedown",i)},10)},l=()=>{r.classList.remove("translate-x-0","opacity-100"),r.classList.add("-translate-x-full","opacity-0"),a.setAttribute("aria-expanded",!1),d=!1,document.removeEventListener("mousedown",i)},i=e=>{d&&!r.contains(e.target)&&e.target!==a&&l()};a&&a.addEventListener("click",e=>{e.stopPropagation(),b()}),n&&n.addEventListener("click",e=>{e.stopPropagation(),l()})}return{html:`
        <nav class="sticky top-0 z-40 w-full bg-brand-light dark:bg-brand-dark border-b border-brand-gray dark:border-brand-navy shadow-sm font-sans" style="font-family: 'DM Sans', 'Roboto', sans-serif; font-size: 12px;">
          <div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
            <a href="/" data-nav class="flex items-center gap-2">
              <img src="${u}" alt="Zenus Bank logo" class="h-8 w-auto block dark:hidden" />
              <img src="${c}" alt="Zenus Bank logo" class="h-8 w-auto hidden dark:block" />
              <span class="font-bold text-base text-brand-navy dark:text-brand-sun ml-2">Zenus Bank</span>
            </a>
            <div class="hidden md:flex gap-2 lg:gap-4 items-center">
              <a href="/personal" data-nav class="px-2 py-1 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Personal</a>
              <a href="/business" data-nav class="px-2 py-1 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Business</a>
              <a href="/about" data-nav class="px-2 py-1 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">About us</a>
              <a href="/contact-us" data-nav class="px-2 py-1 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Contact us</a>
              <a href="/support" data-nav class="px-2 py-1 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Support centre</a>
              <a href="/login" data-nav class="ml-4 px-4 py-1 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy transition">Login</a>
            </div>
            <button id="mobile-menu-btn-open" aria-label="Open menu" aria-expanded="false" class="md:hidden p-2 rounded-full bg-brand-sun text-white focus:outline-none focus:ring-2 focus:ring-brand-navy transition">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <div id="nav-actions" class="flex items-center gap-2 ml-2"></div>
          </div>
          <!-- Mobile menu -->
          <div id="mobile-menu" class="fixed top-0 left-0 w-full bg-brand-light/95 dark:bg-brand-dark/95 shadow-2xl z-50 transform -translate-x-full opacity-0 transition-all duration-400 ease-in-out flex flex-col py-8 px-6 md:hidden" style="backdrop-filter: blur(2px);">
            <button id="mobile-menu-btn-close" aria-label="Close menu" aria-expanded="true" class="self-end mb-6 p-2 rounded-full bg-brand-sun text-white focus:outline-none focus:ring-2 focus:ring-brand-navy transition">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <a href="/personal" data-nav class="block px-2 py-3 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Personal</a>
            <a href="/business" data-nav class="block px-2 py-3 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Business</a>
            <a href="/about" data-nav class="block px-2 py-3 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">About us</a>
            <a href="/contact-us" data-nav class="block px-2 py-3 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Contact us</a>
            <a href="/support" data-nav class="block px-2 py-3 rounded text-brand-gray dark:text-brand-light hover:bg-brand-sun/10 dark:hover:bg-brand-teal/20 transition">Support centre</a>
            <a href="/login" data-nav class="block mt-4 px-4 py-2 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy transition">Login</a>
          </div>
        </nav>
        `,pageEvents:o}};export{p as n};
