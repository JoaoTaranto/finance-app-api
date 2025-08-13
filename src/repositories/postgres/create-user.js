import { PostgresHelper } from "../../database/postgres/helper.js";

export class PostgresCreateUserRepository {
    async execute(CreateUserParams) {
        await PostgresHelper.query(
            "INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)",
            [
                CreateUserParams.ID,
                CreateUserParams.first_name,
                CreateUserParams.last_name,
                CreateUserParams.email,
                CreateUserParams.password,
            ],
        );
        const createdUser = await PostgresHelper.query(
            "SELECT * FROM users WHERE ID = $1",
            [CreateUserParams.ID],
        );
        return createdUser[0];
    }
}
