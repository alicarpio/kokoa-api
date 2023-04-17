import { DecoratingValidator } from './decorating_validator';
import { Validator } from './validator';

export default class MinLengthValidator extends DecoratingValidator<string> {
    constructor(
        private Min: number,
        inner: Validator<string> | null = null,
        errors: string[] = []
    ) {
        super(errors, inner);
    }

    override ValidateThis(what: string): boolean {
        const valid = what.length >= this.Min;
        if (!valid) {
            this.Errors.push(
                `Expected ${what} to be greater than or equal to ${this.Min}`
            );
        }
        return valid;
    }
}
