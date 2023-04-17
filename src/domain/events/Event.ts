import UUID from '../UUID';
import ToJSON from '../ToJSON';

export type EventKind = 'TALLER' | 'HACKATHON' | 'PARTICIPACION' | 'CHARLA';

export default class Event extends ToJSON {
    private constructor(
        private id: UUID,
        private name: string,
        private kind: EventKind,
        private eventStart: Date,
        private eventEnd: Date,
        private price?: number
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
