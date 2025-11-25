import { describe, test, expect } from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { deleteVariant } from "./delete-variant";

describe("deleteVariant", async () => {
  test("Should delete variant", async () => {
    const variantService = new MockedVariantService([
      variantMock({ id: "1" }),
      variantMock({ id: "2" }),
    ]);
    const result = await deleteVariant({ variantService }, { id: "1" });
    expect(result).toBeUndefined();

    const variants = await variantService.findAll();
    expect(variants).toHaveLength(1);
  });
  test("Should throw if variant not found", async () => {
    const variantService = new MockedVariantService([]);
    const result = await deleteVariant({ variantService }, { id: "1" });
    expect(result).toStrictEqual(Error("Variant not found"));
  });
});
