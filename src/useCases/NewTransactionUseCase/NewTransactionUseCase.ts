import { RequestError } from "../../domain/request";
import { NewTransactionParams} from "../../domain/transaction";
import { createTransaction } from "../../services/TransactionService/TransactionService"
import { loadCreateTransactionDone, loadTransaction, loadTransactionFail } from "../../stores/TransactionStore/TransactionEvents";

const execute = async ({
    descricao,
    valor,
    tipo,
    categoriaId,
    usuarioId
}: NewTransactionParams): Promise<void> => {
    loadTransaction();

    return createTransaction({
        descricao,
        valor,
        tipo,
        categoriaId,
        usuarioId
    }).then(() => {
        loadCreateTransactionDone();
    }).catch(({hasError, message}: RequestError) => {
        loadTransactionFail({hasError, message});
        throw new Error();
    });
};

const NewTransactionUseCase = {
    execute
};

export default NewTransactionUseCase;