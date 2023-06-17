
import { SearchFormConteiner } from "./styles";
import { useStore } from "effector-react";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import { loadTransactionBuscadasDone } from "../../stores/TransactionStore/TransactionEvents";
import { useForm } from "react-hook-form";

interface inputProps {
    search: string;
}

export function SearchForm(){
    const { transactions } = useStore(TransactionStore);

    const { handleSubmit, register } = useForm<inputProps>();
    function handleBuscada( {search}: inputProps) {
        const searchUpCase = search.toUpperCase();
        const x = transactions.filter((transactions) => transactions.description.toUpperCase().includes(searchUpCase));
        console.log(x);
        loadTransactionBuscadasDone(x);
    }


    return(
        <SearchFormConteiner onChange={handleSubmit(handleBuscada)}>
            <input {...register("search")} type="text" placeholder="Busque por transações" />
        </SearchFormConteiner>
    )
}