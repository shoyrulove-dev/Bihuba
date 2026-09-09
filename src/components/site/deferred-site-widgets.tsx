"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { AiAssistantSettings, FloatingActions } from "@/types/cms";

const AiAssistantWidget = dynamic(() =>
  import("@/components/site/ai-assistant-widget").then((module) => module.AiAssistantWidget),
);
const FloatingContactButtons = dynamic(() =>
  import("@/components/site/floating-contact-buttons").then((module) => module.FloatingContactButtons),
);

export function DeferredSiteWidgets({
  aiSettings,
  actions,
}: {
  aiSettings: AiAssistantSettings;
  actions: FloatingActions;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => setReady(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(show, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(show, 1500);
    return () => globalThis.clearTimeout(id);
  }, []);

  if (!ready) return null;
  return (
    <>
      <AiAssistantWidget settings={aiSettings} />
      <FloatingContactButtons actions={actions} />
    </>
  );
}
