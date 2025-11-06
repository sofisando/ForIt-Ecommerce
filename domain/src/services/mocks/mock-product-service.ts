import type { Product } from "../../entities/product.js";
import type { CreatePayload, UpdatePayload } from "../../utils/index.js";
import type { ProductService } from "../product-service.js";

export class MockedProductService implements ProductService {
  products: Product[] = [];

  constructor(products: Product[]) {
    this.products = products;
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) ?? null;
  }

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async editOne(data: UpdatePayload<Product>): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === data.id);
    if (index === -1) throw Error("Product not found");

    const edited = { ...this.products[index], ...data } as Product;
    this.products[index] = edited;
    return edited;
  }

  async create(data: CreatePayload<Product>): Promise<Product> {
    const newProduct = {
      ...data,
      id: crypto.randomUUID(), //esto simula cuando la db crea el id
    } satisfies Product;

    this.products.push(newProduct);
    return newProduct;
  }

  async delete(data: { id: string }): Promise<void> {
    this.products = this.products.filter((p) => p.id !== data.id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.products.filter((product) => product.categoryId === categoryId);
  }

  async getProductsSearch(query: string): Promise<Product[]> {
    const normalizedQuery = query.toLowerCase();

    return this.products.filter((product) =>
      [product.name, product.description]
        .filter(Boolean) // evita error si description es undefined
        .some((field) => field.toLowerCase().includes(normalizedQuery))
    );
  }
}
