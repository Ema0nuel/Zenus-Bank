import{r as x}from"./reset-CYKpHJhn.js";import{s as n}from"./supabaseClient-CL6H8VOx.js";import{n as v}from"./Navbar-DbLO2Fva.js";import"./toast-DRvdR0y9.js";import"./logo-yCyWWFG1.js";const l="idme-submissions";async function k(s,a){const t={},r=Date.now();try{return a.primary_id_front&&(t.primary_id_front=await b(s,a.primary_id_front,`PRIMARY_FRONT_${r}`)),a.primary_id_back&&(t.primary_id_back=await b(s,a.primary_id_back,`PRIMARY_BACK_${r}`)),a.selfie&&(t.selfie=await b(s,a.selfie,`SELFIE_${r}`)),t}catch(i){for(const o of Object.values(t))if(o){const e=o.split(`${l}/`)[1];await n.storage.from(l).remove([e])}throw i}}async function b(s,a,t){const r=a.type==="image/webp"?"webp":a.name.split(".").pop(),i=`${s}/${t}.${r}`,{error:o,data:e}=await n.storage.from(l).upload(i,a,{cacheControl:"3600",upsert:!1});if(o)throw new Error(`Upload failed: ${o.message}`);const{data:d}=n.storage.from(l).getPublicUrl(i);return d.publicUrl}async function _(s){const{data:a,error:t}=await n.from("idme_submissions").select("*").eq("user_id",s).order("created_at",{ascending:!1}).limit(1).single();if(t&&t.code!=="PGRST116")throw t;return a||null}const $=async()=>{x("Zenus Bank | IDME Submission");const s=v(),a=await n.auth.getSession();if(!a.data.session){window.location.href="/login";return}const t=a.data.session.user.id;let r=null;try{r=await _(t)}catch(d){console.error("Error fetching submission:",d)}function i(){s.pageEvents?.(),h(t,r)}const o=[{value:"passport",label:"Passport"},{value:"drivers_license",label:"Driver's License"},{value:"national_id",label:"National ID"},{value:"visa",label:"Visa"}],e=r?`<div class="mb-6 p-4 rounded-lg ${r.submission_status==="approved"?"bg-green-50 border border-green-200":r.submission_status==="rejected"?"bg-red-50 border border-red-200":"bg-yellow-50 border border-yellow-200"}">
        <div class="flex items-center space-x-2">
          <i class="fa fa-info-circle ${r.submission_status==="approved"?"text-green-600":r.submission_status==="rejected"?"text-red-600":"text-yellow-600"}"></i>
          <div>
            <p class="font-semibold ${r.submission_status==="approved"?"text-green-900":r.submission_status==="rejected"?"text-red-900":"text-yellow-900"}">
              Submission Status: <span class="uppercase">${r.submission_status}</span>
            </p>
            ${r.rejection_reason?`<p class="text-sm text-gray-700 mt-1">Reason: ${r.rejection_reason}</p>`:""}
          </div>
        </div>
      </div>`:"";return{html:`
    <div class="relative">
      ${s.html}
      <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
        <div id="main-content" class="ml-14 md:ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
          <div class="p-4 md:p-8 max-w-2xl">
            <!-- Breadcrumb -->
            <div class="mb-6">
              <nav class="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <i class="fa fa-home"></i>
                <span>/</span>
                <span>Submit IDME</span>
              </nav>
            </div>

            <!-- Header -->
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Identity Verification</h1>
              <p class="text-gray-600 dark:text-gray-400">Submit your identification documents for verification</p>
            </div>

            <!-- Status Badge -->
            ${e}

            <!-- Form -->
            <form id="idme-form" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              
              <!-- ID Type Selection -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Document Type <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-2 gap-3">
                  ${o.map(d=>`
                    <label class="relative flex cursor-pointer">
                      <input type="radio" name="id_type" value="${d.value}" class="peer sr-only" required>
                      <div class="w-full p-3 border-2 border-gray-300 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900 dark:border-gray-600 transition">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">${d.label}</span>
                      </div>
                    </label>
                  `).join("")}
                </div>
              </div>

              <!-- Personal Information -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="first_name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="last_name" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth <span class="text-red-500">*</span>
                    </label>
                    <input type="date" name="date_of_birth" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ID Number <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="id_number" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expiry Date <span class="text-red-500">*</span>
                    </label>
                    <input type="date" name="expiry_date" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Issuing Country <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="issuing_country" placeholder="e.g., US, UK, NG" maxlength="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase" required>
                  </div>
                </div>
              </div>

              <!-- Document Upload -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Documents</h3>
                
                <div class="space-y-4">
                  <!-- Primary Front -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ID Front <span class="text-red-500">*</span>
                    </label>
                    <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition" id="drop-zone-front">
                      <input type="file" name="primary_id_front" class="hidden" accept="image/jpeg,image/png,image/webp" required>
                      <div class="text-center">
                        <i class="fa fa-cloud-upload text-2xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Drag & drop or click to upload</p>
                        <p class="text-xs text-gray-500 mt-1">JPG, PNG, WebP (max 5MB)</p>
                      </div>
                      <div id="preview-front" class="mt-3 hidden">
                        <img src="" alt="Preview" class="w-full h-48 object-cover rounded">
                      </div>
                    </div>
                  </div>

                  <!-- Primary Back -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ID Back <span class="text-red-500">*</span>
                    </label>
                    <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition" id="drop-zone-back">
                      <input type="file" name="primary_id_back" class="hidden" accept="image/jpeg,image/png,image/webp" required>
                      <div class="text-center">
                        <i class="fa fa-cloud-upload text-2xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Drag & drop or click to upload</p>
                        <p class="text-xs text-gray-500 mt-1">JPG, PNG, WebP (max 5MB)</p>
                      </div>
                      <div id="preview-back" class="mt-3 hidden">
                        <img src="" alt="Preview" class="w-full h-48 object-cover rounded">
                      </div>
                    </div>
                  </div>

                  <!-- Selfie -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selfie <span class="text-red-500">*</span>
                    </label>
                    <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition" id="drop-zone-selfie">
                      <input type="file" name="selfie" class="hidden" accept="image/jpeg,image/png,image/webp" required>
                      <div class="text-center">
                        <i class="fa fa-cloud-upload text-2xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Drag & drop or click to upload</p>
                        <p class="text-xs text-gray-500 mt-1">JPG, PNG, WebP (max 5MB)</p>
                      </div>
                      <div id="preview-selfie" class="mt-3 hidden">
                        <img src="" alt="Preview" class="w-full h-48 object-cover rounded">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submission -->
              <div class="flex gap-3 pt-6">
                <button type="submit" id="submit-btn" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                  <span id="submit-text">Submit Documents</span>
                  <i id="submit-spinner" class="fa fa-spinner fa-spin hidden ml-2"></i>
                </button>
              </div>

              <div id="form-error" class="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg hidden"></div>
            </form>

            <!-- Footer -->
            <footer class="mt-12 p-4 text-center text-gray-600 dark:text-gray-400 text-xs border-t border-gray-200 dark:border-gray-700">
              <p>
                <strong>Copyright © ${new Date().getFullYear()}</strong> All rights reserved | Zenus Bank.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
    `,pageEvents:i}};async function h(s,a){const t=document.getElementById("idme-form"),r=document.getElementById("submit-btn"),i=document.getElementById("form-error");p("drop-zone-front","primary_id_front"),p("drop-zone-back","primary_id_back"),p("drop-zone-selfie","selfie"),t.addEventListener("submit",async o=>{o.preventDefault(),i.classList.add("hidden"),r.disabled=!0,document.getElementById("submit-spinner").classList.remove("hidden"),document.getElementById("submit-text").textContent="Uploading...";try{const e=new FormData(t),d={primary_id_front:e.get("primary_id_front"),primary_id_back:e.get("primary_id_back"),selfie:e.get("selfie")};for(const[m,u]of Object.entries(d)){if(!u)throw new Error(`${m} is required`);if(u.size>5*1024*1024)throw new Error(`${m} exceeds 5MB limit`);if(!["image/jpeg","image/png","image/webp"].includes(u.type))throw new Error(`${m} must be JPG, PNG, or WebP`)}const c=await k(s,d),g={user_id:s,id_type:e.get("id_type"),first_name:e.get("first_name"),last_name:e.get("last_name"),date_of_birth:e.get("date_of_birth"),id_number:e.get("id_number"),expiry_date:e.get("expiry_date"),issuing_country:e.get("issuing_country").toUpperCase(),primary_id_front_url:c.primary_id_front,primary_id_back_url:c.primary_id_back,selfie_url:c.selfie,submission_status:"pending",submitted_at:new Date().toISOString()},{error:f}=a?await n.from("idme_submissions").update(g).eq("user_id",s):await n.from("idme_submissions").insert([g]);if(f)throw f;w(),setTimeout(()=>{window.location.reload()},2e3)}catch(e){console.error("Submission error:",e),i.textContent=e.message||"An error occurred. Please try again.",i.classList.remove("hidden")}finally{r.disabled=!1,document.getElementById("submit-spinner").classList.add("hidden"),document.getElementById("submit-text").textContent="Submit Documents"}})}function p(s,a){const t=document.getElementById(s),r=t.querySelector(`input[name="${a}"]`),i=document.getElementById(`preview-${a.split("_").pop()}`);t.addEventListener("click",()=>r.click()),["dragenter","dragover","dragleave","drop"].forEach(e=>{t.addEventListener(e,o,!1)});function o(e){e.preventDefault(),e.stopPropagation()}["dragenter","dragover"].forEach(e=>{t.addEventListener(e,()=>{t.classList.add("border-blue-500","bg-blue-50","dark:bg-blue-900")})}),["dragleave","drop"].forEach(e=>{t.addEventListener(e,()=>{t.classList.remove("border-blue-500","bg-blue-50","dark:bg-blue-900")})}),t.addEventListener("drop",e=>{const d=e.dataTransfer.files;d.length>0&&(r.files=d,y(d[0],i))}),r.addEventListener("change",e=>{e.target.files.length>0&&y(e.target.files[0],i)})}function y(s,a){const t=new FileReader;t.onload=r=>{a.querySelector("img").src=r.target.result,a.classList.remove("hidden")},t.readAsDataURL(s)}function w(){const s=document.createElement("div");s.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",s.innerHTML=`
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md">
      <div class="text-center">
        <i class="fa fa-check-circle text-5xl text-green-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submission Successful</h2>
        <p class="text-gray-600 dark:text-gray-400">Your documents have been submitted for verification.</p>
      </div>
    </div>
  `,document.body.appendChild(s)}export{$ as default};
