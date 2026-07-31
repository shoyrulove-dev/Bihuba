"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  AiAssistantSettings,
  FeatureBannerItem,
  FloatingActions,
  ProductItem,
  SocialLinks,
  SupporterItem,
  ThemeSettings,
} from "@/types/cms";

const RichTextEditor = dynamic(
  () => import("@/components/admin/rich-text-editor").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-[1.5rem] border border-slate-200 px-5 py-4 text-sm text-slate-500">
        Đang tải trình soạn thảo...
      </div>
    ),
  }
);

type FieldType =
  | "text"
  | "password"
  | "textarea"
  | "select"
  | "date"
  | "checkbox"
  | "url"
  | "richtext"
  | "image"
  | "file"
  | "stats"
  | "nav"
  | "contact"
  | "social"
  | "links"
  | "permissions"
  | "supporters"
  | "banners"
  | "products"
  | "theme"
  | "ai";

export type FieldConfig = {
  name: string;
  label: string;
  type?: FieldType;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  helpText?: string;
  section?: string;
  fullWidth?: boolean;
};

type CollectionManagerProps = {
  collection: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  initialItems: Record<string, unknown>[];
  filterField?: string;
  filterOptions?: Array<{ label: string; value: string }>;
  singleton?: boolean;
  allowDelete?: boolean;
  hideSingletonEditButton?: boolean;
  closeHref?: string;
  panelMaxWidthClass?: string;
  defaultSectionsOpen?: boolean;
};

type StatItem = { label: string; value: string };
type NavItem = { label: string; href: string };
type ContactItem = {
  address: string;
  phone: string;
  email: string;
  website?: string;
  officeImageUrl?: string;
  googleMapUrl?: string;
};
type FormState = Record<string, unknown>;

type FieldSection = {
  title: string;
  fields: FieldConfig[];
};

const IMAGEKIT_UPLOAD_NOTE =
  "ImageKit Free: ảnh/audio/raw tối đa 25MB/file, video 100MB. Lite: 40MB/300MB video. Pro: 50MB/2GB video. File quá lớn nên upload Google Drive rồi dán link chia sẻ vào ô URL.";

const defaultAiAssistantSettings: AiAssistantSettings = {
  enabled: true,
  deepseekModel: "deepseek-v4-flash",
  deepseekApiToken: "",
  model: "llama-3.1-8b-instant",
  apiToken: "",
  systemPrompt:
    "Bạn là Trợ Lý BIHUBA, hỗ trợ hội viên và khách truy cập về thông tin doanh nghiệp, quản trị, kết nối giao thương, thủ tục kinh doanh cơ bản, sự kiện, hội viên và tài liệu của BIHUBA. Trả lời bằng tiếng Việt, ngắn gọn, thực tế, lịch sự. Với nội dung pháp lý, thuế, tài chính hoặc y tế, hãy nhắc người hỏi kiểm tra với chuyên gia có thẩm quyền.",
};

const permissionOptions = [
  { label: "Đăng bài viết", value: "posts" },
  { label: "Duyệt bài viết", value: "approvePosts" },
  { label: "Quản lý hội viên", value: "members" },
  { label: "Quản lý đối tác", value: "partners" },
  { label: "Quản lý tài liệu", value: "downloads" },
  { label: "Danh mục tài liệu", value: "downloadCategories" },
  { label: "Doanh nghiệp đồng hành", value: "supporters" },
  { label: "Cấu hình website", value: "settings" },
];

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20h4l10-10-4-4L4 16v4Z" />
      <path d="M13 7l4 4" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 7h14M9 7V4h6v3M8 7l1 12h6l1-12" />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function StatusIcon({ status }: { status: unknown }) {
  const value = String(status);
  if (value === "published") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300" title="Đã duyệt" aria-label="Đã duyệt">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="m5 12 4 4L19 6" />
        </svg>
      </span>
    );
  }
  if (value === "pending") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/15 text-amber-200" title="Chờ duyệt" aria-label="Chờ duyệt">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <circle cx="6" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="18" cy="12" r="1.8" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-400/15 text-slate-300" title="Bản nháp" aria-label="Bản nháp">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="6" />
      </svg>
    </span>
  );
}

function getRoleLabel(role: unknown) {
  if (role === "admin") return "Admin";
  if (role === "business") return "Doanh nghiệp";
  return "Quản lý";
}

function buildInitialValue(field: FieldConfig) {
  switch (field.type) {
    case "checkbox":
      return false;
    case "stats":
    case "nav":
      return [];
    case "contact":
      return { address: "", phone: "", email: "", website: "", officeImageUrl: "", googleMapUrl: "" };
    case "social":
      return { zaloUrl: "", facebookUrl: "", callNumber: "", callLabel: "" };
    case "links":
      return { zalo: "", facebook: "", tiktok: "", youtube: "" };
    case "permissions":
      return ["posts"];
    case "supporters":
      return [];
    case "banners":
      return [];
    case "products":
      return [];
    case "theme":
      return {
        primaryColor: "#0E4FAF",
        accentColor: "#56D6FF",
        surfaceColor: "#F8FAFC",
        headingScale: "1",
        bodyScale: "1",
      };
    case "ai":
      return defaultAiAssistantSettings;
    default:
      return "";
  }
}

function buildInitialState(fields: FieldConfig[]): FormState {
  return fields.reduce<FormState>((accumulator, field) => {
    accumulator[field.name] = buildInitialValue(field);
    return accumulator;
  }, {});
}

