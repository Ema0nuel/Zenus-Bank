import { supabase } from "/src/utils/supabaseClient.js";

import AdminNavbar from "./components/AdminNavbar";
import { requireAdmin } from "./utils/adminAuth";
import { showToast } from "/src/components/toast";

const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_PROJECT_URL = "https://biyuydrbirwsbtnymakk.supabase.co";

const userDetails = async (userId) => {
  if (!(await requireAdmin())) return { html: "", pageEvents: () => {} };
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single();
  const { data: account } = await supabase.from("accounts").select("*").eq("user_id", userId).single();
  const { data: kyc } = await supabase.from("kyc_requests").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
  const { data: transactions } = await supabase.from("transactions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(10);

  let activeItem = "users";
  let isCollapsed = false;
  let isDark = localStorage.getItem("admin_dark") === "true";

  function UserInfoCard() {
    return `
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <div class="flex items-center gap-4">
          <img src="${profile?.avatar_url || '/default-user.png'}" class="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-slate-600" />
          <div>
            <div class="font-bold text-lg text-gray-900 dark:text-white">${profile?.full_name || "Unknown"}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">${profile?.email || ""}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">${profile?.phone || '-'}</div>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">Account Number</span>
            <span class="font-semibold text-gray-900 dark:text-white">${account?.account_number || '-'}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">Balance</span>
            <span class="font-semibold text-green-600 dark:text-green-400">$${account?.balance ?? '0.00'}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">Status</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${account?.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}">${account?.is_active ? "Active" : "Inactive"}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500 dark:text-gray-400 block">KYC</span>
            <span class="font-semibold text-gray-900 dark:text-white">${kyc?.status || "Not submitted"}</span>
            ${kyc?.created_at ? `<span class="text-xs text-gray-400 block">${kyc.created_at?.slice(0, 10)}</span>` : ""}
          </div>
        </div>
      </div>
    `;
  }

  function TransactionsTable() {
    return `
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mt-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Transactions</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-gray-800">
              ${(transactions || []).length ? transactions.map(t => `
                <tr class="hover:bg-gray-50 dark:hover:bg-slate-800">
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${t.created_at?.slice(0, 16).replace('T', ' ')}</td>
                  <td class="px-4 py-3 text-sm text-gray-900 dark:text-white capitalize">${t.type}</td>
                  <td class="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-white">$${parseFloat(t.amount || 0).toLocaleString()}</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${
                      t.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      t.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }">${t.status}</span>
                  </td>
                </tr>
              `).join("") : `
                <tr>
                  <td colspan="4" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No transactions found</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function AccountManagementCard() {
    return `
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mt-6">
        <h2 class="text-lg font-semibold mb-1 text-gray-900 dark:text-white">Account Management</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Change user email or password. Changes take effect immediately. No confirmation email sent.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Change Email -->
          <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <i class="fas fa-envelope text-blue-600"></i> Change Email
            </h3>
            <form id="admin-change-email-form">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Current Email</label>
              <input type="email" value="${profile?.email || ""}" disabled class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 text-sm" />
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">New Email</label>
              <input type="email" name="new_email" placeholder="user@newemail.com" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              <div id="admin-email-feedback" class="text-xs mb-2 hidden"></div>
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <i class="fas fa-save mr-1"></i> Update Email
              </button>
            </form>
          </div>
          <!-- Change Password -->
          <div class="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
              <i class="fas fa-lock text-green-600"></i> Change Password
            </h3>
            <form id="admin-change-password-form">
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">New Password</label>
              <input type="password" name="new_password" placeholder="Min 6 characters" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" required minlength="6" />
              <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Confirm Password</label>
              <input type="password" name="confirm_password" placeholder="Re-enter new password" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              <div id="admin-password-feedback" class="text-xs mb-2 hidden"></div>
              <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <i class="fas fa-save mr-1"></i> Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  function NotificationCard() {
    return `
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 mt-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Send Notification / Fund Account</h2>
        <form id="admin-action-form" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <input type="text" name="message" placeholder="Notification message to user" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fund Amount ($)</label>
            <input type="number" name="fund" placeholder="0.00" class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" min="0" step="0.01" />
          </div>
          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <i class="fas fa-paper-plane mr-1"></i> Send / Fund
          </button>
        </form>
      </div>
    `;
  }

  function render() {
    document.getElementById("app").innerHTML = `
      ${AdminNavbar({ activeItem, isCollapsed, isDark })}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-6 lg:p-8">
          <div class="max-w-5xl mx-auto">
            <div class="flex items-center gap-3 mb-6">
              <a href="/admin/users" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors text-xl">
                <i class="fas fa-arrow-left"></i>
              </a>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">User Details</h1>
            </div>
            ${UserInfoCard()}
            ${AccountManagementCard()}
            ${NotificationCard()}
            ${TransactionsTable()}
          </div>
        </div>
      </div>
    `;

    // Sidebar toggle for mobile
    const sidebar = document.getElementById("admin-sidebar");
    const overlay = document.getElementById("admin-sidebar-overlay");
    const openBtn = document.getElementById("admin-sidebar-toggle");
    const closeBtn = document.getElementById("admin-sidebar-close");

    function openSidebar() { isCollapsed = false; render(); }
    function closeSidebar() { isCollapsed = true; render(); }
    openBtn?.addEventListener("click", openSidebar);
    closeBtn?.addEventListener("click", closeSidebar);
    overlay?.addEventListener("click", closeSidebar);

    // Theme toggle
    document.getElementById("admin-theme-toggle")?.addEventListener("click", () => {
      isDark = !isDark;
      localStorage.setItem("admin_dark", isDark ? "true" : "false");
      if (isDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      render();
    });

    // Nav click
    document.querySelectorAll("[data-nav]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        activeItem = link.getAttribute("data-nav");
        window.location.href = `/admin/${activeItem}`;
      });
    });

    // Logout
    document.getElementById("admin-logout")?.addEventListener("click", () => {
      sessionStorage.removeItem('admin_logged_in');
      window.location.href = "/admin-login";
    });

    // Dark mode
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // --- Change Email ---
    document.getElementById("admin-change-email-form").onsubmit = async function (e) {
      e.preventDefault();
      const emailInput = this.new_email;
      const feedback = document.getElementById("admin-email-feedback");
      const newEmail = emailInput.value.trim();
      if (!newEmail) { showToast("Enter a new email address.", "error"); return; }

      feedback.className = "text-xs mb-2";
      feedback.classList.add("hidden");
      this.querySelector("button[type=submit]").disabled = true;
      this.querySelector("button[type=submit]").innerHTML = `<i class="fas fa-spinner fa-spin mr-1"></i> Updating...`;

      try {
        const res = await fetch(`${SUPABASE_PROJECT_URL}/auth/v1/admin/users/${userId}`, {
          method: "PUT",
          headers: {
            "apikey": SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: newEmail })
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.msg || err.error || "Failed to update email");
        }
        await supabase.from("profiles").update({ email: newEmail }).eq("id", userId);
        showToast("Email updated successfully.", "success");
        window.location.reload();
      } catch (err) {
        feedback.textContent = "Error: " + err.message;
        feedback.classList.remove("hidden", "text-green-600");
        feedback.classList.add("text-red-600");
        showToast(err.message, "error");
      }
      this.querySelector("button[type=submit]").disabled = false;
      this.querySelector("button[type=submit]").innerHTML = `<i class="fas fa-save mr-1"></i> Update Email`;
    };

    // --- Change Password ---
    document.getElementById("admin-change-password-form").onsubmit = async function (e) {
      e.preventDefault();
      const pw = this.new_password.value;
      const confirm = this.confirm_password.value;
      const feedback = document.getElementById("admin-password-feedback");

      if (pw !== confirm) { showToast("Passwords do not match.", "error"); return; }
      if (pw.length < 6) { showToast("Password must be at least 6 characters.", "error"); return; }

      feedback.className = "text-xs mb-2";
      feedback.classList.add("hidden");
      this.querySelector("button[type=submit]").disabled = true;
      this.querySelector("button[type=submit]").innerHTML = `<i class="fas fa-spinner fa-spin mr-1"></i> Updating...`;

      try {
        const res = await fetch(`${SUPABASE_PROJECT_URL}/auth/v1/admin/users/${userId}`, {
          method: "PUT",
          headers: {
            "apikey": SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password: pw })
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.msg || err.error || "Failed to update password");
        }
        showToast("Password updated successfully.", "success");
        this.new_password.value = "";
        this.confirm_password.value = "";
        feedback.textContent = "Password changed successfully.";
        feedback.classList.remove("hidden", "text-red-600");
        feedback.classList.add("text-green-600");
      } catch (err) {
        feedback.textContent = "Error: " + err.message;
        feedback.classList.remove("hidden", "text-green-600");
        feedback.classList.add("text-red-600");
        showToast(err.message, "error");
      }
      this.querySelector("button[type=submit]").disabled = false;
      this.querySelector("button[type=submit]").innerHTML = `<i class="fas fa-save mr-1"></i> Update Password`;
    };

    // --- Send Notification / Fund Account ---
    document.getElementById("admin-action-form").onsubmit = async function (e) {
      e.preventDefault();
      const msg = this.message.value.trim();
      const fund = parseFloat(this.fund.value);
      await supabase.from("notifications").insert([
        { user_id: userId, title: "Admin Message", message: msg, type: "info" }
      ]);
      if (fund > 0) {
        const { data: acc } = await supabase.from("accounts").select("*").eq("user_id", userId).single();
        if (acc) {
          const newBal = parseFloat(acc.balance) + fund;
          await supabase.from("accounts").update({ balance: newBal }).eq("id", acc.id);
          await supabase.from("transactions").insert([{
            account_id: acc.id,
            user_id: userId,
            type: "deposit",
            description: "Admin funding",
            amount: fund,
            balance_before: acc.balance,
            balance_after: newBal,
            status: "completed"
          }]);
        }
      }
      showToast("Action completed.", "success");
      window.location.reload();
    };
  }

  return {
    html: "",
    pageEvents: () => render()
  };
};
export default userDetails;
