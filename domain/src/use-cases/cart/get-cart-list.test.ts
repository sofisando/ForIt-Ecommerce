import { describe, test, expect } from "vitest";
import { MockedCartService } from "../../services/mocks/mock-cart-service";
import { cartMock } from "../../entities/mocks/cart-mock";
import { getCartList } from "./get-cart-list";
import { MockedDiscountService } from "../../services/mocks/mock-discount-service";
import { discountMock } from "../../entities/mocks/discount-mock";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("getCartList", async () => {
  const discountService = new MockedDiscountService([
    discountMock({
      active: true,
      name: "OFERTON",
      productsApplied: ["p5"],
      type: "FIXED_AMOUNT",
      value: 100,
    }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  test("Should return a array of carts without discount", async () => {
    const cartService = new MockedCartService([
      cartMock({
        id: "1",
        products: [
          {
            productId: "p1",
            name: "Producto sin desc",
            price: 1000,
            categoryId: "c1",
            variantId: undefined,
            discountApplied: undefined, // 👈 sin descuento
            quantity: 1,
            subtotal: 1000,
          },
        ],
      }),
      cartMock({
        id: "2",
        products: [
          {
            productId: "p2",
            name: "Otro producto sin desc",
            price: 3400,
            categoryId: "c1",
            variantId: undefined,
            discountApplied: undefined, // 👈 sin descuento
            quantity: 1,
            subtotal: 3400,
          },
        ],
      }),
    ]); //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
    const result = await getCartList(
      {
        cartService,
        discountService,
        userService,
      },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(2);
    if (result instanceof Error) throw result;

    expect(result[1]!.id).toStrictEqual("2");
  });

  test("Should return a array of carts with discount", async () => {
    const cartService = new MockedCartService([
      cartMock({
        id: "5",
        products: [
          {
            productId: "p5",
            name: "Producto sin desc",
            price: 1000,
            categoryId: "c1",
            variantId: undefined,
            discountApplied: undefined, // 👈 sin descuento
            quantity: 1,
            subtotal: 1000,
          },
        ],
      }),
    ]); //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
    const result = await getCartList(
      {
        cartService,
        discountService,
        userService,
      },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(1);
    if (result instanceof Error) throw result;
    expect(result[0]!).toStrictEqual({
      id: "5",
      products: [
        {
          productId: "p5",
          name: "Producto sin desc",
          price: 1000,
          categoryId: "c1",
          variantId: undefined,
          discountApplied: {
            id: expect.any(String),
            name: "OFERTON",
            type: "FIXED_AMOUNT",
            value: 100,
          },
          quantity: 1,
          subtotal: 900,
        },
      ],
      total: 900,
      userId: expect.any(String),
    });
  });

  test("if there are no carts you should return an empty list", async () => {
    const cartService = new MockedCartService([]);
    const result = await getCartList(
      {
        cartService,
        discountService,
        userService,
      },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(0);
    expect(result).toStrictEqual([]);
  });

  test("if there are no carts you should return an empty list", async () => {
    const cartService = new MockedCartService([]);
    const result = await getCartList(
      {
        cartService,
        discountService,
        userService,
      },
      { userId: "user-1" }
    );
    expect(result).toHaveLength(0);
    expect(result).toStrictEqual([]);
  });
  
  test("Should return error if user not found", async () => {
    const cartService = new MockedCartService([]);
    const result = await getCartList(
      {
        cartService,
        discountService,
        userService,
      },
      { userId: "user-999" }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"))
  });

  test("Should return error if user is not ADMIN", async () => {
    const cartService = new MockedCartService([]);
    const result = await getCartList(
      {
        cartService,
        discountService,
        userService,
      },
      { userId: "user-2" }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"))
  });

});
