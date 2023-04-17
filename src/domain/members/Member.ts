import MaxLengthValidator from '../../validation/max_length_validator';
import MinLengthValidator from '../../validation/min_length_validator';

import UUID from '../UUID';
import SocialMedia from './SocialMedia';

export default class Member {
    private constructor(
        private _id: UUID,
        private _firstName: string,
        private _lastName: string,
        private _role: string,
        private _socialMedia: SocialMedia | null
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

    get socialMedia(): SocialMedia | null {
        return this._socialMedia;
    }

    set socialMedia(socialMedia: SocialMedia | null) {
        this._socialMedia = socialMedia;
    }

    static Create(
        uuid: UUID,
        firstName: string,
        lastName: string,
        role: string,
        socialMedia: SocialMedia | null = null
    ): Member | string[] {
        const nameLengthValidator = new MaxLengthValidator(
            100,
            new MinLengthValidator(2)
        );

        if (
            !nameLengthValidator.Validate(firstName) ||
            !nameLengthValidator.Validate(lastName)
        ) {
            return nameLengthValidator.Errors;
        }

        return new Member(uuid, firstName, lastName, role, socialMedia);
    }
}
