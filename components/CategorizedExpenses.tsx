import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../constants/styles"
import { IconButton } from "./UI/IconButton"
import { useNavigation } from "@react-navigation/native"

export const CategorizedExpenses = ({ segregatedExpenses, totalAmount }) => {

  return <View style={{ padding: 8 }}>
    {Object.entries(segregatedExpenses).map(item => <CategorizedExpense key={item[0]} values={item} totalAmount={totalAmount} />)}
  </View>
}

export const CategorizedExpense = ({ values, totalAmount }) => {
  const navigation = useNavigation()
  const { category, total, ids } = values[1]
  const amountPercentage = (total.toFixed(2) / totalAmount) * 100
  return (
    <Pressable onPress={() => navigation.navigate("DateWiseExpenses", {category: category})}>
    <View key={category.value} style={styles.categorizedExpenseContainer}>
      <View style={styles.iconContainer}>
        <View style={styles.categoryContainer}>
          <IconButton icon={category.value} size={25} background={GlobalStyles.colors.primaryGrey} color={GlobalStyles.colors.primary800} onPress={() => { }} />
          <Text style={styles.categoryLabel}>{category.label}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount} >{`$${total.toFixed(2)}`}</Text>
          <Text style={styles.percent}>{`-${amountPercentage.toFixed(2)}%`}</Text>
        </View>
      </View>
      <View
        style={[
          styles.progressContainer,
          { width: `${(total.toFixed(2) / totalAmount) * 100}%` },
        ]}></View>
    </View>
        </Pressable>)
}

const styles = StyleSheet.create({
  categorizedExpenseContainer: { 
    backgroundColor: GlobalStyles.colors.primary50,
    minHeight: 50,
    borderRadius: 14,
    marginBottom: 20,
    paddingTop:8,
    elevation: 3
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center" 
  },
  progressContainer: {
    marginTop: 5,
    borderRadius: 14,
    backgroundColor: GlobalStyles.colors.primary800,
    height: 8,
    borderTopLeftRadius: 0
  },
  amountContainer: {
    alignItems: "center",
    flexDirection: "row"
  },
  iconContainer: {
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  amount: {
    color: GlobalStyles.colors.error500,
    fontSize: 24,
    marginRight: 8
  },
  percent: {
    color: GlobalStyles.colors.primaryRed
  },
  categoryLabel: {
    color: GlobalStyles.colors.primary800,
    fontSize: 18
  }
})