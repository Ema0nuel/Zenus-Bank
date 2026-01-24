import { supabase } from "/src/utils/supabaseClient.js";
import AdminNavbar from "./components/AdminNavbar.js";
import { requireAdmin } from "./utils/adminAuth.js";
import { showToast } from "/src/components/toast.js";
import { sendEmail } from "/src/views/user/functions/Emailing/sendEmail.js";

// Helper: Format date
function formatDate(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

// Helper: Generate proper Supabase storage URL
function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;

  // Construct public URL directly from path
  const projectRef = "biyuydrbirwsbtnymakk";
  const bucket = "idme-documents";
  return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${path}`;
}

// Status badge with color coding
function statusBadge(status) {
  const badges = {
    pending: `<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Pending</span>`,
    under_review: `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Under Review</span>`,
    manual_review: `<span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">Manual Review</span>`,
    approved: `<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Approved</span>`,
    rejected: `<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Rejected</span>`,
    expired: `<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">Expired</span>`,
  };
  return badges[status] || badges.pending;
}

// ID Type Badge
function idTypeBadge(type) {
  const badges = {
    passport: `<span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Passport</span>`,
    drivers_license: `<span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Driver's License</span>`,
    national_id: `<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">National ID</span>`,
    visa: `<span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">Visa</span>`,
  };
  return badges[type] || `<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">${type}</span>`;
}

