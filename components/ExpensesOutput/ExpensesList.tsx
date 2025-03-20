import { FlatList, Text, View } from "react-native"
import { ExpenseItem } from "./ExpenseItem"

const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />
}

export const ExpensesList = ({expenses}) => {
  return <View>
    <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  </View>
}