function normalizeValue(field: FieldConfig, rawValue: unknown): unknown {
  if (field.type === "checkbox") return Boolean(rawValue);
  if (field.type === "stats" || field.type === "nav") {
    return Array.isArray(rawValue) ? rawValue : [];
  }
  if (field.type === "contact") {
    if (rawValue && typeof rawValue === "object") return rawValue;
    return { address: "", phone: "", email: "", website: "", officeImageUrl: "", googleMapUrl: "" };
  }
  if (field.type === "social") {
    if (rawValue && typeof rawValue === "object") return rawValue;
    return { zaloUrl: "", facebookUrl: "", callNumber: "", callLabel: "" };
  }
  if (field.type === "links") {
    if (rawValue && typeof rawValue === "object") return rawValue;
    return { zalo: "", facebook: "", tiktok: "", youtube: "" };
  }
  if (field.type === "permissions") {
    return Array.isArray(rawValue) && rawValue.length ? rawValue : ["posts"];
  }
  if (field.type === "supporters") {
    return Array.isArray(rawValue) ? rawValue : [];
  }
  if (field.type === "banners") {
    return Array.isArray(rawValue) ? rawValue : [];
  }
  if (field.type === "products") {
    return Array.isArray(rawValue) ? rawValue : [];
  }
  if (field.type === "theme") {
    if (rawValue && typeof rawValue === "object") return rawValue;
    return {
      primaryColor: "#0E4FAF",
      accentColor: "#56D6FF",
      surfaceColor: "#F8FAFC",
      headingScale: "1",
      bodyScale: "1",
    };
  }
  if (field.type === "ai") {
    if (rawValue && typeof rawValue === "object") {
      return {
        ...defaultAiAssistantSettings,
        ...(rawValue as Partial<AiAssistantSettings>),
      };
    }
    return defaultAiAssistantSettings;
  }
  return String(rawValue ?? "");
}

function buildFormFromRecord(fields: FieldConfig[], baseState: FormState, record: Record<string, unknown>) {
  const nextState = { ...baseState };
  fields.forEach((field) => {
    nextState[field.name] = normalizeValue(field, record[field.name]);
  });
  return nextState;
}

function StatListField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: StatItem[]) => void;
}) {
  const items = (Array.isArray(value) ? value : []) as StatItem[];

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_160px_auto]">
          <input
            type="text"
            value={item.label ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], label: event.target.value };
              onChange(next);
            }}
            placeholder="Nhãn hiển thị"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            type="text"
            value={item.value ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], value: event.target.value };
              onChange(next);
            }}
            placeholder="120+"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            className="rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-600"
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { label: "", value: "" }])}
        className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
      >
        Thêm mục thống kê
      </button>
    </div>
  );
}

function NavListField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: NavItem[]) => void;
}) {
  const items = (Array.isArray(value) ? value : []) as NavItem[];

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_1fr_auto]">
          <input
            type="text"
            value={item.label ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], label: event.target.value };
              onChange(next);
            }}
            placeholder="Tên menu"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            type="text"
            value={item.href ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], href: event.target.value };
              onChange(next);
            }}
            placeholder="/tin-tuc"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (index === 0) return;
                const next = [...items];
                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                onChange(next);
              }}
              className="rounded-full border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700"
            >
              Lên
            </button>
            <button
              type="button"
              onClick={() => {
                if (index === items.length - 1) return;
                const next = [...items];
                [next[index + 1], next[index]] = [next[index], next[index + 1]];
                onChange(next);
              }}
              className="rounded-full border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700"
            >
              Xuống
            </button>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              className="rounded-full border border-red-200 px-4 py-3 text-sm font-semibold text-red-600"
            >
              Xóa
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { label: "", href: "" }])}
        className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
      >
        Thêm mục menu
      </button>
    </div>
  );
}

function ContactField({
  value,
  onChange,
  onUploadImage,
}: {
  value: unknown;
  onChange: (nextValue: ContactItem) => void;
  onUploadImage: (file: File) => Promise<string>;
}) {
  const contact = ((value && typeof value === "object" ? value : {}) as ContactItem) ?? {
    address: "",
    phone: "",
    email: "",
    website: "",
    officeImageUrl: "",
    googleMapUrl: "",
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <input
        type="text"
        value={contact.address ?? ""}
        onChange={(event) => onChange({ ...contact, address: event.target.value })}
        placeholder="Địa chỉ"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
      />
      <input
        type="text"
        value={contact.phone ?? ""}
        onChange={(event) => onChange({ ...contact, phone: event.target.value })}
        placeholder="Số điện thoại"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="email"
        value={contact.email ?? ""}
        onChange={(event) => onChange({ ...contact, email: event.target.value })}
        placeholder="Email"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="url"
        value={contact.website ?? ""}
        onChange={(event) => onChange({ ...contact, website: event.target.value })}
        placeholder="Website"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
      />
      <div className="space-y-3 md:col-span-2">
        <input
          type="url"
          value={contact.officeImageUrl ?? ""}
          onChange={(event) => onChange({ ...contact, officeImageUrl: event.target.value })}
          placeholder="Ảnh/banner giới thiệu văn phòng (chuẩn 16:9, 1600 x 900 px)"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
            Tải banner văn phòng
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                event.currentTarget.value = "";
                if (!file) return;
                const url = await onUploadImage(file);
                onChange({ ...contact, officeImageUrl: url });
              }}
            />
          </label>
          {contact.officeImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={contact.officeImageUrl}
              alt="Banner văn phòng"
              className="h-16 w-28 rounded-2xl border border-slate-200 bg-slate-100 object-contain"
            />
          ) : null}
        </div>
      </div>
      <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 md:col-span-2">
        Google Map tự cập nhật theo trường Địa chỉ ở trên. Hãy nhập địa chỉ đầy đủ để vị trí hiển thị chính xác.
      </p>
    </div>
  );
}

function SocialField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: FloatingActions) => void;
}) {
  const social = ((value && typeof value === "object" ? value : {}) as FloatingActions) ?? {
    zaloUrl: "",
    facebookUrl: "",
    callNumber: "",
    callLabel: "",
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <input
        type="url"
        value={social.zaloUrl ?? ""}
        onChange={(event) => onChange({ ...social, zaloUrl: event.target.value })}
        placeholder="Link Zalo"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="url"
        value={social.facebookUrl ?? ""}
        onChange={(event) => onChange({ ...social, facebookUrl: event.target.value })}
        placeholder="Link Facebook"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="text"
        value={social.callNumber ?? ""}
        onChange={(event) => onChange({ ...social, callNumber: event.target.value })}
        placeholder="Số điện thoại gọi nhanh"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="text"
        value={social.callLabel ?? ""}
        onChange={(event) => onChange({ ...social, callLabel: event.target.value })}
        placeholder="Nhãn nút gọi"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
    </div>
  );
}

