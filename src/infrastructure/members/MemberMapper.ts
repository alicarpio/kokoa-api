import Member from "../../domain/members/Member";
import UUID from "../../domain/UUID";

export default class MemberMapper {
  static fromRow(row: any): Member {
    return Member.create(
      UUID.fromString(row.id) as UUID,
      row.first_name,
      row.last_name,
      row.role
    ) as Member;
  }
}
