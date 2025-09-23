import{A as v}from"./AdminNavbar-DXVtneOk.js";import{r as h}from"./adminAuth-Dn35BI8v.js";import{s as y}from"./toast-Dx2DSKhR.js";import{s as b}from"./supabaseClient-B1HaFb4P.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";const g=[{key:"interest",label:"Interest Settings",fields:[{key:"usd_saving_interest",label:"USD Saving Interest (%)",type:"number",step:"0.01",example:"2.5"},{key:"money_market_interest",label:"Money Market Interest (%)",type:"number",step:"0.01",example:"4.0"}]},{key:"tx_limits",label:"Transaction Limits",fields:[{key:"daily_transfer_limit",label:"Daily Transfer Limit ($)",type:"number",example:"10000"},{key:"withdrawal_limit",label:"Withdrawal Limit ($)",type:"number",example:"5000"},{key:"min_balance_required",label:"Minimum Balance Required ($)",type:"number",step:"0.01",example:"100.00"}]},{key:"loan_defaults",label:"Loan Defaults",fields:[{key:"default_loan_interest",label:"Default Loan Interest (%)",type:"number",step:"0.01",example:"6.5"},{key:"max_loan_duration",label:"Max Loan Duration (months)",type:"number",example:"36"},{key:"min_loan_amount",label:"Minimum Loan Amount ($)",type:"number",example:"500"}]},{key:"card_management",label:"Card Management",fields:[{key:"card_processing_fee",label:"Card Processing Fee ($)",type:"number",step:"0.01",example:"20.00"},{key:"card_auto_issue",label:"Auto-Issue Virtual Cards?",type:"checkbox",example:"true"}]},{key:"system",label:"System Settings",fields:[{key:"system_status",label:"System Status",type:"select",options:["online","maintenance"],example:"online"},{key:"maintenance_message",label:"Maintenance Message",type:"text",example:"We’ll be back at 3AM."},{key:"support_email",label:"Support Email",type:"email",example:"support@yourbank.com"}]},{key:"demo_random",label:"Demo Random Settings",fields:[{key:"random_mode",label:"Enable Random Mode",type:"checkbox",example:"true"},{key:"random_factor",label:"Random Factor",type:"number",step:"0.01",example:"1.23"},{key:"random_message",label:"Random Message",type:"text",example:"Surprise!"}]}];function _(s){return g.map(l=>`
    <div class="mb-8">
      <h2 class="font-bold text-lg mb-2">${l.label}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${l.fields.map(e=>{let n=s?.[e.key]??"";return e.type==="checkbox"?`
              <label class="flex items-center gap-2">
                <input type="checkbox" name="${e.key}" ${n==="true"?"checked":""} />
                ${e.label}
                <span class="text-xs text-gray-400 ml-2">(e.g. ${e.example})</span>
              </label>
            `:e.type==="select"?`
              <label>
                ${e.label}
                <select name="${e.key}" class="border rounded px-2 py-1 w-full">
                  ${e.options.map(t=>`<option value="${t}" ${n===t?"selected":""}>${t}</option>`).join("")}
                </select>
                <span class="text-xs text-gray-400 ml-2">(e.g. ${e.example})</span>
              </label>
            `:`
            <label>
              ${e.label}
              <input type="${e.type}" name="${e.key}" value="${n}" step="${e.step||""}" class="border rounded px-2 py-1 w-full" />
              <span class="text-xs text-gray-400 ml-2">(e.g. ${e.example})</span>
            </label>
          `}).join("")}
      </div>
    </div>
  `).join("")}const B=async()=>{if(!await h())return{html:"",pageEvents:()=>{}};let{data:s}=await b.from("settings").select("*");Array.isArray(s)||(s=[]);let l={};s.forEach(m=>{l[m.key]=m.value});let e="settings",n=!1,t=localStorage.getItem("admin_dark")==="true";function o(){document.getElementById("app").innerHTML=`
      ${v({activeItem:e,isCollapsed:n,isDark:t})}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-6 lg:p-8">
          <div class="max-w-3xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">System Settings</h1>
            <form id="settings-form" class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6">
              ${_(l)}
              <button type="submit" class="bg-blue-700 text-white px-6 py-2 rounded mt-4">Save Settings</button>
              <button type="button" id="randomize-settings" class="bg-orange-600 text-white px-6 py-2 rounded mt-4 ml-4">Randomize Demo</button>
            </form>
          </div>
        </div>
      </div>
    `,document.getElementById("admin-sidebar");const m=document.getElementById("admin-sidebar-overlay"),k=document.getElementById("admin-sidebar-toggle"),x=document.getElementById("admin-sidebar-close");function f(){n=!1,o()}function c(){n=!0,o()}k?.addEventListener("click",f),x?.addEventListener("click",c),m?.addEventListener("click",c),document.getElementById("admin-theme-toggle")?.addEventListener("click",()=>{t=!t,localStorage.setItem("admin_dark",t?"true":"false"),t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),o()}),document.querySelectorAll("[data-nav]").forEach(a=>{a.addEventListener("click",i=>{i.preventDefault(),e=a.getAttribute("data-nav"),window.location.href=`/admin/${e}`})}),document.getElementById("admin-logout")?.addEventListener("click",()=>{sessionStorage.removeItem("admin_logged_in"),window.location.href="/admin-login"}),t?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark"),document.getElementById("settings-form").onsubmit=async function(a){a.preventDefault();const i=new FormData(this);let p=[];g.forEach(d=>{d.fields.forEach(r=>{let u=i.get(r.key);r.type==="checkbox"&&(u=this[r.key].checked?"true":"false"),p.push({key:r.key,value:u})})});for(const d of p)await b.from("settings").upsert([d],{onConflict:"key"});y("Settings saved!","success"),window.location.reload()},document.getElementById("randomize-settings").onclick=()=>{const a=document.getElementById("settings-form");a.random_mode.checked=Math.random()>.5,a.random_factor.value=(Math.random()*10).toFixed(2),a.random_message.value=["Surprise!","Demo Mode!","Randomized!","Banking Rocks!"][Math.floor(Math.random()*4)],y("Random demo settings applied! Save to persist.","info")}}return{html:"",pageEvents:()=>o()}};export{B as default};
