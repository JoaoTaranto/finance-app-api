import bcrypt from "bcrypt";

import { EmailAlreadyInUseError } from "../errors/user";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email";
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user";

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const postgresGetUserByEmail =
                new PostgresGetUserByEmailRepository();

            const userWithProvidedEmail = await postgresGetUserByEmail.execute(
                updateUserParams.email,
            );

            if (userWithProvidedEmail) {
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

        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        );

        return updatedUser;
    }
}
