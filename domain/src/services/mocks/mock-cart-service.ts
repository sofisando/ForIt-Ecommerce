import type { Cart, ProductInCart } from "../../entities/cart.js";
import type { UpdatePayload } from "../../utils/index.js";
import type { CartService } from "../cart-service.js";
import type { User } from "../../entities/user.js";
import type { Product } from "../../entities/product.js";
import type { Variant } from "../../entities/variant.js";

export class MockedCartService implements CartService {
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

  async editOne(data: UpdatePayload<Cart>): Promise<Cart> {
    const index = this.carts.findIndex((c) => c.id === data.id);
    if (index === -1) throw Error("Cart not found");

    const edited = { ...this.carts[index], ...data } as Cart;
    this.carts[index] = edited;
    return edited;
  }

  async create(userId: User["id"]): Promise<Cart> {
    const newCart = {
      id: crypto.randomUUID(),
      userId,
      products: [],
      total: 0,
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

  // ✅ Agregar producto
  async addProductToCart(
    userId: User["id"],
    productId: Product["id"],
    variantId: Variant["id"] | undefined,
    quantity: number
  ): Promise<Cart> {
    let cart = await this.getCartByUserId(userId);

    // crear carrito si no existe
    if (!cart) {
      cart = await this.create(userId);
    }

    const existing = cart.products.find(
      (p) => p.productId === productId && p.variantId === variantId
    );

    if (existing) {
      existing.quantity += quantity;
      existing.subtotal = this.calculateSubtotal(existing);
    } else {
      const newProduct: ProductInCart = {
        productId,
        variantId,
        discountApplied: undefined,
        quantity,
        subtotal: 0, // se calcula después
      };
      newProduct.subtotal = this.calculateSubtotal(newProduct);
      cart.products.push(newProduct);
    }

    cart.total = this.calculateTotal(cart);
    await this.editOne(cart);
    return cart;
  }

  // ✅ Remover producto
  async removeProductFromCart(
    userId: User["id"],
    productId: Product["id"],
    variantId: Variant["id"] | undefined
  ): Promise<Cart> {
    const cart = await this.getCartByUserId(userId);
    if (!cart) throw Error("Cart not found");

    const product = cart.products.find(
      (p) => p.productId === productId && p.variantId === variantId
    );
    if (!product) throw Error("Product not in cart");

    cart.products = cart.products.filter(
      (p) => !(p.productId === productId && p.variantId === variantId)
    );

    cart.total = this.calculateTotal(cart);
    await this.editOne(cart);
    return cart;
  }

  // ✅ Actualizar cantidad //en el front puedo poner en los botones si aumenta o baja y ese numero pasarlo como payload acá
  async updateProductQuantity(
    userId: User["id"],
    productId: Product["id"],
    variantId: Variant["id"] | undefined,
    quantity: number
  ): Promise<Cart> {
    const cart = await this.getCartByUserId(userId);
    if (!cart) throw Error("Cart not found");

    const product = cart.products.find(
      (p) => p.productId === productId && p.variantId === variantId
    );
    if (!product) throw Error("Product not in cart");

    product.quantity = quantity;
    product.subtotal = this.calculateSubtotal(product);
    cart.total = this.calculateTotal(cart);

    await this.editOne(cart);
    return cart;
  }

  // ✅ Vaciar carrito
  async clearCart(userId: User["id"]): Promise<Cart> {
    const cart = await this.getCartByUserId(userId);
    if (!cart) throw Error("Cart not found");

    cart.products = [];
    cart.total = 0;

    await this.editOne(cart);
    return cart;
  }

  // 🧮 Helpers (mockea lógica de precios)
  private calculateSubtotal(product: ProductInCart): number {
    // En el mock no tenemos precios reales de productos,
    // así que devolvemos un subtotal simulado.
    const basePrice = 100; // valor mock
    const discount =
      product.discountApplied?.type === "PERCENTAGE"
        ? (product.discountApplied.value / 100) * basePrice
        : product.discountApplied?.value ?? 0;

    return (basePrice - discount) * product.quantity;
  }

  private calculateTotal(cart: Cart): number {
    return cart.products.reduce((acc, p) => acc + p.subtotal, 0);
  }
}
