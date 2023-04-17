export interface Validator<T> {
    /// List of errors resulting from the validation.
    Errors: string[];

    /// Validate the provided object.
    Validate: (what: T) => boolean;
}
