import { supabase } from "/src/utils/supabaseClient.js";
import AdminNavbar from "./components/AdminNavbar.js";
import { requireAdmin } from "./utils/adminAuth.js";
import { showToast } from "/src/components/toast.js";
import { sendEmail } from "/src/views/user/functions/Emailing/sendEmail.js";
import { signupUser } from "/src/views/user/functions/signupHandler.js";

const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_PROJECT_URL = "https://ifodbqygscdsxxlxfjxw.supabase.co";
async function deleteSupabaseUser(user_id) {
  const res = await fetch(`${SUPABASE_PROJECT_URL}/auth/v1/admin/users/${user_id}`, {
    method: "DELETE",
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json"
    }
  });
  return res.ok;
}

function Spinner() {
  return `<div class="flex justify-center items-center py-16">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>`;
}

function formatDate(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
function statusIcon(status) {
  if (status === "active" || status === true) return `<span title="Active" class="text-green-600 text-lg">●</span>`;
  if (status === "suspended" || status === false) return `<span title="Suspended" class="text-red-600 text-lg">●</span>`;
  return `<span title="Pending" class="text-yellow-600 text-lg">●</span>`;
}

function UserFormModal({ mode, user = {} }) {
  return `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" style="backdrop-filter: blur(2px)">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto p-6 relative">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-user-form">&times;</button>
        <h2 class="text-xl font-bold mb-4">${mode === "edit" ? "Edit" : "Create"} User Profile</h2>
        <form id="user-form">
          <input type="hidden" name="id" value="${user.id || ""}">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs mb-1">Full Name</label>
              <input type="text" name="full_name" class="w-full border px-2 py-1 rounded" value="${user.full_name || ""}" required>
            </div>
            <div>
              <label class="block text-xs mb-1">Title</label>
              <input type="text" name="title" class="w-full border px-2 py-1 rounded" value="${user.title || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">First Name</label>
              <input type="text" name="firstname" class="w-full border px-2 py-1 rounded" value="${user.firstname || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Last Name</label>
              <input type="text" name="lastname" class="w-full border px-2 py-1 rounded" value="${user.lastname || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Phone</label>
              <input type="text" name="phone" class="w-full border px-2 py-1 rounded" value="${user.phone || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Country Code</label>
              <input type="text" name="country_code" class="w-full border px-2 py-1 rounded" value="${user.country_code || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Nationality</label>
              <input type="text" name="nationality" class="w-full border px-2 py-1 rounded" value="${user.nationality || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Address</label>
              <input type="text" name="address" class="w-full border px-2 py-1 rounded" value="${user.address || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">City</label>
              <input type="text" name="city" class="w-full border px-2 py-1 rounded" value="${user.city || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">State</label>
              <input type="text" name="state" class="w-full border px-2 py-1 rounded" value="${user.state || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Zip</label>
              <input type="text" name="zip" class="w-full border px-2 py-1 rounded" value="${user.zip || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">DOB</label>
              <input type="date" name="dob" class="w-full border px-2 py-1 rounded" value="${user.dob || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Occupation</label>
              <input type="text" name="occupation" class="w-full border px-2 py-1 rounded" value="${user.occupation || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">SSN</label>
              <input type="text" name="ssn" class="w-full border px-2 py-1 rounded" value="${user.ssn || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Marital Status</label>
              <input type="text" name="marital_status" class="w-full border px-2 py-1 rounded" value="${user.marital_status || ""}">
            </div>
            <div>
              <label class="block text-xs mb-1">Gender</label>
              <select name="gender" class="w-full border px-2 py-1 rounded">
                <option value="">Select</option>
                <option value="Male" ${user.gender === "Male" ? "selected" : ""}>Male</option>
                <option value="Female" ${user.gender === "Female" ? "selected" : ""}>Female</option>
                <option value="Other" ${user.gender === "Other" ? "selected" : ""}>Other</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1">Account Type</label>
              <select name="account_type" class="w-full border px-2 py-1 rounded">
                <option value="">Select</option>
                <option value="USD SAVING" ${user.account_type === "USD SAVING" ? "selected" : ""}>USD SAVING</option>
                <option value="USD CURRENT" ${user.account_type === "USD CURRENT" ? "selected" : ""}>USD CURRENT</option>
                <option value="MONEY MARKET" ${user.account_type === "MONEY MARKET" ? "selected" : ""}>MONEY MARKET</option>
                <option value="IRA" ${user.account_type === "IRA" ? "selected" : ""}>IRA</option>
                <option value="INVESTMENT ACCOUNT" ${user.account_type === "INVESTMENT ACCOUNT" ? "selected" : ""}>INVESTMENT ACCOUNT</option>
              </select>
            </div>
            <div>
              <label class="block text-xs mb-1">Status</label>
              <select name="is_active" class="w-full border px-2 py-1 rounded">
                <option value="true" ${user.is_active ? "selected" : ""}>Active</option>
                <option value="false" ${user.is_active === false ? "selected" : ""}>Suspended</option>
              </select>
            </div>
            ${mode === "create" ? `
            <div class="md:col-span-2">
              <label class="block text-xs mb-1">Email</label>
              <input type="email" name="email" class="w-full border px-2 py-1 rounded" required>
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs mb-1">Password</label>
              <input type="password" name="password" class="w-full border px-2 py-1 rounded" required>
            </div>
            ` : `
            <div class="md:col-span-2">
              <label class="block text-xs mb-1">Email</label>
              <input type="email" name="email" class="w-full border px-2 py-1 rounded bg-gray-100 dark:bg-slate-800" value="${user.email || ""}" disabled>
            </div>
            `}
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs mb-1">Fiat Balance</label>
            <input type="number" name="balance" step="0.01" class="w-full border px-2 py-1 rounded" value="${user.balance || 0}">
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs mb-1">Mortgage Balance</label>
            <input type="number" name="mortgage" step="0.01" class="w-full border px-2 py-1 rounded" value="${user.mortgage || 0}">
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs mb-1">Loan Balance</label>
            <input type="number" name="loan" step="0.01" class="w-full border px-2 py-1 rounded" value="${user.loan || 0}">
          </div>
          <div class="md:col-span-2">
            <h3 class="text-sm font-bold mb-2">Crypto Balances</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs mb-1">BTC Balance</label>
                <input type="number" name="btc_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${user.btc_balance || 0}">
              </div>
              <div>
                <label class="block text-xs mb-1">ETH Balance</label>
                <input type="number" name="eth_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${user.eth_balance || 0}">
              </div>
              <div>
                <label class="block text-xs mb-1">USDT Balance</label>
                <input type="number" name="usdt_balance" step="0.000001" class="w-full border px-2 py-1 rounded" value="${user.usdt_balance || 0}">
              </div>
              <div>
                <label class="block text-xs mb-1">USDC Balance</label>
                <input type="number" name="usdc_balance" step="0.000001" class="w-full border px-2 py-1 rounded" value="${user.usdc_balance || 0}">
              </div>
              <div>
                <label class="block text-xs mb-1">BNB Balance</label>
                <input type="number" name="bnb_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${user.bnb_balance || 0}">
              </div>
              <div>
                <label class="block text-xs mb-1">SOL Balance</label>
                <input type="number" name="sol_balance" step="0.00000001" class="w-full border px-2 py-1 rounded" value="${user.sol_balance || 0}">
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <button type="button" class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded mr-2" id="cancel-user-form">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded">${mode === "edit" ? "Save Changes" : "Create Profile"}</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function UsersTable(users) {
  return `
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Account Type</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fiat Balance</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Mortgage</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Loan</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Crypto</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          ${users.map(user => `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4">${user.full_name}</td>
              <td class="px-6 py-4">${user.email}</td>
              <td class="px-6 py-4">${user.account_type}</td>
              <td class="px-6 py-4 text-right">$${parseFloat(user.balance).toLocaleString()}</td>
              <td class="px-6 py-4 text-right">$${parseFloat(user.mortgage || 0).toLocaleString()}</td>
              <td class="px-6 py-4 text-right">$${parseFloat(user.loan || 0).toLocaleString()}</td>
              <td class="px-6 py-4 text-right">
                ${user.btc_balance > 0 ? `${user.btc_balance} BTC<br>` : ""}
                ${user.eth_balance > 0 ? `${user.eth_balance} ETH<br>` : ""}
                ${user.usdt_balance > 0 ? `${user.usdt_balance} USDT` : ""}
              </td>
              <td class="px-6 py-4 text-center">${statusIcon(user.is_active)}</td>
              <td class="px-6 py-4 text-center">
                <button class="user-edit text-blue-600 dark:text-blue-400 hover:text-blue-800 mx-2" data-id="${user.id}">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="user-delete text-red-600 dark:text-red-400 hover:text-red-800 mx-2" data-id="${user.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

const users = async () => {
  if (!(await requireAdmin())) return { html: "", pageEvents: () => { } };

  let activeItem = "users";
  let isCollapsed = false;
  let isDark = localStorage.getItem("admin_dark") === "true";

  let { data: profiles = [] } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  let { data: accounts = [] } = await supabase.from("accounts").select("*");
  let { data: crypto_balances = [] } = await supabase.from("crypto_balances").select("*");

  let usersArr = profiles.map(u => {
    const acc = accounts.find(a => a.user_id === u.id) || {};
    const crypto = crypto_balances.find(c => c.user_id === u.id) || {};
    return {
      ...u,
      account_type: acc.account_type || "-",
      account_id: acc.id,
      is_active: acc.is_active !== false && u.is_active !== false,
      balance: parseFloat(acc.balance || 0).toFixed(2),
      mortgage: parseFloat(acc.mortgage || 0).toFixed(2),
      loan: parseFloat(acc.loan || 0).toFixed(2),
      btc_balance: parseFloat(crypto.btc_balance || 0).toFixed(8),
      eth_balance: parseFloat(crypto.eth_balance || 0).toFixed(8),
      usdt_balance: parseFloat(crypto.usdt_balance || 0).toFixed(6),
      usdc_balance: parseFloat(crypto.usdc_balance || 0).toFixed(6),
      bnb_balance: parseFloat(crypto.bnb_balance || 0).toFixed(8),
      sol_balance: parseFloat(crypto.sol_balance || 0).toFixed(8)
    };
  });

  let filteredUsers = usersArr;

  function render() {
    document.getElementById("app").innerHTML = `
    ${AdminNavbar({ activeItem, isCollapsed, isDark })}
    <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
      <div class="p-4 md:p-8">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl font-bold mb-6">User Management</h1>
          <div class="flex justify-end mb-4">
            <button id="add-user-btn" class="hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-plus mr-2"></i> Add User
            </button>
          </div>
          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
            ${UsersTable(filteredUsers)}
          </div>
        </div>
      </div>
    </div>
    <div id="user-modal-panel"></div>
  `;

    // Sidebar toggle for mobile
    const sidebar = document.getElementById("admin-sidebar");
    const overlay = document.getElementById("admin-sidebar-overlay");
    const openBtn = document.getElementById("admin-sidebar-toggle");
    const closeBtn = document.getElementById("admin-sidebar-close");

    openBtn?.addEventListener("click", () => { isCollapsed = false; render(); });
    closeBtn?.addEventListener("click", () => { isCollapsed = true; render(); });
    overlay?.addEventListener("click", () => { isCollapsed = true; render(); });

    // Theme toggle logic
    document.getElementById("admin-theme-toggle")?.addEventListener("click", () => {
      isDark = !isDark;
      localStorage.setItem("admin_dark", isDark ? "true" : "false");
      document.documentElement.classList.toggle("dark", isDark);
      render();
    });

    document.getElementById("admin-theme-toggle-desktop")?.addEventListener("click", () => {
      isDark = !isDark;
      localStorage.setItem("admin_dark", isDark ? "true" : "false");
      document.documentElement.classList.toggle("dark", isDark);
      render();
    });

    // Search
    document.getElementById("user-search")?.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      filteredUsers = usersArr.filter(u =>
        (u.full_name && u.full_name.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q))
      );
      render();
    });

    // Add user
    document.getElementById("add-user-btn")?.addEventListener("click", () => {
      document.getElementById("user-modal-panel").innerHTML = UserFormModal({ mode: "create" });
      document.getElementById("close-user-form").onclick = () => {
        document.getElementById("user-modal-panel").innerHTML = "";
      };
      document.getElementById("cancel-user-form").onclick = () => {
        document.getElementById("user-modal-panel").innerHTML = "";
      };
      document.getElementById("user-form").onsubmit = async function (e) {
        e.preventDefault();
        document.getElementById("user-modal-panel").innerHTML += Spinner();
        const formData = Object.fromEntries(new FormData(this));
        try {
          await signupUser(formData, "admin");
          showToast("User created!", "success");
          location.reload();
        } catch (err) {
          showToast(err.message, "error");
          document.querySelector(".flex.justify-center.items-center.py-16")?.remove();
        }
      };
    });

    // Edit user
    document.querySelectorAll(".user-edit").forEach(btn => {
      btn.onclick = () => {
        const user = usersArr.find(u => u.id === btn.dataset.id);
        document.getElementById("user-modal-panel").innerHTML = UserFormModal({ mode: "edit", user });
        document.getElementById("close-user-form").onclick = () => {
          document.getElementById("user-modal-panel").innerHTML = "";
        };
        document.getElementById("cancel-user-form").onclick = () => {
          document.getElementById("user-modal-panel").innerHTML = "";
        };
        document.getElementById("user-form").onsubmit = async function (e) {
          e.preventDefault();
          document.getElementById("user-modal-panel").innerHTML += Spinner();
          const formData = Object.fromEntries(new FormData(this));
          try {
            await supabase.from("profiles").update({
              full_name: formData.full_name,
              title: formData.title,
              firstname: formData.firstname,
              lastname: formData.lastname,
              phone: formData.phone,
              country_code: formData.country_code,
              nationality: formData.nationality,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
              dob: formData.dob,
              occupation: formData.occupation,
              ssn: formData.ssn,
              marital_status: formData.marital_status,
              gender: formData.gender
            }).eq("id", user.id);

            await supabase.from("accounts").update({
              account_type: formData.account_type,
              is_active: formData.is_active === "true",
              balance: parseFloat(formData.balance) || 0,
              mortgage: parseFloat(formData.mortgage) || 0,
              loan: parseFloat(formData.loan) || 0
            }).eq("user_id", user.id);

            // Fetch the existing crypto_balances row for this user/account
            const { data: existingCrypto } = await supabase
              .from("crypto_balances")
              .select("id")
              .eq("user_id", user.id)
              .eq("account_id", user.account_id)
              .single();

            // Use the existing id if present, otherwise let Supabase generate one
            await supabase.from("crypto_balances").upsert([{
              id: existingCrypto?.id,
              user_id: user.id,
              account_id: user.account_id,
              btc_balance: parseFloat(formData.btc_balance) || 0,
              eth_balance: parseFloat(formData.eth_balance) || 0,
              usdt_balance: parseFloat(formData.usdt_balance) || 0,
              usdc_balance: parseFloat(formData.usdc_balance) || 0,
              bnb_balance: parseFloat(formData.bnb_balance) || 0,
              sol_balance: parseFloat(formData.sol_balance) || 0
            }]);
            await sendEmail({
              to: user.email,
              subject: "Profile Updated",
              html: `<p>Hello <b>${formData.full_name}</b>,<br>Your profile was updated by an admin.</p>`
            });
            showToast("Profile updated!", "success");
            location.reload();
          } catch (err) {
            showToast(err.message, "error");
            document.querySelector(".flex.justify-center.items-center.py-16")?.remove();
          }
        };
      };
    });

    // Delete user
    document.querySelectorAll(".user-delete").forEach(btn => {
      btn.onclick = async () => {
        const user = usersArr.find(u => u.id === btn.dataset.id);
        if (!confirm(`Delete ${user.full_name}? This cannot be undone.`)) return;
        document.getElementById("user-modal-panel").innerHTML += Spinner();
        try {
          await supabase.from("login_otps").delete().eq("user_id", user.id);
          await supabase.from("crypto_balances").delete().eq("user_id", user.id);
          await supabase.from("accounts").delete().eq("user_id", user.id);
          await supabase.from("profiles").delete().eq("id", user.id);
          await deleteSupabaseUser(user.id);
          await sendEmail({
            to: user.email,
            subject: "Profile Deleted",
            html: `<p>Hello <b>${user.full_name}</b>,<br>Your profile has been deleted by an admin.</p>`
          });
          showToast("Profile deleted!", "success");
          location.reload();
        } catch (err) {
          showToast("Failed to delete user: " + err.message, "error");
          document.querySelector(".flex.justify-center.items-center.py-16")?.remove();
        }
      };
    });

    document.documentElement.classList.toggle("dark", isDark);
  }

  return {
    html: "",
    pageEvents: () => render()
  };
};

export default users;