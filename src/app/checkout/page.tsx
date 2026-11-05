
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/src/store/cart";
import { ArrowLeft, ArrowRight, Lock, Minus, Plus, Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const currencyCode = items[0]?.currencyCode || "USD";

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(price);

  async function handleCheckout() {
    if (!items.length) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Unable to create checkout.");
      }

      window.location.assign(data.checkoutUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#252521]">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-[#918879] transition-colors hover:text-[#252521]"
        >
          <ArrowLeft size={14} />
          CONTINUE SHOPPING
        </Link>

        <div className="mb-14 mt-12">
          <p className="text-[10px] tracking-[0.3em] text-[#a69b8b]">
            LUNOR / YOUR ORDER
          </p>
          <h1 className="mt-4 text-4xl font-light tracking-[-0.04em] md:text-6xl">
            Checkout
          </h1>
          <p className="mt-4 text-sm text-[#918879]">
            Review your selection before continuing to checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="border-t border-[#ded9d0] py-24 text-center">
            <h2 className="text-2xl font-light">Your bag is empty.</h2>
            <p className="mt-3 text-sm text-[#918879]">
              Discover objects designed for considered living.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-3 border border-[#252521] px-8 py-4 text-[10px] tracking-[0.2em] transition-colors hover:bg-[#252521] hover:text-white"
            >
              EXPLORE COLLECTION <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.5fr_0.8fr]">
            {/* Order items */}
            <section>
              <div className="mb-6 flex items-center justify-between border-b border-[#ded9d0] pb-5">
                <h2 className="text-sm tracking-[0.15em]">
                  YOUR SELECTION
                </h2>
                <span className="text-xs text-[#918879]">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
                </span>
              </div>

              <div className="divide-y divide-[#ded9d0]">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-5 py-7"
                  >
                    <div className="relative h-32 w-28 shrink-0 bg-[#eeece6] md:h-40 md:w-36">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-base font-light md:text-lg">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#918879]">
                          {formatPrice(Number(item.price))}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[#ded9d0]">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-2"
                          >
                            <Minus size={12} />
                          </button>

                          <span className="min-w-8 text-center text-xs">
                            {item.quantity}
                          </span>

                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            className="p-2"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-[#918879] transition-colors hover:text-red-700"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Order summary */}
            <aside className="h-fit bg-[#eeece6] p-7 md:p-9">
              <p className="text-[10px] tracking-[0.25em] text-[#918879]">
                ORDER SUMMARY
              </p>

              <h2 className="mt-4 text-2xl font-light">
                Your order
              </h2>

              <div className="mt-10 space-y-5 border-b border-[#d8d2c8] pb-7 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#77736b]">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#77736b]">Shipping</span>
                  <span className="text-xs text-[#918879]">
                    Calculated at checkout
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#77736b]">Taxes</span>
                  <span className="text-xs text-[#918879]">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-7">
                <span className="text-sm tracking-[0.1em]">TOTAL</span>
                <span className="text-xl font-light">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {error && (
                <p className="mb-5 text-sm text-red-700">{error}</p>
              )}

              <button
                onClick={handleCheckout}
                disabled
                className="flex w-full items-center justify-center gap-3 bg-[#252521] px-6 py-5 text-[10px] tracking-[0.2em] text-white transition-colors hover:bg-[#49463f] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#252521]"
              >
                {loading ? "PROCESSING..." : "CONTINUE TO CHECKOUT"}
                {!loading && <ArrowRight size={14} />}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] text-[#918879]">
                <Lock size={12} />
                SECURE CHECKOUT POWERED BY SHOPIFY
              </div>

              <p className="mt-8 text-center text-xs leading-6 text-[#918879]">
                Shipping details, payment methods, and final order total
                will be confirmed on Shopify Checkout.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
