import { Text, View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"

export const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return <View style={{flex: 1}}><ExpensesOutput fallbackText="No Expenses Added" expenses={expensesCtx.expenses} expensesPeriod={"All"} /></View>
}