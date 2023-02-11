import SocialMedia from "../../domain/members/SocialMedia";

export default class SocialMediaMapper {
  static fromRow(row: any): SocialMedia {
    return {
      github: row.github,
      linkedin: row.linkedin,
      pwebsite: row.pwebsite,
    };
  }
}
