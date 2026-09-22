export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!value.includes("@")) {
      throw new Error("Invalid email");
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
  
  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}