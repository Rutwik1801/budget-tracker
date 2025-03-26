import { ScrollView, Text, View } from "react-native";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { CategorizedExpenses } from "../components/CategorizedExpenses";
import ChartWebView from "../components/charts/ChartWebView";
import BarChartWebView from "../components/charts/BarChartWebView";

export const Analytics = () => {
  const expensesCtx = useContext(ExpensesContext);
  
  const { segregatedExpenses, expensePieChartData, transactionBarChartData, totalAmount } = expensesCtx.expenses.reduce(
    (acc, expense) => {
      const categoryKey = expense?.category?.value;
      const transactionType = expense?.transactionType;

      if (!categoryKey || !transactionType) return acc;

      // Handle category-based segregation
      if (!acc.segregatedExpenses[categoryKey]) {
        acc.segregatedExpenses[categoryKey] = {
          ids: [],
          total: 0,
          category: expense.category,
        };
      }
      acc.segregatedExpenses[categoryKey].ids.push(expense.id);
      acc.segregatedExpenses[categoryKey].total += expense.amount;
      acc.expensePieChartData[categoryKey] = (acc.expensePieChartData[categoryKey] || 0) + expense.amount;

      // Handle transaction type-based segregation
      acc.transactionBarChartData[transactionType] = (acc.transactionBarChartData[transactionType] || 0) + expense.amount;
      
      // Update total amount
      acc.totalAmount += expense.amount;

      return acc;
    },
    {
      segregatedExpenses: {},
      expensePieChartData: {},
      transactionBarChartData: {},
      totalAmount: 0,
    }
  );

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
