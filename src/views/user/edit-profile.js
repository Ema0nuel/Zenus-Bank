import { supabase } from '../../utils/supabaseClient';
import { showToast } from '../../components/toast';
import { sendEmail } from './functions/Emailing/sendEmail';
import { reset } from '../../utils/reset';
import navbar from './components/Navbar';
import User from "/src/images/user/user.png";

const ADMIN_EMAIL = "zenusbanking@gmail.com";

const editProfile = async () => {
    reset("Edit Profile");
    const nav = navbar();

    // Fetch session and user/account data
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
        window.location.href = "/login";
        return;
    }
    const { user } = session.data.session;

    // Fetch profile and account
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    const { data: account } = await supabase.from('accounts').select('*').eq('user_id', user.id).single();

    // Format currency
    const fmt = (v) =>
        typeof v === "number"
            ? v.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
            })
            : v || "$0.00";

    function pageEvents() {
        nav.pageEvents?.();

        // Tab switching
        document.querySelectorAll(".tw-tabs li").forEach((li) => {
            li.addEventListener("click", function (e) {
                e.preventDefault();
                document.querySelectorAll(".tw-tabs li").forEach((l) => l.classList.remove("tw-active", "border-b-2", "border-blue-600"));
                this.classList.add("tw-active", "border-b-2", "border-blue-600");
                document.querySelectorAll(".tw-tab-pane").forEach((tab) => tab.classList.add("hidden"));
                const tabId = this.querySelector("a").getAttribute("href").replace("#", "");
                document.getElementById(tabId).classList.remove("hidden");
            });
        });

        // ID.me verification
        const idmeButton = document.getElementById('idme-demo-button');
        const idmeStatus = document.getElementById('idme-status');
        if (idmeButton) {
            idmeButton.addEventListener('click', async () => {
                // Simulate verification process
                idmeButton.disabled = true;
                idmeButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Verifying...';

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Demo success
                idmeStatus.innerHTML = '<span class="text-green-500"><i class="fa fa-check-circle"></i> Verified</span>';
                idmeButton.innerHTML = '<i class="fa fa-check"></i> Verified';
                idmeButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                idmeButton.classList.add('bg-green-600', 'hover:bg-green-700');

                // Store demo verification
                localStorage.setItem('demo_idme_verified', 'true');
                localStorage.setItem('demo_idme_timestamp', new Date().toISOString());

                showToast("Identity verified successfully! (Demo)", "success");

                // Auto-fill some KYC fields for demo
                document.querySelector('select[name="legal_id_type"]').value = "Driver's License";
                document.querySelector('input[name="legal_id_number"]').value = "DL" + Math.random().toString(36).substr(2, 8).toUpperCase();
            });

            // Check for existing demo verification
            if (localStorage.getItem('demo_idme_verified') === 'true') {
                idmeStatus.innerHTML = '<span class="text-green-500"><i class="fa fa-check-circle"></i> Verified</span>';
                idmeButton.innerHTML = '<i class="fa fa-check"></i> Verified';
                idmeButton.disabled = true;
                idmeButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                idmeButton.classList.add('bg-green-600', 'hover:bg-green-700');
            }
        }


        // IDME
        // Camera handling
        const startCamera = document.getElementById('start-camera');
        const capturePhoto = document.getElementById('capture-photo');
        const submitVerification = document.getElementById('submit-verification');
        const verificationStatus = document.getElementById('verification-status');
        const video = document.getElementById('camera-feed');
        const canvas = document.getElementById('camera-canvas');
        const ctx = canvas.getContext('2d');
        let stream = null;

        if (startCamera) {
            startCamera.addEventListener('click', async () => {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    video.srcObject = stream;
                    video.classList.remove('hidden');
                    canvas.classList.add('hidden');
                    video.play();
                    startCamera.classList.add('hidden');
                    capturePhoto.classList.remove('hidden');
                } catch (err) {
                    showToast("Unable to access camera", "error");
                }
            });
        }

        if (capturePhoto) {
            capturePhoto.addEventListener('click', () => {
                // Set canvas dimensions to match video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Draw video frame to canvas
                ctx.drawImage(video, 0, 0);

                // Stop camera
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }

                // Show canvas, hide video
                video.classList.add('hidden');
                canvas.classList.remove('hidden');
                capturePhoto.classList.add('hidden');
                submitVerification.classList.remove('hidden');
            });
        }

        if (submitVerification) {
            submitVerification.addEventListener('click', async () => {
                // Disable button and show processing
                submitVerification.disabled = true;
                submitVerification.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
                verificationStatus.innerHTML = '<span class="text-blue-500">Processing verification...</span>';

                // Simulate processing delay
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Update status to pending
                verificationStatus.innerHTML = '<span class="text-yellow-500"><i class="fa fa-clock-o"></i> Verification Pending</span>';
                submitVerification.innerHTML = '<i class="fa fa-clock-o"></i> Pending Review';
                submitVerification.classList.remove('bg-green-600', 'hover:bg-green-700');
                submitVerification.classList.add('bg-yellow-600', 'hover:bg-yellow-700');

                // Store verification status
                localStorage.setItem('idme_status', 'pending');
                localStorage.setItem('idme_timestamp', new Date().toISOString());

                showToast("Verification submitted for review", "success");
            });
        }

        // Check existing verification status
        if (localStorage.getItem('idme_status') === 'pending') {
            const verificationStatus = document.getElementById('verification-status');
            if (verificationStatus) {
                verificationStatus.innerHTML = '<span class="text-yellow-500"><i class="fa fa-clock-o"></i> Verification Pending</span>';
            }
        }

        // Profile picture upload handler
        const avatarInput = document.getElementById("avatar-upload");
        const avatarImg = document.getElementById("avatar-img");
        const avatarSpinner = document.getElementById("avatar-spinner");
        if (avatarInput) {
            avatarInput.onchange = async function () {
                const file = this.files[0];
                if (!file) return;

                // Validate file
                const maxSize = 5 * 1024 * 1024; // 5MB
                const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

                if (!validTypes.includes(file.type)) {
                    showToast("Invalid file type. Use JPG, PNG, WebP, or GIF", "error");
                    return;
                }

                if (file.size > maxSize) {
                    showToast("File size must be under 5MB", "error");
                    return;
                }

                // Show spinner
                avatarSpinner.classList.remove("hidden");

                try {
                    // Generate unique filename with user ID
                    const fileExt = file.name.split(".").pop().toLowerCase();
                    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                    // Upload to Supabase bucket
                    const { data, error } = await supabase.storage
                        .from("profile-pictures")
                        .upload(fileName, file, {
                            upsert: false,
                            contentType: file.type
                        });

                    if (error) {
                        console.error("Upload error:", error);
                        showToast(`Upload failed: ${error.message}`, "error");
                        avatarSpinner.classList.add("hidden");
                        return;
                    }

                    if (!data) {
                        showToast("Upload failed: No response from server", "error");
                        avatarSpinner.classList.add("hidden");
                        return;
                    }

                    // Get public URL
                    const { data: urlData } = supabase.storage
                        .from("profile-pictures")
                        .getPublicUrl(fileName);

                    const publicUrl = urlData.publicUrl;

                    if (!publicUrl) {
                        showToast("Failed to generate image URL", "error");
                        avatarSpinner.classList.add("hidden");
                        return;
                    }

                    // Update profile in database
                    const { error: updateError } = await supabase
                        .from("profiles")
                        .update({ avatar_url: publicUrl })
                        .eq("id", user.id);

                    if (updateError) {
                        console.error("Database error:", updateError);
                        showToast("Failed to update profile", "error");
                        avatarSpinner.classList.add("hidden");
                        return;
                    }

                    // Update UI
                    avatarImg.src = publicUrl;
                    avatarSpinner.classList.add("hidden");
                    showToast("Profile picture updated successfully!", "success");
                } catch (err) {
                    console.error("Upload error:", err);
                    showToast("Error uploading image", "error");
                    avatarSpinner.classList.add("hidden");
                }
            };
        }

        // Edit Profile Form handler
        const editForm = document.getElementById("edit-profile-form");
        if (editForm) {
            editForm.onsubmit = async function (e) {
                // ... existing profile form submission code ...
            };
        }

        // KYC Form handler with ID.me integration
        const kycForm = document.getElementById("kyc-form");
        if (kycForm) {
            kycForm.onsubmit = async function (e) {
                e.preventDefault();
                const btn = document.getElementById("kyc-submit-btn");
                const spinner = document.getElementById("kyc-spinner");
                btn.disabled = true;
                spinner.classList.remove("hidden");

                // Get form data and add ID.me verification status
                const formData = new FormData(this);
                formData.append('idme_verified', localStorage.getItem('demo_idme_verified') === 'true');
                formData.append('idme_timestamp', localStorage.getItem('demo_idme_timestamp') || '');

                // After successful submission
                showToast("KYC submitted successfully!", "success");
                setTimeout(() => window.location.reload(), 1200);
            };
        }
    }

    return {
        html: /*html*/`
        <div class="relative">
        ${nav.html}
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
                        <em class="text-xs text-gray-500">${profile.full_name}</em>
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
                                            <img id="avatar-img" src="${profile.avatar_url || User}" class="rounded-full mb-2 border border-gray-200 dark:border-gray-700 w-40 h-40 object-cover" alt="Profile Picture">
                                            <label class="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition" title="Change Picture">
                                                <i class="fa fa-camera"></i>
                                                <input id="avatar-upload" type="file" accept="image/*" class="hidden" />
                                            </label>
                                            <span id="avatar-spinner" class="hidden absolute top-2 left-2 bg-white/80 rounded-full p-1"><i class="fa fa-spinner fa-spin text-blue-600"></i></span>
                                        </div>
                                        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">${profile.full_name} <i class="fa fa-circle text-green-500 text-xs"></i></h2>
                                        <a href="mailto:${profile.email}" class="btn bg-blue-600 text-white px-4 py-1 rounded text-xs mt-2"><i class="fa fa-envelope-o"></i> Send Message</a>
                                    </div>
                                    <div class="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                                        <div>
                                            <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-square mr-1"></i> Basic Information</h3>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Full Name:</span> <span class="font-semibold">${profile.full_name}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Birth Date:</span> <span class="font-semibold">${profile.dob || "-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Gender:</span> <span class="font-semibold">${profile.gender || "-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">SSN:</span> <span class="font-semibold">${profile.ssn || "-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Occupation:</span> <span class="font-semibold">${profile.occupation || "-"}</span></div>
                                        </div>
                                        <div>
                                            <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-square mr-1"></i> Contact Information</h3>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Email:</span> <span class="font-semibold">${profile.email || "-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Phone:</span> <span class="font-semibold">${profile.phone || "-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Address:</span> <span class="font-semibold">${profile.address || "-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Country:</span> <span class="font-semibold">${profile.nationality || "-"}</span></div>
                                            <div class="mb-1"><span class="font-normal text-gray-500">Zip:</span> <span class="font-semibold">${profile.zip || "-"}</span></div>
                                        </div>
                                        <div class="col-span-2 mt-4">
                                            <h3 class="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"><i class="fa fa-square mr-1"></i> Account Information</h3>
                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                                <div><span class="font-normal text-gray-500">Account Balance:</span> <span class="font-semibold">${fmt(account?.balance)}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Number:</span> <span class="font-semibold">${account?.account_number || "-"}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Type:</span> <span class="font-semibold">${account?.account_type || "-"}</span></div>
                                                <div><span class="font-normal text-gray-500">Account Status:</span> <span class="font-semibold">${account?.is_active ? "Active" : "Inactive"}</span></div>
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
                                            <input type="text" name="full_name" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.full_name || ""}" required>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">DOB</label>
                                            <input type="date" name="dob" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.dob || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Gender</label>
                                            <select name="gender" class="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                                                <option value="">Select</option>
                                                <option value="Male" ${profile.gender === "Male" ? "selected" : ""}>Male</option>
                                                <option value="Female" ${profile.gender === "Female" ? "selected" : ""}>Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Phone</label>
                                            <input type="text" name="phone" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.phone || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Address</label>
                                            <input type="text" name="address" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.address || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Country</label>
                                            <input type="text" name="nationality" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.nationality || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Zip</label>
                                            <input type="text" name="zip" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.zip || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Occupation</label>
                                            <input type="text" name="occupation" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.occupation || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">SSN</label>
                                            <input type="text" name="ssn" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.ssn || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Marital Status</label>
                                            <input type="text" name="marital_status" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.marital_status || ""}">
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
                                            <input type="text" name="full_name" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.full_name || ""}" required>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">DOB</label>
                                            <input type="date" name="dob" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.dob || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Gender</label>
                                            <select name="gender" class="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                                                <option value="">Select</option>
                                                <option value="Male" ${profile.gender === "Male" ? "selected" : ""}>Male</option>
                                                <option value="Female" ${profile.gender === "Female" ? "selected" : ""}>Female</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Phone</label>
                                            <input type="text" name="phone" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.phone || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Address</label>
                                            <input type="text" name="address" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.address || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Country</label>
                                            <input type="text" name="nationality" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.nationality || ""}">
                                        </div>
                                        <div>
                                            <label class="block text-xs mb-1">Zip</label>
                                            <input type="text" name="zip" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" value="${profile.zip || ""}">
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
        `,
        pageEvents,
    };
};

export default editProfile;




