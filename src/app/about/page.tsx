
import Link from "next/link";
import Image from "next/image";
import AnnouncementBar from "@/src/components/layout/AnnouncementBar";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import Reveal from "@/src/components/ui/Reveal";

const values = [
  {
    number: "01",
    title: "Timeless Design",
    description:
      "We believe great design goes beyond trends. Every piece is selected to bring lasting beauty and purpose into your home.",
  },
  {
    number: "02",
    title: "Natural Harmony",
    description:
      "Inspired by Scandinavian living, we embrace natural materials, subtle textures, and calming tones.",
  },
  {
    number: "03",
    title: "Everyday Living",
    description:
      "Furniture should make everyday life better. We focus on pieces that balance comfort, functionality, and simplicity.",
  },
];

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="bg-[#f7f6f2] text-[#252521]">
        {/* Hero */}
        <section className="px-6 pb-16 pt-24 text-center md:px-12 md:pb-24 md:pt-36">
          <Reveal>
            <p className="text-[10px] tracking-[0.3em] text-[#918879]">
              OUR STORY
            </p>

            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-light leading-[1.2] tracking-[-0.04em] md:text-7xl">
              A more thoughtful
              <br />
              way of living.
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#77736b]">
              LUNOR is a celebration of thoughtful design, natural
              materials, and the beauty of everyday living.
            </p>
          </Reveal>
        </section>

        {/* Main Image */}
        <section className="px-4 md:px-8">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e4dc]">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000"
                alt="Minimalist Scandinavian living room"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* Brand Introduction */}
        <section className="mx-auto grid max-w-[1200px] gap-10 px-6 py-24 md:grid-cols-2 md:gap-24 md:px-12 md:py-36">
          <Reveal>
            <p className="text-[10px] tracking-[0.25em] text-[#918879]">
              THE LUNOR PHILOSOPHY
            </p>
            <h2 className="mt-6 text-3xl font-light leading-tight tracking-[-0.03em] md:text-5xl">
              Less, but
              <br />
              meaningful.
            </h2>
          </Reveal>

          <Reveal>
            <div className="space-y-5 text-sm leading-8 text-[#77736b]">
              <p>
                At LUNOR, we believe a beautiful home is not defined
                by how much it holds, but by how thoughtfully each
                element is chosen.
              </p>
              <p>
                Our approach is rooted in Scandinavian design
                principles — simplicity, functionality, and a deep
                appreciation for natural beauty.
              </p>
              <p>
                We curate furniture and home objects that bring
                warmth, balance, and intention into everyday spaces.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Values */}
        <section className="bg-[#eeece6] px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <div className="mb-16 text-center">
                <p className="text-[10px] tracking-[0.25em] text-[#918879]">
                  WHAT WE BELIEVE
                </p>
                <h2 className="mt-5 text-3xl font-light tracking-[-0.03em] md:text-5xl">
                  Designed with intention.
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-12 md:grid-cols-3 md:gap-16">
              {values.map((value) => (
                <Reveal key={value.number}>
                  <div className="border-t border-[#c9c3b8] pt-6">
                    <span className="text-xs text-[#918879]">
                      {value.number}
                    </span>
                    <h3 className="mt-8 text-xl font-light">
                      {value.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#77736b]">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-6 py-28 text-center md:py-40">
          <Reveal>
            <p className="text-[10px] tracking-[0.25em] text-[#918879]">
              DISCOVER LUNOR
            </p>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-light leading-tight tracking-[-0.03em] md:text-5xl">
              Create a space that feels like you.
            </h2>

            <Link
              href="/collections/all"
              className="mt-9 inline-flex items-center justify-center bg-[#a69b8b] px-9 py-5 text-[10px] tracking-[0.2em] text-white transition-colors hover:bg-[#8f8373]"
            >
              EXPLORE COLLECTION
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
