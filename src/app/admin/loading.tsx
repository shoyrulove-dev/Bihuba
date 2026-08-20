export default function AdminLoading() {
  return (
    <div className="admin-root min-h-screen bg-[#f4f7fb] px-5 py-6 text-slate-900 lg:pl-[290px]">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="border-b border-slate-200 pb-4">
            <div className="h-9 w-64 animate-pulse rounded-xl bg-slate-200" />
            <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-xl bg-slate-200" />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="h-10 w-full animate-pulse rounded-2xl bg-slate-100" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-20 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
