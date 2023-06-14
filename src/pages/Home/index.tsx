import { useStore } from "effector-react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { HomeWrapper, PriceHighLight, TransactionsTable, TransactionsTableEmpty, TransationsContainer } from "./styles";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import { useEffect } from "react";
import GetTransactionUseCase from "../../useCases/GetTransactionUseCase/GetTransactionUseCase";
import { Trash } from "phosphor-react";
import { DeleteTransactionModal } from "./DeleteTransactionModal";

export function Home(){
    const { isLoading, transactions, transactionsBuscadas } = useStore(TransactionStore);

    const money = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    })


    
    function deleteTransaction(id: string) {
        
    }

    useEffect(() => {
        GetTransactionUseCase.execute();
    }, []);
    return(
        <HomeWrapper>
            <Header/>
            <Summary/>
            <SearchForm/>
            <TransationsContainer>
                <TransactionsTable>
                    <thead>
                        <tr>
                            <td>Transação</td>
                            <td>Categoria</td>
                            <td>Preço</td>
                            <td>Data</td>
                
                        </tr>
                    </thead>
                    <tbody>
                        {(transactionsBuscadas.length > 0 ? transactionsBuscadas : transactions).map(transactionsBuscadas => (
                            <tr>
                                <td width="50%">{transactionsBuscadas.descricao}</td>
                                <td><PriceHighLight variant={transactionsBuscadas.tipo === 0 ? "income" : "outcome"}>{money.format(transactionsBuscadas.valor)}</PriceHighLight></td>
                                <td>{}</td>
                                <td>{transactionsBuscadas.data.split("T")[0]}</td>
                                
                                
                            </tr>
                            ))}
                        
                    </tbody>
                </TransactionsTable>
                {!isLoading && transactions.length === 0 && (
                    <TransactionsTableEmpty>
                        Adicione uma categoria e a sua primeira transação :p
                    </TransactionsTableEmpty>
                )}
            </TransationsContainer>
        </HomeWrapper>
    )
}