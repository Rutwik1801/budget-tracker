import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ManageExpenses } from "../screens/ManageExpenses";
import { RecentExpenses } from "../screens/RecentExpenses";
import { AllExpenses } from "../screens/AllExpenses";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons"
import { IconButton } from "../components/UI/IconButton";
import { Analytics } from "../screens/Analytics";
import { DateWiseExpenses } from "../screens/DateWiseExpenses";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useContext, useEffect, useState } from "react";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getAllExpenses } from "../utils/rest";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";


const TopTabs = createMaterialTopTabNavigator();

const TopTabsNavigator = ({isRecentTab = true}) => {
  return (
  <TopTabs.Navigator screenOptions={{
    tabBarIndicatorStyle: {backgroundColor: "black"}
  }}>
          <TopTabs.Screen name="Expenses" component={isRecentTab ? RecentExpenses : AllExpenses}  initialParams={{type: "Expense", isRecentTab}} />
          <TopTabs.Screen name="Income" component={isRecentTab ? RecentExpenses : AllExpenses}  initialParams={{type: "Income", isRecentTab}}/>
          <TopTabs.Screen name="All" component={ isRecentTab ? RecentExpenses : AllExpenses}  initialParams={{type: "All", isRecentTab}}/>
  </TopTabs.Navigator>
  );
}

export const ExpensesOverview = () => {
  const BottomTabs = createBottomTabNavigator();
  return (<BottomTabs.Navigator screenOptions={({ navigation }) => ({
    headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
    headerTintColor: GlobalStyles.colors.primary50,
    tabBarStyle: { backgroundColor: GlobalStyles.colors.primary800 },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    tabBarInactiveTintColor: GlobalStyles.colors.primary50,
    headerRight: ({ tintColor }) => <IconButton icon="add" size={28} color={tintColor} onPress={() => { navigation.navigate("ManageExpense") }} />
  })}>
    <BottomTabs.Screen name="RecentExpenses" component={TopTabsNavigator}
      options={{
        title: "Recent Expenses",
        tabBarLabel: "Recent", tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />
      }} />
      <BottomTabs.Screen name="Analytics" component={Analytics}
        options={{
          title: "Analytics",
          tabBarLabel: "Analytics", tabBarIcon: ({ color, size }) => <Ionicons name="analytics" size={size} color={color} />
        }} />
    <BottomTabs.Screen name="AllExpenses"
      options={{
        title: "All Expenses",
        tabBarLabel: "All", tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />
      }}>
        {() => <TopTabsNavigator isRecentTab={false} />}
      </BottomTabs.Screen>
  </BottomTabs.Navigator>);
}

export const NavigationWrapper = () => {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const {setExpenses} = useContext(ExpensesContext);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const expenses = await getAllExpenses();
          setExpenses(expenses)
        } catch (err) {
          setError("Could not fetch expenses")
        }
        setIsLoading(false)
      }
      fetchData();
    }, [])

    if(error && !isLoading) return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
    if(isLoading) return <LoadingOverlay />
  return <NavigationContainer>
    <Stack.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
      headerTintColor: GlobalStyles.colors.primary50,
    })}>
      <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{ headerShown: false }} />
      <Stack.Screen name="ManageExpense" component={ManageExpenses} options={{
        presentation: 'modal'
      }} />
       <Stack.Screen name="DateWiseExpenses" component={DateWiseExpenses} options={{
        presentation: 'modal'
      }} />
    </Stack.Navigator>
  </NavigationContainer>
}