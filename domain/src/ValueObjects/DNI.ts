export class DNI {
  private readonly value: string;

  constructor(value: string) {
    const cleanValue = value.trim();

    if (!/^\d+$/.test(cleanValue)) {
      throw new Error("DNI must contain only numbers");
    }

    if (cleanValue.length < 7 || cleanValue.length > 8) {
      throw new Error("Invalid DNI length");
    }

    this.value = cleanValue;
  }

  getValue(): string {
    return this.value;
  }

  toString(): string {
    return this.value;
  }

  equals(other: DNI): boolean {
    return this.value === other.value;
  }
}
