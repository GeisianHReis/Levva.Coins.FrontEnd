import { useStore } from "effector-react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { HomeWrapper, PriceHighLight, TransactionsTable, TransactionsTableEmpty, TransationsContainer } from "./styles";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import GetTransactionUseCase from "../../useCases/GetTransactionUseCase/GetTransactionUseCase";
import CategoryStore from "../../stores/CategoryStore/CategoryStore";
import { useEffect } from "react";

export function Home(){
    const { isLoading, transactions, transactionsSearch } = useStore(TransactionStore);
    const { categories } = useStore(CategoryStore);

    const money = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

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
                        {(transactionsSearch.length > 0 ? transactionsSearch : transactions).map(transactionsSearch => (
                            <tr>
                                <td width="50%">{transactionsSearch.description}</td>
                                <td>{categories.map((category) => category.id === transactionsSearch.categoryId ? category.description : "")}</td>
                                <td><PriceHighLight variant={transactionsSearch.type === 0 ? "income" : "outcome"}>{money.format(transactionsSearch.amount)}</PriceHighLight></td>
                                <td>{transactionsSearch.date.split("T")[0]}</td>
                                
                                
                            </tr>
                            ))}
                        
                    </tbody>
                </TransactionsTable>
                {!isLoading && transactions.length === 0 && (
                    <TransactionsTableEmpty>
                        Adicione uma category e a sua primeira transação :p
                    </TransactionsTableEmpty>
                )}
            </TransationsContainer>
        </HomeWrapper>
    )
}