export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
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

export interface ShopifyProductsResponse {
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}


export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
}

export interface ShopifyProductDetail extends ShopifyProduct {
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };

  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
}

export interface ShopifyProductDetailResponse {
  productByHandle: ShopifyProductDetail | null;
}
