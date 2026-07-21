import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/content";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
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
      if (!role || !content) return null;
      return { role, content };
    })
    .filter(Boolean)
    .slice(-10) as ChatMessage[];
}

export async function POST(request: Request) {
  const settings = await getSiteSettings({ includeSecrets: true });
  const aiSettings = settings.aiAssistant;

  if (!aiSettings?.enabled) {
    return NextResponse.json({ message: "Trợ lý BIHUBA đang tạm tắt." }, { status: 403 });
  }

  const apiKey = process.env.GROQ_API_KEY || aiSettings.apiToken;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Trợ lý BIHUBA chưa được cấu hình API key Groq." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const messages = normalizeMessages((body as Record<string, unknown>).messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return NextResponse.json({ message: "Bạn vui lòng nhập câu hỏi." }, { status: 400 });
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: aiSettings.model || "llama-3.1-8b-instant",
      temperature: 0.35,
      max_tokens: 700,
      messages: [
        {
          role: "system",
          content: aiSettings.systemPrompt || fallbackPrompt,
        },
        ...messages,
      ],
    }),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          result?.error?.message ||
          "Trợ lý BIHUBA đang bận. Bạn thử lại sau ít phút.",
      },
      { status: response.status }
    );
  }

  const content = result?.choices?.[0]?.message?.content;
  return NextResponse.json({
    message: typeof content === "string" ? content.trim() : "Mình chưa có câu trả lời phù hợp, bạn hỏi lại rõ hơn giúp mình nhé.",
  });
}
