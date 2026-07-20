export default function AdminLoading() {
  return (
    <div className="admin-root min-h-screen bg-slate-950 px-5 py-6 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[96px_1fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
          <div className="flex flex-col items-center gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="h-12 w-12 animate-pulse rounded-2xl bg-white/10" />
            ))}
          </div>
        </aside>
        <main className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <div className="h-9 w-64 animate-pulse rounded-xl bg-white/10" />
            <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-xl bg-white/10" />
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="h-10 w-full animate-pulse rounded-2xl bg-white/10" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-20 animate-pulse rounded-[1.4rem] bg-white/10" />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
