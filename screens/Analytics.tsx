import { ScrollView, Text, View } from "react-native";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { CategorizedExpenses } from "../components/CategorizedExpenses";
import ChartWebView from "../components/charts/ChartWebView";
import BarChartWebView from "../components/charts/BarChartWebView";
import { getAnalyticsData } from "../utils/utilFunctions";

export const Analytics = () => {
  const { expenses } = useContext(ExpensesContext);
  
  const { segregatedExpenses, expensePieChartData, transactionBarChartData, totalAmount } = getAnalyticsData(expenses)

  return (
    <View style={{ flex: 1}}>
      <ScrollView>
        <ChartWebView 
          expenseCategories={Object.keys(expensePieChartData)} 
          expenseValues={Object.values(expensePieChartData)} 
        />
        <Text>Category wise distribution</Text>

        <CategorizedExpenses segregatedExpenses={segregatedExpenses} totalAmount={totalAmount} />

        <BarChartWebView 
          transactionTypes={Object.keys(transactionBarChartData)} 
          transactionValues={Object.values(transactionBarChartData)} 
        />
      </ScrollView>
    </View>
  );
};
