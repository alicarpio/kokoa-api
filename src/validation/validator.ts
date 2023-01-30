export interface Validator<T> {
  /// List of errors resulting from the validation.
  errors: string[];

  /// Validate the provided object.
  validate: (what: T) => boolean;
}
