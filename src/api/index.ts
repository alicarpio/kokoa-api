import express from "express";
import MemberService from "../domain/members/MemberService";
import PgMemberRepository from "../infrastructure/members/PgMemberRepository";
import JsonMemberFormatter from "../infrastructure/members/JsonMemberFormatter";

import memberRoutes from "./routes/members";

export default async function createApp() {
  const app = express();

  const memberRepository = await new PgMemberRepository().init();
  const memberFormatter = new JsonMemberFormatter();
  const memberService = new MemberService(memberRepository, memberFormatter);
  app.use("/api/v1/members", memberRoutes(memberService));

  return app;
}
