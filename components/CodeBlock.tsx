import { codeToHtml, type BundledLanguage } from "shiki";

export interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage | "text";
}

export default async function CodeBlock({ code, lang = "rust" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang: lang as BundledLanguage,
    theme: "vitesse-dark",
    transformers: [
      {
        pre(node) {
          node.properties.style = "background:transparent";
        },
      },
    ],
  });

  return (
    <figure className="my-8 overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)]">
      <div
        className="overflow-x-auto p-4 font-mono text-[13px] leading-[1.6] [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
