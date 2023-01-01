class Expectation {
  constructor(private o: any) {}

  get toBe(): Expectation {
    return this;
  }

  get and(): Expectation {
    return this;
  }

  lessThan(max: number): Expectation {
    if (this.o > max) {
      throw Error(`Expected ${this.o} to be less than ${max}`);
    }
    return this;
  }

  greaterThan(min: number): Expectation {
    if (this.o < min) {
      throw Error(`Expected ${this.o} to be greater than ${min}`);
    }
    return this;
  }
}

export default function expect(o: any) {
  return new Expectation(o);
}
