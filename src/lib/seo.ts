import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, canonical: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export const privatePageMetadata: Metadata = {
  robots: { index: false, follow: false },
};
