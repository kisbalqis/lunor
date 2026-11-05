import Image from "next/image";
import { notFound } from "next/navigation";

import AnnouncementBar from "@/src/components/layout/AnnouncementBar";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import ProductGrid from "@/src/components/product/ProductGrid";
import Reveal from "@/src/components/ui/Reveal";

import {
  getCollectionByHandle,
  getProducts,
} from "@/src/lib/shopify";

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { handle } = await params;

  const isAllProducts = handle === "all";

  const collection = isAllProducts
    ? null
    : await getCollectionByHandle(handle);

  const allProducts = isAllProducts
    ? await getProducts()
    : [];

  if (!isAllProducts && !collection) {
    notFound();
  }

  const title = isAllProducts
    ? "All Products"
    : collection!.title;

  const description = isAllProducts
    ? "Thoughtfully selected pieces for considered living."
    : collection!.description;

  const products = isAllProducts
    ? allProducts
    : collection!.products.edges.map(({ node }) => node);

  const collectionImage = isAllProducts
    ? null
    : collection!.image;

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-[#f7f6f2]">
        {/* Collection Header */}
        <section className="px-5 pb-10 pt-16 md:px-10 md:pb-14 md:pt-24">
          <div className="mx-auto max-w-[1600px]">
            <Reveal>
              <div className="mb-8 text-center md:mb-12">
                <p className="mb-4 text-[9px] tracking-[0.3em] text-[#a69b8b] uppercase">
                  LUNOR COLLECTION
                </p>

                <h1 className="text-4xl font-light tracking-[-0.04em] text-[#252521] md:text-6xl">
                  {title}
                </h1>

                {description && (
                  <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#77736c]">
                    {description}
                  </p>
                )}
              </div>
            </Reveal>

            {/* Shopify Collection Image */}
            {collectionImage?.url && (
              <Reveal>
                <div className="relative h-[240px] w-full overflow-hidden bg-[#eeece6] md:h-[440px]">
                  <Image
                    src={collectionImage.url}
                    alt={collectionImage.altText || title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {/* Products */}
        <section className="px-5 pb-24 md:px-10 md:pb-32">
          <div className="mx-auto max-w-[1600px]">
            <div className="mb-8 flex items-center justify-between border-b border-[#e5e1d9] pb-5">
              <p className="text-[10px] tracking-[0.18em] text-[#77736c] uppercase">
                {products.length} Products
              </p>

              <p className="text-[10px] tracking-[0.15em] text-[#77736c] uppercase">
                LUNOR / {title}
              </p>
            </div>

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="py-24 text-center">
                <p className="text-sm text-[#77736c]">
                  No products available in this collection yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}