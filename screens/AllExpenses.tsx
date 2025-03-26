import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"

export const AllExpenses = ({route}) => {
  const {type} = route?.params
  const expensesCtx = useContext(ExpensesContext);
    const filteredExpenses = expensesCtx.expenses.filter((expense) => {
      return (type === "All" || type === expense.transactionType)
    })
  return <View style={{flex: 1}}><ExpensesOutput fallbackText="No Expenses Added" expenses={filteredExpenses} expensesPeriod={"All"} /></View>
}