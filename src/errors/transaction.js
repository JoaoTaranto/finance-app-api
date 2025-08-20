export class TransactionNotFoundError extends Error {
    constructor(transactionId) {
        super(`The transaction with id ${transactionId} not found}`);
        this.name = "TransactionNotFoundError";
    }
}
