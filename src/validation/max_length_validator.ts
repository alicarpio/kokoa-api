import { DecoratingValidator } from './decorating_validator';
import { Validator } from './validator';

export default class MaxLengthValidator extends DecoratingValidator<string> {
    constructor(
        private Max: number,
        inner: Validator<string> | null = null,
        errors: string[] = []
    ) {
        super(errors, inner);
    }

    override ValidateThis(what: string): boolean {
        const valid = what.length <= this.Max;
        if (!valid) {
            this.Errors.push(
                `Expect ${what} to be less than or equal to ${this.Max}`
            );
        }
        return valid;
    }
}
