"use client";

import { useState } from "react";
import Image from "next/image";
import { DownloadShape } from "@/types/cms";

function buildPreviewLines(item: DownloadShape, format: string) {
  return [
    item.title.slice(0, 20).trim(),
    (item.summary || "Tài liệu nội bộ").slice(0, 26).trim(),
    item.publishedAt || format,
  ];
}

export function DocumentThumbnail({
  item,
  format,
  size = "card",
}: {
  item: DownloadShape;
  format: string;
  size?: "card" | "row";
}) {
  const lines = buildPreviewLines(item, format);
  const dimensions = size === "card" ? "h-[132px] w-[96px]" : "h-[96px] w-[72px]";
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-[1rem] bg-[linear-gradient(135deg,#08275a,#1d4ed8)] p-[3px] shadow-[0_12px_26px_rgba(15,23,42,0.14)] ${dimensions}`}>
      {item.coverImage && !imageFailed ? (
        <Image src={item.coverImage} alt={item.title} fill sizes={size === "card" ? "96px" : "72px"} className="rounded-[0.82rem] bg-slate-100 object-contain p-1" onError={() => setImageFailed(true)} />
      ) : (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[0.82rem] bg-white">
          <div className="h-2 w-full bg-[linear-gradient(90deg,#22d3ee,#2563eb)]" />
          <div className="flex-1 px-2 py-2">
            <span className="inline-flex rounded-full bg-slate-100 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.18em] text-slate-600">{format}</span>
            <div className="mt-2 space-y-1 text-[7px] leading-[1.35] text-slate-700">
              {lines.map((line, index) => <p key={`${item.slug}-${index}`} className={`truncate ${index === 0 ? "font-bold text-slate-900" : "text-slate-500"}`}>{line}</p>)}
            </div>
          </div>
          <div className="absolute right-0 top-0 h-0 w-0 border-l-[12px] border-t-[12px] border-l-transparent border-t-cyan-100/80" />
        </div>
      )}
    </div>
  );
}
