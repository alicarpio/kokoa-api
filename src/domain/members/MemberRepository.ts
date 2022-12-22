import Member from "./Member";
import UUID from "../UUID";

export default interface MemberRepository {
  getById: (id: UUID) => Promise<Member | null>;
}
