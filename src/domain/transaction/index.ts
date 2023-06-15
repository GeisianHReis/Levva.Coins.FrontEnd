import { CategoryValues } from "../category";

export interface NewTransactionParams {
    descricao: string;
    valor: number;
    tipo: number;
    categoriaId: string;
    usuarioId: number;
}
export interface TransactionValues {
    id: string;
    descricao: string;
    valor: number;
    tipo: number;
    categoriaId: string;
    categoria: CategoryValues;
    data: string;
}
