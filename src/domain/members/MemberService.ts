import Member from "./Member";
import MemberRepository from "./MemberRepository";
import UUID from "../UUID";

export default class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async getMemberById(id: UUID): Promise<Member | null> {
    return await this.memberRepository.getById(id);
  }
}
