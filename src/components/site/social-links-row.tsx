import Link from "next/link";
import { SocialLinks } from "@/types/cms";

function SocialIcon({ type }: { type: "zalo" | "facebook" | "tiktok" | "youtube" }) {
  if (type === "zalo") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H14l-4.8 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7A2.5 2.5 0 0 1 6.5 4Zm1.8 4.2v1.4h2.1l-2.4 4.2h1.9l2.5-4.2V8.2H8.3Zm5.6 0v5.6h1.8V8.2h-1.8Z" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M13.5 21v-7h2.3l.5-3h-2.8V9.1c0-.9.4-1.6 1.7-1.6h1.2V4.8c-.2 0-.9-.1-1.8-.1-2.9 0-4.6 1.7-4.6 4.9V11H7.5v3H10v7h3.5Z" />
      </svg>
    );
  }

  if (type === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M15.5 3c.6 1.7 2 3 3.7 3.4v2.8a7.3 7.3 0 0 1-3.7-1.1v6.2a5.3 5.3 0 1 1-5.3-5.3c.3 0 .6 0 .9.1v2.8a2.6 2.6 0 1 0 1.8 2.4V3h2.6Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M23 7s-.2-1.6-.8-2.3c-.8-.9-1.6-.9-2-1C17.4 3.5 12 3.5 12 3.5h0s-5.4 0-8.2.2c-.4 0-1.3 0-2 1C1.2 5.4 1 7 1 7s-.2 1.9-.2 3.8v1.8C.8 14.5 1 16.3 1 16.3s.2 1.6.8 2.3c.8.9 1.8.9 2.2 1 1.6.2 6.8.2 8 .2 0 0 5.4 0 8.2-.2.4 0 1.3 0 2-1 .6-.7.8-2.3.8-2.3s.2-1.8.2-3.7v-1.8C23.2 8.9 23 7 23 7Zm-13.3 7.8V8.6l6 3.1-6 3.1Z" />
    </svg>
  );
}

const entries: Array<{ key: keyof SocialLinks; label: string; tone: string }> = [
  { key: "zalo", label: "Zalo", tone: "bg-[#0068FF]" },
  { key: "facebook", label: "Facebook", tone: "bg-[#1877F2]" },
  { key: "tiktok", label: "TikTok", tone: "bg-[#101010]" },
  { key: "youtube", label: "YouTube", tone: "bg-[#FF0033]" },
];

export function SocialLinksRow({ links }: { links: SocialLinks }) {
  const activeEntries = entries.filter((entry) => links?.[entry.key]);
  if (!activeEntries.length) return null;

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max flex-nowrap items-center gap-2">
        {activeEntries.map((entry) => (
          <Link
            key={entry.key}
            href={links[entry.key]}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full ${entry.tone} px-3 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(2,6,23,0.16)] transition hover:-translate-y-0.5`}
          >
            <SocialIcon type={entry.key} />
            <span>{entry.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
