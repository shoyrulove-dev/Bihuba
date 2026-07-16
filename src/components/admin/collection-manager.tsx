"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FloatingActions, ProductItem, SupporterItem, ThemeSettings } from "@/types/cms";

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
  | "supporters"
  | "products"
  | "theme";

type FieldConfig = {
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
  singleton?: boolean;
  allowDelete?: boolean;
};

type StatItem = { label: string; value: string };
type NavItem = { label: string; href: string };
type ContactItem = { address: string; phone: string; email: string; website?: string };
type FormState = Record<string, unknown>;

type FieldSection = {
  title: string;
  fields: FieldConfig[];
};

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

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function buildInitialValue(field: FieldConfig) {
  switch (field.type) {
    case "checkbox":
      return false;
    case "stats":
    case "nav":
      return [];
    case "contact":
      return { address: "", phone: "", email: "", website: "" };
    case "social":
      return { zaloUrl: "", facebookUrl: "", callNumber: "", callLabel: "" };
    case "supporters":
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
    return { address: "", phone: "", email: "", website: "" };
  }
  if (field.type === "social") {
    if (rawValue && typeof rawValue === "object") return rawValue;
    return { zaloUrl: "", facebookUrl: "", callNumber: "", callLabel: "" };
  }
  if (field.type === "supporters") {
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
}: {
  value: unknown;
  onChange: (nextValue: ContactItem) => void;
}) {
  const contact = ((value && typeof value === "object" ? value : {}) as ContactItem) ?? {
    address: "",
    phone: "",
    email: "",
    website: "",
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

function SupportersField({
  value,
  onChange,
}: {
  value: unknown;
  onChange: (nextValue: SupporterItem[]) => void;
}) {
  const items = (Array.isArray(value) ? value : []) as SupporterItem[];

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={`${item.name}-${index}`}
          className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-2"
        >
          <input
            type="text"
            value={item.name ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], name: event.target.value };
              onChange(next);
            }}
            placeholder="Tên doanh nghiệp"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            type="url"
            value={item.website ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], website: event.target.value };
              onChange(next);
            }}
            placeholder="Link website"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          />
          <input
            type="url"
            value={item.logoUrl ?? ""}
            onChange={(event) => {
              const next = [...items];
              next[index] = { ...next[index], logoUrl: event.target.value };
              onChange(next);
            }}
            placeholder="Link logo"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
          />
          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
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
            <label className="inline-flex cursor-pointer rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
              Tải logo từ máy
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
                  const next = [...items];
                  next[index] = { ...next[index], logoUrl: String(result.url) };
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
        onClick={() => onChange([...items, { name: "", logoUrl: "", website: "" }])}
        className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
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
  singleton = false,
  allowDelete = true,
}: CollectionManagerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
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
  const [page, setPage] = useState(1);
  const mode = searchParams.get("mode");
  const editId = searchParams.get("edit");
  const isPanelOpen = singleton ? mode === "edit" : mode === "new" || Boolean(editId);
  const pageSize = 9;

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return items;
    return items.filter((item) => {
      const record = item as Record<string, unknown>;
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
  }, [items, search]);

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

  useEffect(() => {
    if (singleton) {
      if (!isPanelOpen) return;
      const record = (items[0] as Record<string, unknown> | undefined) ?? {};
      const frame = window.requestAnimationFrame(() => {
        setForm(buildFormFromRecord(fields, baseState, record));
        setEditingId(record._id ? String(record._id) : null);
        setStatus("");
      });

      return () => window.cancelAnimationFrame(frame);
    }

    if (!editId) {
      if (!isPanelOpen) {
        const frame = window.requestAnimationFrame(() => {
          setForm(baseState);
          setEditingId(null);
          setStatus("");
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
      setStatus("Đang chỉnh sửa mục đã chọn.");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [baseState, editId, fields, isPanelOpen, items, singleton]);

  async function refresh() {
    const response = await fetch(`/api/admin/${collection}`, { cache: "no-store" });
    const payload = await response.json();
    setItems(payload.items ?? []);
    setPage(1);
  }

  function openNewPanel() {
    setForm(baseState);
    setEditingId(null);
    setStatus("");
    router.replace(`${pathname}?mode=new`, { scroll: false });
  }

  function openEditPanel(item: Record<string, unknown>) {
    const nextId = String(item._id);
    setForm(buildFormFromRecord(fields, baseState, item));
    setEditingId(nextId);
    setStatus("Đang chỉnh sửa mục đã chọn.");
    router.replace(`${pathname}?mode=edit&edit=${nextId}`, { scroll: false });
  }

  function closePanel() {
    setStatus("");
    router.replace(pathname, { scroll: false });
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
      await refresh();
      if (singleton) {
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
      await refresh();
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
            <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
          </div>
          {singleton ? (
            <button
              type="button"
              onClick={() => router.replace(`${pathname}?mode=edit`, { scroll: false })}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              <EditIcon />
              Chỉnh sửa
            </button>
          ) : (
            <button
              type="button"
              onClick={openNewPanel}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              <AddIcon />
              Thêm mới
            </button>
          )}
        </div>

        <div className="mt-6 space-y-3">
          {!singleton ? (
            <div>
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
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Bộ cấu hình đang dùng
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-white">
                    {String((items[0] as Record<string, unknown> | undefined)?.siteName ?? title)}
                  </p>
                  <p className="text-sm text-slate-300">
                    Một nơi duy nhất để cập nhật nhận diện, trang chủ, liên hệ, nút nổi và giao diện.
                  </p>
                </div>
              </div>
            </div>
          )}
          {!singleton && pagedItems.map((item) => {
            const record = item as Record<string, unknown>;
            const headline = String(record.title ?? record.name ?? record.siteName ?? "Nội dung");
            const subhead = String(record.slug ?? record.category ?? record.partnerType ?? record.shortName ?? "");
            const previewImage = String(
              record.logo ?? record.featuredImage ?? record.coverImage ?? record.introImage ?? ""
            );

            return (
              <article
                key={String(record._id ?? headline)}
                className="flex flex-wrap items-center gap-3 rounded-[1.4rem] border border-white/10 bg-slate-950/35 px-4 py-3"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
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
                    {subhead ? (
                      <p className="truncate text-xs uppercase tracking-[0.18em] text-cyan-300">
                        {subhead}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditPanel(record)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-slate-950 transition hover:scale-105"
                    title="Sửa"
                    aria-label="Sửa"
                  >
                    <EditIcon />
                  </button>
                  {allowDelete && !singleton && record._id ? (
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
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-40"
              >
                Trước
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-40"
              >
                Sau
              </button>
            </div>
          </div>
        ) : null}
      </section>

      {isPanelOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm">
          <div className="ml-auto h-full w-full max-w-4xl overflow-y-auto border-l border-white/10 bg-white text-slate-950 shadow-[0_0_70px_rgba(2,6,23,0.45)]">
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
              <div className="grid gap-5 xl:grid-cols-2">
                {fieldSections.map((section) => (
                  <section
                    key={section.title}
                    className={`rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5 ${
                      section.fields.some((field) => field.fullWidth) ? "xl:col-span-2" : ""
                    }`}
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
                      {section.title}
                    </h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {section.fields.map((field) => (
                        <label
                          key={field.name}
                          className={`block ${field.fullWidth ? "md:col-span-2" : ""}`}
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
                            />
                          ) : field.type === "social" ? (
                            <SocialField
                              value={form[field.name]}
                              onChange={(value) => updateField(field.name, value)}
                            />
                          ) : field.type === "supporters" ? (
                            <SupportersField
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
                          ) : (
                            <input
                              type={field.type === "date" ? "date" : field.type === "url" ? "url" : "text"}
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
                  </section>
                ))}
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
