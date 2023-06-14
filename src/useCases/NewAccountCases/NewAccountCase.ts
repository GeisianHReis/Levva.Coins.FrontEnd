import { NewAccountService } from "../../services/NewAccountService/newAccountService";

import { loadNewAccount, loadNewAccountDone, loadNewAccountFail } from "../../stores/NewAccountStore/NewAccountEvents";

import { router } from "../../Router";

import { NewAccountParams } from "../../domain/newAccount";
import { RequestError } from "../../domain/request";

const execute = async ({
  nome,
  email,
  senha,

}: NewAccountParams): Promise<void> => {
    loadNewAccount();

  return NewAccountService.createUser({
    nome,
    email,
    senha,
  })
    .then(() => {
      loadNewAccountDone();

      router.navigate("/login");
    })
    .catch(({ hasError, message }: RequestError) => {
      loadNewAccountFail({ hasError, message });
    });
};

const NewAccountUseCase = {
  execute,
};

export default NewAccountUseCase;