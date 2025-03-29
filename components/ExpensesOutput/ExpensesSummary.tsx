import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { useRoute } from "@react-navigation/native";
import { getCurrencyFormattedText, getExpenseSum } from "../../utils/utilFunctions";
import { Expense } from "../../utils/types";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";

export const ExpensesSummary: React.FC<{ periodName: string, expenses: Expense[] }> = ({ periodName, expenses }) => {
  const route = useRoute();
  const { type } = route?.params
  const { currency } = useContext(ExpensesContext)
  const expensesSum = getExpenseSum(expenses, type)

  return <View style={styles.container}>
    <Text style={styles.period} >{periodName}</Text>
    <Text style={[styles.sum, { color: (expensesSum < 0 || type === "Expense") ? "red" : "green" }]}
    >{getCurrencyFormattedText(expensesSum, currency)}</Text>
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