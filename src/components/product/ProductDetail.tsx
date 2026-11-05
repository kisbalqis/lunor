
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Minus,
  Plus,
  ArrowLeft,
  Check,
} from "lucide-react";
import Link from "next/link";
import type { ShopifyProductDetail } from "@/src/lib/shopify/types";
import { useCartStore } from "@/src/store/cart";

interface ProductDetailProps {
  product: ShopifyProductDetail;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCartStore((state) => state.addItem);

  const images =
    product.images.edges.length > 0
      ? product.images.edges.map(({ node }) => node)
      : product.featuredImage
        ? [product.featuredImage]
        : [];

  const variants = product.variants.edges.map(({ node }) => node);

  const initialVariant =
    variants.find((variant) => variant.availableForSale) ?? variants[0];

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    initialVariant?.id ?? ""
  );
  const [added, setAdded] = useState(false);

  const variant = variants.find(
    (item) => item.id === selectedVariant
  );

  const priceAmount =
    variant?.price.amount ??
    product.priceRange.minVariantPrice.amount;

  const currencyCode =
    variant?.price.currencyCode ??
    product.priceRange.minVariantPrice.currencyCode;

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(priceAmount));

  const handleAddToCart = () => {
    if (!variant?.availableForSale) return;

    addItem({
      variantId: variant.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      image:
        images[0]?.url ??
        product.featuredImage?.url ??
        "",
      price: variant.price.amount,
      currencyCode: variant.price.currencyCode,
      quantity,
    });

    setAdded(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      <div className="mx-auto max-w-[1600px] px-5 pt-7 md:px-10 lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.18em] text-[#918879] transition-colors hover:text-[#252521]"
        >
          <ArrowLeft size={13} />
          BACK TO COLLECTION
        </Link>
      </div>

      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 pb-20 pt-7 md:px-10 md:pt-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:px-16 lg:pb-32">
        {/* Gallery */}
        <div className="min-w-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#eeece6] sm:aspect-[5/4] lg:aspect-[4/5]">
            {images[activeImage] && (
              <Image
                key={images[activeImage].url}
                src={images[activeImage].url}
                alt={images[activeImage].altText || product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-opacity duration-500"
              />
            )}

            {!images.length && (
              <div className="flex h-full items-center justify-center text-sm text-[#918879]">
                No product image available
              </div>
            )}

            <span className="absolute left-4 top-4 bg-[#f7f6f2] px-3 py-2 text-[9px] tracking-[0.2em] text-[#252521]">
              LUNOR COLLECTION
            </span>
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:gap-3">
              {images.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  className={`relative aspect-square overflow-hidden bg-[#eeece6] transition-all ${
                    activeImage === index
                      ? "border border-[#252521]"
                      : "border border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `${product.title} image ${index + 1}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="min-w-0 lg:py-8">
          <div className="lg:sticky lg:top-24">
            <div className="border-b border-[#dedbd3] pb-7">
              <p className="text-[10px] tracking-[0.3em] text-[#918879]">
                LUNOR COLLECTION
              </p>

              <h1 className="mt-5 max-w-xl font-serif text-4xl leading-[1.12] tracking-tight text-[#252521] sm:text-5xl lg:text-[54px]">
                {product.title}
              </h1>

              <p className="mt-6 text-lg tracking-wide text-[#252521]">
                {price}
              </p>
            </div>

            <div className="border-b border-[#dedbd3] py-7">
              <p className="mb-3 text-[10px] tracking-[0.22em] text-[#918879]">
                DESCRIPTION
              </p>
              <p className="max-w-xl whitespace-pre-line text-sm leading-7 text-[#77736b]">
                {product.description || "A timeless piece from the LUNOR collection."}
              </p>
            </div>

            {variants.length > 1 && (
              <div className="border-b border-[#dedbd3] py-7">
                <label
                  htmlFor="product-variant"
                  className="mb-4 block text-[10px] tracking-[0.22em] text-[#918879]"
                >
                  SELECT OPTION
                </label>

                <select
                  id="product-variant"
                  value={selectedVariant}
                  onChange={(event) => {
                    setSelectedVariant(event.target.value);
                    setAdded(false);
                  }}
                  className="h-12 w-full appearance-none border border-[#d8d3c9] bg-transparent px-4 text-sm text-[#252521] outline-none focus:border-[#252521]"
                >
                  {variants.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      disabled={!item.availableForSale}
                    >
                      {item.title}
                      {!item.availableForSale ? " — Sold out" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="py-7">
              <p className="mb-4 text-[10px] tracking-[0.22em] text-[#918879]">
                QUANTITY
              </p>

              <div className="flex h-12 w-36 items-center justify-between border border-[#d8d3c9] px-4">
                <button
                  type="button"
                  onClick={() => setQuantity((v) => Math.max(1, v - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="text-[#252521] disabled:opacity-30"
                >
                  <Minus size={14} />
                </button>

                <span className="text-sm tabular-nums">{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity((v) => v + 1)}
                  aria-label="Increase quantity"
                  className="text-[#252521]"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!variant?.availableForSale}
              className="flex h-14 w-full items-center justify-center gap-3 bg-[#252521] text-[10px] tracking-[0.22em] text-white transition-colors hover:bg-[#45443e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
              {added
                ? "ADDED TO CHART"
                : variant?.availableForSale
                  ? "ADD TO BAG"
                  : "SOLD OUT"}
            </button>

            {added && (
              <p role="status" className="mt-3 text-center text-xs text-[#77736b]">
                {quantity} item(s) added to your chart.
              </p>
            )}

            <p className="mt-5 text-center text-[9px] tracking-[0.2em] text-[#918879]">
              TIMELESS DESIGN · CONTEMPORARY LIVING
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
