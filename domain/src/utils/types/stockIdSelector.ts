export type StockIdSelector =
  | { productId: string; variantId?: undefined }
  | { variantId: string; productId?: undefined };