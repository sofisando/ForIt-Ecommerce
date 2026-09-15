// import { Variant } from "@forit/domain/src/entities/variant.js";
// import { VariantService } from "@forit/domain/src/repos/variant-repository.js";

// export class MockedVariantService implements VariantService {
//   variants: Variant[] = [];

//   constructor(variants: Variant[]) {
//     this.variants = variants;
//   }

//   findById = async (id: string): Promise<Variant | null> => {
//     return this.variants.find((variant) => variant.id == id) ?? null;
//   };
//   findAll = async (): Promise<Variant[]> => {
//     return this.variants;
//   };
//   async save(variant: Variant): Promise<void> {
//     const index = this.variants.findIndex((v) => v.id === variant.id);

//     if (index === -1) {
//       this.variants.push(variant);
//     } else {
//       this.variants[index] = variant;
//     }
//   }
//   delete = async (data: { id: String }): Promise<void> => {
//     this.variants = this.variants.filter((u) => u.id !== data.id);
//   };
//   getVariantsByProduct = async (productId: string): Promise<Variant[]> => {
//     return this.variants.filter((v) => v.productId === productId);
//   };
//   findByAttribute = async (
//     productId: string,
//     title: string,
//     name: string
//   ): Promise<Variant | null> => {
//     return (
//       this.variants.find(
//         (variant) =>
//           variant.productId === productId &&
//           variant.attribute.title.toLowerCase() === title.toLowerCase() &&
//           variant.attribute.name.toLowerCase() === name.toLowerCase()
//       ) ?? null
//     );
//   };
// }
