import express from "express";
import MemberService from "../domain/members/MemberService";
import InMemoryMemberRepository from "../infrastructure/members/InMemoryMemberRepository";
import JsonMemberFormatter from "../infrastructure/members/JsonMemberFormatter";

import memberRoutes from "./routes/members";

export default async function createApp() {
  const app = express();

  const memberRepository = new InMemoryMemberRepository();
  const memberFormatter = new JsonMemberFormatter();
  const memberService = new MemberService(memberRepository, memberFormatter);
  app.use("/v1/members", memberRoutes(memberService));

  return app;
}
