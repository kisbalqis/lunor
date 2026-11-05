
import Link from "next/link";
import { Camera, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Furniture", href: "/collections/furniture" },
    { label: "Lighting", href: "/collections/lighting" },
    { label: "Accessories", href: "/collections/accessories" },
    { label: "All Products", href: "/collections/all" },
  ],
  Information: [
    { label: "Our Story", href: "/pages/our-story" },
    { label: "Contact", href: "/pages/contact" },
    { label: "Shipping", href: "/pages/shipping" },
    { label: "FAQ", href: "/pages/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#252521] text-[#f7f6f2]">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">

        {/* Top Footer */}
        <div className="grid grid-cols-1 gap-14 border-b border-white/15 pb-16 md:grid-cols-2 md:gap-20">

          {/* Brand */}
          <div>
            <h2 className="text-4xl tracking-[0.3em]">LUNOR</h2>

            <p className="mt-5 max-w-[350px] text-sm leading-7 text-white/60">
              Timeless design, contemporary living. Thoughtfully
              selected furniture and objects for meaningful spaces.
            </p>

            {/* <Link
              href="https://www.instagram.com/"
              target="_blank"
              aria-label="Instagram"
              className="mt-7 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[#252521]"
            >
              <Camera size={17} />
            </Link> */}
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-white/60">
              THE LUNOR JOURNAL
            </p>

            <h3 className="mt-4 font-serif text-3xl">
              A little inspiration,
              <br />
              delivered thoughtfully.
            </h3>

            <form className="mt-8 flex border-b border-white/40 pb-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />

              <button
                type="button"
                aria-label="Subscribe"
                className="transition-transform hover:translate-x-1"
              >
                <ArrowUpRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-3">

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-6 text-[10px] tracking-[0.2em] text-white/50">
                {title.toUpperCase()}
              </h4>

              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/15 pt-7 text-[10px] tracking-wide text-white/50 md:flex-row">
         {/* <p>© {new Date().getFullYear()} LUNOR. ALL RIGHTS RESERVED.</p> */}
          <p>TIMELESS DESIGN · CONTEMPORARY LIVING</p>
        </div>
      </div>
    </footer>
  );
}
