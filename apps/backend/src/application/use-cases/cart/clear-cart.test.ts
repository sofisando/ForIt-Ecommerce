// import { describe, test, expect } from "vitest";
// import { MockedCartService } from "../../../../apps/backend/src/application/mocks/mock-cart-repo";
// import { cartMock } from "@forit/domain/src/entities/mocks/cart-mock.js";
// import { clearCart } from "@forit/domain/src/use-cases/cart/clear-cart.js";

// describe("clearCart", async () => {
//   const cartService = new MockedCartService([
//     cartMock({ userId: "1" }),
//     cartMock({ userId: "2" }),
//   ]);
//   test("Should clear cart", async () => {
//     const result = await clearCart({ cartService }, { userId: "1" });
//     expect(result).toStrictEqual({
//       id: expect.any(String),
//       userId: "1",
//       items: []
//     });

//     const carts = await cartService.findAll();
//     expect(carts).toHaveLength(2);
//     expect(carts[0]).toStrictEqual({
//       id: expect.any(String),
//       userId: "1",
//       items: []
//     });
//   });
//   test("Should throw if cart not found", async () => {
//     const result = await clearCart({ cartService }, { userId: "999" });
//     expect(result).toStrictEqual(Error("Cart not found"));
//   });
// });
