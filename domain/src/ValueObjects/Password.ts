export class Password {
  private readonly value: string;

  constructor(value: string) {
    if (!value.trim()) {
      throw new Error("Password is required");
    }

    if (value.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }
}