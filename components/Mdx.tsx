import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { PairingFinder } from "./PairingFinder";
import { KeyTakeaway } from "./KeyTakeaway";

const components: MDXRemoteProps["components"] = {
  a: ({ href = "", children, ...rest }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
  img: ({ src = "", alt = "", ...rest }) => (
    <span className="my-8 block overflow-hidden rounded-2xl border border-[var(--border)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" {...rest} />
    </span>
  ),
  table: (props) => (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead style={{ backgroundColor: "var(--surface-2)" }} {...props} />
  ),
  th: (props) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted)]"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-t border-[var(--border)] px-4 py-3 align-top" {...props} />
  ),
  Image,
  PairingFinder,
  KeyTakeaway,
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              { behavior: "wrap", properties: { className: ["heading-anchor"] } },
            ],
          ],
        },
      }}
    />
  );
}
