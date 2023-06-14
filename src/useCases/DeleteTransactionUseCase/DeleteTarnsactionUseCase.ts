
import { CategoryValues } from "../../domain/category";
import { RequestError } from "../../domain/request";
import { loadCategory, loadCategoryDone, loadCategoryFail } from "../../stores/CategoryStore/CategoryEvents";
import { getCategories } from "../../services/CategoryService/CategoryService"

const execute = async (): Promise<void> => {
    loadCategory();
     
    return getCategories().then(
        
        (categories: CategoryValues[]) => {
            loadCategoryDone(categories);
        }
    ).catch(({ hasError, message}: RequestError) => {
        loadCategoryFail({hasError, message});
    });
};

const GetCategoriesUseCase = {
    
    execute,
    
};

export default GetCategoriesUseCase;