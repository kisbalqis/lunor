"use client";

import { useCartStore } from "@/src/store/cart";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const currencyCode = items[0]?.currencyCode ?? "USD";

  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(subtotal);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute right-0 top-0 flex h-dvh w-full max-w-[480px] flex-col bg-[#f7f6f2] shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dedbd3] px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingCart size={19} strokeWidth={1.5} className="text-white" />

            <h2
              id="cart-title"
              className="text-xs tracking-[0.2em] text-[#252521]"
            >
              YOUR CART ({cartCount})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 text-[#252521] transition-opacity hover:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart
                size={34}
                strokeWidth={1}
                className="text-[#252521]"
              />

              <h3 className="mt-5 font-serif text-2xl">Your cart is empty</h3>

              <p className="mt-2 text-sm text-[#77736b]">
                Discover something timeless.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 border-b border-[#252521] pb-2 text-[10px] tracking-[0.2em]"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#dedbd3]">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 py-6">
                  {/* Product Image */}
                  <Link
                    href={`/products/${item.handle}`}
                    onClick={onClose}
                    className="relative aspect-[4/5] w-24 shrink-0 bg-[#eeece6]"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={onClose}
                          className="text-sm leading-5 hover:opacity-60"
                        >
                          {item.title}
                        </Link>

                        <p className="mt-2 text-xs text-[#918879]">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: item.currencyCode,
                          }).format(Number(item.price))}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        aria-label={`Remove ${item.title}`}
                        className="h-fit p-1 text-[#918879] hover:text-[#252521]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Quantity */}
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex h-9 items-center gap-4 border border-[#d8d3c9] px-3">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                        >
                          <Minus size={12} />
                        </button>

                        <span className="text-xs tabular-nums">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <p className="text-sm">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: item.currencyCode,
                        }).format(Number(item.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#dedbd3] bg-[#f7f6f2] p-6">
            <div className="flex justify-between text-sm">
              <span className="tracking-[0.12em]">SUBTOTAL</span>

              <span>{formattedSubtotal}</span>
            </div>

            <p className="mt-3 text-xs leading-5 text-[#918879]">
              Shipping and taxes calculated at checkout.
            </p>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="mt-5 flex h-14 w-full items-center justify-center gap-3 bg-[#252521] text-[10px] tracking-[0.2em] text-white transition-colors hover:bg-[#45443e] hover:text-white"
            >
              <span className="text-white">PROCEED TO CHECKOUT</span>
              <ArrowRight size={14} className="text-white" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full text-center text-[10px] tracking-[0.18em] text-[#77736b] hover:text-[#252521]"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
