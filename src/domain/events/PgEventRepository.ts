import { Client } from "pg";
import EventRepository from "./EventRepository";
import UUID from "../UUID";
import Event from "./Event";

export default class PgEventRepository implements EventRepository<UUID> {
  constructor(private db: Client) {}

  async getAll(): Promise<Event[]> {
    return await this.db
      .query(
        `
        select id, name, kind, eventStart, eventEnd, price
          from events
        `
      )
      .then((result) => result.rows)
      .then(
        (rows) =>
          rows.map((row) =>
            Event.create(
              UUID.fromString(row.id) as UUID,
              row.name,
              row.kind,
              row.eventStart,
              row.eventEnd,
              row.price
            )
          ) as Event[]
      );
  }
}
