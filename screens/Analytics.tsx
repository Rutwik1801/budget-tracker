import { ScrollView, View } from "react-native"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { CategorizedExpenses } from "../components/CategorizedExpenses"
import ChartWebView from "../components/charts/ChartWebView"

export const Analytics = () => {
  const expensesCtx = useContext(ExpensesContext)
  const segregatedExpenses = {};
  const expensePieChartData = {};
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
  Object.entries(segregatedExpenses).forEach((entry) => {
    expensePieChartData[entry[0]] = entry[1].total
  })
  return <View style={{flex: 1}}>
    <ScrollView>
      <ChartWebView 
        expenseCategories={Object.keys(expensePieChartData)} 
        expenseValues={Object.values(expensePieChartData)} 
        />
    <CategorizedExpenses segregatedExpenses={segregatedExpenses} totalAmount={totalAmount} />
        </ScrollView>
    </View>
}