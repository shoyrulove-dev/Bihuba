"use client";

import { useMemo, useState } from "react";

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "date" | "checkbox" | "url";
  options?: Array<{ label: string; value: string }>;
};

type CollectionManagerProps = {
  collection: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  initialItems: Record<string, unknown>[];
};

type FormState = Record<string, string | boolean>;

function buildInitialState(fields: FieldConfig[]): FormState {
  return fields.reduce<FormState>((accumulator, field) => {
    accumulator[field.name] = field.type === "checkbox" ? false : "";
    return accumulator;
  }, {});
}

export function CollectionManager({
  collection,
  title,
  description,
  fields,
  initialItems,
}: CollectionManagerProps) {
  const baseState = useMemo(() => buildInitialState(fields), [fields]);
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<FormState>(baseState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");

  async function refresh() {
    const response = await fetch(`/api/admin/${collection}`);
    const payload = await response.json();
    setItems(payload.items ?? []);
  }

  function resetForm() {
    setForm(baseState);
    setEditingId(null);
  }

  function startEdit(item: Record<string, unknown>) {
    const nextState = { ...baseState };

    fields.forEach((field) => {
      const rawValue = item[field.name];
      nextState[field.name] =
        field.type === "checkbox" ? Boolean(rawValue) : String(rawValue ?? "");
    });

    setForm(nextState);
    setEditingId(String(item._id));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");

    const payload = fields.reduce<Record<string, string | boolean>>(
      (accumulator, field) => {
        accumulator[field.name] = form[field.name];
        return accumulator;
      },
      {}
    );

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
    setStatus(result.message ?? "Đã lưu dữ liệu.");
    setIsSaving(false);

    if (response.ok) {
      resetForm();
      await refresh();
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
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">{description}</p>
          </div>
          <button
            onClick={resetForm}
            className="rounded-full border border-white/15 px-4 py-2 text-sm"
          >
            Form mới
          </button>
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
              {items.map((item) => (
                <tr key={String(item._id)} className="align-top">
                  {fields.slice(0, 4).map((field) => (
                    <td
                      key={field.name}
                      className="border-b border-white/5 px-3 py-4 text-slate-200"
                    >
                      {String(item[field.name] ?? "")}
                    </td>
                  ))}
                  <td className="border-b border-white/5 px-3 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="rounded-full bg-cyan-400 px-3 py-2 text-xs font-semibold text-slate-950"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(String(item._id))}
                        className="rounded-full border border-red-400/40 px-3 py-2 text-xs font-semibold text-red-300"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950">
        <h2 className="text-2xl font-semibold">
          {editingId ? "Cập nhật" : "Thêm mới"}
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block text-sm font-medium">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  value={String(form[field.name] ?? "")}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                />
              ) : field.type === "select" ? (
                <select
                  value={String(form[field.name] ?? "")}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
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
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.name]: event.target.checked,
                    }))
                  }
                  className="h-5 w-5"
                />
              ) : (
                <input
                  type={field.type === "date" ? "date" : field.type === "url" ? "url" : "text"}
                  value={String(form[field.name] ?? "")}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                />
              )}
            </label>
          ))}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isSaving ? "Đang lưu..." : editingId ? "Cập nhật" : "Tạo mới"}
            </button>
            {status ? <p className="text-sm text-slate-600">{status}</p> : null}
          </div>
        </form>
      </section>
    </div>
  );
}
