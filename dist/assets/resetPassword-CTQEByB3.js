import{n as b}from"./navbar-CNAggbqQ.js";import{r as m}from"./reset-CYKpHJhn.js";import{s as d}from"./toast-DRvdR0y9.js";import{a as f,e as p}from"./spinner-KTJn75tI.js";import{s as g}from"./supabaseClient-CL6H8VOx.js";import{N as v}from"./logo-nobg-BVMQOOtC.js";import{L as w}from"./logo-yCyWWFG1.js";const B=()=>{m("Reset Password");const c=b();function u(){c.pageEvents?.();const r=document.getElementById("reset-form"),n=document.getElementById("password"),a=document.getElementById("confirmPassword"),s=r?.querySelector('button[type="submit"]');document.querySelectorAll(".showHidePwd").forEach(e=>{e.addEventListener("click",function(){const t=document.getElementById(this.dataset.target);t.type==="password"?(t.type="text",e.textContent="HIDE"):(t.type="password",e.textContent="SHOW")})});function i(){const e=n.value,t=a.value,o=e.length>=8&&e===t;a.style.borderColor=t&&e!==t?"rgb(239, 68, 68)":"",s.disabled=!o}n.addEventListener("input",i),a.addEventListener("input",i),r&&r.addEventListener("submit",async e=>{e.preventDefault();const t=n.value,o=a.value;if(t!==o){d("Passwords do not match","error");return}s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin"></i> Resetting...',f();const{error:l}=await g.auth.updateUser({password:t});p(),l?(d(l.message||"Failed to reset password","error"),s.disabled=!1,s.innerHTML='Reset Password <i class="fas fa-key text-sm"></i>'):(d("Password reset successful!","success"),setTimeout(()=>window.location.href="/login",2e3))})}return{html:`
      <main class="main min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark transition-colors duration-300" id="top">
        <div id="nav-actions" class="flex items-center gap-2 ml-2 absolute top-4"></div>
        <div class="flex flex-1 items-center justify-center py-12 px-4">
          <div class="w-full max-w-md space-y-8">
            <div class="flex flex-col items-center mb-6">
              <a href="/" data-nav class="flex items-center justify-center mb-4">
                <img src="${v}" alt="Zenus Bank logo" class="h-16 w-auto block dark:hidden" />
                <img src="${w}" alt="Zenus Bank logo" class="h-16 w-auto hidden dark:block" />
              </a>
              <h1 class="flex items-center gap-2 text-2xl font-bold text-brand-navy dark:text-brand-sun">
                <i class="fa-solid fa-key"></i>
                Reset Password
              </h1>
              <div class="text-sm text-brand-gray dark:text-brand-light mt-2">
                <a href="/login" data-nav class="text-brand-sun hover:underline ml-1">Back to Login</a>
              </div>
            </div>
            <div class="bg-white dark:bg-brand-dark rounded-xl shadow-lg p-8">
              <form id="reset-form" autocomplete="off" class="space-y-6" novalidate>
                <div>
                  <label for="password" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">New Password</label>
                  <div class="relative">
                    <input type="password" name="password" id="password" minlength="8" class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition pr-16" placeholder="Create a strong password" required>
                    <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-sun hover:text-brand-navy focus:outline-none z-50 showHidePwd" data-target="password">SHOW</button>
                  </div>
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">Confirm Password</label>
                  <div class="relative">
                    <input type="password" name="confirmPassword" id="confirmPassword" minlength="8" class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition pr-16" placeholder="Confirm your password" required>
                    <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-sun hover:text-brand-navy focus:outline-none z-50 showHidePwd" data-target="confirmPassword">SHOW</button>
                  </div>
                </div>
                <button class="w-full py-3 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy hover:text-white transition-all duration-300 mt-2 flex items-center justify-center gap-2" type="submit" name="reset" disabled>
                  Reset Password
                  <i class="fas fa-key text-sm"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    `,pageEvents:u}};export{B as default};
