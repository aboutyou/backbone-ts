import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiProduct} from 'bapi/types/BapiProduct';
import {
  ProductWith,
  productWithQueryParameterValues,
} from 'bapi/types/ProductWith';

export interface ProductByIdEndpointParameters {
  productId: number;
  with?: ProductWith;
  campaignKey?: 'px' | undefined;
  pricePromotionKey?: string;
  includeSellableForFree?: boolean;
}

export type ProductByIdEndpointResponseData = BapiProduct;

/**
 * Required as single product call is the only one that can return `siblings`
 */
export function createProductByIdEndpointRequest(
  parameters: ProductByIdEndpointParameters,
): BapiCall<ProductByIdEndpointResponseData> {
  return {
    method: 'GET',
    endpoint: `products/${parameters.productId}`,
    params: {
      ...(parameters.with
        ? {with: productWithQueryParameterValues(parameters.with).join(`,`)}
        : undefined),
      ...(parameters.campaignKey
        ? {campaignKey: parameters.campaignKey}
        : undefined),
      ...(parameters.pricePromotionKey
        ? {
            pricePromotionKey: parameters.pricePromotionKey,
          }
        : undefined),
      ...(parameters.includeSellableForFree
        ? {includeSellableForFree: parameters.includeSellableForFree}
        : undefined),
    },
  };
}
