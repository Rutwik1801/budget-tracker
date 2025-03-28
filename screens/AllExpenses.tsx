import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { useContext, useEffect, useState } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getAllExpenses } from "../utils/rest"
import { LoadingOverlay } from "../components/UI/LoadingOverlay"

export const AllExpenses = () => {
  const [isLoading, setIsLoading] = useState(true)
  const expensesCtx = useContext(ExpensesContext);
    useEffect(() => {
      const fetchData = async () => {
        const expenses = await getAllExpenses();
        expensesCtx.setExpenses(expenses)
        setIsLoading(false)

      }
      fetchData();
    }, [])
    if(isLoading) return <LoadingOverlay />
  return <View style={{flex: 1}}><ExpensesOutput fallbackText="No Expenses Added" expensesPeriod={"All"} /></View>
}