import type { Product, ProductUpdate } from "../../entities/product.js";
import type { ProductService } from "../product-service.js";

export class MockedProductService implements ProductService {
  products: Product[] = [];

  constructor(products: Product[]) {
    this.products = products;
  }

  async findById(id: string): Promise<Product | null>{
    return this.products.find((product) => product.id == id) ?? null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async editOne(id: string, updated: ProductUpdate): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw Error("Product not found");

    const edited = { ...this.products[index], ...updated } as Product;
    this.products[index] = edited;
    return edited; // ✅ este sí es un Product completo
  }

  async create(item: Product) {
    this.products.push(item);
    return item;
  }

  async delete(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.products.filter((product) => product.categoryId === categoryId);
  }

  async getProductsSearch(query: string): Promise<Product[]> {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
