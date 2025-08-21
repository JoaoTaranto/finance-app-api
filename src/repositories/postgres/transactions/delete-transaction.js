import { PostgresHelper } from "../../../database/postgres/helper.js";

export class PostgresDeleteTransactionRepository {
    async execute(transactionId) {
        await PostgresHelper.query(
            "DELETE FROM transactions WHERE id = $1 RETURNING *",
            [transactionId],
        );
    }
}
