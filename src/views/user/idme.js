import { reset } from "../../utils/reset";
import { supabase } from "../../utils/supabaseClient";
import navbar from "./components/Navbar";
import { uploadIDMEDocuments, getIDMESubmission } from "../../utils/idmeManager";

const Idme_Submission = async () => {
  reset("Zenus Bank | IDME Submission");
  const nav = navbar();

  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    window.location.href = "/login";
    return;
  }

  const userId = session.data.session.user.id;
  let existingSubmission = null;

  // Fetch existing submission if any
  try {
    existingSubmission = await getIDMESubmission(userId);
  } catch (err) {
    console.error("Error fetching submission:", err);
  }

  function pageEvents() {
    nav.pageEvents?.();
    attachFormHandlers(userId, existingSubmission);
  }

  const idTypeOptions = [
    { value: "passport", label: "Passport" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "national_id", label: "National ID" },
    { value: "visa", label: "Visa" },
  ];

  const statusBadge = existingSubmission
    ? `<div class="mb-6 p-4 rounded-lg ${existingSubmission.submission_status === "approved"
      ? "bg-green-50 border border-green-200"
      : existingSubmission.submission_status === "rejected"
        ? "bg-red-50 border border-red-200"
        : "bg-yellow-50 border border-yellow-200"
    }">
        <div class="flex items-center space-x-2">
          <i class="fa fa-info-circle ${existingSubmission.submission_status === "approved"
      ? "text-green-600"
      : existingSubmission.submission_status === "rejected"
        ? "text-red-600"
        : "text-yellow-600"
    }"></i>
          <div>
            <p class="font-semibold ${existingSubmission.submission_status === "approved"
      ? "text-green-900"
      : existingSubmission.submission_status === "rejected"
        ? "text-red-900"
        : "text-yellow-900"
    }">
              Submission Status: <span class="uppercase">${existingSubmission.submission_status}</span>
            </p>
            ${existingSubmission.rejection_reason
      ? `<p class="text-sm text-gray-700 mt-1">Reason: ${existingSubmission.rejection_reason}</p>`
      : ""
    }
          </div>
        </div>
      </div>`
    : "";

  return {
    html: /* html */ `
    <div class="relative">
      ${nav.html}
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
            ${statusBadge}

            <!-- Form -->
            <form id="idme-form" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              
              <!-- ID Type Selection -->
              <div>
                <label class="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Document Type <span class="text-red-500">*</span>
                </label>
                <div class="grid grid-cols-2 gap-3">
                  ${idTypeOptions
        .map(
          (option) => `
                    <label class="relative flex cursor-pointer">
                      <input type="radio" name="id_type" value="${option.value}" class="peer sr-only" required>
                      <div class="w-full p-3 border-2 border-gray-300 rounded-lg peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900 dark:border-gray-600 transition">
                        <span class="text-sm font-medium text-gray-900 dark:text-white">${option.label}</span>
                      </div>
                    </label>
                  `
        )
        .join("")}
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
    `,
    pageEvents,
  };
};

async function attachFormHandlers(userId, existingSubmission) {
  const form = document.getElementById("idme-form");
  const submitBtn = document.getElementById("submit-btn");
  const formError = document.getElementById("form-error");

  // Setup drag & drop for all file zones
  setupDragAndDrop("drop-zone-front", "primary_id_front");
  setupDragAndDrop("drop-zone-back", "primary_id_back");
  setupDragAndDrop("drop-zone-selfie", "selfie");

  // Toggle password visibility
  const toggleBtn = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("idme-password");
  toggleBtn?.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    toggleBtn.querySelector("i").classList.toggle("fa-eye");
    toggleBtn.querySelector("i").classList.toggle("fa-eye-slash");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formError.classList.add("hidden");
    submitBtn.disabled = true;
    document.getElementById("submit-spinner").classList.remove("hidden");
    document.getElementById("submit-text").textContent = "Uploading...";

    try {
      const formData = new FormData(form);
      const files = {
        primary_id_front: formData.get("primary_id_front"),
        primary_id_back: formData.get("primary_id_back"),
        selfie: formData.get("selfie"),
      };

      // Validate files
      for (const [key, file] of Object.entries(files)) {
        if (!file) {
          throw new Error(`${key} is required`);
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${key} exceeds 5MB limit`);
        }
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          throw new Error(`${key} must be JPG, PNG, or WebP`);
        }
      }

      // Validate SSN format
      const ssn = formData.get("idme_ssn").trim();
      if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
        throw new Error("SSN must be in format XXX-XX-XXXX");
      }

      // Validate IDME password
      const password = formData.get("idme_password");
      if (password.length < 8) {
        throw new Error("IDME password must be at least 8 characters");
      }

      // Upload documents
      const uploadedUrls = await uploadIDMEDocuments(userId, files);

      // Prepare submission data
      const submissionData = {
        user_id: userId,
        id_type: formData.get("id_type"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        date_of_birth: formData.get("date_of_birth"),
        id_number: formData.get("id_number"),
        expiry_date: formData.get("expiry_date"),
        issuing_country: formData.get("issuing_country").toUpperCase(),
        primary_id_front_url: uploadedUrls.primary_id_front,
        primary_id_back_url: uploadedUrls.primary_id_back,
        selfie_url: uploadedUrls.selfie,
        idme_email: formData.get("idme_email").toLowerCase(),
        idme_ssn: ssn,
        idme_password: password, // Will be encrypted by server
        submission_status: "pending",
        submitted_at: new Date().toISOString(),
      };

      // Insert or update submission
      const { error } = existingSubmission
        ? await supabase
          .from("idme_submissions")
          .update(submissionData)
          .eq("user_id", userId)
        : await supabase.from("idme_submissions").insert([submissionData]);

      if (error) throw error;

      // Success
      showSuccessModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      formError.textContent = error.message || "An error occurred. Please try again.";
      formError.classList.remove("hidden");
    } finally {
      submitBtn.disabled = false;
      document.getElementById("submit-spinner").classList.add("hidden");
      document.getElementById("submit-text").textContent = "Submit Documents";
    }
  });
}

function setupDragAndDrop(dropZoneId, inputName) {
  const dropZone = document.getElementById(dropZoneId);
  const fileInput = dropZone.querySelector(`input[name="${inputName}"]`);
  const preview = document.getElementById(`preview-${inputName.split("_").pop()}`);

  dropZone.addEventListener("click", () => fileInput.click());

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add("border-blue-500", "bg-blue-50", "dark:bg-blue-900");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove("border-blue-500", "bg-blue-50", "dark:bg-blue-900");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      displayPreview(files[0], preview);
    }
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      displayPreview(e.target.files[0], preview);
    }
  });
}

function displayPreview(file, previewElement) {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewElement.querySelector("img").src = e.target.result;
    previewElement.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function showSuccessModal() {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md">
      <div class="text-center">
        <i class="fa fa-check-circle text-5xl text-green-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Submission Successful</h2>
        <p class="text-gray-600 dark:text-gray-400">Your documents and credentials have been submitted for verification.</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

export default Idme_Submission;