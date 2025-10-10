import './style.css'
import { loadPage, parsePathToRoute } from './router.js'

const app = document.getElementById("app");
window.app = app

document.addEventListener("click", async (e) => {
    let target = e.target;
    while (target && target !== document) {
        if (target.matches && target.matches('[data-nav]')) {
            e.preventDefault();
            const path = target.getAttribute('href');
            const parsed = parsePathToRoute(path);
            const page = parsed.page;
            await loadPage(page);
            // Only load JivoChat if not on admin page
            if (!page.startsWith("admin/") && page !== "admin-login") {

            } else {

            }
            break;
        }
        target = target.parentElement;
    }
});


// Initial page load
window.addEventListener("DOMContentLoaded", async () => {
    const { page, args } = parsePathToRoute(window.location.pathname);
    await loadPage(page, ...(args || []));
    if (!page.startsWith("admin/") && page !== "admin-login") {

    } else {

    }
});




