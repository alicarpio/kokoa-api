import { v4, validate } from "uuid";

/**
 * Value object to manage UUIDs.
 */
export default class UUID {
  private constructor(private _uuid: string) {}

  get uuid() {
    return this._uuid;
  }

  equals(other: UUID): boolean {
    return this.uuid == other.uuid;
  }

  /**
   * Create a new UUID from a generated uuid.
   */
  static create(): UUID {
    return new UUID(v4());
  }

  /**
   * Create a new UUID from a string.
   * @return A new UUID, or null if the provided string is not a valid uuid.
   */
  static fromString(uuid: string): UUID | null {
    if (validate(uuid)) {
      return new UUID(uuid);
    }
    return null;
  }
}
