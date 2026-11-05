
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/src/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { getCollectionByHandle } from "@/src/lib/shopify";

const decorItems = [
  {
    handle: "ceramic-floor",
    subtitle: "Sculptural forms for everyday spaces.",
    href: "/collections/ceramic-floor",
  },
  {
    handle: "decorative-details",
    subtitle: "The art of thoughtful details.",
    href: "/collections/decorative-details",
  },
  {
    handle: "ceramic-objects",
    subtitle: "Texture, comfort and warmth.",
    href: "/collections/ceramic-objects",
  },
];

export default async function HomeDecorSection() {
  const collections = await Promise.all(
    decorItems.map((item) => getCollectionByHandle(item.handle))
  );

  const categories = decorItems.map((item, index) => ({
    ...item,
    collection: collections[index],
  }));

  return (
    <section className="bg-[#eeece6] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Heading */}
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[9px] tracking-[0.25em] text-[#918879]">
                THE ART OF DECORATING
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#252521] md:text-6xl">
                Details make
                <br />
                a home.
              </h2>
            </div>

            <div className="max-w-[370px]">
              <p className="text-sm leading-7 text-[#77736b]">
                A thoughtful selection of objects, textures and
                decorative pieces that make every space feel
                personal and complete.
              </p>

              <Link
                href="/collections/accessories"
                className="mt-6 inline-flex items-center gap-3 border-b border-[#252521] pb-2 text-[9px] tracking-[0.18em]"
              >
                EXPLORE HOME DECOR
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Decor Collection Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {categories.map((item, index) => {
            const collection = item.collection;
            const image = collection?.image;

            return (
              <Reveal key={item.handle}>
                <Link
                  href={`/collections/${item.handle}`}
                  className="group block"
                >
                  {/* Collection Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e2ded5]">
                    {image?.url && (
                      <Image
                        src={image.url}
                        alt={image.altText || collection?.title || item.handle}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
                      />
                    )}
                  </div>

                  {/* Collection Information */}
                  <div className="mt-6 flex items-start justify-between border-b border-[#d5d0c6] pb-5">
                    <div>
                      <p className="mb-2 text-[9px] tracking-[0.2em] text-[#a69b8b]">
                        0{index + 1} / COLLECTION
                      </p>

                      <h3 className="text-2xl font-light tracking-[-0.02em] text-[#252521]">
                        {collection?.title || item.handle}
                      </h3>

                      {/* <p className="mt-2 text-xs text-[#918879]">
                        {item.description}
                      </p> */}
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="mt-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