function LinksField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: SocialLinks) => void;
}) {
  const links = ((value && typeof value === "object" ? value : {}) as SocialLinks) ?? {
    zalo: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <input
        type="url"
        value={links.zalo ?? ""}
        onChange={(event) => onChange({ ...links, zalo: event.target.value })}
        placeholder="Link Zalo OA hoặc Zalo cá nhân"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="url"
        value={links.facebook ?? ""}
        onChange={(event) => onChange({ ...links, facebook: event.target.value })}
        placeholder="Link Fanpage Facebook"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="url"
        value={links.tiktok ?? ""}
        onChange={(event) => onChange({ ...links, tiktok: event.target.value })}
        placeholder="Link TikTok"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
      <input
        type="url"
        value={links.youtube ?? ""}
        onChange={(event) => onChange({ ...links, youtube: event.target.value })}
        placeholder="Link YouTube"
        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
      />
    </div>
  );
}

function BannerListField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: FeatureBannerItem[]) => void;
}) {
  const items = (Array.isArray(value) ? value : []) as FeatureBannerItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const addItem = () => {
    onChange([
      {
        title: "",
        subtitle: "",
        imageUrl: "",
        href: "",
        buttonLabel: "",
        eyebrow: "",
        eventDate: "",
      },
      ...items,
    ]);
    setOpenIndex(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600">Banner nổi bật</p>
        <button
          type="button"
          onClick={addItem}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white"
          title="Thêm banner"
          aria-label="Thêm banner"
        >
          +
        </button>
      </div>
      {items.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="rounded-[1.25rem] border border-slate-200 bg-white p-3"
        >
          <div className="grid grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-3">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.title || "Banner"} className="h-14 w-24 object-cover" />
              ) : (
                <div className="flex h-14 w-24 items-center justify-center text-[10px] font-bold uppercase text-slate-400">
                  Banner
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{item.title || "Banner mới"}</p>
              <p className="truncate text-xs text-slate-500">
                {[item.eyebrow, item.eventDate, item.href].filter(Boolean).join(" - ") || "Chưa có thông tin"}
              </p>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950"
                title="Sửa"
                aria-label="Sửa"
              >
                <EditIcon />
              </button>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-600"
                title="Xóa"
                aria-label="Xóa"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
          <div className={`mt-4 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)] ${openIndex === index ? "" : "hidden"}`}>
            <div className="space-y-3">
            <div className="overflow-hidden rounded-[1.2rem] border border-slate-200 bg-slate-100">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.title || "Banner"} className="h-44 w-full object-cover" />
              ) : (
                <div className="flex h-44 items-center justify-center text-sm text-slate-500">Ảnh banner</div>
              )}
            </div>
            <input
              type="url"
              value={item.imageUrl ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], imageUrl: event.target.value };
                onChange(next);
              }}
              placeholder="Link ảnh banner"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <label className="inline-flex cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
              Tải banner từ máy
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.currentTarget.value = "";
                  if (!file) return;
                  const body = new FormData();
                  body.append("file", file);
                  body.append("folder", "banners");
                  body.append("fileName", file.name);
                  const response = await fetch("/api/admin/upload", { method: "POST", body });
                  const result = await response.json();
                  if (!response.ok) return;
                  const next = [...items];
                  next[index] = { ...next[index], imageUrl: String(result.url) };
                  onChange(next);
                }}
              />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              value={item.eyebrow ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], eyebrow: event.target.value };
                onChange(next);
              }}
              placeholder="Nhãn nhỏ"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              type="text"
              value={item.eventDate ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], eventDate: event.target.value };
                onChange(next);
              }}
              placeholder="Thời gian"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              type="text"
              value={item.title ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], title: event.target.value };
                onChange(next);
              }}
              placeholder="Tiêu đề banner"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            />
            <textarea
              value={item.subtitle ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], subtitle: event.target.value };
                onChange(next);
              }}
              rows={4}
              placeholder="Mô tả ngắn"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
            />
            <input
              type="url"
              value={item.href ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], href: event.target.value };
                onChange(next);
              }}
              placeholder="Link chuyển trang"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              type="text"
              value={item.buttonLabel ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], buttonLabel: event.target.value };
                onChange(next);
              }}
              placeholder="Nút bấm"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <div className="hidden">
              <button
                type="button"
                onClick={() => {
                  if (index === 0) return;
                  const next = [...items];
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  onChange(next);
                }}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Lên
              </button>
              <button
                type="button"
                onClick={() => {
                  if (index === items.length - 1) return;
                  const next = [...items];
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  onChange(next);
                }}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Xuống
              </button>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
                className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...items,
            {
              title: "",
              subtitle: "",
              imageUrl: "",
              href: "",
              buttonLabel: "",
              eyebrow: "",
              eventDate: "",
            },
          ])
        }
        className="hidden"
      >
        Thêm banner
      </button>
    </div>
  );
}

