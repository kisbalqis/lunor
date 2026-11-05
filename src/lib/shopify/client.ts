import "server-only";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2026-10";

const SHOPIFY_URL = SHOPIFY_DOMAIN
  ? `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`
  : "";

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    throw new Error("Shopify environment variables are missing.");
  }

  const response = await fetch(SHOPIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Shopify API Error:", errorDetails);

    throw new Error(`Shopify API error: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors?.length) {
    throw new Error(
      result.errors.map((error: { message: string }) => error.message).join(", ")
    );
  }

  if (!result.data) {
    throw new Error("No data returned from Shopify.");
  }

  return result.data as T;
}