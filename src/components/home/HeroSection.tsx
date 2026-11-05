
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-[640px] overflow-hidden bg-[#d9d3c9] md:min-h-[760px] lg:min-h-[820px]">
      {/* Hero Image */}
      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=90&w=2400&auto=format&fit=crop"
        alt="Warm minimalist interior with contemporary Scandinavian furniture"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Image Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />

      {/* Hero Content */}
      <div className="mx-auto flex min-h-[640px] max-w-[1800px] flex-col justify-end px-6 pb-16 pt-28 text-white md:min-h-[760px] md:px-12 md:pb-24 lg:min-h-[820px] lg:px-20 lg:pb-28">
        <div className="animate-hero max-w-[760px]">
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-white/70" />

            <p className="text-[9px] tracking-[0.28em] md:text-[10px]">
              LUNOR — OBJECTS FOR LIVING
            </p>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[clamp(3.5rem,8vw,7.5rem)] font-normal leading-[0.98] tracking-[-0.045em]">
            A quieter
            <br />
            way to live.
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-[390px] text-[13px] leading-6 text-white/90 md:mt-8 md:text-sm md:leading-7">
            Thoughtfully selected furniture and objects,
            made to bring warmth, balance and meaning
            to everyday spaces.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-7 md:mt-11">
            <Link
              href="/collections/all"
              className="group inline-flex min-h-[52px] items-center gap-8 bg-[#a69b8b] px-6 text-[9px] tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#8f8373]"
            >
              DISCOVER THE COLLECTION

              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* <Link
              href="/collections/all"
              className="group inline-flex items-center gap-2 text-[9px] tracking-[0.17em] text-white/90 transition-colors hover:text-white"
            >
              EXPLORE LUNOR

              <ArrowDownRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </Link> */}
          </div>
        </div>

        {/* Bottom Caption */}
        <div className="mt-16 flex items-end justify-between border-t border-white/30 pt-5 md:mt-20">
          <p className="text-[8px] tracking-[0.2em] text-white/80 md:text-[9px]">
            TIMELESS DESIGN · CONTEMPORARY LIVING
          </p>

          <p className="text-[9px] tracking-[0.15em] text-white/80">
            EST. LUNOR
          </p>
        </div>
      </div>
    </section>
  );
}
