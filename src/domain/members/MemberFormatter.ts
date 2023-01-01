import Member from "./Member";

/**
 * Defines an interface for things that can format Members.
 */
export default interface MemberFormatter<T> {
  format: (member: Member) => T;
}
