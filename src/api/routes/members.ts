import { Router } from 'express';

import UUID from '../../domain/UUID';
import MemberRepository from '../../domain/members/MemberRepository';

export default function MemberRoutes(memberRepository: MemberRepository) {
    const router = Router();

    router.get('/:id', async function (req, res) {
        const memberId = UUID.FromString(req.params.id);

        if (memberId === null) {
            // TODO: Use a library to format errors.
            return res.status(400).json({
                status: 400,
                error: `Invalid uuid: ${req.params.id}`,
            });
        }

        const member = await memberRepository.GetById(memberId);

        if (member === null) {
            return res.status(404).json({
                status: 404,
                error: `Member not found for id '${req.params.id}'`,
            });
        }

        return res.status(200).json(member.ToJSON());
    });

    router.get('/', (req, res) => {
        // TODO: Handle pagination.
        return memberRepository.GetAll().then(members => {
            return res.status(200).json(members.map(member => member.ToJSON()));
        });
    });

    return router;
}
