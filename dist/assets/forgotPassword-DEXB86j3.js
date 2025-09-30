import{n as l}from"./navbar-CNAggbqQ.js";import{r as m}from"./reset-CYKpHJhn.js";import{s as o}from"./toast-DRvdR0y9.js";import{a as c,e as u}from"./spinner-KTJn75tI.js";import{s as f}from"./supabaseClient-B1HaFb4P.js";import{N as b}from"./logo-nobg-BVMQOOtC.js";import{L as p}from"./logo-yCyWWFG1.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const E=()=>{m("Forgot Password");const i=l();function d(){i.pageEvents?.();const s=document.getElementById("forgot-form"),a=document.getElementById("email"),e=s?.querySelector('button[type="submit"]');a&&a.addEventListener("input",r=>{const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.target.value);a.style.borderColor=t?"":"rgb(239, 68, 68)",e&&(e.disabled=!t)}),s&&s.addEventListener("submit",async r=>{r.preventDefault();const t=a.value.trim();if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))return;e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...',c();const{error:n}=await f.auth.resetPasswordForEmail(t,{redirectTo:"https://zenusbanking.com/reset-password"});u(),n?(o(n.message||"Failed to send reset instructions","error"),e.disabled=!1,e.innerHTML='Send Instructions <i class="fas fa-paper-plane text-sm"></i>'):(o("Password reset instructions sent to your email","success"),setTimeout(()=>window.location.href="/login",2e3))})}return{html:`
      <main class="main min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark transition-colors duration-300" id="top">
        <div id="nav-actions" class="flex items-center gap-2 ml-2 absolute top-4"></div>
        <div class="flex flex-1 items-center justify-center py-12 px-4">
          <div class="w-full max-w-md space-y-8">
            <div class="flex flex-col items-center mb-6">
              <a href="/" data-nav class="flex items-center justify-center mb-4">
                <img src="${b}" alt="Zenus Bank logo" class="h-16 w-auto block dark:hidden" />
                <img src="${p}" alt="Zenus Bank logo" class="h-16 w-auto hidden dark:block" />
              </a>
              <h1 class="flex items-center gap-2 text-2xl font-bold text-brand-navy dark:text-brand-sun">
                <i class="fa-solid fa-unlock-keyhole"></i>
                Forgot Password
              </h1>
              <div class="text-sm text-brand-gray dark:text-brand-light mt-2">
                <a href="/login" data-nav class="text-brand-sun hover:underline ml-1">Back to Login</a>
              </div>
            </div>
            <div class="bg-white dark:bg-brand-dark rounded-xl shadow-lg p-8">
              <form id="forgot-form" autocomplete="off" class="space-y-6" novalidate>
                <div>
                  <label for="email" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">Email Address</label>
                  <input class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition" type="email" name="email" id="email" placeholder="you@example.com" required>
                </div>
                <button class="w-full py-3 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy hover:text-white transition-all duration-300 mt-2 flex items-center justify-center gap-2" type="submit" name="send" disabled>
                  Send Instructions
                  <i class="fas fa-paper-plane text-sm"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    `,pageEvents:d}};export{E as default};
