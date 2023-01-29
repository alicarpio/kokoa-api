import { DecoratingValidator } from "./decorating_validator";
import { Validator } from "./validator";

export default class MinLengthValidator extends DecoratingValidator<string> {
  constructor(
    private min: number,
    inner: Validator<string> | null = null,
    errors: string[] = []
  ) {
    super(errors, inner);
  }

  override validateThis(what: string): boolean {
    const valid = what.length >= this.min;
    if (!valid) {
      this.errors.push(
        `Expected ${what} to be greater than or equal to ${this.min}`
      );
    }
    return valid;
  }
}
