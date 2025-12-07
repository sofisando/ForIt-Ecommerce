import { describe, expect, test } from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { editVariant } from "./edit-variant";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";

describe("editVariant", async () => {
  const variantService = new MockedVariantService([
    variantMock({
      id: "Variant-1",
      attribute: { title: "Tamaño", name: "S", value: null },
      productId: "Product-1",
    }),
  ]);
  const userService = new MockedUserService([
    userMock({ id: "user-1", role: "ADMIN" }),
    userMock({ id: "user-2", role: "CLIENT" }),
  ]);

  test("When edit a variant you should update info variant", async () => {
    const result = await editVariant(
      { variantService, userService },
      {
        userId: "user-1",
        data: {
          id: "Variant-1",
          attribute: { title: "Tamaño", name: "M", value: null },
          productId: "Product-1",
        },
      }
    );

    expect(result).toStrictEqual({
      id: "Variant-1",
      attribute: { title: "Tamaño", name: "M", value: null },
      productId: "Product-1",
    });
  });

  test("Should error if variant not found", async () => {
    const result = await editVariant(
      { variantService, userService },
      {
        userId: "user-1",
        data: {
          id: "Variant-9999",
          attribute: { title: "Tamaño", name: "M", value: null },
          productId: "Product-1",
        },
      }
    );
    expect(result).toStrictEqual(Error("Variant not found"));
  });

  test("Should error if user not found", async () => {
    const result = await editVariant(
      { variantService, userService },
      {
        userId: "user-999",
        data: {
          id: "Variant-1",
          attribute: { title: "Tamaño", name: "M", value: null },
          productId: "Product-1",
        },
      }
    );
    expect(result).toStrictEqual(Error("User user-999 not found"));
  });

  test("Should error if user is not ADMIN", async () => {
    const result = await editVariant(
      { variantService, userService },
      {
        userId: "user-2",
        data: {
          id: "Variant-1",
          attribute: { title: "Tamaño", name: "M", value: null },
          productId: "Product-1",
        },
      }
    );
    expect(result).toStrictEqual(Error("User is not ADMIN"));
  });
});
