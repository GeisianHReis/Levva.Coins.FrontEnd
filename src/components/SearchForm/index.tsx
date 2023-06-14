import { MagnifyingGlass } from "phosphor-react";
import { SearchFormConteiner } from "./styles";
import { useState } from "react";
import { useStore } from "effector-react";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import { loadTransactionBuscadasDone } from "../../stores/TransactionStore/TransactionEvents";
import { TransactionValues } from "../../domain/transaction";
import { useForm } from "react-hook-form";

interface inputProps {
    buscador: string;
}

export function SearchForm(){
    const { transactions } = useStore(TransactionStore);
    const [busca, setBusca] = useState('');
    //loadTransactionBuscadasDone(transactions.filter((transactions) => transactions.descricao.includes(busca)));
    const { handleSubmit, register } = useForm<inputProps>();
    function handleBuscada( {buscador}: inputProps) {
        const x = transactions.filter((transactions) => transactions.descricao.includes(buscador));
        console.log(x);
        loadTransactionBuscadasDone(x);
    }


    return(
        <SearchFormConteiner onChange={handleSubmit(handleBuscada)}>
            <input {...register("buscador")} type="text" placeholder="Busque por transações" />
            
            <button>
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
            
        </SearchFormConteiner>
    )
}