function PermissionsField({
  value,
  role,
  onChange,
}: {
  value: unknown;
  role: unknown;
  onChange: (nextValue: string[]) => void;
}) {
  const selected = new Set((Array.isArray(value) ? value : ["posts"]).map(String));
  const isAdmin = role === "admin";
  const isBusiness = role === "business";

  return (
    <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
      <div className="mb-3 rounded-2xl bg-cyan-50 px-4 py-3 text-sm text-cyan-900">
        Admin có toàn quyền. Quản lý dùng các mục được cấp và chỉ duyệt bài khi có quyền duyệt. Doanh nghiệp chỉ đăng bài của mình và luôn chờ duyệt.
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {permissionOptions.map((option) => {
          const isLockedBusinessOption = isBusiness && option.value !== "posts";
          return (
            <label
              key={option.value}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                isAdmin || (isBusiness && option.value === "posts")
                  ? "border-cyan-100 bg-cyan-50 text-cyan-900"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={isAdmin || (isBusiness ? option.value === "posts" : selected.has(option.value))}
                disabled={isAdmin || isLockedBusinessOption}
                onChange={(event) => {
                  if (isBusiness) {
                    onChange(["posts"]);
                    return;
                  }
                  const next = new Set(selected);
                  if (event.target.checked) next.add(option.value);
                  else next.delete(option.value);
                  onChange(Array.from(next));
                }}
                className="h-5 w-5"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function SupportersField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: SupporterItem[]) => void;
}) {
  const items = (Array.isArray(value) ? value : []) as SupporterItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [supporterPage, setSupporterPage] = useState(1);
  const supporterPageSize = 20;
  const supporterTotalPages = Math.max(1, Math.ceil(items.length / supporterPageSize));
  const supporterCurrentPage = Math.min(supporterPage, supporterTotalPages);
  const supporterStart = (supporterCurrentPage - 1) * supporterPageSize;
  const visibleSupporters = items.slice(supporterStart, supporterStart + supporterPageSize);
  const updateItem = (index: number, patch: Partial<SupporterItem>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };
  const addItem = () => {
    onChange([{ group: "", name: "", logoUrl: "", website: "" }, ...items]);
    setOpenIndex(0);
    setSupporterPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600">Danh sách doanh nghiệp đồng hành</p>
        <button
          type="button"
          onClick={addItem}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white"
          title="Thêm doanh nghiệp đồng hành"
          aria-label="Thêm doanh nghiệp đồng hành"
        >
          +
        </button>
      </div>
      <div className="grid gap-4 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm leading-6 text-cyan-950 lg:grid-cols-[minmax(0,1fr)_150px] lg:items-center">
        <div>
          <p className="font-bold">Gợi ý logo đồng hành dạng tròn</p>
          <p>
            Upload ảnh vuông 1000 x 1000 px hoặc 800 x 800 px, tỷ lệ 1:1. Logo đặt giữa, nền trong
            hoặc nền trắng, chừa vùng an toàn 12-15% vì ngoài website sẽ bo tròn.
          </p>
        </div>
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white p-4 shadow-inner ring-1 ring-cyan-200">
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-cyan-300 text-center text-[10px] font-black uppercase tracking-[0.16em] text-cyan-800">
            1:1
            <br />
            1000px
          </div>
        </div>
      </div>
      {visibleSupporters.map((item, visibleIndex) => {
        const index = supporterStart + visibleIndex;

        return (
        <div
          key={
            [item.group, item.name, item.logoUrl, String(index)]
              .filter(Boolean)
              .join("-") || `supporter-${index}`
          }
          className="rounded-[1.25rem] border border-slate-200 bg-white p-3"
        >
          <div className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 p-2 ring-1 ring-slate-200">
              {item.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.logoUrl} alt={item.name || "Logo"} className="h-full w-full rounded-full object-contain" />
              ) : (
                <span className="text-[10px] font-bold uppercase text-slate-400">Logo</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{item.name || "Doanh nghiệp mới"}</p>
              <p className="truncate text-xs text-slate-500">
                {[item.group, item.website].filter(Boolean).join(" - ") || "Chưa có thông tin"}
              </p>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  if (index === 0) return;
                  const next = [...items];
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  onChange(next);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700"
                title="Lên"
                aria-label="Lên"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => {
                  if (index === items.length - 1) return;
                  const next = [...items];
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  onChange(next);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700"
                title="Xuống"
                aria-label="Xuống"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950"
                title="Sửa"
                aria-label="Sửa"
              >
                <EditIcon />
              </button>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-600"
                title="Xóa"
                aria-label="Xóa"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>

          <div className={`mt-4 grid gap-3 xl:grid-cols-[76px_minmax(160px,1fr)_minmax(150px,0.8fr)_minmax(180px,1fr)_auto] xl:items-center ${openIndex === index ? "" : "hidden"}`}>
          <div className="hidden" />
          <input
            type="text"
            value={item.name ?? ""}
            onChange={(event) => updateItem(index, { name: event.target.value })}
            placeholder="Tên doanh nghiệp"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            type="text"
            value={item.group ?? ""}
            onChange={(event) => updateItem(index, { group: event.target.value })}
            placeholder="Nhóm hiển thị"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <div className="grid gap-2">
            <input
              type="url"
              value={item.website ?? ""}
              onChange={(event) => updateItem(index, { website: event.target.value })}
              placeholder="Link website"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              type="url"
              value={item.logoUrl ?? ""}
              onChange={(event) => updateItem(index, { logoUrl: event.target.value })}
              placeholder="Link logo"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="hidden rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 xl:inline-flex">
              {index + 1}
            </span>
            <label className="inline-flex cursor-pointer rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">
              Tải logo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.currentTarget.value = "";
                  if (!file) return;
                  const body = new FormData();
                  body.append("file", file);
                  body.append("folder", "supporters");
                  body.append("fileName", file.name);
                  const response = await fetch("/api/admin/upload", { method: "POST", body });
                  const result = await response.json();
                  if (!response.ok) return;
                  updateItem(index, { logoUrl: String(result.url) });
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => {
                if (index === 0) return;
                const next = [...items];
                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                onChange(next);
              }}
              className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Lên
            </button>
            <button
              type="button"
              onClick={() => {
                if (index === items.length - 1) return;
                const next = [...items];
                [next[index + 1], next[index]] = [next[index], next[index + 1]];
                onChange(next);
              }}
              className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Xuống
            </button>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              className="rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-600"
            >
              Xóa
            </button>
          </div>
        </div>
        </div>
        );
      })}
      {supporterTotalPages > 1 ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-sm font-semibold text-slate-600">
            Trang {supporterCurrentPage} / {supporterTotalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={supporterCurrentPage <= 1}
              onClick={() => setSupporterPage((current) => Math.max(1, current - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 disabled:opacity-40"
              title="Trang trước"
              aria-label="Trang trước"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              disabled={supporterCurrentPage >= supporterTotalPages}
              onClick={() => setSupporterPage((current) => Math.min(supporterTotalPages, current + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 disabled:opacity-40"
              title="Trang sau"
              aria-label="Trang sau"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => onChange([...items, { group: "", name: "", logoUrl: "", website: "" }])}
        className="hidden"
      >
        Thêm doanh nghiệp đồng hành
      </button>
    </div>
  );
}
function ProductsField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: ProductItem[]) => void;
}) {
  const items = (Array.isArray(value) ? value : []) as ProductItem[];

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="grid gap-3 rounded-2xl border border-slate-200 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              value={item.title ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], title: event.target.value };
                onChange(next);
              }}
              placeholder="Tên sản phẩm hoặc dịch vụ"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <select
              value={item.type ?? "service"}
              onChange={(event) => {
                const next = [...items];
                next[index] = {
                  ...next[index],
                  type: event.target.value as ProductItem["type"],
                };
                onChange(next);
              }}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            >
              <option value="product">Sản phẩm</option>
              <option value="service">Dịch vụ</option>
            </select>
          </div>
          <textarea
            value={item.summary ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], summary: event.target.value };
              onChange(next);
            }}
            rows={3}
            placeholder="Mô tả ngắn"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="text"
              value={item.price ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], price: event.target.value };
                onChange(next);
              }}
              placeholder="Giá / thông tin giá"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
            <input
              type="url"
              value={item.link ?? ""}
              onChange={(event) => {
                const next = [...items];
                next[index] = { ...next[index], link: event.target.value };
                onChange(next);
              }}
              placeholder="Link chi tiết"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            />
          </div>
          <input
            type="url"
            value={item.imageUrl ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], imageUrl: event.target.value };
              onChange(next);
            }}
            placeholder="Link ảnh minh họa"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
              Tải ảnh từ máy
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.currentTarget.value = "";
                  if (!file) return;
                  const body = new FormData();
                  body.append("file", file);
                  body.append("folder", "products");
                  body.append("fileName", file.name);
                  const response = await fetch("/api/admin/upload", { method: "POST", body });
                  const result = await response.json();
                  if (!response.ok) return;
                  const next = [...items];
                  next[index] = { ...next[index], imageUrl: String(result.url) };
                  onChange(next);
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600"
            >
              Xóa
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([
            ...items,
            { title: "", imageUrl: "", summary: "", price: "", link: "", type: "service" },
          ])
        }
        className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
      >
        Thêm sản phẩm / dịch vụ
      </button>
    </div>
  );
}

