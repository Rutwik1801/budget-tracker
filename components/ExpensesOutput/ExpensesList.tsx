import { FlatList, View } from "react-native"
import { ExpenseItem } from "./ExpenseItem"
import { Expense } from "../../utils/types"

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />
}

export const ExpensesList:React.FC<{expenses: Expense[]}> = ({expenses}) => {
  return <View>
    <FlatList showsVerticalScrollIndicator={false} data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  </View>
}