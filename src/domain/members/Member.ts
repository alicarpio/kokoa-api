import expect from "../validation";
import UUID from "../UUID";

export default class Member {
  private constructor(
    private _id: UUID,
    private _firstName: string,
    private _lastName: string,
    private _role: string
  ) {}

  get id(): UUID {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get role(): string {
    return this._role;
  }

  static create(
    uuid: UUID,
    firstName: string,
    lastName: string,
    role: string
  ): Member {
    expect(firstName.length).toBe.greaterThan(2).and.lessThan(100);
    expect(lastName.length).toBe.greaterThan(2).and.lessThan(100);

    return new Member(uuid, firstName, lastName, role);
  }
}
