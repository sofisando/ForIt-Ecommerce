import { describe, test, expect } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { deleteProduct } from "./delete-product";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";


describe("deleteProduct", async () => {
  const productService = new MockedProductService([
    productMock({ id: "1" }),
    productMock({ id: "2" }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);

  test("Should delete product", async () => {
    const result = await deleteProduct({ productService ,userService }, { id: "1" , userId: "user-1"});
    expect(result).toBeUndefined();

    const products = await productService.findAll();
    expect(products).toHaveLength(1);
  });

  test("Should return error if product not found", async () => {
    const result = await deleteProduct({ productService ,userService }, { id: "999" , userId: "user-1"});
    expect(result).toStrictEqual(Error("Product not found"))
  });

  test("Should return error if user not found", async () => {
    const result = await deleteProduct({ productService ,userService }, { id: "1" , userId: "user-999"});
    expect(result).toStrictEqual(Error("User user-999 not found"))
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await deleteProduct({ productService ,userService }, { id: "1" , userId: "user-2"});
    expect(result).toStrictEqual(Error("User is not ADMIN"))
  });
});
