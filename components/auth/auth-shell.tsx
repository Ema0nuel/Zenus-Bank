import Link from "next/link";
import Image from "next/image";
import { Lock, ShieldCheck, Zap } from "lucide-react";

import { Logo } from "@/components/home/logo";

const trustPoints = [
  { icon: ShieldCheck, label: "Bank-grade encryption" },
  { icon: Lock, label: "Two-factor authentication" },
  { icon: Zap, label: "Instant, secure access" },
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[#180934] p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(600px 400px at 20% 10%, rgba(245,201,98,0.25), transparent 60%), radial-gradient(800px 600px at 90% 90%, rgba(42,16,72,0.9), transparent 70%)",
          }}
        />

        <Link href="/" className="relative inline-flex items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="Zenus Bank logo"
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="h-10 w-auto"
          />
          <span className="font-heading text-2xl font-extralight tracking-tight text-[#f5c962]">
            Zenus Bank
          </span>
        </Link>

        <div className="relative max-w-md space-y-8">
          <h1 className="text-balance font-heading text-4xl font-extralight leading-tight tracking-tight text-white xl:text-5xl">
            Your money, held in a place that feels like it.
          </h1>
          <ul className="space-y-4">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-[#f5c962]/30 bg-[#f5c962]/10">
                  <Icon className="size-4" strokeWidth={1.5} />
                </span>
                <span className="font-sans text-sm font-semibold text-white/80">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative font-sans text-xs font-semibold text-white/40">
          © {new Date().getFullYear()} Zenus Bank. All rights reserved.
        </p>
      </aside>

      <main className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>

          <header className="mb-8">
            <h1 className="text-balance font-heading text-3xl font-extralight tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 font-sans text-sm font-semibold text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
          </header>

          {children}

          {footer ? <div className="mt-8">{footer}</div> : null}
        </div>
      </main>
    </div>
  );
}
