import { PostgresHelper } from "../../../database/postgres/helper.js";

export class PostgresGetTransactionsByUserIdRepository {
    async execute(userId) {
        const transactions = PostgresHelper.query(
            "SELECT * FROM transactions WHERE user_id = $1",
            [userId],
        );
        return transactions;
    }
}
