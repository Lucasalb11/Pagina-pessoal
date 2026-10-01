import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { BundledLanguage } from "shiki";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mb-4 mt-14 scroll-mt-8 text-[24px] font-semibold tracking-tight" {...props} />
  ),
  h3: (props) => <h3 className="mb-3 mt-8 text-[18px] font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mb-5 text-[17px] leading-[1.7] text-[var(--color-dim)]" {...props} />,
  a: ({ href, children, ...rest }) => {
    const url = href ?? "#";
    return isExternal(url) ? (
      <a href={url} className="link" {...rest}>
        {children}
      </a>
    ) : (
      <Link href={url} className="link" {...rest}>
        {children}
      </Link>
    );
  },
  ul: (props) => (
    <ul
      className="mb-5 list-disc pl-6 text-[17px] leading-[1.7] text-[var(--color-dim)] marker:text-[var(--color-faint)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-5 list-decimal pl-6 text-[17px] leading-[1.7] text-[var(--color-dim)] marker:text-[var(--color-faint)]"
      {...props}
    />
  ),
  li: (props) => <li className="mb-1.5 pl-1" {...props} />,
  strong: (props) => <strong className="font-semibold text-[var(--color-bone)]" {...props} />,
  hr: () => <hr className="my-12 border-[var(--color-line)]" />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-2 border-[var(--color-mint)]/50 pl-5 text-[var(--color-bone)]" {...props} />
  ),
  table: (props) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-[var(--color-line-strong)] py-2.5 pr-4 text-[13px] font-normal text-[var(--color-faint)]" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-[var(--color-line)] py-3 pr-4 align-top leading-relaxed text-[var(--color-dim)]" {...props} />
  ),
  code: (props) => (
    <code
      className="rounded bg-[var(--color-raised)] px-1.5 py-0.5 font-mono text-[0.86em] text-[var(--color-bone)]"
      {...props}
    />
  ),
  pre: ({ children, ...rest }) => {
    if (typeof children === "object" && children !== null && "props" in children) {
      const codeProps = (children as { props: { className?: string; children?: string } }).props;
      const lang = (codeProps.className?.match(/language-([\w-]+)/)?.[1] ?? "text") as BundledLanguage | "text";
      return <CodeBlock code={String(codeProps.children ?? "")} lang={lang} />;
    }
    return <pre {...rest}>{children}</pre>;
  },
};
