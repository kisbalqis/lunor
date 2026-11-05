
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Search,
  UserRound,
  ShoppingBag,
  X,
  ArrowRight,
} from "lucide-react";

import { useCartStore } from "../../store/cart";
import CartDrawer from "../cart/CartDrawer";

interface SearchProduct {
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

const navLinks = [
  { label: "Furniture", href: "/collections/furniture" },
  { label: "Lighting", href: "/collections/lighting" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Our Story", href: "/about" },
];

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Shopify product search
  useEffect(() => {
    if (!searchOpen || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError("");
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setSearchLoading(true);
        setSearchError("");

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery.trim())}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Search failed.");
        }

        setSearchResults(data.products ?? []);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setSearchError("Unable to search products. Please try again.");
          setSearchResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSearchLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchQuery, searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSearchError("");
  };

  return (
    <>
      <header className="relative z-20 border-b border-black/5 bg-[#f7f6f2]">
        <div className="mx-auto flex h-[82px] max-w-[1600px] items-center justify-between px-6 md:px-12">

          {/* Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.13em] text-[#55534d] transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-[29px] font-medium tracking-[0.28em] text-[#252521]"
          >
            LUNOR
          </Link>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-5">
            <button
              type="button"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
              className="transition-opacity hover:opacity-50"
            >
              <Search size={19} strokeWidth={1.4} />
            </button>

            <button
              type="button"
              aria-label="Account"
              className="hidden transition-opacity hover:opacity-50 sm:block"
            >
              <UserRound size={19} strokeWidth={1.4} />
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag, ${hydrated ? cartCount : 0} items`}
              className="relative"
            >
              <ShoppingBag size={19} strokeWidth={1.4} />

              {hydrated && cartCount > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#252521] px-1 text-[9px] text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex items-center justify-center gap-6 overflow-x-auto border-t border-black/5 px-4 py-3 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-[#55534d]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Search Drawer */}
      {searchOpen && (
        <div className="fixed inset-0 z-[110]">
          <button
            type="button"
            aria-label="Close search"
            onClick={closeSearch}
            className="absolute inset-0 bg-black/30"
          />

          <section className="relative max-h-[85vh] overflow-y-auto bg-[#f7f6f2] px-6 pb-10 pt-7 md:px-16 md:pt-10">

            {/* Search Header */}
            <div className="mx-auto max-w-[1100px]">
              <div className="flex items-center justify-between">
                <span className="text-[12px] tracking-[0.25em]">
                  SEARCH LUNOR
                </span>

                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                >
                  <X size={22} strokeWidth={1.3} />
                </button>
              </div>

              {/* Search Input */}
              <div className="mt-10 flex items-center border-b border-[#c9c3b8] pb-4">
                <Search
                  size={22}
                  strokeWidth={1.3}
                  className="mr-4 shrink-0 text-[#918879]"
                />

                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full bg-transparent text-lg text-[#252521] outline-none placeholder:text-[#aaa398] md:text-2xl"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="ml-3 text-xs tracking-wider text-[#918879]"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Search Results */}
              <div className="mt-8">
                {searchQuery.trim().length < 2 ? (
                  <p className="text-xs tracking-[0.12em] text-[#918879]">
                    ENTER AT LEAST 2 CHARACTERS TO SEARCH
                  </p>
                ) : searchLoading ? (
                  <p className="text-sm text-[#918879]">
                    Searching products...
                  </p>
                ) : searchError ? (
                  <p className="text-sm text-red-700">
                    {searchError}
                  </p>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className="mb-5 flex items-center justify-between">
                      <p className="text-[11px] tracking-[0.15em]">
                        SEARCH RESULTS
                      </p>

                      <span className="text-xs text-[#918879]">
                        {searchResults.length} PRODUCTS
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
                      {searchResults.map((product) => {
                        const price =
                          product.priceRange.minVariantPrice;

                        return (
                          <Link
                            key={product.id}
                            href={`/products/${product.handle}`}
                            onClick={closeSearch}
                            className="group"
                          >
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#eeece6]">
                              {product.featuredImage && (
                                <Image
                                  src={product.featuredImage.url}
                                  alt={
                                    product.featuredImage.altText ||
                                    product.title
                                  }
                                  fill
                                  sizes="(max-width: 768px) 50vw, 25vw"
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                              )}
                            </div>

                            <div className="mt-3 flex items-start justify-between gap-2">
                              <h3 className="text-xs leading-5 text-[#252521]">
                                {product.title}
                              </h3>

                              <ArrowRight
                                size={14}
                                className="mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                              />
                            </div>

                            <p className="mt-1 text-xs text-[#918879]">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: price.currencyCode,
                              }).format(Number(price.amount))}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-[#918879]">
                    No products found for "{searchQuery}".
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}
