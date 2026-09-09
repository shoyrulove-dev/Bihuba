import type { Instrumentation } from "next";

export function register() {}

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  const webhookUrl = process.env.ERROR_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const message = error instanceof Error ? error.message : String(error);
  const digest = typeof error === "object" && error !== null && "digest" in error ? String(error.digest) : undefined;
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `BIHUBA server error: ${message}`,
      event: "server_error",
      message,
      digest,
      path: request.path,
      method: request.method,
      routeType: context.routeType,
      timestamp: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(5000),
  }).catch(() => undefined);
};