function AiSettingsField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: AiAssistantSettings) => void;
}) {
  const settings = {
    ...defaultAiAssistantSettings,
    ...((value && typeof value === "object" ? value : {}) as Partial<AiAssistantSettings>),
  };

  function update<K extends keyof AiAssistantSettings>(key: K, nextValue: AiAssistantSettings[K]) {
    onChange({
      ...settings,
      [key]: nextValue,
    });
  }

  return (
    <div className="space-y-4 rounded-[1.5rem] border border-slate-200 bg-white p-4">
      <label className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
        <input
          type="checkbox"
          checked={Boolean(settings.enabled)}
          onChange={(event) => update("enabled", event.target.checked)}
          className="mt-1 h-5 w-5"
        />
        <span>
          <span className="block text-sm font-semibold text-slate-950">Bật Trợ Lý BIHUBA ngoài website</span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">
            Nút trợ lý sẽ hiển thị bên phải, phía trên nút đăng nhập/đăng ký.
          </span>
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Model DeepSeek (ưu tiên)</span>
        <input
          type="text"
          value={settings.deepseekModel || "deepseek-v4-flash"}
          onChange={(event) => update("deepseekModel", event.target.value)}
          placeholder="deepseek-v4-flash"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">API token DeepSeek</span>
        <input
          type="password"
          value={settings.deepseekApiToken || ""}
          onChange={(event) => update("deepseekApiToken", event.target.value)}
          placeholder="Nhập API token DeepSeek"
          autoComplete="new-password"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          DeepSeek được dùng trước. Token được che và chỉ gửi từ server; có thể để trống khi đã đặt DEEPSEEK_API_KEY trên Vercel.
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Model Groq (dự phòng)</span>
        <input
          type="text"
          value={settings.model}
          onChange={(event) => update("model", event.target.value)}
          placeholder="llama-3.1-8b-instant"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">API token Groq (dự phòng)</span>
        <input
          type="password"
          value={settings.apiToken || ""}
          onChange={(event) => update("apiToken", event.target.value)}
          placeholder="Nhập API token Groq"
          autoComplete="new-password"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          Groq chỉ được dùng khi DeepSeek chưa có token hoặc DeepSeek đang lỗi. Có thể để trống nếu đã cấu hình GROQ_API_KEY trên Vercel/server.
        </span>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Prompt hệ thống</span>
        <textarea
          value={settings.systemPrompt}
          onChange={(event) => update("systemPrompt", event.target.value)}
          rows={7}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        />
      </label>

      <p className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
        Thứ tự sử dụng: DEEPSEEK_API_KEY hoặc token DeepSeek trong admin, sau đó GROQ_API_KEY hoặc token Groq dự phòng. Không token nào được gửi ra trình duyệt.
      </p>
    </div>
  );
}

