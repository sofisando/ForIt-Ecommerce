import { Entity } from "../utils/types/entity";

export class Category extends Entity {
  constructor(
    id: string,
    public _name: string, //private o public?
  ) {
    super(id);

    this.validateName(_name);
  }

  private validateName(name: string): void {
    if (!name.trim()) {
      throw new Error("Category name is required");
    }
  }

  get name() {
    return this._name;
  }

  changeName(newName: string): void {
    this.validateName(newName);
    this._name = newName;
  }
}
