const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/otp-D7TvNSYN.js","assets/supabaseClient-CL6H8VOx.js"])))=>i.map(i=>d[i]);
import{_ as v}from"./index-efKQoXa5.js";import{n as y}from"./navbar-CNAggbqQ.js";import{r as x}from"./reset-CYKpHJhn.js";import{s as t}from"./toast-DRvdR0y9.js";import{a as l,e as c}from"./spinner-KTJn75tI.js";import{loginAndSendOtp as m}from"./loginHandler-gRi8nDpu.js";import{s as h}from"./supabaseClient-CL6H8VOx.js";import{N as w}from"./logo-nobg-BVMQOOtC.js";import{L as k}from"./logo-yCyWWFG1.js";import"./email-cNRN05tX.js";import"./sendEmail-89Z52C2k.js";const j=async()=>{x("Login");const f=y();if((await h.auth.getSession()).data.session){window.location.href="/dashboard";return}let u=!1,s="";async function p(){f.pageEvents?.();const o=document.getElementById("txt_pwd"),d=document.getElementById("showHide");d&&o&&d.addEventListener("click",function(){o.type==="password"?(o.type="text",d.textContent="HIDE"):(o.type="password",d.textContent="SHOW")});const n=document.getElementById("login-form");n&&(n.noValidate=!0,n.addEventListener("submit",async i=>{if(i.preventDefault(),u){const e=document.getElementById("otp"),a=e.value.trim();if(a.length!==6){t("OTP must be 6 digits.","error"),e.focus();return}l();try{const{verifyOtp:r}=await v(async()=>{const{verifyOtp:g}=await import("./otp-D7TvNSYN.js");return{verifyOtp:g}},__vite__mapDeps([0,1]));await r(s,a),t("Login successful!","success"),window.location.href="/dashboard"}catch(r){t(r.message||"Invalid OTP.","error"),e.focus()}finally{c()}}else{const e=n.accessID.value.trim(),a=n.txt_pwd.value;if(!e||!a){t("Please enter your Access ID and password.","error");return}l();try{await m(e,a),t("OTP sent to your email.","info"),u=!0,s=e,sessionStorage.setItem("lastAccessID",e),document.getElementById("login-credentials").classList.add("hidden"),document.getElementById("login-otp").classList.remove("hidden"),n.reset(),setTimeout(()=>{document.getElementById("otp")?.focus()},100)}catch(r){t(r.message||"Login failed.","error")}finally{c()}}}));const b=document.getElementById("resend-otp");b&&b.addEventListener("click",async i=>{if(i.preventDefault(),!s){t("Please enter your Access ID and password first.","error");return}l();try{await m(s,""),t("OTP resent to your email.","info")}catch(e){t(e.message||"Could not resend OTP.","error")}finally{c()}})}return{html:`
      <main class="main min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark transition-colors duration-300" id="top">
        <div id="nav-actions" class="flex items-center gap-2 ml-2 absolute top-4"></div>
        <div class="flex flex-1 items-center justify-center py-12 px-4">
          <div class="w-full max-w-md space-y-8">
            <div class="flex flex-col items-center mb-6">
              <a href="/" data-nav class="flex items-center justify-center mb-4">
                <img src="${w}" alt="Zenus Bank logo" class="h-16 w-auto block dark:hidden" />
                <img src="${k}" alt="Zenus Bank logo" class="h-16 w-auto hidden dark:block" />
              </a>
              <h1 class="flex items-center gap-2 text-2xl font-bold text-brand-navy dark:text-brand-sun">
                <i class="fa-solid fa-lock"></i>
                Log in
              </h1>
              <div class="text-sm text-brand-gray dark:text-brand-light mt-2">
                <span class="font-semibold">New User?</span>
                <a href="/register" data-nav class="text-brand-sun hover:underline ml-1">Create account</a>
              </div>
            </div>
            <div class="bg-white dark:bg-brand-dark rounded-xl shadow-lg p-8">
              <form id="login-form" autocomplete="off" class="space-y-6" novalidate>
                <div id="login-credentials">
                  <div>
                    <label for="accessID" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">Access ID</label>
                    <input class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition" type="text" name="accessID" id="accessID" placeholder="Enter your Access ID (email, username, or account number)" required>
                  </div>
                  <div>
                    <label for="txt_pwd" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">Password</label>
                    <div class="relative">
                      <input type="password" name="txt_pwd" id="txt_pwd" maxlength="16" minlength="8" class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition pr-16" placeholder="********" required>
                      <button type="button" id="showHide" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-sun hover:text-brand-navy focus:outline-none z-50">SHOW</button>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <label class="flex items-center gap-2 text-sm text-brand-navy dark:text-brand-light">
                      <input type="checkbox" class="rounded border-brand-gray dark:border-brand-navy focus:ring-brand-sun" id="rememberMe" checked>
                      Remember me
                    </label>
                    <a href="/forgot-password" data-nav class="text-sm text-brand-sun hover:underline">Forgot Password?</a>
                  </div>
                  <button class="w-full py-3 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy hover:text-white transition-all duration-300 mt-2" type="submit" name="login">Log in</button>
                </div>
                <div id="login-otp" class="hidden">
                  <div>
                    <label for="otp" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">Enter OTP</label>
                    <input type="number" name="otp" id="otp" maxlength="6" minlength="6" inputmode="numeric" pattern="[0-9]*" class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition" placeholder="Enter 6-digit OTP" required>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <button type="button" id="resend-otp" class="text-sm text-brand-sun hover:underline">Resend OTP</button>
                  </div>
                  <button class="w-full py-3 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy hover:text-white transition-all duration-300 mt-4" type="submit" name="verify-otp">Verify OTP</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    `,pageEvents:p}};export{j as default};
