import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import type { BundledLanguage } from "shiki";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mb-3 mt-10 scroll-mt-8 text-[17px] font-semibold" {...props} />,
  h3: (props) => <h3 className="mb-2 mt-6 font-semibold" {...props} />,
  p: (props) => <p className="mb-4" {...props} />,
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
  ul: (props) => <ul className="mb-4 list-disc space-y-1.5 pl-5 marker:text-[var(--color-faint)]" {...props} />,
  ol: (props) => <ol className="mb-4 list-decimal space-y-1.5 pl-5 marker:text-[var(--color-faint)]" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  hr: () => <hr className="my-10 border-[var(--color-rule)]" />,
  blockquote: (props) => (
    <blockquote className="my-5 border-l-2 border-[var(--color-rule)] pl-4 text-[var(--color-soft)]" {...props} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[14px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-[var(--color-rule)] py-2 pr-4 font-medium text-[var(--color-faint)]" {...props} />
  ),
  td: (props) => <td className="border-b border-[var(--color-rule)] py-2.5 pr-4 align-top" {...props} />,
  code: (props) => (
    <code className="rounded bg-[color-mix(in_oklab,var(--color-ink)_7%,transparent)] px-1 py-0.5 font-mono text-[0.88em]" {...props} />
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
