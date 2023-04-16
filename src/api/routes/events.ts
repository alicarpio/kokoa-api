import { Router } from "express";
import UUID from "../../domain/UUID";
import EventRepository from "../../domain/events/EventRepository";

export default function eventRoutes(eventRepository: EventRepository<UUID>) {
  const router = Router();

  router.get("/", async (req, res) => {
    const events = await eventRepository.getAll();
    return res.status(200).json(events);
  });

  return router;
}
