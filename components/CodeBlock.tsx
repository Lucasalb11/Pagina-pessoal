import { codeToHtml, type BundledLanguage } from "shiki";

export interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage | "text";
  filename?: string;
}

export default async function CodeBlock({
  code,
  lang = "rust",
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang: lang as BundledLanguage,
    theme: "vitesse-light",
    transformers: [
      {
        pre(node) {
          node.properties.style = "background:transparent";
        },
      },
    ],
  });

  return (
    <figure className="my-8 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] overflow-hidden">
      {filename ? (
        <figcaption className="px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-muted-foreground)] border-b border-[color:var(--color-border)]">
          {filename}
        </figcaption>
      ) : null}
      <div
        className="text-[13px] leading-[1.55] font-mono overflow-x-auto p-4 [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
