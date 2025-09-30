import{s}from"./supabaseClient-B1HaFb4P.js";import{A as r}from"./AdminNavbar-DXVtneOk.js";import{r as n}from"./adminAuth-Dn35BI8v.js";import{s as l}from"./toast-DRvdR0y9.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";const h=async()=>{if(await n())return{html:`
      ${r("codes")}
      <div class="pt-20 px-8">
        <h1 class="text-xl font-bold mb-4">Generate Codes (IMF, VAT, COT)</h1>
        <form id="code-form" class="bg-white rounded shadow p-4 max-w-md">
          <label>User Email</label>
          <input type="email" name="email" class="border rounded px-2 py-1 mb-4 w-full" required />
          <label>Code Type</label>
          <select name="type" class="border rounded px-2 py-1 mb-4 w-full">
            <option value="IMF">IMF</option>
            <option value="VAT">VAT</option>
            <option value="COT">COT</option>
          </select>
          <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded">Generate & Send</button>
        </form>
      </div>
    `,pageEvents:()=>{document.getElementById("code-form").onsubmit=async function(i){i.preventDefault();const t=this.email.value.trim(),e=this.type.value,o=Math.floor(1e5+Math.random()*9e5),{data:a}=await s.from("profiles").select("id").eq("email",t).single();a&&await s.from("otps").insert([{user_id:a.id,code:o.toString(),type:e,expires_at:new Date(Date.now()+10*6e4).toISOString()}]),await fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:t,subject:`${e} Code`,html:`<h2>Your ${e} Code</h2><p>${o}</p>`})}),l(`${e} code sent to ${t}`,"success")}}}};export{h as default};
