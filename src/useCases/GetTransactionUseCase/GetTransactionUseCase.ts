import { TransactionService } from "../../services/TransactionService/TransactionService";

import { RequestError } from "../../domain/request";
import { TransactionValues } from "../../domain/transaction";
import { loadTransaction, loadTransactionDone, loadTransactionFail } from "../../stores/TransactionStore/TransactionEvents";

const execute = async (): Promise<void> => {
    loadTransaction();
     
    return TransactionService.getTransactions().then(
        (transactions: TransactionValues[]) => {
            loadTransactionDone(transactions);
        }
    ).catch(({ hasError, message }: RequestError) => {
        loadTransactionFail({ hasError, message });
    });
};

const GetTransactionUseCase = {
    
    execute,
    
}; 

export default GetTransactionUseCase;