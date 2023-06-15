
import { SearchFormConteiner } from "./styles";
import { useState } from "react";
import { useStore } from "effector-react";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import { loadTransactionBuscadasDone } from "../../stores/TransactionStore/TransactionEvents";
import { useForm } from "react-hook-form";

interface inputProps {
    buscador: string;
}

export function SearchForm(){
    const { transactions } = useStore(TransactionStore);

    const { handleSubmit, register } = useForm<inputProps>();
    function handleBuscada( {buscador}: inputProps) {
        const buscadorUpCase = buscador.toUpperCase();
        const x = transactions.filter((transactions) => transactions.descricao.toUpperCase().includes(buscadorUpCase));
        console.log(x);
        loadTransactionBuscadasDone(x);
    }


    return(
        <SearchFormConteiner onChange={handleSubmit(handleBuscada)}>
            <input {...register("buscador")} type="text" placeholder="Busque por transações" />
        </SearchFormConteiner>
    )
}