import { DecoratingValidator } from "./decorating_validator";
import { Validator } from "./validator";

export default class MaxLengthValidator extends DecoratingValidator<string> {
  constructor(
    private max: number,
    inner: Validator<string> | null = null,
    errors: string[] = []
  ) {
    super(errors, inner);
  }

  override validateThis(what: string): boolean {
    const valid = what.length <= this.max;
    if (!valid) {
      this.errors.push(
        `Expect ${what} to be less than or equal to ${this.max}`
      );
    }
    return valid;
  }
}
