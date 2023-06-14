import { createEvent } from "effector";

import { RequestError } from "../../domain/request";
import { CategoryValues } from "../../domain/category";

export const loadCategory = createEvent("loadCategory");
export const loadCreateCategoryDone = createEvent("loadCreateCategoryDone");
export const loadCategoryDone =
  createEvent<CategoryValues[]>("loadCategoryDone");
export const loadCategoryFail = createEvent<RequestError>("loadCategoryFail");