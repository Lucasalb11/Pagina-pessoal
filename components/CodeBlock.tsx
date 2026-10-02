import { codeToHtml, type BundledLanguage } from "shiki";

export interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage | "text";
}

export default async function CodeBlock({ code, lang = "rust" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang: lang as BundledLanguage,
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
  });

  return (
    <div
      className="shiki-wrap my-6 overflow-x-auto rounded-md border border-[var(--color-rule)] p-4 font-mono text-[13px] leading-[1.6]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
