import { PostgresHelper } from "../../database/postgres/helper";

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const user = await PostgresHelper.query(
            "SELECT * FROM users WHERE EMAIL = $1",
            [email],
        );
        return user;
    }
}
