import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { EmailAlreadyInUseError } from "../../errors/user.js";

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    ) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository;
    }
    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const user = {
            ...createUserParams,
            ID: userId,
            password: hashedPassword,
        };

        const createdUser = this.postgresCreateUserRepository.execute(user);
        return createdUser;
    }
}
