import { describe, expect, test } from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { createVariant } from "./create-variant";

describe("createVariant", async () => {
  const variantService = new MockedVariantService([variantMock()]);

  test("should create a new variant", async () => {
    await createVariant(
      { variantService },
      {
        attribute: { title: "Tamaño", name: "S", value: null },
        productId: "Product-1",
      }
    );

    expect(variantService.variants).toHaveLength(2);
    expect(variantService.variants[1]).toStrictEqual({
      id: expect.any(String),
      attribute: { title: "Tamaño", name: "S", value: null },
      productId: "Product-1",
    });
  });

  test("If the variant is already exist it should return an error.", async () => {
    const result = await createVariant(
      { variantService },
      {
        attribute: { title: "Tamaño", name: "S", value: null },
        productId: "Product-1",
      }
    );

    expect(result).toBeInstanceOf(Error);
  });
});
