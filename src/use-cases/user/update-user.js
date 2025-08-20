import bcrypt from "bcrypt";

import {
    EmailAlreadyInUseError,
    UserNotFoundError,
} from "../../errors/user.js";

export class UpdateUserUseCase {
    constructor(
        postgresUpdateUserRepository,
        postgresGetUserByEmail,
        postgresGetUserByIdRepository,
    ) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository;
        this.postgresGetUserByEmailRepository = postgresGetUserByEmail;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    }
    async execute(userId, updateUserParams) {
        const existingUser =
            await this.postgresGetUserByIdRepository.execute(userId);
        if (!existingUser) throw new UserNotFoundError();

        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                );

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const user = {
            ...updateUserParams,
        };

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            );
            user.password = hashedPassword;
        }

        const updatedUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
