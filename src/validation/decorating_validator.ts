import { Validator } from './validator';

/// A decorating validator succeeds if its inner validator also succeeds.
/// Useful for chaining validations.
export abstract class DecoratingValidator<T> implements Validator<T> {
    /// @param errors The array of errors produced by this validator.
    /// @param inner The inner validator.
    constructor(public Errors: string[], private Inner: Validator<T> | null) {}

    protected abstract ValidateThis(what: T): boolean;

    Validate(what: T): boolean {
        return (
            this.ValidateThis(what) &&
            (this.Inner === null || this.Inner.Validate(what))
        );
    }
}
