import { PostgresHelper } from "../../../database/postgres/helper.js";

export class PostgresGetTransactionByUserIdRepository {
    async execute(userId) {
        const transactions = PostgresHelper.query(
            "SELECT * FROM transactions WHERE user_id = $1",
            [userId],
        );
        return transactions;
    }
}
