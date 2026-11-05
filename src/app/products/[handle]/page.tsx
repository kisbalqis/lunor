
import { notFound } from "next/navigation";
import AnnouncementBar from "@/src/components/layout/AnnouncementBar";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import ProductDetail from "@/src/components/product/ProductDetail";
import { getProductByHandle } from "@/src/lib/shopify";


interface ProductPageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { handle } = await params;

  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main className="min-h-screen bg-[#f7f6f2]">
        <ProductDetail product={product} />
      </main>

      <Footer />
    </>
  );
}