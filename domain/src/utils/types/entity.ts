export abstract class Entity {
  constructor(public readonly id: string) {
    if (!id) {
      throw new Error("Entity id is required");
    }
  }
}