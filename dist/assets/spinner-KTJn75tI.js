import{L as s}from"./logo-yCyWWFG1.js";function r(){if(document.getElementById("logo-spinner-preloader"))return;const e=document.createElement("div");e.id="logo-spinner-preloader",e.className=`
        fixed inset-0 z-50 flex items-center justify-center
        transition-colors duration-500
    `,e.style.background="rgba(0,0,0,0.5)",e.innerHTML=`
      <div class="relative flex flex-col items-center">
        <img
          src="${s}"
          alt="Loading..."
          class="logo-spin-zoom-glow h-24 w-24 md:h-32 md:w-32 rounded-full shadow-xl"
          draggable="false"
          style="user-select:none;"
        />
      </div>
      <style>
        @keyframes logo-zoom-glow {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px #ffd700) brightness(1);
          }
          25% {
            transform: scale(1.13);
            filter: drop-shadow(0 0 24px #ffd700cc) brightness(1.12);
          }
          50% {
            transform: scale(0.92);
            filter: drop-shadow(0 0 8px #2228) brightness(0.82) grayscale(0.25);
          }
          75% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 18px #ffd70099) brightness(1.08);
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 0px #ffd700) brightness(1);
          }
        }
        .logo-spin-zoom-glow {
          animation: logo-zoom-glow 2.8s cubic-bezier(.4,0,.2,1) infinite;
          transition: filter 0.3s, transform 0.3s;
          background: transparent;
        }
      </style>
    `;const o=document.getElementById("app");o&&o.classList.add("opacity-0","transition-opacity","duration-300"),document.body.append(e)}function n(e=500){const o=document.getElementById("logo-spinner-preloader"),t=document.getElementById("app");o&&(o.style.transition="opacity 0.5s",o.style.opacity="0",setTimeout(()=>{o.remove(),t&&(t.classList.remove("opacity-0"),t.classList.add("opacity-100"))},e))}const i={start:r,stop:n};export{r as a,n as e,i as s};
