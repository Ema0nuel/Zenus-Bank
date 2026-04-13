import{s as l}from"./supabaseClient-CL6H8VOx.js";import{n as _}from"./Navbar-Bss5hsHn.js";import{s as x}from"./toast-DRvdR0y9.js";import{r as $}from"./reset-CYKpHJhn.js";import{g as S}from"./cardStatus-CgdHr1-A.js";import"./logo-yCyWWFG1.js";function E(){let a="";for(let s=0;s<16;s++)a+=Math.floor(Math.random()*10);return a.replace(/(.{4})/g,"$1 ").trim()}function B(){return""+Math.floor(100+Math.random()*900)}function L(){const a=new Date,s=a.getFullYear()+4;return`${(a.getMonth()+1).toString().padStart(2,"0")}/${s.toString().slice(-2)}`}function w({card_number:a,card_type:s,card_holder:i,expiry:n,cvv:o}){const c=s==="visa"?'<span class="font-bold italic tracking-tighter text-white text-2xl">VISA</span>':`<div class="flex items-center space-x-1">
        <div class="w-8 h-8 rounded-full bg-red-500 opacity-80"></div>
        <div class="w-8 h-8 rounded-full bg-yellow-500 opacity-80 -ml-4"></div>
       </div>`;return`
  <style>
    .card-container {
      perspective: 1000px;
      width: 340px;
      height: 210px;
    }
    .card {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.6s;
      cursor: pointer;
    }
    .card.flipped {
      transform: rotateY(180deg);
    }
    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .card-front {
      background: linear-gradient(135deg, #1a1f35 0%, #2b3247 100%);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      transform: rotateY(0deg);
    }
    .card-back {
      background: linear-gradient(135deg, #2b3247 0%, #1a1f35 100%);
      transform: rotateY(180deg);
    }
    .chip-container {
      background: linear-gradient(135deg, #ffd700 0%, #b8860b 100%);
    }
    .card-number-group {
      display: inline-block;
      margin: 0 8px;
      letter-spacing: 2px;
    }
  </style>

  <div class="flex justify-center items-center py-6">
    <div class="card-container" style="width:340px;height:210px;">
      <div class="card cursor-pointer" id="flip-card">
        
        <!-- Front of card -->
        <div class="card-face card-front rounded-2xl p-6 select-none">
          <!-- EMV Chip -->
          <div class="absolute top-6 left-6">
            <div class="chip-container w-12 h-9 rounded flex flex-col justify-between p-1">
              <div class="flex justify-between">
                <div class="w-1.5 h-1.5 rounded-sm bg-yellow-800/60"></div>
                <div class="w-1.5 h-1.5 rounded-sm bg-yellow-800/60"></div>
              </div>
              <div class="flex justify-between">
                <div class="w-1.5 h-1.5 rounded-sm bg-yellow-800/60"></div>
                <div class="w-1.5 h-1.5 rounded-sm bg-yellow-800/60"></div>
              </div>
            </div>
          </div>
          
          <!-- Contactless symbol -->
          <div class="absolute top-6 left-24">
            <svg class="w-6 h-6 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8.5 14.5A5 5 0 0 1 19 8M15.5 11.5A2 2 0 0 1 17 8" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Logo -->
          <div class="absolute top-6 right-6">
            ${c}
          </div>

          <!-- Card Number with groups -->
          <div class="absolute top-24 left-6 right-6">
            <div class="text-xl tracking-widest font-mono text-white/90">
              ${a.split(" ").map(f=>`<span class="card-number-group">${f}</span>`).join("")}
            </div>
          </div>

          <!-- Card Holder & Expiry -->
          <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <div class="text-xs text-white/50 uppercase mb-1">Card Holder</div>
              <div class="font-medium tracking-wider text-white/90">${i}</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-white/50 uppercase mb-1">Expires</div>
              <div class="font-medium text-white/90">${n}</div>
            </div>
          </div>
        </div>

        <!-- Back of card -->
        <div class="card-face card-back rounded-2xl select-none">
          <!-- Magnetic Strip -->
          <div class="w-full h-12 bg-black/30 mt-6"></div>
          
          <!-- CVV Strip -->
          <div class="mx-6 mt-8">
            <div class="relative">
              <div class="text-xs text-white/50 uppercase absolute -top-4 right-4">CVV</div>
              <div class="w-full h-10 bg-white/90 flex items-center justify-end pr-4">
                <span class="font-mono text-black font-medium">${o}</span>
              </div>
            </div>
            <div class="mt-6 text-xs text-white/60 leading-relaxed">
              This card is property of Zenus Bank. Unauthorized use is prohibited. 
              If found, please return to nearest branch or contact +1 800 ZENUS.
            </div>
          </div>

          <!-- Logo on back -->
          <div class="absolute bottom-6 right-6">
            ${c}
          </div>
        </div>

      </div>
    </div>
  </div>
  `}function k(a){if(!a)return"";const s=new Date(a);return`${s.getMonth()+1}/${s.getFullYear().toString().slice(-2)}`}const Y=async()=>{$("Zenus Bank | Cards");const a=_(),s=await l.auth.getSession();if(!s.data.session){window.location.href="/login";return}const{user:i}=s.data.session,{data:n}=await l.from("profiles").select("*").eq("id",i.id).single();let{data:o}=await l.from("accounts").select("*").eq("user_id",i.id).single();console.log("Account loaded:",o);let{data:c}=await l.from("cards").select("*").eq("user_id",i.id).order("issued_at",{ascending:!1});const f=(c||[]).length?c.map((d,g)=>`
      <tr class="hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer js-card-row" data-idx="${g}">
        <td class="px-2 py-1 text-xs">${d.card_type?.toUpperCase()||"-"}</td>
        <td class="px-2 py-1 text-xs font-mono">${d.card_number}</td>
        <td class="px-2 py-1 text-xs">${S(d.status||"pending")}</td>
        <td class="px-2 py-1 text-xs">${k(d.expiry_date)}</td>
        <td class="px-2 py-1 text-xs">${d.issued_at?.slice(0,16).replace("T"," ")}</td>
      </tr>
    `).join(""):'<tr><td colspan="5" class="text-center text-gray-400 dark:text-gray-500 py-2 text-xs">No cards requested yet.</td></tr>';function C(){a.pageEvents?.();const d=document.getElementById("card-type"),g=document.getElementById("card-name"),h=document.getElementById("generate-card-btn"),y=document.getElementById("card-preview"),m=document.getElementById("regenerate-card-btn"),p=document.getElementById("save-card-btn"),v=document.getElementById("card-spinner");let e=null;h.onclick=()=>{const t=d.value,r=g.value.trim().toUpperCase();if(!t||!r){x("Select card type and enter your name.","error");return}v.classList.remove("hidden"),setTimeout(()=>{e={card_type:t,card_holder:r,card_number:E(),expiry:L(),cvv:B()},y.innerHTML=w(e),v.classList.add("hidden"),m.classList.remove("hidden"),p.classList.remove("hidden"),b()},1200)},m.onclick=()=>{h.onclick()},p.onclick=async()=>{if(e){v.classList.remove("hidden"),p.disabled=!0;try{if(!o||!o.id)throw new Error("Account not found. Please refresh and try again.");const{data:t,error:r}=await l.from("cards").insert([{user_id:i.id,account_id:o.id,card_number:e.card_number,card_type:e.card_type,expiry_date:`20${e.expiry.split("/")[1]}-${e.expiry.split("/")[0]}-01`,cvv:e.cvv}]).select().single();if(r)throw console.error("Supabase insert error:",r),r;await l.from("notifications").insert([{user_id:i.id,title:"Card Request Submitted",message:`Your ${e.card_type.toUpperCase()} card request is pending approval.`,type:"info",read:!1}]),fetch("/api/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:n.email,subject:"Card Request Submitted",html:`
              <h2>Your Card Request is Pending</h2>
              <p>Dear ${n.full_name},</p>
              <p>Your ${e.card_type.toUpperCase()} card request has been received and is pending approval.</p>
              <ul>
                <li>Card Number: ${e.card_number}</li>
                <li>Card Holder: ${e.card_holder}</li>
                <li>Expiry: ${e.expiry}</li>
                <li>Type: ${e.card_type.toUpperCase()}</li>
              </ul>
              <p>We will notify you once your card is approved and ready for use.</p>
              <br>
              <b>Zenus Bank</b>
            `})}),x("Card request submitted. Await approval.","success"),setTimeout(()=>window.location.reload(),1800)}catch(t){console.error("Card save error:",t);const r=t?.message||t?.error_description||"Failed to save card. Try again.";x(r,"error"),v.classList.add("hidden"),p.disabled=!1}}};function b(){const t=document.getElementById("flip-card");t&&(t.addEventListener("click",function(r){this.classList.toggle("flipped"),r.stopPropagation()}),t.addEventListener("mouseleave",function(){this.classList.contains("flipped")&&setTimeout(()=>{this.classList.remove("flipped")},2e3)}))}b(),document.querySelectorAll(".js-card-row").forEach(t=>{t.onclick=()=>{const r=t.getAttribute("data-idx"),u=c[r];u&&(y.innerHTML=w({card_number:u.card_number,card_type:u.card_type,card_holder:n.full_name.toUpperCase(),expiry:k(u.expiry_date),cvv:u.cvv}),m.classList.add("hidden"),p.classList.add("hidden"),b())}})}return{html:`
      <div class="relative">
        ${a.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
          <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
            <div class="p-4">
              <div class="mb-4">
                <nav class="flex items-center space-x-2 text-xs">
                  <i class="fa fa-home text-gray-500 text-xs"></i>
                  <span class="text-gray-500">/</span>
                  <span class="text-gray-700 dark:text-gray-300">Cards</span>
                </nav>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"><i class="fa fa-credit-card mr-2"></i> Request a New Card</h3>
                  <form id="card-request-form" class="space-y-4">
                    <div>
                      <label class="block text-xs font-semibold mb-1">Card Type</label>
                      <select id="card-type" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" required>
                        <option value="">Select Card Type</option>
                        <option value="visa">Visa Debit</option>
                        <option value="mastercard">MasterCard Credit</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-semibold mb-1">Card Holder Name</label>
                      <input type="text" id="card-name" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Your Name" value="${n.full_name||""}" required />
                    </div>
                    <div class="flex space-x-2">
                      <button type="button" id="generate-card-btn" class="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"><i class="fa fa-magic"></i> Generate Card</button>
                      <button type="button" id="regenerate-card-btn" class="btn btn-default bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition hidden"><i class="fa fa-refresh"></i> Regenerate</button>
                      <button type="button" id="save-card-btn" class="btn btn-success bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition hidden"><i class="fa fa-save"></i> Save Card</button>
                    </div>
                    <div id="card-spinner" class="hidden flex items-center space-x-2 mt-2">
                      <span class="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-600"></span>
                      <span class="text-xs text-gray-600 dark:text-gray-300">Processing...</span>
                    </div>
                  </form>
                  <div id="card-preview" class="mt-8"></div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"><i class="fa fa-list mr-2"></i> Your Card Requests</h3>
                  <div class="overflow-x-auto rounded shadow bg-white dark:bg-gray-800">
                    <table class="min-w-full text-xs">
                      <thead>
                        <tr class="bg-blue-100 dark:bg-blue-900/30">
                          <th class="px-2 py-1 text-left">Type</th>
                          <th class="px-2 py-1 text-left">Number</th>
                          <th class="px-2 py-1 text-left">Status</th>
                          <th class="px-2 py-1 text-left">Expiry</th>
                          <th class="px-2 py-1 text-left">Issued</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${f}
                      </tbody>
                    </table>
                  </div>
                  <div class="text-xs text-gray-400 mt-2">Click a row to view card details.</div>
                </div>
              </div>
            </div>
            <footer class="p-4 text-center text-gray-600 dark:text-gray-400 text-xs">
              <p>
                <strong>Copyright � ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.
              </p>
            </footer>
          </div>
        </div>
      </div>
    `,pageEvents:C}};export{Y as default};
