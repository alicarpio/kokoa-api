import { Router } from "express";
import MemberService from "../../domain/members/MemberService";
import UUID from "../../domain/UUID";
import { JsonMemberFormat } from "../../infrastructure/members/JsonMemberFormatter";

export default function memberRoutes(
  memberService: MemberService<JsonMemberFormat>
) {
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

    const member = await memberService.getMemberById(memberId);

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
    return memberService.getAllMembers().then((members) => {
      return res.status(200).json(members);
    });
  });

  return router;
}
