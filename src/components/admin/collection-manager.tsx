"use client";

import { useMemo, useState } from "react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

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
  | "json";

type FieldConfig = {
  name: string;
  label: string;
  type?: FieldType;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  helpText?: string;
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

type FormState = Record<string, string | boolean>;

function buildInitialState(fields: FieldConfig[]): FormState {
  return fields.reduce<FormState>((accumulator, field) => {
    accumulator[field.name] = field.type === "checkbox" ? false : "";
    return accumulator;
  }, {});
}

function normalizeValue(field: FieldConfig, rawValue: unknown): string | boolean {
  if (field.type === "checkbox") return Boolean(rawValue);
  if (field.type === "json") {
    if (typeof rawValue === "string") return rawValue;
    return JSON.stringify(rawValue ?? "", null, 2);
  }
  return String(rawValue ?? "");
}

function summarizeValue(field: FieldConfig, rawValue: unknown) {
  if (field.type === "checkbox") return rawValue ? "Có" : "Không";
  const text = String(rawValue ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return "—";
  return text.length > 70 ? `${text.slice(0, 70)}...` : text;
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
  const baseState = useMemo(() => buildInitialState(fields), [fields]);
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<FormState>(() => {
    if (singleton && initialItems[0]) {
      const seedState = { ...baseState };
      const record = initialItems[0] as Record<string, unknown>;
      fields.forEach((field) => {
        seedState[field.name] = normalizeValue(field, record[field.name]);
      });
      return seedState;
    }

    return baseState;
  });
  const [editingId, setEditingId] = useState<string | null>(
    singleton && initialItems[0]?._id ? String(initialItems[0]._id) : null
  );
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function refresh() {
    const response = await fetch(`/api/admin/${collection}`, { cache: "no-store" });
    const payload = await response.json();
    setItems(payload.items ?? []);
  }

  function resetForm() {
    setForm(baseState);
    setEditingId(singleton && items[0]?._id ? String(items[0]._id) : null);
    setStatus("");
  }

  function startEdit(item: Record<string, unknown>) {
    const nextState = { ...baseState };
    fields.forEach((field) => {
      nextState[field.name] = normalizeValue(field, item[field.name]);
    });
    setForm(nextState);
    setEditingId(String(item._id));
    setStatus("Đang chỉnh sửa bản ghi đã chọn.");
  }

  function updateField(name: string, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function uploadAsset(file: File, fieldName: string) {
    setIsUploading(true);
    setStatus("Đang upload media...");

    const payload = new FormData();
    payload.append("file", file);
    payload.append("folder", `/bihuba/${collection}`);
    payload.append("fileName", file.name);
    payload.append("field", fieldName);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: payload,
    });

    const result = await response.json();
    setIsUploading(false);

    if (!response.ok) {
      setStatus(result.message || "Upload thất bại.");
      throw new Error(result.message || "Upload thất bại.");
    }

    setStatus("Upload thành công.");
    return String(result.url);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");

    let payload: Record<string, unknown>;

    try {
      payload = fields.reduce<Record<string, unknown>>((accumulator, field) => {
        const raw = form[field.name];

        if (field.type === "json") {
          const jsonValue = typeof raw === "string" && raw.trim() ? JSON.parse(raw) : null;
          accumulator[field.name] = jsonValue;
        } else {
          accumulator[field.name] = raw;
        }

        return accumulator;
      }, {});
    } catch {
      setIsSaving(false);
      setStatus("JSON chưa đúng định dạng. Vui lòng kiểm tra lại.");
      return;
    }

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
      if (!singleton) {
        resetForm();
      }
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Xóa bản ghi này?");
    if (!confirmed) return;

    const response = await fetch(`/api/admin/${collection}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    setStatus(result.message ?? "Đã xóa dữ liệu.");

    if (response.ok) {
      await refresh();
      if (editingId === id) {
        resetForm();
      }
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
          </div>
          {!singleton ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-white/15 px-4 py-2 text-sm"
            >
              Thêm mới
            </button>
          ) : null}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                {fields.slice(0, 4).map((field) => (
                  <th key={field.name} className="border-b border-white/10 px-3 py-3">
                    {field.label}
                  </th>
                ))}
                <th className="border-b border-white/10 px-3 py-3">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const record = item as Record<string, unknown>;
                return (
                  <tr key={String(record._id)} className="align-top">
                    {fields.slice(0, 4).map((field) => (
                      <td
                        key={field.name}
                        className="border-b border-white/5 px-3 py-4 text-slate-200"
                      >
                        {summarizeValue(field, record[field.name])}
                      </td>
                    ))}
                    <td className="border-b border-white/5 px-3 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(record)}
                          className="rounded-full bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-950"
                        >
                          Sửa
                        </button>
                        {allowDelete && !singleton ? (
                          <button
                            type="button"
                            onClick={() => handleDelete(String(record._id))}
                            className="rounded-full border border-red-400/40 px-3 py-2 text-xs font-semibold text-red-300"
                          >
                            Xóa
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950">
        <h2 className="text-2xl font-semibold">
          {editingId ? "Cập nhật nội dung" : "Tạo mới nội dung"}
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name} className="block">
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
                  onUploadImage={(file) => uploadAsset(file, field.name)}
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
                <input
                  type="checkbox"
                  checked={Boolean(form[field.name])}
                  onChange={(event) => updateField(field.name, event.target.checked)}
                  className="h-5 w-5"
                />
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
                      Upload từ máy
                      <input
                        type="file"
                        accept={field.type === "image" ? "image/*" : "*"}
                        className="hidden"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          event.currentTarget.value = "";
                          if (!file) return;
                          const url = await uploadAsset(file, field.name);
                          updateField(field.name, url);
                        }}
                      />
                    </label>
                    {field.type === "image" && form[field.name] ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={String(form[field.name])}
                          alt={field.label}
                          className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              ) : field.type === "json" ? (
                <textarea
                  value={String(form[field.name] ?? "")}
                  onChange={(event) => updateField(field.name, event.target.value)}
                  rows={8}
                  placeholder={field.placeholder || "[] hoặc {}"}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm"
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

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isSaving ? "Đang lưu..." : editingId ? "Cập nhật" : "Tạo mới"}
            </button>
            {!singleton ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Làm trống form
              </button>
            ) : null}
            {status ? <p className="text-sm text-slate-600">{status}</p> : null}
          </div>
        </form>
      </section>
    </div>
  );
}
