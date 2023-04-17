import Event from './Event';

export default interface EventRepository<Id> {
    GetAll(): Promise<Array<Event>>;
}
