import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/content";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AiProvider = {
  name: "DeepSeek" | "Groq";
  apiKey?: string;
  endpoint: string;
  model: string;
};

const fallbackPrompt =
  "Bạn là Trợ Lý BIHUBA, hỗ trợ hội viên và khách truy cập về thông tin doanh nghiệp, quản trị, kết nối giao thương, thủ tục kinh doanh cơ bản, sự kiện, hội viên và tài liệu của BIHUBA. Trả lời bằng tiếng Việt, ngắn gọn, thực tế, lịch sự. Với nội dung pháp lý, thuế, tài chính hoặc y tế, hãy nhắc người hỏi kiểm tra với chuyên gia có thẩm quyền.";

function normalizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const record = message as Record<string, unknown>;
      const role = record.role === "assistant" ? "assistant" : record.role === "user" ? "user" : null;
      const content = String(record.content || "").trim();
      return role && content ? { role, content } : null;
    })
    .filter((message): message is ChatMessage => Boolean(message))
    .slice(-10);
}

async function requestCompletion(provider: AiProvider, messages: ChatMessage[], systemPrompt: string) {
  const response = await fetch(provider.endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: provider.model,
      temperature: 0.35,
      max_tokens: 700,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
    signal: AbortSignal.timeout(20_000),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(result?.error?.message || `${provider.name} không thể phản hồi lúc này.`);
  }

  const content = result?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error(`${provider.name} chưa trả về nội dung hợp lệ.`);
  }

  return content.trim();
}

export async function POST(request: Request) {
  const settings = await getSiteSettings({ includeSecrets: true });
  const aiSettings = settings.aiAssistant;

  if (!aiSettings?.enabled) {
    return NextResponse.json({ message: "Trợ Lý BIHUBA đang tạm tắt." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const messages = normalizeMessages((body as Record<string, unknown>).messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return NextResponse.json({ message: "Bạn vui lòng nhập câu hỏi." }, { status: 400 });
  }

  const providerCandidates: AiProvider[] = [
    {
      name: "DeepSeek",
      apiKey: process.env.DEEPSEEK_API_KEY || aiSettings.deepseekApiToken,
      endpoint: "https://api.deepseek.com/chat/completions",
      model: aiSettings.deepseekModel || "deepseek-v4-flash",
    },
    {
      name: "Groq",
      apiKey: process.env.GROQ_API_KEY || aiSettings.apiToken,
      endpoint: "https://api.groq.com/openai/v1/chat/completions",
      model: aiSettings.model || "llama-3.1-8b-instant",
    },
  ];
  const providers = providerCandidates.filter((provider) => Boolean(provider.apiKey));

  if (!providers.length) {
    return NextResponse.json(
      { message: "Trợ Lý BIHUBA chưa được cấu hình API token DeepSeek hoặc Groq." },
      { status: 503 }
    );
  }

  let lastError = "Trợ Lý BIHUBA đang bận. Bạn thử lại sau ít phút.";
  for (const provider of providers) {
    try {
      const message = await requestCompletion(provider, messages, aiSettings.systemPrompt || fallbackPrompt);
      return NextResponse.json({ message });
    } catch (error) {
      lastError = error instanceof Error ? error.message : lastError;
    }
  }

  return NextResponse.json({ message: lastError }, { status: 503 });
}
