// import { describe, expect, test } from "vitest";
// import { MockedCartService } from "../../../../apps/backend/src/application/mocks/mock-cart-repo";
// import { createCart } from "./create-cart";
// import { MockedUserService } from "../../../../apps/backend/src/application/mocks/mock-user-repo";
// import { userMock } from "@forit/domain/src/entities/mocks/user-mock.js";

// describe("createCart", async () => {
//   const cartService = new MockedCartService([]);
//   const userService = new MockedUserService([userMock({id: "1"})]);

//   test("should create a new cart", async () => {
//     const result = await createCart(
//       { cartService, userService },
//       {
//         userId: "1",
//       }
//     );

//     expect(cartService.carts).toHaveLength(1);
//     expect(cartService.carts[0]).toStrictEqual({
//       id: expect.any(String),
//       userId: "1",
//       items: []
//     });
//     expect(result).toStrictEqual(cartService.carts[0]);
//   });

//   test("If the user not found should return an error.", async () => {
//     const result = await createCart(
//       { cartService, userService },
//       {
//         userId: "9999",
//       }
//     );

//     expect(result).toStrictEqual(Error("El usuario no existe"));
//   });

//   test("If the cart has already been created for a user, it should return an error.", async () => {
//     const result = await createCart(
//       { cartService, userService },
//       {
//         userId: "1",
//       }
//     );

//     expect(result).toStrictEqual(Error("El carrito del usuario ya existe"));
//   });
// });
