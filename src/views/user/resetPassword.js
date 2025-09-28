import navbar from '../../components/navbar';
import { reset } from '../../utils/reset';
import { showToast } from '../../components/toast';
import { startLogoSpinner, endLogoSpinner } from '../../utils/spinner';
import { supabase } from '../../utils/supabaseClient';
import NoLogo from "/src/images/logo-nobg.png";
import Logo from "/src/images/logo.jpg";

const resetPassword = () => {
    reset("Reset Password");
    const nav = navbar();

    function pageEvents() {
        nav.pageEvents?.();

        const form = document.getElementById('reset-form');
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirmPassword');
        const submitBtn = form?.querySelector('button[type="submit"]');
        const showHideBtns = document.querySelectorAll('.showHidePwd');

        // Password show/hide toggle
        showHideBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const input = document.getElementById(this.dataset.target);
                if (input.type === 'password') {
                    input.type = 'text';
                    btn.textContent = 'HIDE';
                } else {
                    input.type = 'password';
                    btn.textContent = 'SHOW';
                }
            });
        });

        // Password match validation
        function validate() {
            const pwd = passwordInput.value;
            const confirm = confirmInput.value;
            const valid = pwd.length >= 8 && pwd === confirm;
            confirmInput.style.borderColor = (confirm && pwd !== confirm) ? 'rgb(239, 68, 68)' : '';
            submitBtn.disabled = !valid;
        }
        passwordInput.addEventListener('input', validate);
        confirmInput.addEventListener('input', validate);

        // Form submission
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const password = passwordInput.value;
                const confirmPassword = confirmInput.value;
                if (password !== confirmPassword) {
                    showToast("Passwords do not match", "error");
                    return;
                }
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Resetting...`;

                startLogoSpinner();
                const { error } = await supabase.auth.updateUser({ password });
                endLogoSpinner();

                if (error) {
                    showToast(error.message || "Failed to reset password", "error");
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `Reset Password <i class="fas fa-key text-sm"></i>`;
                } else {
                    showToast("Password reset successful!", "success");
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
                <i class="fa-solid fa-key"></i>
                Reset Password
              </h1>
              <div class="text-sm text-brand-gray dark:text-brand-light mt-2">
                <a href="/login" data-nav class="text-brand-sun hover:underline ml-1">Back to Login</a>
              </div>
            </div>
            <div class="bg-white dark:bg-brand-dark rounded-xl shadow-lg p-8">
              <form id="reset-form" autocomplete="off" class="space-y-6" novalidate>
                <div>
                  <label for="password" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">New Password</label>
                  <div class="relative">
                    <input type="password" name="password" id="password" minlength="8" class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition pr-16" placeholder="Create a strong password" required>
                    <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-sun hover:text-brand-navy focus:outline-none z-50 showHidePwd" data-target="password">SHOW</button>
                  </div>
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-brand-navy dark:text-brand-sun mb-1">Confirm Password</label>
                  <div class="relative">
                    <input type="password" name="confirmPassword" id="confirmPassword" minlength="8" class="block w-full rounded-lg border border-brand-gray dark:border-brand-navy bg-brand-light dark:bg-brand-dark px-4 py-3 text-brand-navy dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-sun transition pr-16" placeholder="Confirm your password" required>
                    <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-sun hover:text-brand-navy focus:outline-none z-50 showHidePwd" data-target="confirmPassword">SHOW</button>
                  </div>
                </div>
                <button class="w-full py-3 rounded-full bg-brand-sun text-white font-semibold shadow hover:bg-brand-navy hover:text-white transition-all duration-300 mt-2 flex items-center justify-center gap-2" type="submit" name="reset" disabled>
                  Reset Password
                  <i class="fas fa-key text-sm"></i>
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

export default resetPassword;



