import { ProductService } from "../../services";

interface GetProductListDeps {
    productService: ProductService;
}

export async function getProductList({ productService }: GetProductListDeps) {
    const products = await productService.findAll();
    return products;
}