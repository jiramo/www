import Image from "next/image";
import Link from "next/link";
import Button from "./button";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Product",
    href: "/product",
  },
  {
    label: "Docs",
    href: "/docs",
  },
];

export default function Nav() {
  return (
    <nav className="fixed bottom-5 w-full flex justify-center">
      <header className="flex items-center gap-8 rounded-[14px] border border-white/5 bg-black p-1.5">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Image
            src="/logo.svg"
            width={25}
            height={25}
            alt="Logo"
          />
        </Link>

        {/* Items */}
        <div className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <Button variant="outline" key={item.href} size="sm">
              {item.label}
            </Button>
          ))}
        </div>

        {/* CTA */}
        <Button variant="primary" size="sm">
          Join waitlist
        </Button>
      </header>
    </nav>
  );
}
