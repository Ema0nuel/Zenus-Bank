import{s as d}from"./supabaseClient-B1HaFb4P.js";import{s as l}from"./toast-Dx2DSKhR.js";import{s as I}from"./sendEmail-89Z52C2k.js";import{r as A}from"./reset-CYKpHJhn.js";import{n as N}from"./Navbar-DzFN-yR7.js";import{U as T}from"./user-BJB4TDdo.js";import"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";import"./logo-yCyWWFG1.js";const H=async()=>{A("Edit Profile");const g=N(),v=await d.auth.getSession();if(!v.data.session){window.location.href="/login";return}const{user:p}=v.data.session,{data:e}=await d.from("profiles").select("*").eq("id",p.id).single(),{data:u}=await d.from("accounts").select("*").eq("user_id",p.id).single(),S=m=>typeof m=="number"?m.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}):m||"$0.00";function F(){g.pageEvents?.(),document.querySelectorAll(".tw-tabs li").forEach(r=>{r.addEventListener("click",function(t){t.preventDefault(),document.querySelectorAll(".tw-tabs li").forEach(a=>a.classList.remove("tw-active","border-b-2","border-blue-600")),this.classList.add("tw-active","border-b-2","border-blue-600"),document.querySelectorAll(".tw-tab-pane").forEach(a=>a.classList.add("hidden"));const s=this.querySelector("a").getAttribute("href").replace("#","");document.getElementById(s).classList.remove("hidden")})});const m=document.getElementById("avatar-upload"),P=document.getElementById("avatar-img"),b=document.getElementById("avatar-spinner");m&&(m.onchange=async function(){const r=m.files[0];if(!r)return;if(!r.type.startsWith("image/")){l("Please select a valid image file.","error");return}b.classList.remove("hidden");const t=r.name.split(".").pop(),s=`${p.id}/avatar_${Date.now()}.${t}`,{data:a,error:i}=await d.storage.from("profile-pictures").upload(s,r,{upsert:!0});if(i){l("Failed to upload image.","error"),b.classList.add("hidden");return}const{data:c}=d.storage.from("profile-pictures").getPublicUrl(a.path),n=c?.publicUrl;if(!n){l("Failed to get image URL.","error"),b.classList.add("hidden");return}const{error:o}=await d.from("profiles").update({avatar_url:n}).eq("id",p.id);if(b.classList.add("hidden"),o){l("Failed to update profile picture.","error");return}P.src=n,l("Profile picture updated!","success")});const y=document.getElementById("edit-profile-form");y&&(y.onsubmit=async function(r){r.preventDefault();const t=document.getElementById("save-profile-btn"),s=document.getElementById("profile-spinner");t.disabled=!0,s.classList.remove("hidden");const a=new FormData(this),i={};["full_name","title","firstname","lastname","phone","country_code","nationality","address","city","state","zip","dob","occupation","ssn","marital_status","gender"].forEach(n=>{let o=a.get(n);n==="dob"&&(!o||o==="")||typeof o=="string"&&o.trim()!==""&&(i[n]=o)});const{error:c}=await d.from("profiles").update(i).eq("id",p.id);if(s.classList.add("hidden"),t.disabled=!1,c){l("Profile update failed: "+c.message,"error");return}await I({to:e.email,subject:"Profile Updated",html:`<p>Hello <b>${i.full_name||e.full_name}</b>,<br>Your profile was successfully updated.</p>`}),l("Profile updated successfully!","success"),setTimeout(()=>window.location.reload(),1200)});const h=document.getElementById("kyc-form");h&&(h.onsubmit=async function(r){r.preventDefault();const t=document.getElementById("kyc-submit-btn"),s=document.getElementById("kyc-spinner");t.disabled=!0,s.classList.remove("hidden");const a=new FormData(this);let i=a.get("dob");(!i||i==="")&&(i=null);async function c(x,L){if(!x||x.size===0)return null;const q=`${p.id}/${L}_${Date.now()}_${x.name}`,{data:D,error:B}=await d.storage.from("kyc").upload(q,x,{upsert:!0});if(B||!D?.path)return null;const{data:C}=d.storage.from("kyc").getPublicUrl(D.path);return C?.publicUrl||null}const n=a.get("legal_id_image"),o=a.get("proof_of_address"),w=a.get("bank_statement");if(!n||!o||!w){l("All KYC files are required.","error"),s.classList.add("hidden"),t.disabled=!1;return}const _=await c(n,"legal_id"),k=await c(o,"address"),$=await c(w,"bank");if(!_||!k||!$){l("File upload failed. Please check your files and try again.","error"),s.classList.add("hidden"),t.disabled=!1;return}const f={user_id:p.id,full_name:a.get("full_name"),birth_date:i,gender:a.get("gender"),ssn:a.get("ssn"),address:a.get("address"),country:a.get("nationality"),zip_code:a.get("zip"),phone:a.get("phone"),email:e.email,legal_id_type:a.get("legal_id_type"),legal_id_number:a.get("legal_id_number"),legal_id_image_url:_,proof_of_address_url:k,bank_statement_url:$,status:"pending"};f.birth_date||delete f.birth_date;const{error:E}=await d.from("kyc_requests").insert([f]);if(s.classList.add("hidden"),t.disabled=!1,E){l("KYC submission failed: "+E.message,"error");return}await I({to:e.email,subject:"KYC Submitted",html:`<p>Hello <b>${f.full_name}</b>,<br>Your KYC request has been submitted and is under review.</p>`}),l("KYC submitted successfully!","success"),setTimeout(()=>window.location.reload(),1200)})}return{html:`
        <div class="relative">
        ${g.html}
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
                                <a href="#profile-tab" class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600"><i class="fa fa-user mr-2"></i>Profile</a>
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
                                            <img id="avatar-img" src="${e.avatar_url||T}" class="rounded-full mb-2 border border-gray-200 dark:border-gray-700 w-40 h-40 object-cover" alt="Profile Picture">
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
                                                <div><span class="font-normal text-gray-500">Account Balance:</span> <span class="font-semibold">${S(u?.balance)}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Number:</span> <span class="font-semibold">${u?.account_number||"-"}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Type:</span> <span class="font-semibold">${u?.account_type||"-"}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Status:</span> <span class="font-semibold">${u?.is_active?"Active":"Inactive"}</span></div>
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
                        <strong>&copy;${new Date().getFullYear()} West Coast Group.</strong> All rights reserved.
                    </footer>
                </div>
            </div>
        </div>
        </div>
        `,pageEvents:F}};export{H as default};
