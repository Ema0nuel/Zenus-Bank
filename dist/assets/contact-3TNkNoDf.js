import{s as r}from"./supabaseClient-CvVHAHOf.js";import{s as b}from"./toast-DRvdR0y9.js";import{s as h}from"./sendEmail-89Z52C2k.js";import{r as w}from"./reset-CYKpHJhn.js";import{n as k}from"./Navbar-ElK9Prgf.js";import"./logo-yCyWWFG1.js";const E="zenusbanking@gmail.com",S=async()=>{const f=k();w("Zenus Bank | Contact Us");const m=await r.auth.getSession();if(!m.data.session){window.location.href="/login";return}const{user:u}=m.data.session,{data:g}=await r.from("profiles").select("*").eq("id",u.id).single();let d=[];async function x(){const{data:s}=await r.from("notifications").select("*").eq("user_id",u.id).order("created_at",{ascending:!1}).limit(20);d=s||[]}function p(){const s=document.getElementById("notif-view");if(!s)return;s.innerHTML=`
  <div class="px-4 sm:px-0">
    <div class="flex items-center mb-4">
        <button id="back-to-contact" class="mr-2 px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs">
          <i class="fa fa-arrow-left"></i> Back
        </button>
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">Recent Notifications</h3>
    </div>
    <div class="divide-y divide-gray-200 dark:divide-gray-700">
        ${d.length?d.map(t=>`
            <div class="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 js-notif-item rounded-md" data-id="${t.id}">
                <div class="flex items-start gap-2">
                    <div class="pt-1">
                        <i class="fa ${t.type==="danger"?"fa-exclamation-circle text-red-600":"fa-envelope text-blue-600"}"></i>
                    </div>
                    <div class="flex-1 overflow-hidden">
                        <div class="text-xs font-semibold truncate">${t.title||"Message"}</div>
                        <div class="text-[11px] text-gray-600 dark:text-gray-300 truncate">${t.message?.slice(0,60)||""}${t.message&&t.message.length>60?"...":""}</div>
                        <div class="text-[10px] text-gray-400 mt-0.5">${t.created_at?.slice(0,16).replace("T"," ")}</div>
                    </div>
                    <button class="notif-toggle-btn text-xs bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
                <div class="notif-details hidden mt-2 text-xs text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded p-2">${t.message}</div>
            </div>
        `).join(""):'<div class="text-gray-400 dark:text-gray-500 text-xs p-2">No notifications yet.</div>'}
    </div>
  </div>
`;const n=document.getElementById("back-to-contact");n&&(n.onclick=()=>{const t=document.getElementById("notif-view"),e=document.getElementById("contact-main");t&&t.classList.add("hidden"),e&&e.classList.remove("hidden")}),s.querySelectorAll(".js-notif-item").forEach(t=>{const e=t.querySelector(".notif-toggle-btn"),a=t.querySelector(".notif-details");e&&a&&(e.onclick=async o=>{o.stopPropagation();const c=!a.classList.contains("hidden");if(s.querySelectorAll(".notif-details").forEach(i=>i.classList.add("hidden")),s.querySelectorAll(".notif-toggle-btn i").forEach(i=>{i.className="fa fa-plus"}),c)a.classList.add("hidden"),e.querySelector("i").className="fa fa-plus";else{a.classList.remove("hidden"),e.querySelector("i").className="fa fa-minus";const i=t.getAttribute("data-id"),l=d.find(y=>y.id===i);l&&!l.read&&(await r.from("notifications").update({read:!0}).eq("id",i),l.read=!0)}})})}function v(){f.pageEvents?.();const s=document.getElementById("tab-notifications");s&&(s.onclick=async()=>{await x();const t=document.getElementById("contact-main"),e=document.getElementById("notif-view");t&&t.classList.add("hidden"),e&&e.classList.remove("hidden"),p()});const n=document.getElementById("contact-form");n&&(n.onsubmit=async function(t){t.preventDefault();const e=document.getElementById("send-contact-btn"),a=document.getElementById("contact-spinner");e.disabled=!0,a.classList.remove("hidden");const o=this.subject.value.trim(),c=this.message.value.trim();if(!o||!c){b("Please fill in all fields.","error"),e.disabled=!1,a.classList.add("hidden");return}await h({to:E,subject:`[Contact Us] ${o}`,html:`<p><b>From:</b> ${g.full_name} (${g.email})<br><b>Message:</b><br>${c}</p>`}),b("Message sent to admin!","success"),this.reset(),e.disabled=!1,a.classList.add("hidden")})}return{html:`
        ${f.html}
        <div class="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen pt-12">
            <div id="main-content" class="ml-56 pt-14 transition-all duration-300 font-sans min-h-screen">
                <div class="max-w-2xl mx-auto py-8 px-2">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Contact Us</h2>
                        <button id="tab-notifications" class="hidden btn bg-blue-600 text-white px-3 py-1 rounded text-xs"><i class="fa fa-bell"></i> Notifications</button>
                    </div>
                    <div id="contact-main">
                        <form id="contact-form" class="bg-white dark:bg-gray-800 rounded shadow-sm p-4 space-y-4">
                            <div>
                                <label class="block text-xs mb-1">Subject</label>
                                <input type="text" name="subject" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" required>
                            </div>
                            <div>
                                <label class="block text-xs mb-1">Message</label>
                                <textarea name="message" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" rows="5" required></textarea>
                            </div>
                            <div class="flex justify-end">
                                <button type="submit" id="send-contact-btn" class="btn bg-green-600 text-white px-4 py-1 rounded text-xs flex items-center gap-2">
                                    <span>Send</span>
                                    <span id="contact-spinner" class="hidden ml-2"><i class="fa fa-spinner fa-spin"></i></span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div id="notif-view" class="hidden"></div>
                </div>
            </div>
        </div>
        `,pageEvents:v}};export{S as default};
