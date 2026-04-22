import { Entity } from "../utils/types/entity";

export class Category extends Entity {
  constructor(
    id: string,
    public readonly name: string
  ) {
    super(id);

    if (!name.trim()) {
      throw new Error("Category name is required");
    }
  }
}
