
import { shopifyFetch } from "./client";

import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_COLLECTION_BY_HANDLE,
} from "./queries";

import type {
  ShopifyProductsResponse,
  ShopifyProductDetailResponse,
  ShopifyProduct,
} from "./types";

interface CollectionResponse {
  collection: {
    id: string;
    title: string;
    description: string;
    image: {
      url: string;
      altText: string | null;
    } | null;
    products: {
      edges: {
        node: ShopifyProduct;
      }[];
    };
  } | null;
}

export async function getProducts() {
  const data = await shopifyFetch<ShopifyProductsResponse>(
    GET_PRODUCTS,
    { first: 8 }
  );

  return data.products.edges.map(({ node }) => node);
}

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<ShopifyProductDetailResponse>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );

  return data.productByHandle;
}

export async function getCollectionByHandle(handle: string) {
  const data = await shopifyFetch<CollectionResponse>(
    GET_COLLECTION_BY_HANDLE,
    { handle }
  );

  return data.collection;
}
