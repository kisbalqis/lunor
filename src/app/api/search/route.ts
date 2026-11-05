
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/src/lib/shopify/client";

interface SearchResponse {
  products: {
    edges: {
      node: {
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
    }[];
  };
}

const SEARCH_PRODUCTS = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() ?? "";

    if (query.length < 2) {
      return NextResponse.json({ products: [] });
    }

    const data = await shopifyFetch<SearchResponse>(
      SEARCH_PRODUCTS,
      {
        query,
        first: 8,
      }
    );

    const products = data.products.edges.map(
      ({ node }) => node
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Shopify search error:", error);

    return NextResponse.json(
      { error: "Unable to search products." },
      { status: 500 }
    );
  }
}
