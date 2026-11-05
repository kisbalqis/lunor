
import Link from "next/link";
import Reveal from "../ui/Reveal";
import { ArrowRight } from "lucide-react";

export default function LivingSpacesSection() {
  return (
    <section className="bg-[#f7f6f2] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
            <div className="relative min-h-[420px] overflow-hidden md:min-h-[620px]">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=90&w=1800&auto=format&fit=crop"
                alt="Minimalist Scandinavian living space"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="max-w-[460px] lg:py-12">
              <p className="mb-6 text-[9px] tracking-[0.25em] text-[#918879]">
                SPACES TO INSPIRE
              </p>

              <h2 className="font-serif text-4xl leading-[1.15] text-[#252521] md:text-6xl">
                Create space
                <br />
                to feel at home.
              </h2>

              <p className="mt-7 text-sm leading-7 text-[#77736b]">
                A home is more than a collection of furniture.
                It is a reflection of how we live, what we value
                and the moments we create every day.
              </p>

              <Link
                href="/collections/all"
                className="group mt-9 inline-flex items-center gap-5 border-b border-[#252521] pb-3 text-[9px] tracking-[0.2em]"
              >
                DISCOVER THE COLLECTION

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
