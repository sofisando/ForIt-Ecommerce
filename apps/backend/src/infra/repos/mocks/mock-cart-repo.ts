import type { Cart } from "@forit/domain/src/entities/cart.js";
import type { CreatePayload } from "@forit/domain/src/utils/index.js";
import type { CartService } from "@forit/domain/src/repos/cart-repository.js";

export class MockedCartService implements CartService{
  carts: Cart[] = [];

  constructor(carts: Cart[]) {
    this.carts = carts;
  }

  async findById(id: string): Promise<Cart | null> {
    return this.carts.find((cart) => cart.id === id) ?? null;
  }

  async findAll(): Promise<Cart[]> {
    return this.carts;
  }

  async create(data: CreatePayload<Cart>): Promise<Cart> {
    const newCart = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.carts.push(newCart);
    return newCart;
  }

  async delete(data: { id: string }): Promise<void> {
    this.carts = this.carts.filter((c) => c.id !== data.id);
  }

  async getCartByUserId(userId: string): Promise<Cart | null> {
    return this.carts.find((cart) => cart.userId === userId) ?? null;
  }

  async save(cart: Cart): Promise<Cart> {
    const index = this.carts.findIndex((c) => c.id === cart.id);
    if (index === -1) throw new Error("Cart not found");
    this.carts[index] = cart;
    return cart;
  }
}
