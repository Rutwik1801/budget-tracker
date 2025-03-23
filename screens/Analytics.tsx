import { Text, View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../utils/date"
import { CategorizedExpenses } from "../components/CategorizedExpenses"
import PieChartExample from "../components/charts/PieChart"

export const Analytics = () => {
  const expensesCtx = useContext(ExpensesContext)
  const segregatedExpenses = {};
  let totalAmount = 0;
  expensesCtx.expenses.forEach((expense) => {
    if(!segregatedExpenses[expense.category.value]) {
      segregatedExpenses[expense.category.value] = {
        ids: [],
        total: 0,
        category: expense.category
      }
    }
    segregatedExpenses[expense.category.value].ids.push(expense.id)
    segregatedExpenses[expense.category.value].total+=expense.amount
    totalAmount+=expense.amount
  })
  return <View style={{flex: 1}}>
    <PieChartExample />
    <CategorizedExpenses segregatedExpenses={segregatedExpenses} totalAmount={totalAmount} />
    </View>
}