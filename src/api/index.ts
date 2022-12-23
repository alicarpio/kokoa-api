import { config } from "dotenv";
import express from "express";
import MemberService from "../domain/members/MemberService";
import InMemoryMemberRepository from "../infrastructure/members/InMemoryMemberRepository";
import JsonMemberFormatter from "../infrastructure/members/JsonMemberFormatter";

import memberRoutes from "./routes/members";

export default async function main() {
  config();

  const app = express();
  const PORT = process.env.PORT;

  const memberRepository = new InMemoryMemberRepository();
  const memberFormatter = new JsonMemberFormatter();
  const memberService = new MemberService(memberRepository, memberFormatter);

  app.use("/v1/members", memberRoutes(memberService));

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}
