import { createEvent } from "effector"
import { RequestError } from "../../domain/request";

export const loadNewAccount = createEvent("loadNewAccount");
export const loadNewAccountDone = createEvent("loadNewAccountDone");
export const loadNewAccountFail = createEvent<RequestError>("loadNewAccountFail");