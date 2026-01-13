import { ExpensesSummary } from "./ExpensesSummary"
import { ExpensesList } from "./ExpensesList"
import { ExpensesContext } from "../../store/expenses-context"
import { useContext } from "react"
import { useRoute } from "@react-navigation/native"
import { getCategoryWiseExpenses, getRecentExpenses, getTransactionFilteredExpenses } from "../../utils/utilFunctions"
import { Expense } from "../../utils/types"
import { View, Text } from "../base"

export const ExpensesOutput: React.FC<{ expensesPeriod: string, fallbackText: string }> = ({ expensesPeriod, fallbackText }) => {
  const { expenses } = useContext(ExpensesContext)
  const route = useRoute();
  const { type, category, isRecentTab } = (route?.params as any) || {}

  let filteredExpenses: Expense[] = []; 
  if(category) {
    filteredExpenses = getCategoryWiseExpenses(expenses, category)
  } else {
    filteredExpenses = getTransactionFilteredExpenses(expenses, type)
    if(isRecentTab) {
      filteredExpenses = getRecentExpenses(filteredExpenses)
    }
  }
  let content = <Text className="text-white text-base text-center mt-8">{fallbackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={filteredExpenses} />
  }
  return <View className="flex-1 p-4 bg-gray-100">
    <ExpensesSummary expenses={filteredExpenses} periodName={expensesPeriod} />
    {content}
  </View>
}