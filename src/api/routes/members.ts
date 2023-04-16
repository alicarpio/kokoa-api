import { Router } from "express";

import UUID from "../../domain/UUID";
import MemberRepository from "../../domain/members/MemberRepository";

export default function memberRoutes(memberRepository: MemberRepository) {
  const router = Router();

  router.get("/:id", async function (req, res) {
    const memberId = UUID.fromString(req.params.id);

    if (memberId === null) {
      // TODO: Use a library to format errors.
      return res.status(400).json({
        status: 400,
        error: `Invalid uuid: ${req.params.id}`,
      });
    }

    const member = await memberRepository.getById(memberId);

    if (member === null) {
      return res.status(404).json({
        status: 404,
        error: `Member not found for id '${req.params.id}'`,
      });
    }

    return res.status(200).json(member);
  });

  router.get("/", (req, res) => {
    // TODO: Handle pagination.
    return memberRepository.getAll().then((members) => {
      return res.status(200).json(members);
    });
  });

  return router;
}
