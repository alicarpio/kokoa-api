import express from "express";
import { Client } from "pg";

import MemberService from "../domain/members/MemberService";
import PgMemberRepository from "../infrastructure/members/PgMemberRepository";
import JsonMemberFormatter from "../infrastructure/members/JsonMemberFormatter";
import memberRoutes from "./routes/members";

import PgEventRepository from "../domain/events/PgEventRepository";
import eventRoutes from "./routes/events";

export default async function createApp() {
  const app = express();

  const pgClient = new Client({
    host: process.env.PGHOST || "0.0.0.0",
    user: process.env.PGUSER || "kokoa",
    password: process.env.PGPASSWORD || "kokoa",
    database: process.env.PGDATABASE || "kokoa",
  });

  try {
    await pgClient.connect();
  } catch (e) {
    console.log(e);
    return;
  }

  const memberRepository = await new PgMemberRepository().init();
  const memberFormatter = new JsonMemberFormatter();
  const memberService = new MemberService(memberRepository, memberFormatter);
  app.use("/api/v1/members", memberRoutes(memberService));

  const eventRepository = new PgEventRepository(pgClient);
  app.use("/api/v1/events", eventRoutes(eventRepository));

  return app;
}
