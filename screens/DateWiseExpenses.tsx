import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"

export const DateWiseExpenses = ({route}) => {
  const category = route.params?.category
  const expensesCtx = useContext(ExpensesContext)
  let expenses = expensesCtx.expenses;
  if(category) {
    expenses = expenses.filter(expense => category.value === expense.category.value)
  }
  return <View style={{flex: 1}}>
    <ExpensesOutput fallbackText="No Recent Expenses" expenses={expenses} expensesPeriod={category.label} />
    </View>
}