// IDME Submissions Table
function IDMETable(submissions, users) {
  return `
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="idme-search" placeholder="Search by name, email, ID number..." class="border dark:border-gray-700 dark:bg-slate-800 px-3 py-2 rounded w-full md:w-64" />
      <select id="idme-status-filter" class="border dark:border-gray-700 dark:bg-slate-800 px-2 py-2 rounded">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="under_review">Under Review</option>
        <option value="manual_review">Manual Review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="expired">Expired</option>
      </select>
      <button id="idme-export-csv" class="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition">Export CSV</button>
    </div>
    <div>
      <!-- Mobile Cards -->
      <div class="block md:hidden space-y-4">
        ${submissions.map(sub => {
    const user = users.find(u => u.id === sub.user_id);
    return `
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 animate-fade-in">
            <div class="flex justify-between items-start mb-3">
              <div>
                <p class="font-semibold text-gray-900 dark:text-white">${sub.first_name} ${sub.last_name}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">${user?.email || "N/A"}</p>
              </div>
              ${statusBadge(sub.submission_status)}
            </div>
            <div class="space-y-1 text-sm mb-3">
              <div><b>ID Type:</b> ${idTypeBadge(sub.id_type)}</div>
              <div><b>ID #:</b> ${sub.id_number}</div>
              <div><b>Submitted:</b> ${formatDate(sub.submitted_at)}</div>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">View Details</button>
              ${sub.submission_status === "pending" ? `
                <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Start Review</button>
              ` : ""}
              ${sub.submission_status === "manual_review" ? `
                <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Approve</button>
                <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Reject</button>
              ` : ""}
            </div>
          </div>
        `;
  }).join("")}
      </div>

      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-100 dark:bg-slate-800 border-b dark:border-gray-700">
            <tr>
              <th class="px-6 py-3 text-left font-semibold">Name</th>
              <th class="px-6 py-3 text-left font-semibold">Email</th>
              <th class="px-6 py-3 text-left font-semibold">ID Type</th>
              <th class="px-6 py-3 text-left font-semibold">ID Number</th>
              <th class="px-6 py-3 text-left font-semibold">Status</th>
              <th class="px-6 py-3 text-left font-semibold">Submitted</th>
              <th class="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody id="idme-table-body">
            ${submissions.map(sub => {
    const user = users.find(u => u.id === sub.user_id);
    return `
              <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-6 py-4 font-medium">${sub.first_name} ${sub.last_name}</td>
                <td class="px-6 py-4 text-sm">${user?.email || "N/A"}</td>
                <td class="px-6 py-4">${idTypeBadge(sub.id_type)}</td>
                <td class="px-6 py-4 text-sm font-mono">${sub.id_number}</td>
                <td class="px-6 py-4">${statusBadge(sub.submission_status)}</td>
                <td class="px-6 py-4 text-sm">${formatDate(sub.submitted_at)}</td>
                <td class="px-6 py-4 flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">View</button>
                  ${sub.submission_status === "pending" ? `
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Start Review</button>
                  ` : ""}
                  ${sub.submission_status === "manual_review" ? `
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Reject</button>
                  ` : ""}
                </td>
              </tr>
            `;
  }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Detailed Submission Modal with tab state
function IDMEDetailModal(submission, user) {
  return `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto" id="idme-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full my-8 animate-fade-in">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 class="text-2xl font-bold text-white">${submission.first_name} ${submission.last_name}</h2>
          <button id="close-idme-detail" class="text-white hover:text-blue-100 text-2xl font-bold">&times;</button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b dark:border-gray-700 px-6 overflow-x-auto">
          <button class="idme-detail-tab active px-0 py-3 border-b-2 border-blue-600 font-medium text-gray-900 dark:text-white mr-6 whitespace-nowrap" data-tab="overview">Overview</button>
          <button class="idme-detail-tab px-0 py-3 border-b-2 border-transparent font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 mr-6 whitespace-nowrap" data-tab="documents">Documents</button>
          <button class="idme-detail-tab px-0 py-3 border-b-2 border-transparent font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 whitespace-nowrap" data-tab="history">History</button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Overview Tab -->
          <div class="idme-detail-content active" data-tab="overview">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                <p class="font-medium text-gray-900 dark:text-white">${user?.email || "N/A"}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <p>${statusBadge(submission.submission_status)}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">ID Type</p>
                <p>${idTypeBadge(submission.id_type)}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">ID Number</p>
                <p class="font-mono text-gray-900 dark:text-white">${submission.id_number}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Date of Birth</p>
                <p class="text-gray-900 dark:text-white">${new Date(submission.date_of_birth).toLocaleDateString()}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Issuing Country</p>
                <p class="text-gray-900 dark:text-white">${submission.issuing_country}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Expiry Date</p>
                <p class="text-gray-900 dark:text-white">${new Date(submission.expiry_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Submitted</p>
                <p class="text-gray-900 dark:text-white">${formatDate(submission.submitted_at)}</p>
              </div>
            </div>

            ${submission.rejection_reason ? `
              <div class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p class="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">Rejection Reason</p>
                <p class="text-red-800 dark:text-red-300">${submission.rejection_reason}</p>
              </div>
            ` : ""}

            ${submission.submission_status === "manual_review" ? `
              <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded">
                <h3 class="font-bold text-yellow-900 dark:text-yellow-200 mb-4">Manual Review Required</h3>
                <div class="flex flex-wrap gap-3">
                  <button id="idme-approve-btn" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-sm transition">✓ Approve</button>
                  <button id="idme-reject-btn" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium text-sm transition">✕ Reject</button>
                </div>
              </div>
            ` : ""}
          </div>

          <!-- Documents Tab -->
          <div class="idme-detail-content hidden" data-tab="documents">
            <div id="idme-documents-loader" class="flex items-center justify-center py-12">
              <div class="flex flex-col items-center gap-4">
                <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading document images...</p>
              </div>
            </div>
            <div id="idme-documents-container" class="hidden grid grid-cols-1 md:grid-cols-3 gap-4"></div>
          </div>

          <!-- History Tab -->
          <div class="idme-detail-content hidden" data-tab="history">
            <div id="idme-history-container" class="space-y-3">
              <p class="text-gray-500">Loading history...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Rejection Reason Modal
function RejectReasonModal(submissionId) {
  return `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" id="reject-reason-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Reject Submission</h2>
        <form id="reject-reason-form">
          <input type="hidden" name="submission_id" value="${submissionId}" />
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for Rejection</label>
            <textarea name="reason" class="w-full border dark:border-gray-700 dark:bg-slate-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" rows="4" placeholder="e.g., Document unclear, ID expired, etc." required></textarea>
          </div>
          <div class="flex gap-3">
            <button type="submit" class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition">Reject</button>
            <button type="button" id="cancel-reject" class="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Start Review Modal
function StartReviewModal(submissionId) {
  return `
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" id="start-review-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">Start Manual Review</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4">This submission will be marked for manual review. Continue?</p>
        <div class="flex gap-3">
          <button id="confirm-start-review" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition" data-id="${submissionId}">Continue</button>
          <button id="cancel-start-review" class="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

// Export CSV function
function exportIDMECSV(submissions, users) {
  const header = ["Name", "Email", "ID Type", "ID Number", "Status", "Submitted Date"];
  const rows = submissions.map(sub => {
    const user = users.find(u => u.id === sub.user_id);
    return [
      `${sub.first_name} ${sub.last_name}`,
      user?.email || "",
      sub.id_type,
      sub.id_number,
      sub.submission_status,
      formatDate(sub.submitted_at)
    ].map(cell => `"${cell}"`).join(",");
  });
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `idme-submissions-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Valid enum values
const VALID_STATUSES = ["pending", "under_review", "manual_review", "approved", "rejected", "expired"];

const idmeAdmin = async () => {
  if (!(await requireAdmin())) return { html: "", pageEvents: () => { } };

  let { data: submissions = [] } = await supabase
    .from("idme_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  let { data: users = [] } = await supabase.from("profiles").select("id,email,full_name");

  let filteredSubmissions = submissions;
  let activeItem = "idme";
  let isCollapsed = false;
  let isDark = localStorage.getItem("admin_dark") === "true";
  let currentAdminId = (await supabase.auth.getSession()).data.session.user.id;

  function render() {
    document.getElementById("app").innerHTML = `
      ${AdminNavbar({ activeItem, isCollapsed, isDark })}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">ID.ME Verification Management</h1>
              <p class="text-gray-600 dark:text-gray-400 mt-1">Review and manage identity verification submissions</p>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${IDMETable(filteredSubmissions, users)}
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <div id="idme-detail-panel"></div>
      <div id="reject-panel"></div>
      <div id="start-review-panel"></div>
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    // Sidebar, theme, nav, logout
    const sidebar = document.getElementById("admin-sidebar");
    const overlay = document.getElementById("admin-sidebar-overlay");
    const openBtn = document.getElementById("admin-sidebar-toggle");
    const closeBtn = document.getElementById("admin-sidebar-close");

    function openSidebar() { isCollapsed = false; render(); }
    function closeSidebar() { isCollapsed = true; render(); }

    openBtn?.addEventListener("click", openSidebar);
    closeBtn?.addEventListener("click", closeSidebar);
    overlay?.addEventListener("click", closeSidebar);

    document.getElementById("admin-theme-toggle")?.addEventListener("click", () => {
      isDark = !isDark;
      localStorage.setItem("admin_dark", isDark ? "true" : "false");
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      render();
    });

    document.querySelectorAll("[data-nav]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        activeItem = link.getAttribute("data-nav");
        window.location.href = `/admin/${activeItem}`;
      });
    });

    document.getElementById("admin-logout")?.addEventListener("click", () => {
      sessionStorage.removeItem("admin_logged_in");
      window.location.href = "/admin-login";
    });

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Filtering
    const searchInput = document.getElementById("idme-search");
    const statusFilter = document.getElementById("idme-status-filter");

    function filterSubmissions() {
      const q = searchInput.value.trim().toLowerCase();
      const status = statusFilter.value;

      filteredSubmissions = submissions.filter(sub => {
        const user = users.find(u => u.id === sub.user_id);
        let match = true;

        if (q) {
          match = (
            `${sub.first_name} ${sub.last_name}`.toLowerCase().includes(q) ||
            user?.email?.toLowerCase().includes(q) ||
            sub.id_number?.toLowerCase().includes(q) ||
            sub.id_type?.toLowerCase().includes(q)
          );
        }

        if (status && sub.submission_status !== status) match = false;

        return match;
      });

      // Re-render table for mobile
      if (window.innerWidth < 768) {
        const mobileCards = document.querySelector(".block.md\\:hidden");
        if (mobileCards) {
          mobileCards.innerHTML = filteredSubmissions.map(sub => {
            const user = users.find(u => u.id === sub.user_id);
            return `
              <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 animate-fade-in">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">${sub.first_name} ${sub.last_name}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${user?.email || "N/A"}</p>
                  </div>
                  ${statusBadge(sub.submission_status)}
                </div>
                <div class="space-y-1 text-sm mb-3">
                  <div><b>ID Type:</b> ${idTypeBadge(sub.id_type)}</div>
                  <div><b>ID #:</b> ${sub.id_number}</div>
                  <div><b>Submitted:</b> ${formatDate(sub.submitted_at)}</div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">View Details</button>
                  ${sub.submission_status === "pending" ? `
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Start Review</button>
                  ` : ""}
                  ${sub.submission_status === "manual_review" ? `
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Reject</button>
                  ` : ""}
                </div>
              </div>
            `;
          }).join("");
          attachRowEvents();
        }
      } else {
        const tableBody = document.getElementById("idme-table-body");
        if (tableBody) {
          tableBody.innerHTML = filteredSubmissions.map(sub => {
            const user = users.find(u => u.id === sub.user_id);
            return `
              <tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
                <td class="px-6 py-4 font-medium">${sub.first_name} ${sub.last_name}</td>
                <td class="px-6 py-4 text-sm">${user?.email || "N/A"}</td>
                <td class="px-6 py-4">${idTypeBadge(sub.id_type)}</td>
                <td class="px-6 py-4 text-sm font-mono">${sub.id_number}</td>
                <td class="px-6 py-4">${statusBadge(sub.submission_status)}</td>
                <td class="px-6 py-4 text-sm">${formatDate(sub.submitted_at)}</td>
                <td class="px-6 py-4 flex flex-wrap gap-2">
                  <button class="idme-view bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">View</button>
                  ${sub.submission_status === "pending" ? `
                    <button class="idme-start-review bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Start Review</button>
                  ` : ""}
                  ${sub.submission_status === "manual_review" ? `
                    <button class="idme-approve bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Approve</button>
                    <button class="idme-reject bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition" data-id="${sub.id}">Reject</button>
                  ` : ""}
                </td>
              </tr>
            `;
          }).join("");
        }
        attachRowEvents();
      }
    }

    [searchInput, statusFilter].forEach(el => {
      if (el) {
        el.addEventListener("input", filterSubmissions);
        el.addEventListener("change", filterSubmissions);
      }
    });

    // Export CSV
    document.getElementById("idme-export-csv")?.addEventListener("click", () => {
      exportIDMECSV(filteredSubmissions, users);
    });

    attachRowEvents();
  }

  function attachRowEvents() {
    // View detail
    document.querySelectorAll(".idme-view").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const submission = submissions.find(s => s.id === id);
        const user = users.find(u => u.id === submission.user_id);

        const panelDiv = document.getElementById("idme-detail-panel");
        panelDiv.innerHTML = IDMEDetailModal(submission, user);

        // Close button
        document.getElementById("close-idme-detail")?.addEventListener("click", () => {
          panelDiv.innerHTML = "";
        });

        // Tab switching with lazy loading
        document.querySelectorAll(".idme-detail-tab").forEach(tab => {
          tab.addEventListener("click", async () => {
            const tabName = tab.getAttribute("data-tab");

            // Update tab styling
            document.querySelectorAll(".idme-detail-tab").forEach(t => {
              t.classList.remove("active", "border-blue-600");
              t.classList.add("border-transparent", "text-gray-600", "dark:text-gray-400");
            });
            document.querySelectorAll(".idme-detail-content").forEach(c => {
              c.classList.add("hidden");
            });

            tab.classList.add("active", "border-blue-600");
            tab.classList.remove("border-transparent", "text-gray-600", "dark:text-gray-400");

            const contentEl = document.querySelector(`.idme-detail-content[data-tab="${tabName}"]`);
            contentEl?.classList.remove("hidden");

            // Load content for specific tabs
            if (tabName === "documents") {
              await loadDocuments(submission);
            } else if (tabName === "history") {
              await loadHistory(submission.id);
            }
          });
        });

        // Approve button
        document.getElementById("idme-approve-btn")?.addEventListener("click", async () => {
          const notes = prompt("Approval notes (optional):") || "";
          await approveIDME(submission.id, submission.user_id, user.email, submission, notes);
          panelDiv.innerHTML = "";
        });

        // Reject button
        document.getElementById("idme-reject-btn")?.addEventListener("click", () => {
          const rejectDiv = document.getElementById("reject-panel");
          rejectDiv.innerHTML = RejectReasonModal(submission.id);

          document.getElementById("cancel-reject")?.addEventListener("click", () => {
            rejectDiv.innerHTML = "";
          });

          document.getElementById("reject-reason-form")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const reason = e.target.reason.value.trim();
            if (!reason) return showToast("Reason required", "error");

            await rejectIDME(submission.id, submission.user_id, user.email, submission, reason);
            rejectDiv.innerHTML = "";
            panelDiv.innerHTML = "";
          });
        });
      });
    });

    // Start review
    document.querySelectorAll(".idme-start-review").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const reviewDiv = document.getElementById("start-review-panel");
        reviewDiv.innerHTML = StartReviewModal(id);

        document.getElementById("confirm-start-review")?.addEventListener("click", async () => {
          await markForManualReview(id);
          reviewDiv.innerHTML = "";
        });

        document.getElementById("cancel-start-review")?.addEventListener("click", () => {
          reviewDiv.innerHTML = "";
        });
      });
    });

    // Approve from overview
    document.querySelectorAll(".idme-approve").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const submission = submissions.find(s => s.id === id);
        const user = users.find(u => u.id === submission.user_id);
        const notes = prompt("Approval notes (optional):") || "";
        await approveIDME(submission.id, submission.user_id, user.email, submission, notes);
      });
    });

    // Reject from overview
    document.querySelectorAll(".idme-reject").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const rejectDiv = document.getElementById("reject-panel");
        rejectDiv.innerHTML = RejectReasonModal(id);

        document.getElementById("cancel-reject")?.addEventListener("click", () => {
          rejectDiv.innerHTML = "";
        });

        document.getElementById("reject-reason-form")?.addEventListener("submit", async (e) => {
          e.preventDefault();
          const reason = e.target.reason.value.trim();
          if (!reason) return showToast("Reason required", "error");

          const submission = submissions.find(s => s.id === id);
          const user = users.find(u => u.id === submission.user_id);
          await rejectIDME(id, submission.user_id, user.email, submission, reason);
          rejectDiv.innerHTML = "";
        });
      });
    });
  }

  async function loadDocuments(submission) {
    const loaderEl = document.getElementById("idme-documents-loader");
    const containerEl = document.getElementById("idme-documents-container");

    if (!loaderEl || !containerEl) return;

    // Show loader, hide container
    loaderEl.classList.remove("hidden");
    containerEl.classList.add("hidden");

    try {
      // Simulate slight delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const docs = [
        { url: submission.primary_id_front_url, label: "ID Front", key: "front" },
        { url: submission.primary_id_back_url, label: "ID Back", key: "back" },
        { url: submission.selfie_url, label: "Selfie", key: "selfie" }
      ];

      containerEl.innerHTML = docs.map(doc => {
        if (doc.url) {
          return `
            <div class="border dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src="${getImageUrl(doc.url)}" 
                alt="${doc.label}" 
                class="w-full h-48 object-cover"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage not available%3C/text%3E%3C/svg%3E'"
              >
              <div class="p-3 bg-gray-50 dark:bg-slate-800">
                <p class="text-sm font-medium">${doc.label}</p>
                <a href="${getImageUrl(doc.url)}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 text-xs mt-1 inline-block">↗ View Full Size</a>
              </div>
            </div>
          `;
        } else {
          return `<div class="border-2 border-dashed dark:border-gray-700 rounded-lg p-8 text-center text-gray-500 bg-gray-50 dark:bg-slate-800/50">${doc.label}: Not uploaded</div>`;
        }
      }).join("");

      // Hide loader, show container
      loaderEl.classList.add("hidden");
      containerEl.classList.remove("hidden");
    } catch (error) {
      console.error("Error loading documents:", error);
      containerEl.innerHTML = `<div class="col-span-full text-center text-red-600">Error loading documents</div>`;
      loaderEl.classList.add("hidden");
      containerEl.classList.remove("hidden");
    }
  }

  async function loadHistory(submissionId) {
    const historyContainer = document.getElementById("idme-history-container");
    if (!historyContainer) return;

    try {
      const submission = submissions.find(s => s.id === submissionId);
      if (!submission) return;

      const timeline = [];

      // Build timeline events
      timeline.push({
        time: submission.submitted_at,
        event: "Submission Created",
        color: "blue"
      });

      if (submission.updated_at && submission.updated_at !== submission.submitted_at) {
        timeline.push({
          time: submission.updated_at,
          event: "Last Updated",
          color: "orange"
        });
      }

      if (submission.reviewed_at) {
        const reviewedByUser = users.find(u => u.id === submission.reviewed_by);
        timeline.push({
          time: submission.reviewed_at,
          event: `Reviewed by ${reviewedByUser?.full_name || "Admin"}`,
          color: submission.submission_status === "approved" ? "green" : "red"
        });
      }

      historyContainer.innerHTML = `
        <div class="space-y-3">
          ${timeline.map(entry => `
            <div class="flex items-center gap-3 p-3 border-l-4 border-${entry.color}-500 bg-${entry.color}-50 dark:bg-${entry.color}-900/20 rounded">
              <span class="text-xs text-gray-500 whitespace-nowrap">${formatDate(entry.time)}</span>
              <span class="font-medium text-gray-900 dark:text-white">${entry.event}</span>
            </div>
          `).join("")}
        </div>
      `;
    } catch (error) {
      console.error("Error loading history:", error);
      historyContainer.innerHTML = `<p class="text-red-600">Error loading history</p>`;
    }
  }

  async function markForManualReview(submissionId) {
    try {
      const newStatus = "manual_review";

      if (!VALID_STATUSES.includes(newStatus)) {
        throw new Error(`Invalid status: ${newStatus}`);
      }

      const { error } = await supabase
        .from("idme_submissions")
        .update({
          submission_status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", submissionId);

      if (error) throw error;

      showToast("✓ Submission marked for manual review", "success");
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      showToast("Error: " + (error.message || "Failed"), "error");
    }
  }

  async function approveIDME(submissionId, userId, userEmail, submission, notes) {
    try {
      const newStatus = "approved";

      if (!VALID_STATUSES.includes(newStatus)) {
        throw new Error(`Invalid status: ${newStatus}`);
      }

      const { error } = await supabase
        .from("idme_submissions")
        .update({
          submission_status: newStatus,
          reviewed_at: new Date().toISOString(),
          reviewed_by: currentAdminId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", submissionId);

      if (error) throw error;

      await sendEmail({
        to: userEmail,
        subject: "Identity Verification Approved",
        html: `
          <p>Dear ${submission.first_name} ${submission.last_name},</p>
          <p>Your identity verification submission has been <strong>approved</strong>.</p>
          <ul>
            <li><strong>ID Type:</strong> ${submission.id_type.replace(/_/g, " ")}</li>
            <li><strong>ID Number:</strong> ${submission.id_number}</li>
            <li><strong>Status:</strong> Approved</li>
            ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ""}
          </ul>
          <p>You can now proceed with full account functionality.</p>
          <p>Best regards,<br>Zenus Bank Verification Team</p>
        `,
      });

      showToast("✓ Submission approved and user notified", "success");
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      showToast("Error: " + (error.message || "Failed"), "error");
    }
  }

  async function rejectIDME(submissionId, userId, userEmail, submission, reason) {
    try {
      const newStatus = "rejected";

      if (!VALID_STATUSES.includes(newStatus)) {
        throw new Error(`Invalid status: ${newStatus}`);
      }

      const { error } = await supabase
        .from("idme_submissions")
        .update({
          submission_status: newStatus,
          rejection_reason: reason,
          reviewed_at: new Date().toISOString(),
          reviewed_by: currentAdminId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", submissionId);

      if (error) throw error;

      await sendEmail({
        to: userEmail,
        subject: "Identity Verification Rejected",
        html: `
          <p>Dear ${submission.first_name} ${submission.last_name},</p>
          <p>Your identity verification submission has been <strong>rejected</strong> and will need to be resubmitted.</p>
          <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 12px; margin: 16px 0;">
            <strong style="color: #991b1b;">Reason:</strong>
            <p style="color: #7f1d1d; margin: 8px 0 0 0;">${reason}</p>
          </div>
          <p>Please review the rejection reason and resubmit with the necessary corrections.</p>
          <p>Best regards,<br>Zenus Bank Verification Team</p>
        `,
      });

      showToast("✓ Submission rejected and user notified", "success");
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      showToast("Error: " + (error.message || "Failed"), "error");
    }
  }

  return {
    html: "",
    pageEvents: () => render(),
  };
};

export default idmeAdmin;