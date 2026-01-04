import{n as b}from"./navbar-CNAggbqQ.js";import{r as g}from"./reset-CYKpHJhn.js";import{s as n}from"./toast-DRvdR0y9.js";import{a as p,e as d}from"./spinner-KTJn75tI.js";import{s as v}from"./supabaseClient-CL6H8VOx.js";import{N as x}from"./logo-nobg-BVMQOOtC.js";import{L as y}from"./logo-yCyWWFG1.js";const M=()=>{g("Forgot Password");const c=b();function m(){c.pageEvents?.();const i=document.getElementById("forgot-form"),r=document.getElementById("email"),e=i?.querySelector('button[type="submit"]'),u=60;let o=null;function l(s){if(!e)return;let t=s;e.disabled=!0;const a=e.getAttribute("data-original")||e.innerHTML;e.setAttribute("data-original",a),e.innerHTML=`Please wait ${t}s`,clearInterval(o),o=setInterval(()=>{t-=1,t<=0?(clearInterval(o),e.disabled=!1,e.innerHTML=a):e.innerHTML=`Please wait ${t}s`},1e3)}r&&r.addEventListener("input",s=>{const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.target.value);r.style.borderColor=t?"":"rgb(239, 68, 68)",e&&(e.disabled=!t)}),i&&i.addEventListener("submit",async s=>{if(s.preventDefault(),!e||e.disabled)return;const t=r.value.trim();if(!(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))){l(u),e.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...',p();try{const{error:a}=await v.auth.resetPasswordForEmail(t,{redirectTo:"https://zenusbanking.com/reset-password"});if(d(),a){a?.status===429||/too many requests/i.test(a.message||"")?n("Too many requests. Please wait a minute and try again.","error"):(n(a.message||"Failed to send reset instructions","error"),l(10));const f=e.getAttribute("data-original")||'Send Instructions <i class="fas fa-paper-plane text-sm"></i>';e.innerHTML=e.disabled?e.innerHTML:f}else n("Password reset instructions sent to your email","success"),setTimeout(()=>window.location.href="/login",2e3)}catch{d(),n("Unexpected error. Try again later.","error"),l(10)}}})}return{html:`
      <main class="main min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark transition-colors duration-300" id="top">
        <div id="nav-actions" class="flex items-center gap-2 ml-2 absolute top-4"></div>
        <div class="flex flex-1 items-center justify-center py-12 px-4">
          <div class="w-full max-w-md space-y-8">
            <div class="flex flex-col items-center mb-6">
              <a href="/" data-nav class="flex items-center justify-center mb-4">
                <img src="${x}" alt="Zenus Bank logo" class="h-16 w-auto block dark:hidden" />
                <img src="${y}" alt="Zenus Bank logo" class="h-16 w-auto hidden dark:block" />
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
    `,pageEvents:m}};export{M as default};
