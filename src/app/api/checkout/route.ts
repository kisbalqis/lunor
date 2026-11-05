
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/src/lib/shopify/client";

interface CheckoutResponse {
  cartCreate: {
    cart: {
      checkoutUrl: string;
    } | null;
    userErrors: {
      message: string;
    }[];
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const items = body.items;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > 250
    ) {
      return NextResponse.json(
        { error: "Invalid cart items." },
        { status: 400 }
      );
    }

    const lines = items.map((item: any) => {
      if (
        typeof item.variantId !== "string" ||
        !/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(item.variantId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 250
      ) {
        throw new Error("Invalid cart item.");
      }

      return {
        merchandiseId: item.variantId,
        quantity: item.quantity,
      };
    });

    const mutation = `
      mutation CreateCart($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            message
          }
        }
      }
    `;

    const data = await shopifyFetch<CheckoutResponse>(
      mutation,
      { input: { lines } }
    );

    const result = data.cartCreate;

    if (result.userErrors.length || !result.cart?.checkoutUrl) {
      return NextResponse.json(
        {
          error:
            result.userErrors.map((e) => e.message).join(", ") ||
            "Unable to create checkout.",
        },
        { status: 400 }
      );
    }

    const checkoutUrl = new URL(result.cart.checkoutUrl);

    if (
      checkoutUrl.protocol !== "https:" ||
      !(
        checkoutUrl.hostname === "shopify.com" ||
        checkoutUrl.hostname.endsWith(".shopify.com") ||
        checkoutUrl.hostname.endsWith(".myshopify.com")
      )
    ) {
      return NextResponse.json(
        { error: "Invalid checkout URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      checkoutUrl: checkoutUrl.toString(),
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { error: "Failed to create checkout." },
      { status: 500 }
    );
  }
}
