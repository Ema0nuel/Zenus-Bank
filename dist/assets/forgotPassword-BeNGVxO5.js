import{n as g}from"./navbar-CNAggbqQ.js";import{r as p}from"./reset-CYKpHJhn.js";import{s as i}from"./toast-DRvdR0y9.js";import{a as v,e as c}from"./spinner-KTJn75tI.js";import{s as x}from"./supabaseClient-CL6H8VOx.js";import{N as y}from"./logo-nobg-BVMQOOtC.js";import{L as w}from"./logo-yCyWWFG1.js";const P=()=>{p("Forgot Password");const m=g();function u(){m.pageEvents?.();const o=document.getElementById("forgot-form"),r=document.getElementById("email"),e=o?.querySelector('button[type="submit"]'),f=60;let l=null;function d(a){if(!e)return;let t=a;e.disabled=!0;const s=e.getAttribute("data-original")||e.innerHTML;e.setAttribute("data-original",s),e.innerHTML=`Please wait ${t}s`,clearInterval(l),l=setInterval(()=>{t-=1,t<=0?(clearInterval(l),e.disabled=!1,e.innerHTML=s):e.innerHTML=`Please wait ${t}s`},1e3)}r&&r.addEventListener("input",a=>{const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.target.value);r.style.borderColor=t?"":"rgb(239, 68, 68)",e&&(e.disabled=!t)}),o&&o.addEventListener("submit",async a=>{if(a.preventDefault(),!e||e.disabled)return;const t=r.value.trim();if(!(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))){d(f),e.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...',v();try{const s=(typeof window<"u"?window.location.origin:"https://zenusbanking.com")+"/reset-password",{error:n}=await x.auth.resetPasswordForEmail(t,{redirectTo:s});if(c(),n){n?.status===429||/too many requests/i.test(n.message||"")?i("Too many requests. Please wait a minute and try again.","error"):(i(n.message||"Failed to send reset instructions","error"),d(10));const b=e.getAttribute("data-original")||'Send Instructions <i class="fas fa-paper-plane text-sm"></i>';e.innerHTML=e.disabled?e.innerHTML:b}else i("Password reset instructions sent to your email","success"),setTimeout(()=>window.location.href="/login",2e3)}catch{c(),i("Unexpected error. Try again later.","error"),d(10)}}})}return{html:`
      <main class="main min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark transition-colors duration-300" id="top">
        <div id="nav-actions" class="flex items-center gap-2 ml-2 absolute top-4"></div>
        <div class="flex flex-1 items-center justify-center py-12 px-4">
          <div class="w-full max-w-md space-y-8">
            <div class="flex flex-col items-center mb-6">
              <a href="/" data-nav class="flex items-center justify-center mb-4">
                <img src="${y}" alt="Zenus Bank logo" class="h-16 w-auto block dark:hidden" />
                <img src="${w}" alt="Zenus Bank logo" class="h-16 w-auto hidden dark:block" />
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
    `,pageEvents:u}};export{P as default};
