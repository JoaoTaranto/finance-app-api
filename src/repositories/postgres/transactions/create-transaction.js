import { ṔostgresHelper } from "../../../database/postgres/helper.js";

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const createdTransaction = await ṔostgresHelper.query(
            "INSERT INTO transactions (ID, user_id, name, date, amount, type) VALUES ($1, $2, $3, $4, $5, $6)",
            [
                createTransactionParams.ID,
                createTransactionParams.user_id,
                createTransactionParams.name,
                createTransactionParams.date,
                createTransactionParams.amount,
                createTransactionParams.type,
            ],
        );
        return createdTransaction;
    }
}
