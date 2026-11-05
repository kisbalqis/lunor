import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: {
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
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.priceRange.minVariantPrice.currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(product.priceRange.minVariantPrice.amount));
  console.log("Product handle:", product.handle);

  return (
    <Link  href={`/products/${product.handle}`}
  className="group block">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eeece6]">
        {product.featuredImage ? (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#999]">
            Image unavailable
          </div>
        )}

        {/* Hover Action */}
        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#252521] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} strokeWidth={1.4} />
        </span>
      </div>

      {/* Product Information */}
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h3 className="text-sm font-medium text-[#252521] transition-colors group-hover:text-[#8b8275]">
            {product.title}
          </h3>

          <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#999187]">
            LUNOR COLLECTION
          </p>
        </div>

        <p className="whitespace-nowrap text-sm text-[#252521]">{price}</p>
      </div>
    </Link>
  );
}
