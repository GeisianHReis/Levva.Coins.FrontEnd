
import { createCategory } from "../../services/CategoryService/CategoryService";
import { RequestError } from "../../domain/request";
import { NewCategoryParams } from "../../domain/category";
import { loadCategory, loadCategoryFail, loadCreateCategoryDone } from "../../stores/CategoryStore/CategoryEvents";

const execute = async ({ descricao}: NewCategoryParams): Promise<void> => {
    loadCategory();

    return createCategory({
      descricao,
    })
    .then(() => {
      loadCreateCategoryDone();
    })
    .catch(({ hasError, message }: RequestError) => {
      loadCategoryFail({ hasError, message });
      throw new Error();
    });
};

const NewAccountUseCase = {
  execute,
};

export default NewAccountUseCase;