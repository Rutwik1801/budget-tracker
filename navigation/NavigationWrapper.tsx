import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ManageExpenses } from "../screens/ManageExpenses";
import { RecentExpenses } from "../screens/RecentExpenses";
import { AllExpenses } from "../screens/AllExpenses";

export const ExpensesOverview = () => {
  const BottomTabs = createBottomTabNavigator();
  return (<BottomTabs.Navigator>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
  </BottomTabs.Navigator>);
}

export const NavigationWrapper = () => {
  const Stack = createNativeStackNavigator();

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
      <Stack.Screen name="ManageExpense" component={ManageExpenses} />
    </Stack.Navigator>
  </NavigationContainer>
}