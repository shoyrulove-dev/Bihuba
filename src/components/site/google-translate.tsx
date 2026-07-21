"use client";

import Script from "next/script";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string
        ) => void;
      };
    };
  }
}

const languageOptions = [
  { label: "Tiếng Việt", value: "" },
  { label: "English", value: "en" },
  { label: "日本語", value: "ja" },
  { label: "한국어", value: "ko" },
  { label: "中文", value: "zh-CN" },
  { label: "ไทย", value: "th" },
];

function setTranslateCookie(language: string) {
  const value = language ? `/vi/${language}` : "";
  const expires = language ? "Fri, 31 Dec 9999 23:59:59 GMT" : "Thu, 01 Jan 1970 00:00:00 GMT";
  const domains = [window.location.hostname, `.${window.location.hostname}`];

  domains.forEach((domain) => {
    document.cookie = `googtrans=${value}; expires=${expires}; path=/; domain=${domain}`;
  });
  document.cookie = `googtrans=${value}; expires=${expires}; path=/`;
}

export function GoogleTranslate() {
  return (
    <div className="google-translate-shell">
      <label className="google-translate-control">
        <select
          defaultValue=""
          aria-label="Chọn ngôn ngữ"
          onChange={(event) => {
            setTranslateCookie(event.target.value);
            window.location.reload();
          }}
        >
          {languageOptions.map((option) => (
            <option key={option.value || "vi"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div id="google_translate_element" aria-hidden="true" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          window.googleTranslateElementInit = function() {
            new window.google.translate.TranslateElement({
              pageLanguage: 'vi',
              includedLanguages: 'vi,en,ja,ko,zh-CN,th',
              autoDisplay: false
            }, 'google_translate_element');
          };
        `}
      </Script>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </div>
  );
}
