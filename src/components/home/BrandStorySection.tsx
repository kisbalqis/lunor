
import Link from "next/link";
import Reveal from "../ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export default function BrandStorySection() {
  return (
    <section className="bg-[#252521] px-6 py-24 text-[#f7f6f2] md:px-12 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-7 text-[9px] tracking-[0.28em] text-[#b7ad9f]">
                THE LUNOR PHILOSOPHY
              </p>

              <h2 className="font-serif text-5xl leading-[1.1] md:text-7xl">
                Less, but
                <br />
                more meaningful.
              </h2>

              <p className="mt-8 max-w-[430px] text-sm leading-8 text-white/65">
                We believe in thoughtful design, honest materials
                and timeless forms. Every piece should have a
                purpose, a presence and a place in the spaces
                we call home.
              </p>

              <Link
                href="/about"
                className="mt-9 inline-flex items-center gap-4 border-b border-white/60 pb-3 text-[9px] tracking-[0.2em] transition-colors hover:text-[#b7ad9f]"
              >
                OUR STORY
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=1400&auto=format&fit=crop"
                alt="Timeless contemporary interior"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
