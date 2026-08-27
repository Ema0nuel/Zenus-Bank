import Image from "next/image";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/images/logo-nobg.png"
        alt="Zenus Bank"
        width={0}
        height={0}
        sizes="100vw"
        className={cn("h-16 w-auto dark:hidden", className)}
      />
      <Image
        src="/images/logo.jpg"
        alt="Zenus Bank"
        width={0}
        height={0}
        sizes="100vw"
        className={cn("hidden h-16 w-auto dark:block", className)}
      />
    </>
  );
}
