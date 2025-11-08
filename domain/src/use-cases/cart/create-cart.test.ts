import { describe, expect, test } from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { cartMock } from "../../entities/mocks/cart-mock";
import { createCart } from "./create-cart";

describe("createCart", async () => {
  const cartService = new MockedCartService([cartMock()]);

  test("should create a new cart", async () => {
    await createCart(
      { cartService },
      {
        name: "Tecnología",
      }
    );

    expect(cartService.carts).toHaveLength(2);
    expect(cartService.carts[1]).toStrictEqual({
      id: expect.any(String),
      name: "Tecnología",
    });
  });

  test("If the cart has already been created for a user, it should return an error.", async () => {
    const result = await createCart(
      { cartService },
      {
        name: "Tecnología",
      }
    );

    expect(result).toBeInstanceOf(Error);
  });
});
