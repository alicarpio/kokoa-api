import { Validator } from "./validator";

/// A decorating validator succeeds if its inner validator also succeeds.
/// Useful for chaining validations.
export abstract class DecoratingValidator<T> implements Validator<T> {
  /// @param errors The array of errors produced by this validator.
  /// @param inner The inner validator.
  constructor(public errors: string[], private inner: Validator<T> | null) {}

  protected abstract validateThis(what: T): boolean;

  validate(what: T): boolean {
    return (
      this.validateThis(what) &&
      (this.inner === null || this.inner.validate(what))
    );
  }
}