function ThemeField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: ThemeSettings) => void;
}) {
  const theme = ((value && typeof value === "object" ? value : {}) as ThemeSettings) ?? {
    primaryColor: "#0E4FAF",
    accentColor: "#56D6FF",
    surfaceColor: "#F8FAFC",
    headingScale: "1",
    bodyScale: "1",
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm text-slate-600">Màu chính</span>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="color"
            value={theme.primaryColor}
            onChange={(event) => onChange({ ...theme, primaryColor: event.target.value })}
            className="h-10 w-10 rounded border-0 bg-transparent"
          />
          <input
            type="text"
            value={theme.primaryColor}
            onChange={(event) => onChange({ ...theme, primaryColor: event.target.value })}
            className="w-full"
          />
        </div>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-slate-600">Màu nhấn</span>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="color"
            value={theme.accentColor}
            onChange={(event) => onChange({ ...theme, accentColor: event.target.value })}
            className="h-10 w-10 rounded border-0 bg-transparent"
          />
          <input
            type="text"
            value={theme.accentColor}
            onChange={(event) => onChange({ ...theme, accentColor: event.target.value })}
            className="w-full"
          />
        </div>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-slate-600">Màu nền sáng</span>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="color"
            value={theme.surfaceColor}
            onChange={(event) => onChange({ ...theme, surfaceColor: event.target.value })}
            className="h-10 w-10 rounded border-0 bg-transparent"
          />
          <input
            type="text"
            value={theme.surfaceColor}
            onChange={(event) => onChange({ ...theme, surfaceColor: event.target.value })}
            className="w-full"
          />
        </div>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-slate-600">Cỡ tiêu đề</span>
        <select
          value={theme.headingScale}
          onChange={(event) => onChange({ ...theme, headingScale: event.target.value })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        >
          <option value="0.95">Gọn hơn</option>
          <option value="1">Cân đối</option>
          <option value="1.08">Lớn hơn</option>
          <option value="1.15">Nổi bật</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-slate-600">Cỡ nội dung</span>
        <select
          value={theme.bodyScale}
          onChange={(event) => onChange({ ...theme, bodyScale: event.target.value })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
        >
          <option value="0.95">Gọn hơn</option>
          <option value="1">Cân đối</option>
          <option value="1.06">Dễ đọc hơn</option>
          <option value="1.12">Lớn hơn</option>
        </select>
      </label>
    </div>
  );
}

export function CollectionManager({
  collection,
  title,
  description,
  fields,
  initialItems,
  filterField,
  filterOptions = [],
  singleton = false,
  allowDelete = true,
  hideSingletonEditButton = false,
  closeHref,
  panelMaxWidthClass = "max-w-4xl",
  defaultSectionsOpen = true,
}: CollectionManagerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode");
  const initialEditId = searchParams.get("edit");
  const baseState = useMemo(() => buildInitialState(fields), [fields]);
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<FormState>(() => {
    if (singleton && initialItems[0]) {
      return buildFormFromRecord(fields, baseState, initialItems[0] as Record<string, unknown>);
    }

    return baseState;
  });
  const [editingId, setEditingId] = useState<string | null>(
    singleton && initialItems[0]?._id ? String(initialItems[0]._id) : null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [page, setPage] = useState(1);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [panelMode, setPanelMode] = useState<"closed" | "new" | "edit">(
    singleton && initialMode === "edit" ? "edit" : initialEditId ? "edit" : initialMode === "new" ? "new" : "closed"
  );
  const [activeEditId, setActiveEditId] = useState<string | null>(initialEditId);
  const editId = activeEditId;
  const isPanelOpen = singleton ? panelMode === "edit" : panelMode === "new" || panelMode === "edit";
  const returnPath = closeHref || pathname;
  const pageSize = 9;
  const isComposeForm = fields.some((field) => field.type === "richtext");

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return items.filter((item) => {
      const record = item as Record<string, unknown>;
      if (filterField && activeFilter && String(record[filterField] ?? "") !== activeFilter) {
        return false;
      }
      if (!keyword) return true;
      return [
        record.title,
        record.name,
        record.siteName,
        record.slug,
        record.category,
        record.partnerType,
        record.groupType,
      ]
        .map((value) => String(value ?? "").toLowerCase())
        .some((value) => value.includes(keyword));
    });
  }, [activeFilter, filterField, items, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const fieldSections = useMemo<FieldSection[]>(() => {
    const sections = new Map<string, FieldConfig[]>();
    fields.forEach((field) => {
      const key = field.section || "Nội dung";
      if (!sections.has(key)) {
        sections.set(key, []);
      }
      sections.get(key)?.push(field);
    });

    return Array.from(sections.entries()).map(([title, groupedFields]) => ({
      title,
      fields: groupedFields,
    }));
  }, [fields]);

  function replaceLocalUrl(url: string) {
    if (typeof window === "undefined") return;
    window.history.replaceState(null, "", url);
  }

  useEffect(() => {
    if (singleton && hideSingletonEditButton && closeHref && !isPanelOpen) {
      router.replace(closeHref, { scroll: false });
      return;
    }

    if (singleton) {
      if (!isPanelOpen) return;
      const record = (items[0] as Record<string, unknown> | undefined) ?? {};
      const frame = window.requestAnimationFrame(() => {
        setForm(buildFormFromRecord(fields, baseState, record));
        setEditingId(record._id ? String(record._id) : null);
        setStatus("");
        setOpenSections({});
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (!editId) {
      if (!isPanelOpen) {
        const frame = window.requestAnimationFrame(() => {
          setForm(baseState);
          setEditingId(null);
          setStatus("");
          setOpenSections({});
        });
        return () => window.cancelAnimationFrame(frame);
      }
      return;
    }

    const match = items.find((item) => String((item as Record<string, unknown>)._id) === editId);
    if (!match) return;

    const frame = window.requestAnimationFrame(() => {
      setForm(buildFormFromRecord(fields, baseState, match as Record<string, unknown>));
      setEditingId(editId);
      setStatus("");
      setOpenSections({});
    });

    return () => window.cancelAnimationFrame(frame);
  }, [baseState, closeHref, editId, fields, hideSingletonEditButton, isPanelOpen, items, router, singleton]);

  async function refresh() {
    const response = await fetch(`/api/admin/${collection}`, { cache: "no-store" });
    const payload = await response.json();
    setItems(payload.items ?? []);
    setPage(1);
  }

  function openNewPanel() {
    setForm(baseState);
    setEditingId(null);
    setActiveEditId(null);
    setPanelMode("new");
    setStatus("");
    setOpenSections({});
    replaceLocalUrl(`${pathname}?mode=new`);
  }

  function openEditPanel(item: Record<string, unknown>) {
    const nextId = String(item._id);
    setForm(buildFormFromRecord(fields, baseState, item));
    setEditingId(nextId);
    setActiveEditId(nextId);
    setPanelMode("edit");
    setStatus("");
    setOpenSections({});
    replaceLocalUrl(`${pathname}?mode=edit&edit=${nextId}`);
  }

  function closePanel() {
    setStatus("");
    setOpenSections({});
    setPanelMode("closed");
    setActiveEditId(null);
    if (returnPath === pathname) {
      replaceLocalUrl(returnPath);
      return;
    }
    router.replace(returnPath, { scroll: false });
  }

  function updateField(name: string, value: unknown) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function uploadAsset(file: File) {
    setIsUploading(true);
    setStatus("Đang tải media...");

    const payload = new FormData();
    payload.append("file", file);
    payload.append("folder", collection);
    payload.append("fileName", file.name);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: payload,
    });

    const result = await response.json();
    setIsUploading(false);

    if (!response.ok) {
      setStatus(result.message || "Tải lên thất bại.");
      throw new Error(result.message || "Tải lên thất bại.");
    }

    setStatus("Tải lên thành công.");
    return String(result.url);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");

    const payload = fields.reduce<Record<string, unknown>>((accumulator, field) => {
      accumulator[field.name] = form[field.name];
      return accumulator;
    }, {});

    const response = await fetch(
      editingId ? `/api/admin/${collection}/${editingId}` : `/api/admin/${collection}`,
      {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    setIsSaving(false);
    setStatus(result.message ?? "Đã lưu dữ liệu.");

    if (response.ok) {
      const savedItem =
        result.item && typeof result.item === "object"
          ? (result.item as Record<string, unknown>)
          : null;

      if (savedItem) {
        setItems((currentItems) => {
          if (singleton) return [savedItem];
          const savedId = String(savedItem._id ?? "");
          const exists = currentItems.some((item) => String(item._id ?? "") === savedId);
          return exists
            ? currentItems.map((item) => (String(item._id ?? "") === savedId ? savedItem : item))
            : [savedItem, ...currentItems];
        });
      } else {
        await refresh();
      }
      if (singleton) {
        closePanel();
        return;
      }
      closePanel();
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Xóa mục này?");
    if (!confirmed) return;

    const response = await fetch(`/api/admin/${collection}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    setStatus(result.message ?? "Đã xóa dữ liệu.");

    if (response.ok) {
      setItems((currentItems) => currentItems.filter((item) => String(item._id ?? "") !== id));
      if (editingId === id) {
        closePanel();
      }
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {description ? (
              <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
            ) : null}
          </div>
          {singleton ? (
            hideSingletonEditButton ? null : (
            <button
              type="button"
              onClick={() => {
                setPanelMode("edit");
                replaceLocalUrl(`${pathname}?mode=edit`);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 text-slate-950"
              title="Chỉnh sửa"
              aria-label="Chỉnh sửa"
            >
              <EditIcon />
            </button>
            )
          ) : (
            <button
              type="button"
              onClick={openNewPanel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 text-slate-950"
              title="Thêm mới"
              aria-label="Thêm mới"
            >
              <AddIcon />
            </button>
          )}
        </div>

        <div className="mt-6 space-y-3">
          {!singleton ? (
            <div className="space-y-3">
              {filterField && filterOptions.length ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveFilter("");
                      setPage(1);
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                      activeFilter
                        ? "border border-white/10 bg-slate-950/35 text-slate-300 hover:bg-white/10"
                        : "bg-cyan-400 text-slate-950"
                    }`}
                  >
                    Tất cả
                  </button>
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setActiveFilter(option.value);
                        setPage(1);
                      }}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                        activeFilter === option.value
                          ? "bg-cyan-400 text-slate-950"
                          : "border border-white/10 bg-slate-950/35 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Tìm theo tên, slug, danh mục..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white placeholder:text-slate-400"
              />
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 px-5 py-4 text-sm text-slate-300">
              {String((items[0] as Record<string, unknown> | undefined)?.siteName ?? title)}
            </div>
          )}
          {!singleton && pagedItems.map((item) => {
            const record = item as Record<string, unknown>;
            const headline = String(record.title ?? record.name ?? record.siteName ?? "Nội dung");
            const subhead = String(record.username ?? record.category ?? record.partnerType ?? record.slug ?? record.shortName ?? "");
            const permissionLabels = Array.isArray(record.permissions)
              ? permissionOptions
                  .filter((option) => (record.permissions as unknown[]).map(String).includes(option.value))
                  .map((option) => option.label)
                  .join(", ")
              : "";
            const previewImage = String(
              record.bannerImage ?? record.logo ?? record.featuredImage ?? record.coverImage ?? record.introImage ?? ""
            );
            const canDelete =
              allowDelete &&
              !singleton &&
              record._id &&
              !record.isProtected &&
              Number(record.userId ?? 0) !== 1;

            return (
              <article
                key={String(record._id ?? headline)}
                className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-slate-950/35 px-4 py-3"
              >
                <div className="grid min-w-0 grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3">
                  {previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewImage}
                      alt={headline}
                      className="h-11 w-11 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-xs font-semibold uppercase text-cyan-300">
                      {headline.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-white">{headline}</h3>
                    <div className="mt-1 flex min-w-0 items-center gap-2">
                      {subhead ? (
                        <p className="truncate text-xs text-slate-400">
                          {subhead}
                        </p>
                      ) : null}
                      {record.status ? <StatusIcon status={record.status} /> : null}
                      {record.role ? (
                        <span className="shrink-0 rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-200">
                          {getRoleLabel(record.role)}
                        </span>
                      ) : null}
                      {permissionLabels ? (
                        <p className="truncate text-xs text-slate-500">{permissionLabels}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="ml-auto flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditPanel(record)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition hover:scale-105"
                      title="Sửa"
                      aria-label="Sửa"
                    >
                      <EditIcon />
                    </button>
                    {canDelete ? (
                      <button
                        type="button"
                        onClick={() => handleDelete(String(record._id))}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-red-400/40 text-red-300 transition hover:scale-105 hover:bg-red-500/10"
                        title="Xóa"
                        aria-label="Xóa"
                      >
                        <DeleteIcon />
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {!singleton && totalPages > 1 ? (
          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-300">
              Trang {page} / {totalPages}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white disabled:opacity-40"
                title="Trang trước"
                aria-label="Trang trước"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white disabled:opacity-40"
                title="Trang sau"
                aria-label="Trang sau"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {isPanelOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm">
          <div
            className={`ml-auto h-full w-full ${panelMaxWidthClass} overflow-y-auto border-l border-white/10 bg-white text-slate-950 shadow-[0_0_70px_rgba(2,6,23,0.45)]`}
          >
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
                    {title}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    {editingId ? "Cập nhật nội dung" : "Tạo nội dung mới"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closePanel}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600"
                  aria-label="Đóng"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <form className="space-y-5 px-6 py-6" onSubmit={handleSubmit}>
              <div className={`grid gap-5 ${isComposeForm ? "grid-cols-1" : "xl:grid-cols-2"}`}>
                {fieldSections.map((section) => {
                  const hasRichText = section.fields.some((field) => field.type === "richtext");
                  const isSectionOpen = openSections[section.title] ?? defaultSectionsOpen;

                  return (
                  <section
                    key={section.title}
                    className={`rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5 ${
                      isComposeForm && (section.title === "Soạn bài" || hasRichText)
                        ? "xl:col-span-2"
                        : !isComposeForm && section.fields.some((field) => field.fullWidth || field.type === "richtext")
                          ? "xl:col-span-2"
                          : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSections((current) => ({
                          ...current,
                          [section.title]: !isSectionOpen,
                        }))
                      }
                      className="flex w-full items-center justify-between gap-3 text-left"
                    >
                      <span className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
                        {section.title}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-700 ring-1 ring-slate-200">
                        {isSectionOpen ? "-" : "+"}
                      </span>
                    </button>
                    {isSectionOpen ? (
                    <div
                      className={`mt-4 grid gap-4 ${
                        hasRichText
                          ? "grid-cols-1"
                          : "md:grid-cols-2"
                      }`}
                    >
                      {section.fields.map((field) => (
                        <label
                          key={field.name}
                          className={`block ${field.fullWidth || field.type === "richtext" ? "md:col-span-2" : ""}`}
                        >
                          <span className="mb-2 block text-sm font-medium">{field.label}</span>
                          {field.type === "textarea" ? (
                            <textarea
                              value={String(form[field.name] ?? "")}
                              onChange={(event) => updateField(field.name, event.target.value)}
                              rows={5}
                              placeholder={field.placeholder}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                            />
                          ) : field.type === "richtext" ? (
                            <RichTextEditor
                              value={String(form[field.name] ?? "")}
                              placeholder={field.placeholder}
                              onChange={(value) => updateField(field.name, value)}
                              onUploadImage={uploadAsset}
                            />
                          ) : field.type === "select" ? (
                            <select
                              value={String(form[field.name] ?? "")}
                              onChange={(event) => updateField(field.name, event.target.value)}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                            >
                              <option value="">Chọn giá trị</option>
                              {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "checkbox" ? (
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                              <input
                                type="checkbox"
                                checked={Boolean(form[field.name])}
                                onChange={(event) => updateField(field.name, event.target.checked)}
                                className="h-5 w-5"
                              />
                              <span className="text-sm text-slate-700">Đánh dấu nội dung nổi bật</span>
                            </div>
                          ) : field.type === "image" || field.type === "file" ? (
                            <div className="space-y-3">
                              <input
                                type="url"
                                value={String(form[field.name] ?? "")}
                                onChange={(event) => updateField(field.name, event.target.value)}
                                placeholder={field.placeholder || "https://"}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                              />
                              <div className="flex flex-wrap items-center gap-3">
                                <label className="inline-flex cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
                                  Tải từ máy
                                  <input
                                    type="file"
                                    accept={field.type === "image" ? "image/*" : "*"}
                                    className="hidden"
                                    onChange={async (event) => {
                                      const file = event.target.files?.[0];
                                      event.currentTarget.value = "";
                                      if (!file) return;
                                      const url = await uploadAsset(file);
                                      updateField(field.name, url);
                                    }}
                                  />
                                </label>
                                {field.type === "image" && form[field.name] ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={String(form[field.name])}
                                    alt={field.label}
                                    className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
                                  />
                                ) : null}
                              </div>
                              <p className="rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-xs leading-5 text-slate-600">
                                {IMAGEKIT_UPLOAD_NOTE}
                              </p>
                            </div>
                          ) : field.type === "stats" ? (
                            <StatListField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "nav" ? (
                            <NavListField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "contact" ? (
                            <ContactField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                              onUploadImage={uploadAsset}
                            />
                          ) : field.type === "social" ? (
                            <SocialField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "links" ? (
                            <LinksField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "permissions" ? (
                            <PermissionsField
                              value={form[field.name]}
                              role={form.role}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "supporters" ? (
                            <SupportersField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "banners" ? (
                            <BannerListField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "products" ? (
                            <ProductsField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "theme" ? (
                            <ThemeField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "ai" ? (
                            <AiSettingsField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : (
                            <input
                              type={
                                field.type === "date"
                                  ? "date"
                                  : field.type === "url"
                                    ? "url"
                                    : field.type === "password"
                                      ? "password"
                                      : "text"
                              }
                              value={String(form[field.name] ?? "")}
                              onChange={(event) => updateField(field.name, event.target.value)}
                              placeholder={field.placeholder}
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                            />
                          )}
                          {field.helpText ? (
                            <span className="mt-2 block text-xs text-slate-500">{field.helpText}</span>
                          ) : null}
                        </label>
                      ))}
                    </div>
                    ) : null}
                  </section>
                  );
                })}
              </div>

              <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t border-slate-200 bg-white pt-5">
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? "Đang lưu..." : editingId ? "Lưu thay đổi" : "Tạo mới"}
                </button>
                <button
                  type="button"
                  onClick={closePanel}
                  className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  Đóng
                </button>
                {status ? <p className="text-sm text-slate-600">{status}</p> : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
