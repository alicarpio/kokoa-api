import Member from "../../domain/members/Member";
import SocialMedia from "../../domain/members/SocialMedia";
import UUID from "../../domain/UUID";
import MemberMapper from "./MemberMapper";
import SocialMediaMapper from "./SocialMediaMapper";
import MemberRepository from "../../domain/members/MemberRepository";

import { Client } from "pg";

export default class PgMemberRepository implements MemberRepository {
  private db: Client;

  constructor() {
    this.db = new Client({
      host: process.env.PGHOST || "0.0.0.0",
      user: process.env.PGUSER || "kokoa",
      password: process.env.PGPASSWORD || "kokoa",
      database: process.env.PGDATABASE || "kokoa",
    });
  }

  async init(): Promise<PgMemberRepository> {
    await this.db.connect().catch((err) => console.error(err.stack));
    return this;
  }

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
      .then((rows) => MemberMapper.fromRow(rows[0]));
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
        return SocialMediaMapper.fromRow(rows[0]);
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
      .then((rows) => rows.map((row) => MemberMapper.fromRow(row)))
      .then(async (members) => {
        for (let member of members) {
          member.socialMedia = await this.getSocialMediaForMember(member.id);
        }
        return members;
      });
  }
}
