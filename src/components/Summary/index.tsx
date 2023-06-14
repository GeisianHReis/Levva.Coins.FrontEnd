import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { defaultTheme } from "../../styles/defaultTheme";
import { useStore } from "effector-react";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";


export function Summary(){
    const {transactions} = useStore(TransactionStore);

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.tipo === 0){
            acc.deposito += transaction.valor;
            acc.total += transaction.valor;
        } else {
            acc.saidas += transaction.valor;
            acc.total -= transaction.valor;
        }
        return acc;
    },
        {
            deposito: 0,
            saidas: 0,
            total: 0
        });

    const money = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return(
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color={defaultTheme["yellow-500"]}/>
                </header>

                <strong>{money.format(summary.deposito)}</strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color={defaultTheme["red-500"]}/>
                </header>

                <strong>{money.format(summary.saidas)}</strong>
            </SummaryCard>
            <SummaryCard variant="balance">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color={defaultTheme["yellow-500"]}/>
                </header>

                <strong>{money.format(summary.total)}</strong>
            </SummaryCard>
        </SummaryContainer>
    )
}