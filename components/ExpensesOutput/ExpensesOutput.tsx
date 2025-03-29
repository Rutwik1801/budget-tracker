import { StyleSheet, Text, View } from "react-native"
import { ExpensesSummary } from "./ExpensesSummary"
import { ExpensesList } from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"
import { ExpensesContext } from "../../store/expenses-context"
import { useContext } from "react"
import { useRoute } from "@react-navigation/native"
import { getCategoryWiseExpenses, getRecentExpenses, getTransactionFilteredExpenses } from "../../utils/utilFunctions"
import { Expense } from "../../utils/types"

export const ExpensesOutput: React.FC<{ expensesPeriod: string, fallbackText: string }> = ({ expensesPeriod, fallbackText }) => {
  const { expenses } = useContext(ExpensesContext)
  const route = useRoute();
  const { type, category, isRecentTab } = route?.params

  let filteredExpenses: Expense[] = []; 
  if(category) {
    filteredExpenses = getCategoryWiseExpenses(expenses, category)
  } else {
    filteredExpenses = getTransactionFilteredExpenses(expenses, type)
    if(isRecentTab) {
      filteredExpenses = getRecentExpenses(filteredExpenses)
    }
  }
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={filteredExpenses} />
  }
  return <View style={styles.container}>
    <ExpensesSummary expenses={filteredExpenses} periodName={expensesPeriod} />
    {content}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  infoText: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32
  }
})