"use client";

import { useEffect, useSyncExternalStore } from "react";
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

const LANGUAGE_STORAGE_KEY = "bihuba-language";

function subscribeToLanguage() {
  return () => undefined;
}

function getStoredLanguage() {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "";
  return languageOptions.some((option) => option.value === savedLanguage) ? savedLanguage : "";
}

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
  const language = useSyncExternalStore(subscribeToLanguage, getStoredLanguage, () => "");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "";
    const isSupported = languageOptions.some((option) => option.value === savedLanguage);
    const hasLegacyTranslation = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("googtrans=/vi/"));

    if (!isSupported) {
      window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
      setTranslateCookie("");
      return;
    }

    if (!savedLanguage && hasLegacyTranslation) {
      setTranslateCookie("");
      window.location.reload();
    }
  }, []);

  return (
    <div className="google-translate-shell notranslate" translate="no">
      <label className="google-translate-control">
        <select
          value={language}
          aria-label="Chọn ngôn ngữ"
          onChange={(event) => {
            const nextLanguage = event.target.value;
            if (nextLanguage) {
              window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
            } else {
              window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
            }
            setTranslateCookie(nextLanguage);
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
      {language ? (
        <>
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
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />
        </>
      ) : null}
    </div>
  );
}
