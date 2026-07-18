const MOJIBAKE_PATTERN =
  /(\u00c3.|\u00c2.|\u00c4.|\u00c6.|\u00e1\u00ba|\u00e1\u00bb|\u00e1\u00b8|\u00e2.|\u00d0.|\u00d1.|\ufffd)/;

function repairString(value: string) {
  if (!MOJIBAKE_PATTERN.test(value)) {
    return value;
  }

  try {
    return Buffer.from(value, "latin1").toString("utf8");
  } catch {
    return value;
  }
}

export function repairDeepText<T>(value: T): T {
  if (typeof value === "string") {
    return repairString(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => repairDeepText(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, repairDeepText(item)])
    ) as T;
  }

  return value;
}
