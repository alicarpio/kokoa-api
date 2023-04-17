import { Router } from 'express';
import UUID from '../../domain/UUID';
import EventRepository from '../../domain/events/EventRepository';

export default function EventRoutes(eventRepository: EventRepository<UUID>) {
    const router = Router();

    router.get('/', async (req, res) => {
        const events = await eventRepository.GetAll();
        return res.status(200).json(events.map(event => event.ToJSON()));
    });

    return router;
}
