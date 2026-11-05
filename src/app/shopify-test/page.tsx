import { getProducts } from "@/src/lib/shopify";

export default async function ShopifyTestPage() {
  const products = await getProducts();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold">LUNOR Products</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id}>
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="aspect-square w-full object-cover"
              />
            )}

            <h2 className="mt-3 font-medium">{product.title}</h2>

            <p>
              {product.priceRange.minVariantPrice.currencyCode}{" "}
              {product.priceRange.minVariantPrice.amount}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}