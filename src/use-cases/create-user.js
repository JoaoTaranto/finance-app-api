import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { PostgresCreateUserRepository } from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";

export class CreateUserUseCase {
    async execute(createUserParams) {
        const getUserByEmail = new PostgresGetUserByEmailRepository();
        const userWithProvidedEmail = await getUserByEmail.execute(
            createUserParams.email,
        );

        if (userWithProvidedEmail) {
            throw new Error("The provided e-mail is already in use!");
        }

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            ID: userId,
            password: hashedPassword,
        };

        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        const createdUser = postgresCreateUserRepository.execute(user);
        return createdUser;
    }
}
