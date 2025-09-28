import navbar from '../../components/navbar';
import { reset } from '../../utils/reset';
import { showToast } from '../../components/toast';
import { startLogoSpinner, endLogoSpinner } from '../../utils/spinner';
import { supabase } from '../../utils/supabaseClient';
import NoLogo from "/src/images/logo-nobg.png";
import Logo from "/src/images/logo.jpg";

const forgotPassword = () => {
  reset("Forgot Password");
  const nav = navbar();

  function pageEvents() {
    nav.pageEvents?.();

    const form = document.getElementById('forgot-form');
    const emailInput = document.getElementById('email');
    const submitBtn = form?.querySelector('button[type="submit"]');

    // Email validation
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
        emailInput.style.borderColor = isValid ? '' : 'rgb(239, 68, 68)';
        if (submitBtn) submitBtn.disabled = !isValid;
      });
    }

    // Form submission
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;

        startLogoSpinner();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          // Update the redirectTo URL to point to reset-password
          redirectTo: 'https://zenusbanking.com/reset-password'
        });
        endLogoSpinner();

        if (error) {
          showToast(error.message || "Failed to send reset instructions", "error");
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Instructions <i class="fas fa-paper-plane text-sm"></i>`;
        } else {
          showToast("Password reset instructions sent to your email", "success");
          setTimeout(() => window.location.href = "/login", 2000);
        }
      });
    }
  }

  return {
    html: /* html */`
      <main class="main min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark transition-colors duration-300" id="top">
        <div id="nav-actions" class="flex items-center gap-2 ml-2 absolute top-4"></div>
        <div class="flex flex-1 items-center justify-center py-12 px-4">
          <div class="w-full max-w-md space-y-8">
            <div class="flex flex-col items-center mb-6">
              <a href="/" data-nav class="flex items-center justify-center mb-4">
                <img src="${NoLogo}" alt="Zenus Bank logo" class="h-16 w-auto block dark:hidden" />
                <img src="${Logo}" alt="Zenus Bank logo" class="h-16 w-auto hidden dark:block" />
              </a>
              <h1 class="flex items-center gap-2 text-2xl font-bold text-brand-navy dark:text-brand-sun">
                <i class="fa-solid fa-unlock-keyhole"></i>
                Forgot Password
              </h1>
              <div class="text-sm text-brand-gray dark:text-brand-light mt-2">
                <a href="/login" data-nav class="text-brand-sun hover:underline ml-1">Back to Login</a>
              </div>
            </div>
            <div class="bg-white dark:bg-brand-dark rounded-xl shadow-lg p-8">
              <form id="forgot-form" autocomplete="off" class="space-y-6" novalidate>
                <div>
                  <label for="email" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">Email Address</label>
                  <input class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition" type="email" name="email" id="email" placeholder="you@example.com" required>
                </div>
                <button class="w-full py-3 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy hover:text-white transition-all duration-300 mt-2 flex items-center justify-center gap-2" type="submit" name="send" disabled>
                  Send Instructions
                  <i class="fas fa-paper-plane text-sm"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    `,
    pageEvents
  };
};

export default forgotPassword;



