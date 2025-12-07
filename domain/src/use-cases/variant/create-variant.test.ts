import { describe, expect, test } from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { createVariant } from "./create-variant";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("createVariant", async () => {
  const variantService = new MockedVariantService([variantMock()]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);
  test("should create a new variant", async () => {
    await createVariant(
      { variantService, userService },
      {
        userId: "user-1",
        data: {
          attribute: { title: "Tamaño", name: "S", value: null },
          productId: "Product-1",
        },
      }
    );

    expect(variantService.variants).toHaveLength(2);
    expect(variantService.variants[1]).toStrictEqual({
      id: expect.any(String),
      attribute: { title: "Tamaño", name: "S", value: null },
      productId: "Product-1",
    });
  });

  test("If the variant is already exist it should return error.", async () => {
    const result = await createVariant(
      { variantService, userService },
      {
        userId: "user-1",
        data: {
          attribute: { title: "Tamaño", name: "S", value: null },
          productId: "Product-1",
        },
      }
    );
    expect(result).toStrictEqual(
      Error("Variant Tamaño: S already exists for this product")
    );
  });

  test("Should return error if user not found", async () => {
    const result = await createVariant(
      { variantService, userService },
      {
        userId: "user-999",
        data: {
          attribute: { title: "Tamaño", name: "S", value: null },
          productId: "Product-1",
        },
      }
    );
    expect(result).toStrictEqual(
      Error("User user-999 not found")
    );
  });

  test("Should return error if user is not ADMIN", async () => {
    const result = await createVariant(
      { variantService, userService },
      {
        userId: "user-2",
        data: {
          attribute: { title: "Tamaño", name: "S", value: null },
          productId: "Product-1",
        },
      }
    );
    expect(result).toStrictEqual(
      Error("User is not ADMIN")
    );
  });
});
