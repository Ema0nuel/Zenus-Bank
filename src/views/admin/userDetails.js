import { supabase } from "/src/utils/supabaseClient.js";

import AdminNavbar from "./components/AdminNavbar";
import { requireAdmin } from "./utils/adminAuth";
import { showToast } from "/src/components/toast";

const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_PROJECT_URL = "https://biyuydrbirwsbtnymakk.supabase.co";

const userDetails = async (userId) => {
  if (!(await requireAdmin())) return;
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single();
  const { data: account } = await supabase.from("accounts").select("*").eq("user_id", userId).single();
  const { data: kyc } = await supabase.from("kyc_requests").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).single();
  const { data: transactions } = await supabase.from("transactions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(10);

  return {
    html: `
      ${AdminNavbar("users")}
      <div class="pt-20 px-8">
        <h1 class="text-xl font-bold mb-4">User Details</h1>
        <div class="bg-white rounded shadow p-4 mb-4">
          <div class="flex items-center gap-4">
            <img src="${profile.avatar_url || '/default-user.png'}" class="w-16 h-16 rounded-full border" />
            <div>
              <div class="font-bold">${profile.full_name}</div>
              <div class="text-xs text-gray-500">${profile.email}</div>
              <div class="text-xs">${profile.phone || '-'}</div>
            </div>
          </div>
          <div class="mt-4">
            <div><b>Account Number:</b> ${account?.account_number || '-'}</div>
            <div><b>Balance:</b> $${account?.balance ?? '0.00'}</div>
            <div><b>Status:</b> ${account?.is_active ? "Active" : "Inactive"}</div>
          </div>
        </div>
        <div class="bg-white rounded shadow p-4 mb-4">
          <h2 class="font-semibold mb-2">KYC Status</h2>
          <div>${kyc?.status || "Not submitted"}</div>
          <div class="text-xs text-gray-500">${kyc?.created_at || ""}</div>
        </div>
        <div class="bg-white rounded shadow p-4">
          <h2 class="font-semibold mb-2">Recent Transactions</h2>
          <table class="min-w-full text-xs">
            <thead>
              <tr>
                <th>Date</th><th>Type</th><th>Amount</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${(transactions || []).map(t => `
                <tr>
                  <td>${t.created_at?.slice(0, 16).replace('T', ' ')}</td>
                  <td>${t.type}</td>
                  <td>$${t.amount}</td>
                  <td>${t.status}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
        <!-- Account Management -->
        <div class="bg-white rounded shadow p-4 mt-4">
          <h2 class="font-semibold mb-2">Account Management</h2>
          <p class="text-xs text-gray-500 mb-3">Change user email or password. Changes take effect immediately. No confirmation email sent.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Change Email -->
            <div>
              <h3 class="text-sm font-semibold mb-2 flex items-center gap-1">
                <i class="fas fa-envelope text-blue-600"></i> Change Email
              </h3>
              <form id="admin-change-email-form">
                <label class="block text-xs mb-1">Current Email</label>
                <input type="email" value="${profile.email}" disabled class="border rounded px-2 py-1 w-full mb-2 bg-gray-100 dark:bg-slate-700 text-sm" />
                <label class="block text-xs mb-1">New Email</label>
                <input type="email" name="new_email" placeholder="user@newemail.com" class="border rounded px-2 py-1 w-full mb-2 text-sm" required />
                <div id="admin-email-feedback" class="text-xs mb-2 hidden"></div>
                <button type="submit" class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm transition-colors">
                  <i class="fas fa-save mr-1"></i> Update Email
                </button>
              </form>
            </div>
            <!-- Change Password -->
            <div>
              <h3 class="text-sm font-semibold mb-2 flex items-center gap-1">
                <i class="fas fa-lock text-green-600"></i> Change Password
              </h3>
              <form id="admin-change-password-form">
                <label class="block text-xs mb-1">New Password</label>
                <input type="password" name="new_password" placeholder="Min 6 characters" class="border rounded px-2 py-1 w-full mb-2 text-sm" required minlength="6" />
                <label class="block text-xs mb-1">Confirm Password</label>
                <input type="password" name="confirm_password" placeholder="Re-enter new password" class="border rounded px-2 py-1 w-full mb-2 text-sm" required />
                <div id="admin-password-feedback" class="text-xs mb-2 hidden"></div>
                <button type="submit" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-sm transition-colors">
                  <i class="fas fa-save mr-1"></i> Update Password
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="bg-white rounded shadow p-4 mt-4">
          <h2 class="font-semibold mb-2">Send Notification / Fund Account</h2>
          <form id="admin-action-form" class="space-y-2">
            <input type="hidden" name="user_id" value="${userId}" />
            <label>Message</label>
            <input type="text" name="message" class="border rounded px-2 py-1 w-full" required />
            <label>Fund Amount ($)</label>
            <input type="number" name="fund" class="border rounded px-2 py-1 w-full" min="0" step="0.01" />
            <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded">Send / Fund</button>
          </form>
        </div>
      </div>
    `,
    pageEvents: () => {
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
          // Also update profiles table
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

      document.getElementById("admin-action-form").onsubmit = async function (e) {
        e.preventDefault();
        const msg = this.message.value.trim();
        const fund = parseFloat(this.fund.value);
        // Send notification
        await supabase.from("notifications").insert([
          { user_id: userId, title: "Admin Message", message: msg, type: "info" }
        ]);
        // Fund account if amount > 0
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
  };
};
export default userDetails;




