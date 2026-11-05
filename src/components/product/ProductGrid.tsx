
import ProductCard from "./ProductCard";
import Reveal from "../ui/Reveal";

interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <p className="py-16 text-center text-sm text-[#89847b]">
        No products available at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 100}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
