import { Product, ProductRepository } from "@forit/domain";

export class MockedProductRepository implements ProductRepository {
  products: Product[] = [];

  constructor(products: Product[]) {
    this.products = products;
  }

  async getById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) ?? null;
  }

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.id === product.id);

    if (index === -1) {
      this.products.push(product);
    } else {
      this.products[index] = product;
    }
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
  }
}
