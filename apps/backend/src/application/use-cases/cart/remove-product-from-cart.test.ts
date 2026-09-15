// import { describe, expect, test } from "vitest";
// import { MockedCartService } from "../../../../apps/backend/src/application/mocks/mock-cart-repo";
// import { cartMock } from "@forit/domain/src/entities/mocks/cart-mock.js";
// import { removeProductFromCart } from "@forit/domain/src/use-cases/cart/remove-product-from-cart.js";

// describe("removeProductFromCart", async () => {
//   const cartService = new MockedCartService([
//     cartMock({
//       userId: "1",
//       items: [
//         {
//           productId: "productId1",
//           variantId: "variantId1",
//           quantity: 2
//         },
//         {
//           productId: "productId2",
//           variantId: "variantId2",
//           quantity: 3
//         },
//       ]
//     }),
//   ]);

//   test("Should remove product from list products in cart", async () => {
//     const result = await removeProductFromCart(
//       { cartService },
//       {
//         userId: "1",
//         productId: "productId2",
//         variantId: "variantId2",
//       }
//     );

//     expect(cartService.carts).toHaveLength(1);
//     expect(cartService.carts[0]).toStrictEqual({
//       id: expect.any(String),
//       userId: "1",
//       items: [
//         {
//           productId: "productId1",
//           variantId: "variantId1",
//           quantity: 2
//         }
//       ]
//     });
//     expect(result).toStrictEqual(cartService.carts[0]);
//   });

//   test("if cart not found should return an error.", async () => {
//     await expect(() =>
//       removeProductFromCart(
//         { cartService },
//         {
//           userId: "999",
//           productId: "productId1",
//           variantId: "variantId1",
//         }
//       )
//     ).rejects.toThrow("Cart not found");
//   });
// });
