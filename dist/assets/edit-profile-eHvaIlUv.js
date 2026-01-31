import{s as o}from"./supabaseClient-CL6H8VOx.js";import{s}from"./toast-DRvdR0y9.js";import{r as C}from"./reset-CYKpHJhn.js";import{n as N}from"./Navbar-Bss5hsHn.js";import{U as q}from"./user-BJB4TDdo.js";import"./logo-yCyWWFG1.js";const z=async()=>{C("Edit Profile");const y=N(),h=await o.auth.getSession();if(!h.data.session){window.location.href="/login";return}const{user:m}=h.data.session,{data:e}=await o.from("profiles").select("*").eq("id",m.id).single(),{data:p}=await o.from("accounts").select("*").eq("user_id",m.id).single(),E=a=>typeof a=="number"?a.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):a||"$0.00";function T(){y.pageEvents?.(),document.querySelectorAll(".tw-tabs li").forEach(t=>{t.addEventListener("click",function(c){c.preventDefault(),document.querySelectorAll(".tw-tabs li").forEach(i=>i.classList.remove("tw-active","border-b-2","border-blue-600")),this.classList.add("tw-active","border-b-2","border-blue-600"),document.querySelectorAll(".tw-tab-pane").forEach(i=>i.classList.add("hidden"));const f=this.querySelector("a").getAttribute("href").replace("#","");document.getElementById(f).classList.remove("hidden")})});const a=document.getElementById("idme-demo-button"),w=document.getElementById("idme-status");a&&(a.addEventListener("click",async()=>{a.disabled=!0,a.innerHTML='<i class="fa fa-spinner fa-spin"></i> Verifying...',await new Promise(t=>setTimeout(t,2e3)),w.innerHTML='<span class="text-green-500"><i class="fa fa-check-circle"></i> Verified</span>',a.innerHTML='<i class="fa fa-check"></i> Verified',a.classList.remove("bg-blue-600","hover:bg-blue-700"),a.classList.add("bg-green-600","hover:bg-green-700"),localStorage.setItem("demo_idme_verified","true"),localStorage.setItem("demo_idme_timestamp",new Date().toISOString()),s("Identity verified successfully! (Demo)","success"),document.querySelector('select[name="legal_id_type"]').value="Driver's License",document.querySelector('input[name="legal_id_number"]').value="DL"+Math.random().toString(36).substr(2,8).toUpperCase()}),localStorage.getItem("demo_idme_verified")==="true"&&(w.innerHTML='<span class="text-green-500"><i class="fa fa-check-circle"></i> Verified</span>',a.innerHTML='<i class="fa fa-check"></i> Verified',a.disabled=!0,a.classList.remove("bg-blue-600","hover:bg-blue-700"),a.classList.add("bg-green-600","hover:bg-green-700")));const x=document.getElementById("start-camera"),u=document.getElementById("capture-photo"),l=document.getElementById("submit-verification"),k=document.getElementById("verification-status"),r=document.getElementById("camera-feed"),d=document.getElementById("camera-canvas"),B=d.getContext("2d");let b=null;if(x&&x.addEventListener("click",async()=>{try{b=await navigator.mediaDevices.getUserMedia({video:!0}),r.srcObject=b,r.classList.remove("hidden"),d.classList.add("hidden"),r.play(),x.classList.add("hidden"),u.classList.remove("hidden")}catch{s("Unable to access camera","error")}}),u&&u.addEventListener("click",()=>{d.width=r.videoWidth,d.height=r.videoHeight,B.drawImage(r,0,0),b&&b.getTracks().forEach(t=>t.stop()),r.classList.add("hidden"),d.classList.remove("hidden"),u.classList.add("hidden"),l.classList.remove("hidden")}),l&&l.addEventListener("click",async()=>{l.disabled=!0,l.innerHTML='<i class="fa fa-spinner fa-spin"></i> Processing...',k.innerHTML='<span class="text-blue-500">Processing verification...</span>',await new Promise(t=>setTimeout(t,3e3)),k.innerHTML='<span class="text-yellow-500"><i class="fa fa-clock-o"></i> Verification Pending</span>',l.innerHTML='<i class="fa fa-clock-o"></i> Pending Review',l.classList.remove("bg-green-600","hover:bg-green-700"),l.classList.add("bg-yellow-600","hover:bg-yellow-700"),localStorage.setItem("idme_status","pending"),localStorage.setItem("idme_timestamp",new Date().toISOString()),s("Verification submitted for review","success")}),localStorage.getItem("idme_status")==="pending"){const t=document.getElementById("verification-status");t&&(t.innerHTML='<span class="text-yellow-500"><i class="fa fa-clock-o"></i> Verification Pending</span>')}const L=document.getElementById("avatar-upload"),P=document.getElementById("avatar-img"),n=document.getElementById("avatar-spinner");L&&(L.onchange=async function(){const t=this.files[0];if(!t)return;const c=5*1024*1024;if(!["image/jpeg","image/png","image/webp","image/gif"].includes(t.type)){s("Invalid file type. Use JPG, PNG, WebP, or GIF","error");return}if(t.size>c){s("File size must be under 5MB","error");return}n.classList.remove("hidden");try{const i=t.name.split(".").pop().toLowerCase(),$=`${m.id}/${Date.now()}-${Math.random().toString(36).substr(2,9)}.${i}`,{data:D,error:g}=await o.storage.from("profile-pictures").upload($,t,{upsert:!1,contentType:t.type});if(g){console.error("Upload error:",g),s(`Upload failed: ${g.message}`,"error"),n.classList.add("hidden");return}if(!D){s("Upload failed: No response from server","error"),n.classList.add("hidden");return}const{data:M}=o.storage.from("profile-pictures").getPublicUrl($),v=M.publicUrl;if(!v){s("Failed to generate image URL","error"),n.classList.add("hidden");return}const{error:_}=await o.from("profiles").update({avatar_url:v}).eq("id",m.id);if(_){console.error("Database error:",_),s("Failed to update profile","error"),n.classList.add("hidden");return}P.src=v,n.classList.add("hidden"),s("Profile picture updated successfully!","success")}catch(i){console.error("Upload error:",i),s("Error uploading image","error"),n.classList.add("hidden")}});const I=document.getElementById("edit-profile-form");I&&(I.onsubmit=async function(t){});const S=document.getElementById("kyc-form");S&&(S.onsubmit=async function(t){t.preventDefault();const c=document.getElementById("kyc-submit-btn"),f=document.getElementById("kyc-spinner");c.disabled=!0,f.classList.remove("hidden");const i=new FormData(this);i.append("idme_verified",localStorage.getItem("demo_idme_verified")==="true"),i.append("idme_timestamp",localStorage.getItem("demo_idme_timestamp")||""),s("KYC submitted successfully!","success"),setTimeout(()=>window.location.reload(),1200)})}return{html:`
        <div class="relative">
        ${y.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
            <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
                <div class="p-4 max-w-5xl mx-auto">
                    <nav class="flex items-center text-xs mb-4 space-x-2">
                        <i class="fa fa-home text-gray-500"></i>
                        <a href="/" class="text-blue-600 hover:underline">Home</a>
                        <span class="text-gray-500">/</span>
                        <span class="text-gray-700 dark:text-gray-300">Profile</span>
                    </nav>
                    <div class="mb-6">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Profile</h2>
                        <em class="text-xs text-gray-500">${e.full_name}</em>
                    </div>
                    <div class="bg-white dark:bg-gray-800 rounded shadow-sm p-4">
                        <ul class="tw-tabs flex border-b mb-6">
                            <li class="tw-active border-b-2 border-blue-600 -mb-px">
                                <a href="#profile-tab" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600"><i class="fa fa-user mr-2"></i>Profile</a>
                            </li>
                            <li>
                                <a href="#settings-tab" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600"><i class="fa fa-gear mr-2"></i>Settings</a>
                            </li>
                            <li>
                                <a href="#kyc-tab" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600"><i class="fa fa-id-card mr-2"></i>KYC</a>
                            </li>
                        </ul>
                        <div class="tab-content profile-page">
                            <!-- PROFILE TAB CONTENT -->
                            <div class="tw-tab-pane" id="profile-tab">
                                <div class="flex flex-col md:flex-row gap-8">
                                    <div class="md:w-1/4 flex flex-col items-center">
                                        <div class="relative group">
                                            <img id="avatar-img" src="${e.avatar_url||q}" class="rounded-full mb-2 border border-gray-200 dark:border-gray-700 w-40 h-40 object-cover" alt="Profile Picture">
                                            <label class="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition" title="Change Picture">
                                                <i class="fa fa-camera"></i>
                                                <input id="avatar-upload" type="file" accept="image/*" class="hidden" />
                                            </label>
                                            <span id="avatar-spinner" class="hidden absolute top-2 left-2 bg-white/80 rounded-full p-1"><i class="fa fa-spinner fa-spin text-blue-600"></i></span>
                                        </div>
                                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">${e.full_name} <i class="fa fa-circle text-green-500 text-xs"></i></h2>
                                        <a href="mailto:${e.email}" class="btn bg-blue-600 text-white px-4 py-1 rounded text-xs mt-2"><i class="fa fa-envelope-o"></i> Send Message</a>
                                    </div>
                                    <div class="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                                        <div>
                                            <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-square mr-1"></i> Basic Information</h3>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Full Name:</span> <span class="font-semibold">${e.full_name}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Birth Date:</span> <span class="font-semibold">${e.dob||"-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Gender:</span> <span class="font-semibold">${e.gender||"-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">SSN:</span> <span class="font-semibold">${e.ssn||"-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Occupation:</span> <span class="font-semibold">${e.occupation||"-"}</span></div>
                                        </div>
                                        <div>
                                            <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-square mr-1"></i> Contact Information</h3>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Email:</span> <span class="font-semibold">${e.email||"-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Phone:</span> <span class="font-semibold">${e.phone||"-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Address:</span> <span class="font-semibold">${e.address||"-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Country:</span> <span class="font-semibold">${e.nationality||"-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Zip:</span> <span class="font-semibold">${e.zip||"-"}</span></div>
                                        </div>
                                        <div class="col-span-2 mt-4">
                                            <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-square mr-1"></i> Account Information</h3>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                                <div><span class="font-normal text-gray-500">Account Balance:</span> <span class="font-semibold">${E(p?.balance)}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Number:</span> <span class="font-semibold">${p?.account_number||"-"}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Type:</span> <span class="font-semibold">${p?.account_type||"-"}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Status:</span> <span class="font-semibold">${p?.is_active?"Active":"Inactive"}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- SETTINGS TAB CONTENT -->
                            <div class="tw-tab-pane hidden" id="settings-tab">
                                <form id="edit-profile-form" class="space-y-4 max-w-xl mx-auto mt-6">
                                    <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-square mr-1"></i> Change Detail</h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs mb-1">Full Name</label>
                                            <input type="text" name="full_name" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.full_name||""}" required>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">DOB</label>
                                            <input type="date" name="dob" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.dob||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Gender</label>
                                            <select name="gender" class="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                                                <option value="">Select</option>
                                                <option value="Male" ${e.gender==="Male"?"selected":""}>Male</option>
                                                <option value="Female" ${e.gender==="Female"?"selected":""}>Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Phone</label>
                                            <input type="text" name="phone" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.phone||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Address</label>
                                            <input type="text" name="address" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.address||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Country</label>
                                            <input type="text" name="nationality" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.nationality||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Zip</label>
                                            <input type="text" name="zip" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.zip||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Occupation</label>
                                            <input type="text" name="occupation" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.occupation||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">SSN</label>
                                            <input type="text" name="ssn" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.ssn||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Marital Status</label>
                                            <input type="text" name="marital_status" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.marital_status||""}">
                                        </div>
                                    </div>
                                    <div class="flex justify-center mt-4">
                                        <button type="submit" id="save-profile-btn" class="btn bg-blue-600 text-white px-4 py-1 rounded text-xs flex items-center gap-2">
                                            <span>Save Changes</span>
                                            <span id="profile-spinner" class="hidden ml-2"><i class="fa fa-spinner fa-spin"></i></span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <!-- KYC TAB CONTENT -->
                            <div class="tw-tab-pane hidden" id="kyc-tab">
                                <!-- Replace the existing verification div with this new one -->
                                <div class="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <h3 class="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-200">
                                        <i class="fa fa-shield mr-1"></i> ID Verification
                                    </h3>
                                    <div class="flex flex-col space-y-4">
                                        <div id="camera-container" class="relative">
                                            <video id="camera-feed" class="w-full h-64 bg-black rounded-lg hidden"></video>
                                            <canvas id="camera-canvas" class="w-full h-64 bg-gray-100 rounded-lg"></canvas>
                                            <div id="camera-overlay" class="absolute inset-0 flex items-center justify-center">
                                                <div class="text-center">
                                                    <button id="start-camera" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto">
                                                        <i class="fa fa-camera"></i>
                                                        Start Camera
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex justify-between items-center">
                                            <div class="text-xs text-gray-600 dark:text-gray-300">
                                                <p class="mb-2">Please take a clear photo of your face</p>
                                                <ul class="list-disc ml-4 space-y-1">
                                                    <li>Ensure good lighting</li>
                                                    <li>Remove glasses</li>
                                                    <li>Look straight at camera</li>
                                                    <li>Neutral expression</li>
                                                </ul>
                                            </div>
                                            <div class="flex flex-col items-center">
                                                <button id="capture-photo" 
                                                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hidden">
                                                    <i class="fa fa-camera"></i>
                                                    Capture Photo
                                                </button>
                                                <button id="submit-verification" 
                                                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hidden">
                                                    <i class="fa fa-check"></i>
                                                    Submit Verification
                                                </button>
                                                <div id="verification-status" class="mt-2 text-xs">
                                                    <span class="text-gray-400">Not verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <form id="kyc-form" class="space-y-4 max-w-xl mx-auto mt-6" enctype="multipart/form-data" autocomplete="off">
                                    <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-id-card mr-1"></i> KYC Verification</h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs mb-1">Full Name</label>
                                            <input type="text" name="full_name" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.full_name||""}" required>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">DOB</label>
                                            <input type="date" name="dob" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.dob||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Gender</label>
                                            <select name="gender" class="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                                                <option value="">Select</option>
                                                <option value="Male" ${e.gender==="Male"?"selected":""}>Male</option>
                                                <option value="Female" ${e.gender==="Female"?"selected":""}>Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Phone</label>
                                            <input type="text" name="phone" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.phone||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Address</label>
                                            <input type="text" name="address" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.address||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Country</label>
                                            <input type="text" name="nationality" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.nationality||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Zip</label>
                                            <input type="text" name="zip" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${e.zip||""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Legal ID Type</label>
                                            <select name="legal_id_type" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" required>
                                                <option value="">Select</option>
                                                <option value="Passport">Passport</option>
                                                <option value="Driver's License">Driver's License</option>
                                                <option value="National ID">National ID</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Legal ID Number</label>
                                            <input type="text" name="legal_id_number" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" required>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Legal ID Image</label>
                                            <input type="file" name="legal_id_image" accept="image/*" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" required>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Proof of Address (Utility Bill, etc.)</label>
                                            <input type="file" name="proof_of_address" accept="image/*,application/pdf" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" required>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Recent Bank Statement</label>
                                            <input type="file" name="bank_statement" accept="image/*,application/pdf" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" required>
                                        </div>
                                    </div>
                                    <div class="flex justify-center mt-4">
                                        <button type="submit" id="kyc-submit-btn" class="btn bg-green-600 text-white px-4 py-1 rounded text-xs flex items-center gap-2">
                                            <span>Submit KYC</span>
                                            <span id="kyc-spinner" class="hidden ml-2"><i class="fa fa-spinner fa-spin"></i></span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <footer class="footer mt-8 text-center text-xs text-gray-400">
                        <strong>&copy;${new Date().getFullYear()} Zenus Banking.</strong> All rights reserved.
                    </footer>
                </div>
            </div>
        </div>
        </div>
        `,pageEvents:T}};export{z as default};
