import Event from "./Event";

export default interface EventRepository<Id> {
  getAll(): Promise<Array<Event>>;
}
