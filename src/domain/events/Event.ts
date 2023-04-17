import UUID from '../UUID';
import ToJSON from '../ToJSON';

export type EventKind = 'TALLER' | 'HACKATHON' | 'PARTICIPACION' | 'CHARLA';

export default class Event extends ToJSON {
    private constructor(
        public readonly id: UUID,
        public readonly name: string,
        public readonly kind: EventKind,
        public readonly eventStart: Date,
        public readonly eventEnd: Date,
        public readonly price?: number
    ) {
        super();
    }

    static Create(
        id: UUID,
        name: string,
        kind: EventKind,
        eventStart: Date,
        eventEnd: Date,
        price?: number
    ) {
        // TODO: Add validation.
        // - Validate that eventStart < eventEnd
        // - name != ""
        return new Event(id, name, kind, eventStart, eventEnd, price);
    }
}
