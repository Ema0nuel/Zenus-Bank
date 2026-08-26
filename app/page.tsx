export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-6">
      <div className="text-center">
        <h1 className="text-5xl font-extralight tracking-tight text-white sm:text-6xl md:text-7xl">
          Zenus Bank
        </h1>
        <p className="mt-6 max-w-lg text-lg text-zinc-400">
          Premium banking reimagined. Coming soon.
        </p>
        <div className="mt-10">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
            Development in progress
          </span>
        </div>
      </div>
    </main>
  );
}
