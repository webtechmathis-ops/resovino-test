import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

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
  Image,
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
