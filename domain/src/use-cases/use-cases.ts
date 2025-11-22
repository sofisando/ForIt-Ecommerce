//ver como hacer esto para exportar como dependencia el domain


import { getProductsList } from "./products/get-product-list.js";
import { getProduct } from "./products/get-product.js";

export type UseCase<P = any, D = any, R = unknown> = (
  deps: D,
  payload: P
) => Promise<R>;

export interface UseCaseDeclaration {
  useCase: UseCase;
  enable?: boolean;
}

export const domainUseCases = {
  getProduct: {
    useCase: getProduct,
    enable: true,
  },
  getProductsList: {
    useCase: getProductsList,
    enable: true,
  },
} as const satisfies Record<string, UseCaseDeclaration>;

export const USE_CASE_NAME = Object.keys(domainUseCases).reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<string, string>) as Record<
  keyof typeof domainUseCases,
  keyof typeof domainUseCases
>;

export type UseCaseName = (typeof USE_CASE_NAME)[keyof typeof USE_CASE_NAME];

export type UseCaseType<TEndpointName extends UseCaseName> =
  (typeof domainUseCases)[TEndpointName]["useCase"];
