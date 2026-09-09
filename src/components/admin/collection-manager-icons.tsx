export function EditIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 20h4l10-10-4-4L4 16v4Z"/><path d="M13 7l4 4"/></svg>; }
export function DeleteIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 7h14M9 7V4h6v3M8 7l1 12h6l1-12"/></svg>; }
export function AddIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14"/></svg>; }
export function ChevronLeftIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 6l-6 6 6 6"/></svg>; }
export function ChevronRightIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6"/></svg>; }
export function CloseIcon() { return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>; }

export function StatusIcon({ status }: { status: unknown }) {
  const value = String(status);
  if (value === "published") return <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300" title="Đã duyệt" aria-label="Đã duyệt"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m5 12 4 4L19 6"/></svg></span>;
  if (value === "pending") return <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/15 text-amber-200" title="Chờ duyệt" aria-label="Chờ duyệt"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><circle cx="6" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="18" cy="12" r="1.8"/></svg></span>;
  return <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-400/15 text-slate-300" title="Bản nháp" aria-label="Bản nháp"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="6"/></svg></span>;
}
