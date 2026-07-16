"use client";

import { useEffect, useRef } from "react";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

type RichTextEditorProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onUploadImage: (file: File) => Promise<string>;
};

const toolbarButton =
  "rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100";

export function RichTextEditor({
  value,
  placeholder,
  onChange,
  onUploadImage,
}: RichTextEditorProps) {
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({ inline: false }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Youtube.configure({
        nocookie: true,
        controls: true,
      }),
      Placeholder.configure({
        placeholder: placeholder || "Nhập nội dung...",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] rounded-b-[1.5rem] border border-t-0 border-slate-200 px-5 py-4 outline-none prose prose-slate max-w-none prose-img:rounded-2xl prose-a:text-cyan-700",
      },
    },
    onUpdate({ editor: currentEditor }) {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 px-5 py-4 text-sm text-slate-500">
        Đang khởi tạo editor...
      </div>
    );
  }

  const activeEditor = editor;

  async function handleUpload(file: File) {
    const url = await onUploadImage(file);
    activeEditor.chain().focus().setImage({ src: url, alt: file.name }).run();
  }

  function promptForLink() {
    const previousUrl = activeEditor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Nhập liên kết", previousUrl || "https://");

    if (url === null) return;
    if (!url) {
      activeEditor.chain().focus().unsetLink().run();
      return;
    }

    activeEditor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function promptForYoutube() {
    const url = window.prompt("Dán link YouTube");
    if (!url) return;
    activeEditor
      .chain()
      .focus()
      .setYoutubeVideo({ src: url, width: 960, height: 540 })
      .run();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-t-[1.5rem] border border-slate-200 bg-slate-50 p-3">
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleHighlight().run()}
        >
          Highlight
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleBulletList().run()}
        >
          Bullet
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleOrderedList().run()}
        >
          Number
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </button>
        <button type="button" className={toolbarButton} onClick={promptForLink}>
          Link
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => uploadRef.current?.click()}
        >
          Ảnh
        </button>
        <button type="button" className={toolbarButton} onClick={promptForYoutube}>
          Video
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          type="button"
          className={toolbarButton}
          onClick={() => activeEditor.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.currentTarget.value = "";
          if (!file) return;
          await handleUpload(file);
        }}
      />

      <EditorContent editor={activeEditor} />
    </div>
  );
}
