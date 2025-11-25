import { describe, expect, test } from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { editVariant } from "./edit-variant";

describe("editVariant", async () => {
  const variantService = new MockedVariantService([
    variantMock({
      id: "Variant-1",
      attribute: { title: "Tamaño", name: "S", value: null },
      productId: "Product-1",
    }),
  ]);

  test("When edit a variant you should update info variant", async () => {
    const result = await editVariant(
      { variantService },
      {
        id: "Variant-1",
        attribute: { title: "Tamaño", name: "M", value: null },
        productId: "Product-1",
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
      { variantService },
      {
        id: "Variant-9999",
        attribute: { title: "Tamaño", name: "M", value: null },
        productId: "Product-1",
      }
    );
    expect(result).toStrictEqual(Error("Variant not found"));
  });
});
