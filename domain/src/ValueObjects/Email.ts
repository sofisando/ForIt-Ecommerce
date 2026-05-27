export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!value.includes("@")) {
      throw new Error("Invalid email");
    }

    this.value = value.toLowerCase();
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}