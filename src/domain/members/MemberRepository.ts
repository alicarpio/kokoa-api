import Member from './Member';
import UUID from '../UUID';

export default interface MemberRepository {
    /// Get a single member by its ID.
    GetById: (id: UUID) => Promise<Member | null>;

    /// Get all members.
    GetAll: () => Promise<Member[]>;
}
