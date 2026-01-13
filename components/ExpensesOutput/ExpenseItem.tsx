import { getCurrencyFormattedText, getFormattedDate } from "../../utils/utilFunctions"
import { useNavigation } from "@react-navigation/native"
import { IconButton } from "../UI/IconButton"
import { Expense } from "../../utils/types"
import { useContext } from "react"
import { ExpensesContext } from "../../store/expenses-context"
import { View, Text, Pressable } from "../base"

export const ExpenseItem: React.FC<Expense> = ({ id, description, amount, date, category, transactionType }) => {
  const navigation = useNavigation()
  const { currency } = useContext(ExpensesContext)

  const expensePressHandler = () => {
    (navigation as any).navigate("ManageExpense", { expenseId: id })
  }

  const amountColor = transactionType === "Income" ? "text-green-500" : "text-red-500";

  return (
    <Pressable onPress={expensePressHandler}>
      <View className="flex-row justify-between items-center py-3 px-3.5 my-2 bg-white border border-gray-400 rounded-xl shadow-sm">
        <View className="flex-row items-center">
          <IconButton icon={category.value} size={30} background="#eee" color="#000000" onPress={() => { }} />
          <View className="ml-1">
            <Text className="text-black text-xl">{description}</Text>
            <Text className="text-gray-600 mt-1">{getFormattedDate(date)}</Text>
          </View>
        </View>
        <Text className={`text-xl ${amountColor}`}>
          {`${transactionType === "Income" ? "+" : "-"}${getCurrencyFormattedText(amount, currency)}`}
        </Text>
      </View>
    </Pressable>
  )
}