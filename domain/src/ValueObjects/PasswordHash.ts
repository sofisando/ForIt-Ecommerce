export class PasswordHash {
  constructor(private readonly value: string) {
    if (!value.trim()) {
      throw new Error("Password hash is required");
    }
  }

  getValue(): string {
    return this.value;
  }
  toString(): string {
    return this.value;
  }
}