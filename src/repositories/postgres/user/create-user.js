import { prisma } from "../../../../prisma/prisma.js";
export class PostgresCreateUserRepository {
    async execute(CreateUserParams) {
        console.log(CreateUserParams);
        const user = await prisma.user.create({
            data: {
                id: CreateUserParams.id,
                first_name: CreateUserParams.first_name,
                last_name: CreateUserParams.last_name,
                email: CreateUserParams.email,
                password: CreateUserParams.password,
            },
        });

        return user;
    }
}
