import { createContext, useContext, useState, useCallback, useEffect, type ReactNode, createElement } from "react";
import type { Lang, DictKey } from "@/lib/i18n";
import { t as translate } from "@/lib/i18n";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: DictKey) => string;
}

const Ctx = createContext<LangCtx | null>(null);

const STORAGE_KEY = "lda:lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    return stored === "pt" ? "pt" : "en";
  });

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === "en" ? "pt" : "en")), []);
  const t = useCallback((key: DictKey) => translate(lang, key), [lang]);

  return createElement(Ctx.Provider, { value: { lang, setLang, toggle, t } }, children);
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be inside LangProvider");
  return ctx;
}
