import { config } from "dotenv";
import express from "express";
import MemberRepository from "../domain/members/MemberRepository";
import MemberService from "../domain/members/MemberService";
import InMemoryMemberRepository from "../infrastructure/InMemoryMemberRepository";

import memberRoutes from "./routes/members";

export default async function main() {
  config();

  const app = express();
  const PORT = process.env.PORT;

  const memberRepository: MemberRepository = new InMemoryMemberRepository();
  const memberService = new MemberService(memberRepository);

  app.use("/v1/members", memberRoutes(memberService));

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}
