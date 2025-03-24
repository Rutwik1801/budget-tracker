import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../constants/styles"
import { IconButton } from "./UI/IconButton"
import { useNavigation } from "@react-navigation/native"

export const CategorizedExpenses = ({ segregatedExpenses, totalAmount }) => {

  return <View style={{ padding: 8 }}>
    <FlatList data={Object.entries(segregatedExpenses)} keyExtractor={(item) => item[0]} renderItem={(item) => (<CategorizedExpense values={item.item} totalAmount={totalAmount} />)} />
  </View>
}

export const CategorizedExpense = ({ values, totalAmount }) => {
  const navigation = useNavigation()
  const { category, total, ids } = values[1]
  const amountPercentage = (total.toFixed(2) / totalAmount) * 100
  return (
    <Pressable onPress={() => navigation.navigate("DateWiseExpenses", {category: category})}>
    <View key={category.value} style={styles.categoryContainer}>
      <View
        style={[
          styles.progressContainer,
          { width: `${(total.toFixed(2) / totalAmount) * 100}%` },
        ]}></View>

      <View style={styles.iconContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton icon={category.value} size={30} color="white" onPress={() => { }} />
          <Text style={styles.categoryLabel}>{category.label}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.amount} >{`$${total.toFixed(2)}`}</Text>
          <Text style={styles.percent}>{`-${amountPercentage.toFixed(2)}%`}</Text>
        </View>
      </View>
    </View>
        </Pressable>)
}

const styles = StyleSheet.create({
  categoryContainer: { backgroundColor: "#999", minHeight: 80, borderRadius: 4, marginBottom: 20 },
  progressContainer: { position: "absolute", zIndex: 2, minHeight: 80, borderRadius: 8, backgroundColor: "black", height: 50 },
  iconContainer: { position: "absolute", width: "100%", zIndex: 3, paddingRight: 16, minHeight: 80, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  amount: { color: GlobalStyles.colors.error500, fontSize: 30 },
  percent: { color: GlobalStyles.colors.accent500 },
  categoryLabel: { color: "white", fontSize: 20 }
})