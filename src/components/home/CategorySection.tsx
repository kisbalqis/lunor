import Link from "next/link";
import Image from "next/image";
import Reveal from "@/src/components/ui/Reveal";
import { getCollectionByHandle } from "@/src/lib/shopify";

const categoryConfig = [
  {
    handle: "furniture",
    subtitle: "A foundation for considered living.",
    href: "/collections/furniture",
  },
  {
    handle: "lighting",
    subtitle: "Sculptural forms, ambient moments.",
    href: "/collections/lighting",
  },
  {
    handle: "accessories",
    subtitle: "Details that make a space.",
    href: "/collections/accessories",
  },
];

export default async function CategorySection() {
  const collections = await Promise.all(
    categoryConfig.map((category) => getCollectionByHandle(category.handle)),
  );

  const categories = categoryConfig.map((category, index) => ({
    ...category,
    collection: collections[index],
  }));

  return (
    <section className="bg-[#f7f6f2] px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Heading */}
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#918879]">
                THE LUNOR COLLECTION
              </p>

              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-[1.15] tracking-[-0.04em] md:text-6xl">
                Objects for a more
                <br />
                considered home.
              </h2>
            </div>

            <p className="max-w-[280px] text-sm leading-7 text-[#77736b]">
              Explore our curated collection of furniture, lighting, and objects
              designed for everyday living.
            </p>
          </div>
        </Reveal>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {categories.map((category, index) => {
            const collection = category.collection;
            const image = collection?.image;

            return (
              <Reveal key={category.handle}>
                <Link href={category.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#eeece6]">
                    {image?.url && (
                      <Image
                        src={image.url}
                        alt={image.altText || category.handle}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
                      />
                    )}
                  </div>

                  <div className="mt-6 flex items-start justify-between border-b border-[#ded9d0] pb-5">
                    <div>
                      <p className="mb-2 text-[9px] tracking-[0.2em] text-[#a69b8b]">
                        0{index + 1} / COLLECTION
                      </p>

                      <h3 className="text-2xl font-light tracking-[-0.02em] text-[#252521]">
                        {collection?.title || category.handle}
                      </h3>

                      <p className="mt-2 text-xs text-[#918879]">
                        {category.subtitle}
                      </p>
                    </div>

                    <span className="mt-5 text-xl font-light transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
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
