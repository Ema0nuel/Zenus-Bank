function c(a,n="info",r=3500){const s=document.getElementById("hrc-toast");s&&s.remove();const t=document.documentElement.classList.contains("dark"),o={success:t?"bg-green-700 text-white":"bg-green-100 text-green-900",error:t?"bg-red-700 text-white":"bg-red-100 text-red-900",info:t?"bg-blue-700 text-white":"bg-blue-100 text-blue-900",warning:t?"bg-yellow-700 text-white":"bg-yellow-100 text-yellow-900"},i={success:"??",error:"?",info:"??",warning:"??"},e=document.createElement("div");e.id="hrc-toast",e.className=`
    fixed top-6 left-1/2 z-50 px-6 py-3 rounded shadow-lg flex items-center gap-3
    transform -translate-x-1/2 opacity-0 pointer-events-none transition-all duration-300
    ${o[n]||o.info}
  `.replace(/\s+/g," "),e.innerHTML=`
    <span class="text-xl">${i[n]||i.info}</span>
    <span class="font-medium">${a}</span>
  `,document.body.appendChild(e),setTimeout(()=>{e.classList.remove("opacity-0","pointer-events-none"),e.classList.add("opacity-100"),e.style.pointerEvents="auto"},10),setTimeout(()=>{e.classList.remove("opacity-100"),e.classList.add("opacity-0","pointer-events-none"),setTimeout(()=>e.remove(),300)},r)}export{c as s};
