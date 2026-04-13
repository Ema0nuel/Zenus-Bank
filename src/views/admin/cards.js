import { supabase } from "/src/utils/supabaseClient.js";
import AdminNavbar from "./components/AdminNavbar.js";
import { requireAdmin } from "./utils/adminAuth.js";
import { showToast } from "/src/components/toast.js";
import { sendEmail } from "/src/views/user/functions/Emailing/sendEmail.js";
import { getStatusBadge, canUpdateCardStatus } from "/src/utils/cardStatus.js";

// Helper: Format date
function formatDate(dt) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function statusBadge(status) {
  // Display actual card status from database
  return getStatusBadge(status || 'pending');
}

// Responsive Card Table (cards on mobile, table on desktop)
function CardTable(cards, users) {
  return `
    <div class="mb-4 flex flex-wrap gap-2 items-center">
      <input type="text" id="card-search" placeholder="Search by user, card number, type..." class="border px-3 py-2 rounded w-full md:w-64" />
      <button id="card-export-csv" class="ml-auto bg-blue-600 text-white px-3 py-2 rounded">Export CSV</button>
    </div>
    <div>
      <div class="block md:hidden">
        ${cards.map(c => {
    const user = users.find(u => u.id === c.user_id);
    return `
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${user?.full_name || "Unknown"}</span>
                ${statusBadge(c.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${user?.email || ""}</div>
              <div class="mb-1"><b>Card Number:</b> ${c.card_number || "-"}</div>
              <div class="mb-1"><b>Type:</b> ${c.card_type || "-"}</div>
              <div class="mb-1"><b>Expiry:</b> ${c.expiry_date || "-"}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${c.id}">View Details</button>
                ${canUpdateCardStatus(c.status) ? `
                <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${c.id}">Mark Approved</button>
                <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${c.id}">Mark Declined</button>
                ` : ''}
              </div>
            </div>
          `;
  }).join("")}
      </div>
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full text-xs">
          <thead>
            <tr>
              <th>User</th>
              <th>Card Number</th>
              <th>Type</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="card-table-body">
            ${cards.map(c => {
    const user = users.find(u => u.id === c.user_id);
    return `
                <tr>
                  <td>
                    <span class="font-semibold">${user?.full_name || "Unknown"}</span>
                    <div class="text-xs text-gray-400">${user?.email || ""}</div>
                  </td>
                  <td>${c.card_number || "-"}</td>
                  <td>${c.card_type || "-"}</td>
                  <td>${c.expiry_date || "-"}</td>
                  <td>${statusBadge(c.status)}</td>
                  <td>
                    <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${c.id}">View</button>
                    ${canUpdateCardStatus(c.status) ? `
                    <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${c.id}">Approve</button>
                    <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${c.id}">Decline</button>
                    ` : ''}
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

function CardDetailModal(card, user) {
  return `
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="card-detail-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-card-detail">&times;</button>
        <h2 class="text-xl font-bold mb-4">Card Details</h2>
        <div class="mb-2"><b>User:</b> ${user?.full_name || "Unknown"} (${user?.email || ""})</div>
        <div class="mb-2"><b>Card Number:</b> ${card.card_number || "-"}</div>
        <div class="mb-2"><b>Type:</b> ${card.card_type || "-"}</div>
        <div class="mb-2"><b>Status:</b> ${statusBadge(card.status)}</div>
        <div class="mb-2"><b>Expiry Date:</b> ${card.expiry_date || "-"}</div>
        <div class="mb-2"><b>CVV:</b> ${card.cvv || "-"}</div>
      </div>
    </div>
  `;
}

function DeclineReasonModal(cardId) {
  return `
    <div class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" id="decline-modal">
      <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button class="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500" id="close-decline-modal">&times;</button>
        <h2 class="text-xl font-bold mb-4">Decline Card Request</h2>
        <form id="decline-form">
          <input type="hidden" name="card_id" value="${cardId}" />
          <div class="mb-3">
            <label class="block text-sm mb-1">Reason</label>
            <textarea name="reason" class="w-full border px-3 py-2 rounded" rows="3" required></textarea>
          </div>
          <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded">Decline</button>
        </form>
      </div>
    </div>
  `;
}

function exportCSV(cards, users) {
  const header = ["User", "Email", "Card Number", "Type", "Expiry"];
  const rows = cards.map(c => {
    const user = users.find(u => u.id === c.user_id);
    return [
      user?.full_name || "",
      user?.email || "",
      c.card_number || "",
      c.card_type || "",
      c.expiry_date || ""
    ].join(",");
  });
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cards.csv";
  a.click();
  URL.revokeObjectURL(url);
}

const cards = async () => {
  if (!(await requireAdmin())) return { html: "", pageEvents: () => { } };

  let { data: cardsArr = [] } = await supabase.from("cards").select("*").order("issued_at", { ascending: false }).limit(100);
  let { data: users = [] } = await supabase.from("profiles").select("id,full_name,email");

  let filteredCards = cardsArr;
  let activeItem = "cards";
  let isCollapsed = false;
  let isDark = localStorage.getItem("admin_dark") === "true";

  function render() {
    document.getElementById("app").innerHTML = `
      ${AdminNavbar({ activeItem, isCollapsed, isDark })}
      <div class="lg:ml-64 min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors">
        <div class="p-4 md:p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">Card Management</h1>
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 md:p-6">
              ${CardTable(filteredCards, users)}
            </div>
          </div>
        </div>
      </div>
      <div id="card-detail-panel"></div>
      <div id="decline-panel"></div>
    `;

    // Sidebar, theme, nav, logout logic (same as dashboard.js)
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
      sessionStorage.removeItem('admin_logged_in');
      window.location.href = "/admin-login";
    });
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Filtering
    const searchInput = document.getElementById("card-search");
    const tableBody = document.getElementById("card-table-body");
    function filterCards() {
      let q = searchInput.value.trim().toLowerCase();
      filteredCards = cardsArr.filter(c => {
        const user = users.find(u => u.id === c.user_id);
        let match = true;
        if (q) {
          match = (user?.full_name?.toLowerCase().includes(q) || user?.email?.toLowerCase().includes(q) || (c.card_number || "").includes(q) || (c.card_type || "").toLowerCase().includes(q));
        }
        return match;
      });
      // For mobile, re-render the whole table
      if (window.innerWidth < 768) {
        document.querySelector(".block.md\\:hidden").innerHTML = filteredCards.map(c => {
          const user = users.find(u => u.id === c.user_id);
          return `
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow p-4 mb-4 animate-fade-in">
              <div class="flex justify-between items-center mb-2">
                <span class="font-semibold">${user?.full_name || "Unknown"}</span>
                ${statusBadge(c.status)}
              </div>
              <div class="text-xs text-gray-400 mb-1">${user?.email || ""}</div>
              <div class="mb-1"><b>Card Number:</b> ${c.card_number || "-"}</div>
              <div class="mb-1"><b>Type:</b> ${c.card_type || "-"}</div>
              <div class="mb-1"><b>Expiry:</b> ${c.expiry_date || "-"}</div>
              <div class="flex flex-wrap gap-2 mt-2">
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${c.id}">View Details</button>
                ${canUpdateCardStatus(c.status) ? `
                <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${c.id}">Mark Approved</button>
                <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${c.id}">Mark Declined</button>
                ` : ''}
              </div>
            </div>
          `;
        }).join("");
      } else if (tableBody) {
        tableBody.innerHTML = filteredCards.map(c => {
          const user = users.find(u => u.id === c.user_id);
          return `
            <tr>
              <td>
                <span class="font-semibold">${user?.full_name || "Unknown"}</span>
                <div class="text-xs text-gray-400">${user?.email || ""}</div>
              </td>
              <td>${c.card_number || "-"}</td>
              <td>${c.card_type || "-"}</td>
              <td>${c.expiry_date || "-"}</td>
              <td>${statusBadge(c.status)}</td>
              <td>
                <button class="btn btn-xs bg-blue-600 text-white px-2 py-1 rounded card-view" data-id="${c.id}">View</button>
                ${canUpdateCardStatus(c.status) ? `
                <button class="btn btn-xs bg-green-600 text-white px-2 py-1 rounded card-approve" data-id="${c.id}">Approve</button>
                <button class="btn btn-xs bg-red-600 text-white px-2 py-1 rounded card-decline" data-id="${c.id}">Decline</button>
                ` : ''}
              </td>
            </tr>
          `;
        }).join("");
      }
      attachRowEvents();
    }
    [searchInput].forEach(el => {
      if (el) el.addEventListener("input", filterCards);
      if (el) el.addEventListener("change", filterCards);
    });

    // Export CSV
    document.getElementById("card-export-csv").onclick = () => exportCSV(filteredCards, users);

    // Row actions
    function attachRowEvents() {
      document.querySelectorAll('.card-view').forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute("data-id");
          const card = cardsArr.find(c => c.id === id);
          const user = users.find(u => u.id === card.user_id);
          document.getElementById("card-detail-panel").innerHTML = CardDetailModal(card, user);
          document.getElementById("close-card-detail").onclick = () => {
            document.getElementById("card-detail-panel").innerHTML = "";
          };
        };
      });
      document.querySelectorAll('.card-approve').forEach(btn => {
        btn.onclick = async () => {
          const id = btn.getAttribute("data-id");
          const card = cardsArr.find(c => c.id === id);
          const user = users.find(u => u.id === card.user_id);

          try {
            // Update card status in database
            const { error: updateError } = await supabase
              .from("cards")
              .update({ status: "approved" })
              .eq("id", id);

            if (updateError) throw updateError;

            // Notify user that card is approved
            try {
              await sendEmail({
                to: user.email,
                subject: "Card Request Approved",
                html: `<p>Dear ${user.full_name},<br>Your card request has been approved. Card Number: <b>${card.card_number}</b>, Type: <b>${card.card_type}</b>.<br>We will notify you when your card is ready for pickup.</p>`
              });
            } catch (emailErr) {
              console.warn("Email send failed, but continuing:", emailErr);
            }
          } catch (err) {
            console.error("Card approval error:", err);
            showToast("Failed to approve card", "error");
            return;
          }
          showToast("Card approved and user notified.", "success");
          window.location.reload();
        };
      });
      document.querySelectorAll('.card-decline').forEach(btn => {
        btn.onclick = () => {
          const id = btn.getAttribute("data-id");
          const card = cardsArr.find(c => c.id === id);
          const user = users.find(u => u.id === card.user_id);

          document.getElementById("decline-panel").innerHTML = DeclineReasonModal(id);
          document.getElementById("close-decline-modal").onclick = () => {
            document.getElementById("decline-panel").innerHTML = "";
          };
          document.getElementById("decline-form").onsubmit = async function (e) {
            e.preventDefault();
            const reason = this.reason.value.trim();
            if (!reason) return showToast("Reason required", "error");

            try {
              // Update card status to declined in database
              const { error: updateError } = await supabase
                .from("cards")
                .update({ status: "declined" })
                .eq("id", id);

              if (updateError) throw updateError;

              // Notify user of decline
              try {
                await sendEmail({
                  to: user.email,
                  subject: "Card Request Declined",
                  html: `<p>Dear ${user.full_name},<br>Your card request was declined. Reason: <b>${reason}</b></p>`
                });
              } catch (emailErr) {
                console.warn("Email send failed, but continuing:", emailErr);
              }
            } catch (err) {
              console.error("Card decline error:", err);
              showToast("Failed to decline card", "error");
              return;
            }
            showToast("Card declined and user notified.", "success");
            window.location.reload();
          };
        };
      });
    }
    attachRowEvents();
  }

  return {
    html: "",
    pageEvents: () => render()
  };
};

export default cards;




