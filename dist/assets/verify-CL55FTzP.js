const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/loginHandler-D2Qr7wtW.js","assets/supabaseClient-B1HaFb4P.js","assets/email-cNRN05tX.js","assets/sendEmail-89Z52C2k.js"])))=>i.map(i=>d[i]);
import{_ as l}from"./index-16h1evh8.js";import{n as c}from"./navbar-CNAggbqQ.js";import{r as m}from"./reset-CYKpHJhn.js";import{s as e}from"./toast-DRvdR0y9.js";import{verifyOtp as g}from"./otp-CsIK8Jek.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";import"./supabaseClient-B1HaFb4P.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const k=async()=>{m("Verify Login");const o=c();async function i(){o.pageEvents?.();const r=document.getElementById("verifyotp");r&&r.addEventListener("submit",async s=>{s.preventDefault();const t=r.otp.value.trim(),a=sessionStorage.getItem("lastAccessID")||"";if(t.length!==6){e("OTP must be 6 digits.","error");return}try{await g(a,t),e("Login successful!","success"),window.location.href="/dashboard"}catch(d){e(d.message||"Invalid or expired OTP.","error")}r.reset()});const n=document.getElementById("resendBtn");n&&n.addEventListener("click",async()=>{const s=sessionStorage.getItem("lastAccessID")||"";if(!s){e("Please login again to resend OTP.","error");return}try{const{loginAndSendOtp:t}=await l(async()=>{const{loginAndSendOtp:a}=await import("./loginHandler-D2Qr7wtW.js");return{loginAndSendOtp:a}},__vite__mapDeps([0,1,2,3]));await t(s,""),e("OTP resent to your email.","info")}catch{e("Could not resend OTP. Please try again.","error")}})}return{html:`
      <main id="top" class="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-brand-dark transition-colors duration-300 px-4 py-12">
        <div id="nav-actions" class="absolute top-4 left-4"></div>
        <div class="max-w-md w-full space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg p-8">
          <div class="flex justify-center">
            <a href="/" data-nav class="block">
              <img src="/src/images/logo-nobg.png" alt="Zenus Bank" class="h-12 w-auto block dark:hidden" />
              <img src="/src/images/logo.jpg" alt="Zenus Bank" class="h-12 w-auto hidden dark:block" />
            </a>
          </div>
          <div class="text-center space-y-1">
            <h1 class="text-2xl font-bold flex items-center justify-center gap-2">
              <i class="fa fa-lock text-yellow-400"></i>
              Verify Login
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Kindly enter the One-Time Password sent to your email address.
            </p>
          </div>
          <form id="verifyotp" class="space-y-4">
            <input
              type="number"
              name="otp"
              id="otp"
              maxlength="6"
              minlength="6"
              placeholder="Enter OTP"
              required
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <div class="text-sm text-gray-700 dark:text-gray-300">
              <a href="/" data-nav class="text-brand-teal underline">Home</a>
              &nbsp;|&nbsp; Didn�t receive OTP?
              <button type="button" id="resendBtn" class="text-brand-yellow underline ml-1">Resend OTP</button>
            </div>
            <button
              type="submit"
              id="login"
              name="login"
              class="w-full bg-brand-yellow hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition"
            >
              Log in
            </button>
            <div id="overlay" class="hidden"></div>
            <div id="spoke" class="mt-4"></div>
            <div id="speak" class="mt-4"></div>
          </form>
        </div>
      </main>
    `,pageEvents:i}};export{k as default};
