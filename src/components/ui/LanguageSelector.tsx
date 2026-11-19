"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function LanguageSelector() {
  const { locale, setLocale, messages } = useLanguage();
  return (
    <div className="language-selector glass flex shrink-0 items-center rounded-full p-1 text-charcoal" role="group" aria-label={messages.ui.language}>
      {(["en", "pt-BR"] as const).map((value) => (
        <button key={value} type="button" lang={value} aria-label={value === "en" ? "English" : "Português (Brasil)"}
          aria-pressed={locale === value} onClick={() => { if (locale !== value) setLocale(value); }}
          className={`min-h-9 min-w-9 rounded-full px-2 font-display text-[0.65rem] font-bold transition-colors ${locale === value ? "bg-charcoal text-ivory" : "hover:bg-charcoal/10"}`}>
          {value === "en" ? "EN" : "PT"}
        </button>
      ))}
    </div>
  );
}
