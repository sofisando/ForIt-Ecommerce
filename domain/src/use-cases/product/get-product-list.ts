import { DiscountService, ProductService } from "../../services";
import { applyDiscountsToProducts } from "../../utils/functions/applyDiscountsToProducts";

interface GetProductListDeps {
  productService: ProductService;
  discountService: DiscountService;
}

export async function getProductList({
  productService,
  discountService,
}: GetProductListDeps) {
  const products = await productService.findAll();
  const productsWithDiscounts = applyDiscountsToProducts(
    { discountService },
    products
  );
  return productsWithDiscounts;
}
