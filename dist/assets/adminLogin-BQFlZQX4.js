import{l as n}from"./adminAuth-Dn35BI8v.js";import{s as r}from"./toast-DRvdR0y9.js";import{N as o}from"./logo-nobg-BVMQOOtC.js";import{L as d}from"./logo-yCyWWFG1.js";const i=()=>`
  <div class="flex justify-center items-center py-12">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
`;function u(){return{html:`
      <div class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-blue-800 dark:from-brand-navy dark:to-brand-gray transition-colors duration-300">
        <form id="admin-login-form" class="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-2xl max-w-xs w-full animate-fade-in">
          <div class="flex flex-col items-center mb-6">
            <img src="${o}" class="h-14 dark:hidden mb-2" alt="logo" />
            <img src="${d}" class="h-14 hidden dark:inline mb-2" alt="logo" />
            <span class="font-bold text-lg text-slate-700 dark:text-white">Zenus Bank</span>
          </div>
          <h2 class="text-2xl font-bold mb-6 text-center text-brand-navy dark:text-brand-light">Admin Login</h2>
          <input type="email" name="email" class="w-full border border-brand-navy dark:border-brand-light rounded px-3 py-2 mb-4 bg-brand-light dark:bg-slate-800 text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-blue-500 transition" placeholder="Email" required />
          <input type="password" name="password" class="w-full border border-brand-navy dark:border-brand-light rounded px-3 py-2 mb-6 bg-brand-light dark:bg-slate-800 text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-blue-500 transition" placeholder="Password" required />
          <button type="submit" class="w-full bg-gradient-to-tr from-blue-600 to-blue-800 dark:from-brand-navy dark:to-brand-gray text-white py-2 rounded-lg font-semibold shadow hover:scale-105 transition">Login</button>
        </form>
      </div>
    `,pageEvents(){document.getElementById("admin-login-form").onsubmit=function(e){e.preventDefault();const t=this.email.value.trim(),a=this.password.value;this.innerHTML=i(),setTimeout(()=>{n(t,a)?(r("Login successful!","success"),window.location.href="/admin/dashboard"):(r("Invalid credentials","error"),window.location.reload())},800)}}}}export{u as default};
