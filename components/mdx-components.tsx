import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import type { BundledLanguage } from "shiki";

function InlineCode({ children }: { children?: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-[color:var(--color-surface)] border border-[color:var(--color-border)] font-mono text-[0.85em] text-[color:var(--color-accent)]">
      {children}
    </code>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-editorial text-4xl md:text-5xl leading-[1.05] mt-14 mb-6"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-editorial text-2xl md:text-3xl leading-tight mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-editorial text-xl leading-tight mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85 mb-5"
      {...props}
    />
  ),
  a: ({ href, children, ...rest }) => {
    const url = href ?? "#";
    if (isExternal(url)) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)]/40 hover:border-[color:var(--color-primary)] inline-flex items-center gap-0.5"
          {...rest}
        >
          {children}
          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
        </a>
      );
    }
    return (
      <Link
        href={url}
        className="text-[color:var(--color-primary)] border-b border-[color:var(--color-primary)]/40 hover:border-[color:var(--color-primary)]"
        {...rest}
      >
        {children}
      </Link>
    );
  },
  ul: (props) => (
    <ul className="list-disc pl-6 mb-5 text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85 marker:text-[color:var(--color-muted-foreground)]" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 mb-5 text-[17px] leading-relaxed text-[color:var(--color-foreground)]/85 marker:text-[color:var(--color-muted-foreground)]" {...props} />
  ),
  li: (props) => <li className="mb-1.5" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 pl-5 border-l-2 border-[color:var(--color-primary)]/40 font-editorial italic text-xl text-[color:var(--color-foreground)]/85"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-t border-[color:var(--color-border)]" />,
  code: InlineCode,
  pre: ({ children, ...rest }) => {
    // when a fenced code block reaches here, children is a <code className="language-xxx">
    if (
      typeof children === "object" &&
      children !== null &&
      "props" in children
    ) {
      const codeProps = (
        children as { props: { className?: string; children?: string } }
      ).props;
      const raw = String(codeProps.children ?? "");
      const langMatch = codeProps.className?.match(/language-([\w-]+)/);
      const lang = (langMatch?.[1] ?? "text") as BundledLanguage | "text";
      return <CodeBlock code={raw} lang={lang} />;
    }
    return <pre {...rest}>{children}</pre>;
  },
  strong: (props) => (
    <strong className="text-[color:var(--color-foreground)] font-semibold" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  // Custom MDX helpers for deep-dives
  Callout: ({ children }: { children?: React.ReactNode }) => (
    <aside className="my-6 px-4 py-3 rounded-xl border border-[color:var(--color-primary)]/30 bg-[color:var(--color-primary)]/5 text-[15px] leading-relaxed text-[color:var(--color-foreground)]/85">
      {children}
    </aside>
  ),
};
