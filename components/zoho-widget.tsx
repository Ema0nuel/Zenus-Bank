"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ZOHO_WIDGET_URL =
  "https://salesiq.zohopublic.com/widget?wc=siq54798ff3df62ec8856fc0233bea73480b1f4fc955e16d0201e7d3fd680a855e8";

export function ZohoWidget() {
  const pathname = usePathname();
  const enabled = !pathname.startsWith("/admin");

  useEffect(() => {
    if (!enabled) return;

    const w = window as unknown as {
      $zoho?: { salesiq?: { ready: () => void } };
    };
    w.$zoho = w.$zoho || {};
    w.$zoho.salesiq = w.$zoho.salesiq || { ready: function () {} };

    if (document.getElementById("zsiqscript")) return;

    const script = document.createElement("script");
    script.id = "zsiqscript";
    script.src = ZOHO_WIDGET_URL;
    script.defer = true;
    document.body.appendChild(script);
  }, [enabled]);

  return null;
}
