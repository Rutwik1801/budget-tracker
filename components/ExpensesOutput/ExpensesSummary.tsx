import { useRoute } from "@react-navigation/native";
import { getCurrencyFormattedText, getExpenseSum } from "../../utils/utilFunctions";
import { Expense } from "../../utils/types";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";
import { View, Text } from "../base";

export const ExpensesSummary: React.FC<{ periodName: string, expenses: Expense[] }> = ({ periodName, expenses }) => {
  const route = useRoute();
  const { type } = (route?.params as any) || {}
  const { currency } = useContext(ExpensesContext)
  const expensesSum = getExpenseSum(expenses, type)

  const amountColor = (expensesSum < 0 || type === "Expense") ? "text-red-500" : "text-green-500";

  return (
    <View className="p-4 px-6 min-w-[200px] items-center bg-white rounded-lg rounded-tl-[40px] rounded-br-[40px] self-center mb-1">
      <Text className="text-base font-bold text-black mb-2">{periodName}</Text>
      <Text className={`text-3xl ${amountColor}`}>
        {`${type === "Income" ? "+" : type === "Expense" ? "-" : ""}${getCurrencyFormattedText(expensesSum, currency)}`}
      </Text>
    </View>
  )
}