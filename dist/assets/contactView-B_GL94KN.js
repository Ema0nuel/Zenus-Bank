import{n as o}from"./navbar-CNAggbqQ.js";import{f as m}from"./footer-DuuTHOh-.js";import{s as t}from"./toast-DRvdR0y9.js";import{r as c}from"./reset-CYKpHJhn.js";import"./logo-nobg-BVMQOOtC.js";import"./logo-yCyWWFG1.js";const r="zenusbanking@gmail.com",l="+1210279-5532",h=()=>{c("Contact Us");function i(){o().pageEvents?.();const e=document.getElementById("contactForm");e&&e.addEventListener("submit",async n=>{n.preventDefault();const s=Object.fromEntries(new FormData(e));if(!s.name||!s.email||!s.message){t("Please fill in all required fields.","error");return}try{e.querySelector('button[type="submit"]').disabled=!0,await new Promise(d=>setTimeout(d,1200)),t("Your message has been sent!","success"),e.reset()}catch{t("Failed to send message. Please try again.","error")}finally{e.querySelector('button[type="submit"]').disabled=!1}});const a=document.getElementById("prevContactForm");a&&a.addEventListener("submit",n=>{n.preventDefault(),t("Form submitted (demo only)","info"),a.reset()})}return{html:`
      ${o().html}
      <main id="mainContent" class="main fullWidthPage bg-brand-light dark:bg-brand-dark text-brand-navy dark:text-brand-light" data-pg="FullWidthPage">
        <section class="relative w-full min-h-[320px] md:min-h-[440px] flex items-center bg-gradient-to-br from-brand-sun/80 to-brand-navy/90">
          <div class="absolute inset-0 z-0 hidden md:block bg-cover bg-right" style="background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80');"></div>
          <div class="absolute inset-0 z-0 md:hidden bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80');"></div>
          <div class="absolute inset-0 bg-black/60 dark:bg-brand-navy/80"></div>
          <div class="relative z-10 max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
            <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <h1 class="text-3xl md:text-5xl font-extrabold text-white dark:text-brand-sun mb-4 drop-shadow-lg">Contact zenus bank</h1>
              <p class="text-lg md:text-2xl text-white dark:text-brand-sun mb-6 max-w-2xl">Choose the method that is most convenient for you.</p>
            </div>
          </div>
        </section>
        <section class="py-10">
          <div class="max-w-3xl mx-auto px-4">
            <h2 class="text-2xl font-bold mb-4">Contact Form</h2>
            <form id="contactForm" class="space-y-4 bg-white dark:bg-brand-dark rounded-lg shadow p-6">
              <div>
                <label class="block font-semibold mb-1" for="name">Name</label>
                <input class="w-full px-3 py-2 rounded border border-brand-sun/30 focus:outline-none focus:ring-2 focus:ring-brand-sun" type="text" id="name" name="name" required>
              </div>
              <div>
                <label class="block font-semibold mb-1" for="email">Email</label>
                <input class="w-full px-3 py-2 rounded border border-brand-sun/30 focus:outline-none focus:ring-2 focus:ring-brand-sun" type="email" id="email" name="email" required>
              </div>
              <div>
                <label class="block font-semibold mb-1" for="phone">Phone</label>
                <input class="w-full px-3 py-2 rounded border border-brand-sun/30 focus:outline-none focus:ring-2 focus:ring-brand-sun" type="tel" id="phone" name="phone" placeholder="Optional">
              </div>
              <div>
                <label class="block font-semibold mb-1" for="message">Message</label>
                <textarea class="w-full px-3 py-2 rounded border border-brand-sun/30 focus:outline-none focus:ring-2 focus:ring-brand-sun" id="message" name="message" rows="4" required></textarea>
              </div>
              <button type="submit" class="px-6 py-2 rounded-full bg-brand-navy text-white font-semibold shadow hover:bg-brand-sun transition-all duration-300">Send Message</button>
            </form>
            <div class="mt-8">
              <h3 class="text-xl font-bold mb-2">Other ways to contact us</h3>
              <p>Email: <a href="mailto:${r}" class="text-brand-sun hover:underline">${r}</a></p>
              <p>Phone: <a href="tel:${l.replace(/[^+\d]/g,"")}" class="text-brand-sun hover:underline">${l}</a></p>
            </div>
          </div>
        </section>
      </main>
      ${m().html}
    `,pageEvents:i}};export{h as default};
