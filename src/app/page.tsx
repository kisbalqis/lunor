
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import HomeDecorSection from "../components/home/HomeDecorSection";
import LivingSpacesSection from "../components/home/LivingSpacesSection";
import BrandStorySection from "../components/home/BrandStorySection";
import NewsletterSection from "../components/home/NewsletterSection";
import ProductGrid from "../components/product/ProductGrid";
import { getProducts } from "../lib/shopify";
import Reveal from "../components/ui/Reveal";
import Footer from "../components/layout/Footer";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <AnnouncementBar />
      <Navbar />

      <HeroSection />

      <CategorySection />

      {/* Featured Products */}
      <section className="bg-[#f7f6f2] px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="mb-4 text-[10px] tracking-[0.25em] text-[#918879]">
                  THE LUNOR EDIT
                </p>

                <h2 className="font-serif text-4xl text-[#252521] md:text-5xl">
                  Selected Pieces
                </h2>
              </div>

              <a
                href="/collections/all"
                className="hidden border-b border-[#252521] pb-2 text-[10px] tracking-[0.15em] transition-opacity hover:opacity-50 md:block"
              >
                VIEW ALL PRODUCTS
              </a>
            </div>
          </Reveal>

          <ProductGrid products={products} />
        </div>
      </section>

      <HomeDecorSection />

      <LivingSpacesSection />

      <BrandStorySection />

      <NewsletterSection />

      <Footer />
    </main>
  );
}
