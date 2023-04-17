import MaxLengthValidator from '../../validation/max_length_validator';
import MinLengthValidator from '../../validation/min_length_validator';

import UUID from '../UUID';
import ToJSON from '../ToJSON';

import SocialMedia from './SocialMedia';

export default class Member extends ToJSON {
    private constructor(
        public readonly id: UUID,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly role: string,
        public readonly socialMedia: SocialMedia | null
    ) {
        super();
    }

    WithSocialMedia(socialMedia: SocialMedia | null) {
        return new Member(
            this.id,
            this.firstName,
            this.lastName,
            this.role,
            socialMedia
        );
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
