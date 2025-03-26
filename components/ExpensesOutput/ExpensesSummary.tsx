import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { Expense } from "../../store/expenses-context";
import { useRoute } from "@react-navigation/native";

export const ExpensesSummary: React.FC<{ periodName: string, expenses: Expense[] }> = ({ periodName, expenses }) => {
  const route = useRoute();
  const { type } = route?.params
  const expensesSum = expenses.reduce((sum: number, expense: Expense) => {
    if (type === "All") {
      return expense.transactionType === "Expense" ? sum - expense.amount : sum + expense.amount
    }
    return sum + (expense.amount ?? 0)
  }, 0);
  return <View style={styles.container}>
    <Text style={styles.period} >{periodName}</Text>
    <Text style={[styles.sum, { color: (expensesSum < 0 || type === "Expense") ? "red" : "green" }]}
    >{`$${expensesSum?.toFixed(2)}`}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 50,
    marginBottom: 4
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
  },
  sum: {
    fontSize: 28,
    color: GlobalStyles.colors.primary50
  }
})