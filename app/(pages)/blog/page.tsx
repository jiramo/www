import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { PostData } from "@/types/post";

export default function BlogIndex() {
  const allPostsData: PostData[] = getSortedPostsData();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 antialiased">
      <h1 className="text-5xl text-center font-bold mb-16 text-neutral-950 dark:text-white">Blog</h1>
      <div className="flex flex-col gap-12">
        {allPostsData.map(({ id, date, title, excerpt }) => (
          <Link
            href={`/blog/${id}`}
            key={id}
            className="group block border glass rounded-xl p-6 md:px-12 md:py-6"
          >
            <article className="flex flex-col gap-4">
              <time className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-tight">
                {date}
              </time>

              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
                {title}
              </h2>

              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {excerpt}
              </p>

              <div className="pt-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
                Read →
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}