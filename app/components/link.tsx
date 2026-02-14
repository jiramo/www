import NextLink from "next/link";

export default function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NextLink
      href={href}
      className="group relative inline-block text-sm text-neutral-600 transition-colors hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-500"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-orange-500 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
    </NextLink>
  );
}