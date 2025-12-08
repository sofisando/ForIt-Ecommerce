import { addProductToCart, clearCart, createCart, deleteCart, getCartByUserId, getCartList, removeProductFromCart, updateProductQuantity} from "./cart";
import { createCategory, deleteCategory, editCategory, getCategoryList } from "./category";
import { createDiscount, deleteDiscount, editDiscount, getActiveDiscounts, getDiscountList } from "./discount";
import { acceptOrder, cancelOrder, createOrder, deleteOrder, editOrder, getOrderList, getOrdersByUserId, updateStateOrder } from "./order";
import { createProduct, deleteProduct, editProduct, getProductList, getProductsByCategory, getProductsSearch } from "./product";
import { createStock, decreaseStockForProduct, decreaseStockForVariant, deleteStock, editStock, getStockByVariant, getStockList, increaseStockForProduct, increaseStockForVariant } from "./stock";
import { deleteUser, editUser, findByName, getUserList, loginUser, register } from "./user";
import { createVariant, deleteVariant, editVariant, getVariantByProduct, getVariantList } from "./variant";

export type UseCase<P = any, D = any, R = unknown> = (
  deps: D,
  payload: P
) => Promise<R>;

export interface UseCaseDeclaration {
  useCase: UseCase;
  enable?: boolean;
}

export const domainUseCases = {
  //cart
  addProductToCart: {
    useCase: addProductToCart,
    enable: true,
  },
  clearCart: {
    useCase: clearCart,
    enable: true,
  },
  createCart: {
    useCase: createCart,
    enable: true,
  },
  deleteCart: {
    useCase: deleteCart,
    enable: true,
  },
  getCartByUserId: {
    useCase: getCartByUserId,
    enable: true,
  },
  getCartList: {
    useCase: getCartList,
    enable: true,
  },
  removeProductFromCart: {
    useCase: removeProductFromCart,
    enable: true,
  },
  updateProductQuantity: {
    useCase: updateProductQuantity,
    enable: true,
  },
  //category
  createCategory: {
    useCase: createCategory,
    enable: true,
  },
  deleteCategory: {
    useCase: deleteCategory,
    enable: true,
  },
  editCategory: {
    useCase: editCategory,
    enable: true,
  },
  getCategoryList: {
    useCase: getCategoryList,
    enable: true,
  },
  //Discount
  createDiscount: {
    useCase: createDiscount,
    enable: true,
  },
  deleteDiscount: {
    useCase: deleteDiscount,
    enable: true,
  },
  editDiscount: {
    useCase: editDiscount,
    enable: true,
  },
  getActiveDiscounts: {
    useCase: getActiveDiscounts,
    enable: true,
  },
  getDiscountList: {
    useCase: getDiscountList,
    enable: true,
  },
  //email - no hacen falta, estan en los otros use cases
  //order
  acceptOrder: {
    useCase: acceptOrder,
    enable: true,
  },
  cancelOrder: {
    useCase: cancelOrder,
    enable: true,
  },
  createOrder: {
    useCase: createOrder,
    enable: true,
  },
  deleteOrder: {
    useCase: deleteOrder,
    enable: true,
  },
  editOrdet: {
    useCase: editOrder,
    enable: true,
  },
  getOrderList: {
    useCase: getOrderList,
    enable: true,
  },
  getOrdersByUserId: {
    useCase: getOrdersByUserId,
    enable: true,
  },
  updateStateOrder: {
    useCase: updateStateOrder,
    enable: true,
  },
  //product
  createProduct: {
    useCase: createProduct,
    enable: true,
  },
  deleteProduct: {
    useCase: deleteProduct,
    enable: true,
  },
  editProduct: {
    useCase: editProduct,
    enable: true,
  },
  getProductList: {
    useCase: getProductList,
    enable: true,
  },
  getProductsByCategory: {
    useCase: getProductsByCategory,
    enable: true,
  },
  getProductsSearch: {
    useCase: getProductsSearch,
    enable: true,
  },
  //stock
  createStock: {
    useCase: createStock,
    enable: true,
  },
  decreaseStockForProduct: {
    useCase: decreaseStockForProduct,
    enable: true,
  },
  decreaseStockForVariant: {
    useCase: decreaseStockForVariant,
    enable: true,
  },
  deleteStock: {
    useCase: deleteStock,
    enable: true,
  },
  editStock: {
    useCase: editStock,
    enable: true,
  },
  getStockByVariant: {
    useCase: getStockByVariant,
    enable: true,
  },
  getStockList: {
    useCase: getStockList,
    enable: true,
  },
  increaseStockForProduct: {
    useCase: increaseStockForProduct,
    enable: true,
  },
  increaseStockForVariant: {
    useCase: increaseStockForVariant,
    enable: true,
  },
  //user
  deleteUser: {
    useCase: deleteUser,
    enable: true,
  },
  editUser: {
    useCase: editUser,
    enable: true,
  },
  findByName: {
    useCase: findByName,
    enable: true,
  },
  getUserList: {
    useCase: getUserList,
    enable: true,
  },
  loginUser: {
    useCase: loginUser,
    enable: true,
  },
  register: {
    useCase: register,
    enable: true,
  },
  //variant
  createVariant: {
    useCase: createVariant,
    enable: true,
  },
  deleteVariant: {
    useCase: deleteVariant,
    enable: true,
  },
  editVariant: {
    useCase: editVariant,
    enable: true,
  },
  getVariantByProduct: {
    useCase: getVariantByProduct,
    enable: true,
  },
  getVariantList: {
    useCase: getVariantList,
    enable: true,
  }
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
