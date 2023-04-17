import express from 'express';
import { Client } from 'pg';

import PgMemberRepository from '../domain/members/PgMemberRepository';
import MemberRoutes from './routes/members';

import PgEventRepository from '../domain/events/PgEventRepository';
import EventRoutes from './routes/events';

export default async function CreateApp() {
    const app = express();

    const pgClient = new Client({
        host: process.env.PGHOST || '0.0.0.0',
        user: process.env.PGUSER || 'kokoa',
        password: process.env.PGPASSWORD || 'kokoa',
        database: process.env.PGDATABASE || 'kokoa',
    });

    try {
        await pgClient.connect();
    } catch (e) {
        console.log(e);
        return;
    }

    const memberRepository = new PgMemberRepository(pgClient);
    app.use('/api/v1/members', MemberRoutes(memberRepository));

    const eventRepository = new PgEventRepository(pgClient);
    app.use('/api/v1/events', EventRoutes(eventRepository));

    return app;
}
