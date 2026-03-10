import ReactMarkdown, { Components } from "react-markdown";
import { getPostData } from "@/lib/posts";
import { PostData } from "@/types/post";
import { notFound } from "next/navigation";
import Link from "next/link";

const MarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mb-6 mt-10 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-4 mt-8 text-xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
      {children}
    </h2>
  ),

  p: ({ children }) => (
    <p className="mb-5 leading-7 text-neutral-600 dark:text-neutral-400 last:mb-0">
      {children}
    </p>
  ),

  a: ({ children, href }) => (
    <Link
      href={href || ""}
      target="_blank"
      className="text-orange-500 transition-colors duration-200 hover:text-orange-600 dark:hover:text-orange-400 underline-offset-4 hover:underline"
    >
      {children}
    </Link>
  ),

  ul: ({ children }) => <ul className="mb-6 ml-1 space-y-2">{children}</ul>,
  li: ({ children }) => (
    <li className="flex items-start text-neutral-600 dark:text-neutral-400">
      <span className="mr-3 select-none text-neutral-300 dark:text-neutral-600">
        •
      </span>
      <div>{children}</div>
    </li>
  ),

  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l border-neutral-200 pl-4 italic text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
      {children}
    </blockquote>
  ),

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="my-10 w-full rounded-lg object-cover shadow-sm"
    />
  ),

  code: ({ node, className, children, ...props }) => {
    const isBlock = /language-(\w+)/.exec(className || "");

    if (isBlock) {
      return (
        <div className="my-8 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between bg-neutral-50 px-4 py-2 dark:bg-neutral-900/50">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              {className?.replace("language-", "")}
            </span>
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-neutral-800 dark:text-neutral-300 bg-white dark:bg-neutral-800/50">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    }

    return (
      <code
        className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-orange-600 dark:bg-neutral-800 dark:text-orange-300"
        {...props}
      >
        {children}
      </code>
    );
  },
};

interface PostProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostProps) {
  const { slug } = await params;

  try {
    const postData: PostData = getPostData(slug);

    return (
      <article className="max-w-2xl mx-auto px-6 py-20">
        <header className="mb-14">
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-100 leading-tight">
            {postData.title}
          </h1>
          <time className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            {postData.date}
          </time>
        </header>

        <section>
          <ReactMarkdown components={MarkdownComponents}>
            {postData.content || ""}
          </ReactMarkdown>
        </section>
      </article>
    );
  } catch (error) {
    return notFound();
  }
}
