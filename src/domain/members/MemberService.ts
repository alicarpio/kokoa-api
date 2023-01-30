import MemberRepository from "./MemberRepository";
import UUID from "../UUID";
import MemberFormatter from "./MemberFormatter";

export default class MemberService<Format> {
  constructor(
    private memberRepository: MemberRepository,
    private memberFormatter: MemberFormatter<Format>
  ) {}

  async getMemberById(id: UUID): Promise<Format | null> {
    const member = await this.memberRepository.getById(id);
    return member ? this.memberFormatter.format(member) : null;
  }

  async getAllMembers(): Promise<Format[]> {
    return this.memberRepository
      .getAll()
      .then((members) =>
        members.map((member) => this.memberFormatter.format(member))
      );
  }
}
