import { Client } from "pg";

import UUID from "../UUID";

import Member from "./Member";
import MemberRepository from "./MemberRepository";
import SocialMedia from "./SocialMedia";

export default class PgMemberRepository implements MemberRepository {
  constructor(private db: Client) {}

  async getById(id: UUID): Promise<Member | null> {
    return await this.db
      .query(
        `
      select id, first_name, last_name, role, social_media
        from members
       where $1::uuid = id
      `,
        [id.uuid]
      )
      .then((result) => result.rows)
      .then((rows) => {
        const row = rows[0];
        return Member.create(
          UUID.fromString(row.id)!,
          row.first_name,
          row.last_name,
          row.role
        ) as Member;
      });
  }

  async getSocialMediaForMember(memberId: UUID): Promise<SocialMedia | null> {
    return await this.db
      .query(
        `
    select id, github, linkedin, pwebsite
      from social_media
     where id = $1::uuid
    `,
        [memberId.uuid]
      )
      .then((result) => result.rows)
      .then((rows) => {
        if (rows.length === 0) return null;
        const data = rows[0];
        return {
          github: data.github,
          linkedin: data.linkedin,
          pwebsite: data.pwebsite,
        };
      });
  }

  async getAll(): Promise<Member[]> {
    return await this.db
      .query(
        `
    select id, first_name, last_name, role, social_media
      from members
    `
      )
      .then((result) => result.rows)
      .then((rows) =>
        rows.map((row) => {
          return Member.create(
            UUID.fromString(row.id)!,
            row.first_name,
            row.last_name,
            row.role
          ) as Member;
        })
      )
      .then(async (members: Member[]) => {
        for (let member of members) {
          member.socialMedia = await this.getSocialMediaForMember(member.id);
        }
        return members;
      });
  }
}
