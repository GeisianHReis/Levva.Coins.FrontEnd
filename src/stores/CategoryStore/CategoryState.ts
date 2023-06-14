import { CategoryValues } from "../../domain/category";

export interface CategoryState {
  isLoading: boolean;
  categories: CategoryValues[];
  hasError: boolean;
  errorMessage: string;
}
