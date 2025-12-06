import { describe, expect, test } from "vitest";
import { MockedProductService } from "../../services/mocks/mock-product-service";
import { productMock } from "../../entities/mocks/product-mock";
import { editProduct } from "./edit-product";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("editProduct", async () => {
  const productService = new MockedProductService([
    productMock({
      id: "1",
      name: "Laptop",
      price: 1200,
      description: "A powerful laptop",
      categoryId: "cat1",
      imageUrl: "http://example.com/laptop.jpg"
    })
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1" , role: "ADMIN"}),
    userMock({ id: "user-2" , role: "CLIENT"})
  ]);

  test("When edit a product you should update info product", async () => {
    const result = await editProduct(
      { productService,userService },
      { userId: "user-1" ,
        data: { id: "1", name: "Mouse", price: 1600 }
      }
    );

    expect(result).toStrictEqual({
      id: "1",
      name: "Mouse",
      price: 1600,
      description: "A powerful laptop",
      categoryId: "cat1",
      imageUrl: "http://example.com/laptop.jpg"
    });
  });

  test("Should return error if product not found", async () => {
    const result = await editProduct(
      { productService,userService },
      { userId: "user-1" ,
        data: { id: "999", name: "Mouse", price: 1600 }
      }
    );
    expect(result).toStrictEqual(Error("Product not found"))
  });

  test("Should return error if user not found", async () => {
    const result = await editProduct(
      { productService,userService },
      { userId: "user-999" ,
        data: { id: "1", name: "Mouse", price: 1600 }
      }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"))
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await editProduct(
      { productService,userService },
      { userId: "user-2" ,
        data: { id: "999", name: "Mouse", price: 1600 }
      }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"))
  });
});
