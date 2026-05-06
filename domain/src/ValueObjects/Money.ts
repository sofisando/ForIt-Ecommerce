export class Money {
  private readonly value: number;

  constructor(amount: number) {
    if (!Number.isFinite(amount)) {
      throw new Error("Invalid money value");
    }

    if (amount <= 0) {
      throw new Error("Money must be greater than zero");
    }

    if (!this.hasTwoDecimals(amount)) {
      throw new Error("Max 2 decimal places allowed");
    }

    this.value = amount;
  }

  private hasTwoDecimals(value: number): boolean {
    return Math.round(value * 100) === value * 100;
  }

  toNumber(): number {
    return this.value;
  }

  add (money: Money): Money{
    return new Money(this.value + money.toNumber());
  }

}