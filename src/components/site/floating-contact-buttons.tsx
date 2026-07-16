import Link from "next/link";
import { FloatingActions } from "@/types/cms";

function ZaloIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H14l-4.8 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7A2.5 2.5 0 0 1 6.5 4Zm1.8 4.2v1.4h2.1l-2.4 4.2h1.9l2.5-4.2V8.2H8.3Zm5.6 0v5.6h1.8V8.2h-1.8Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13.5 21v-7h2.3l.5-3h-2.8V9.1c0-.9.4-1.6 1.7-1.6h1.2V4.8c-.2 0-.9-.1-1.8-.1-2.9 0-4.6 1.7-4.6 4.9V11H7.5v3H10v7h3.5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
      <path d="M5 4h4l1.5 4-2 1.8a16 16 0 0 0 5.7 5.7l1.8-2L20 15v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </svg>
  );
}

export function FloatingContactButtons({ actions }: { actions: FloatingActions }) {
  const hasAnyAction = actions.zaloUrl || actions.facebookUrl || actions.callNumber;

  if (!hasAnyAction) return null;

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3">
      {actions.zaloUrl ? (
        <Link
          href={actions.zaloUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-13 w-13 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-[0_18px_30px_rgba(0,104,255,0.35)] transition hover:scale-105"
          aria-label="Zalo"
          title="Zalo"
        >
          <ZaloIcon />
        </Link>
      ) : null}
      {actions.facebookUrl ? (
        <Link
          href={actions.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="flex h-13 w-13 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-[0_18px_30px_rgba(24,119,242,0.35)] transition hover:scale-105"
          aria-label="Facebook"
          title="Facebook"
        >
          <FacebookIcon />
        </Link>
      ) : null}
      {actions.callNumber ? (
        <a
          href={`tel:${actions.callNumber}`}
          className="inline-flex h-13 min-w-13 items-center justify-center gap-2 rounded-full bg-[#0E4FAF] px-4 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(14,79,175,0.35)] transition hover:scale-105"
          aria-label={actions.callLabel || "Gọi ngay"}
          title={actions.callLabel || "Gọi ngay"}
        >
          <PhoneIcon />
          <span className="hidden sm:inline">{actions.callLabel || "Gọi ngay"}</span>
        </a>
      ) : null}
    </div>
  );
}
