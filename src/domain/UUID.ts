import { v4, validate } from 'uuid';

import ToJSON from './ToJSON';

/**
 * Value object to manage UUIDs.
 */
export default class UUID extends ToJSON {
    private constructor(private _uuid: string) {
        super();
    }

    get uuid() {
        return this._uuid;
    }

    equals(other: UUID): boolean {
        return this.uuid == other.uuid;
    }

    override ToJSON(): any {
        return this._uuid.toString();
    }

    /**
     * Create a new UUID from a generated uuid.
     */
    static Create(): UUID {
        return new UUID(v4());
    }

    /**
     * Create a new UUID from a string.
     * @return A new UUID, or null if the provided string is not a valid uuid.
     */
    static FromString(uuid: string): UUID | null {
        if (validate(uuid)) {
            return new UUID(uuid);
        }
        return null;
    }
}
