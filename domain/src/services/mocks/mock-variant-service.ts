import { Variant } from "../../entities/variant.js";
import { CreatePayload, UpdatePayload } from "../../utils/index.js";
import { VariantService } from "../variant-service.js";

export class MockedVariantService implements VariantService {
  variants: Variant[] = [];

  constructor(variants: Variant[]) {
    this.variants = variants;
  }

  findById = async (id: string): Promise<Variant | null> => {
    return this.variants.find((variant) => variant.id == id) ?? null;
  };
  findAll = async (): Promise<Variant[]> => {
    return this.variants;
  };
  editOne = async (data: UpdatePayload<Variant>): Promise<Variant> => {
    const index = this.variants.findIndex((variant) => variant.id === data.id);
    if (index === -1) throw Error("Variant not found");

    const edited = { ...this.variants[index], ...data } as Variant;
    this.variants[index] = edited;
    return edited;
  };
  create = async (data: CreatePayload<Variant>): Promise<Variant> => {
    const newVariant = {
      ...data,
      id: crypto.randomUUID(), //esto simula cuando la db crea el id
    } satisfies Variant;

    this.variants.push(newVariant);
    return newVariant;
  };
  delete = async (data: { id: String }): Promise<void> => {
    this.variants = this.variants.filter((u) => u.id !== data.id);
  };
  getVariantsByProduct = async (productId: string): Promise<Variant[]> => {
    return this.variants.filter((v) => v.productId === productId);
  };
  findByAttribute = async (
    productId: string,
    title: string,
    name: string
  ): Promise<Variant | null> => {
    return (
      this.variants.find(
        (variant) =>
          variant.productId === productId &&
          variant.attribute.title.toLowerCase() === title.toLowerCase() &&
          variant.attribute.name.toLowerCase() === name.toLowerCase()
      ) ?? null
    );
  };
}
