import Member from "../../domain/members/Member";
import MemberFormatter from "../../domain/members/MemberFormatter";
import SocialMedia from "../../domain/members/SocialMedia";

export interface JsonMemberFormat {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  socialMedia: SocialMedia;
}

export default class JsonMemberFormatter
  implements MemberFormatter<JsonMemberFormat>
{
  format(member: Member): JsonMemberFormat {
    return {
      id: member.id.uuid,
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      socialMedia: member.socialMedia,
    };
  }
}
