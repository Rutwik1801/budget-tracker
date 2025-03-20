import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ManageExpenses } from "../screens/ManageExpenses";
import { RecentExpenses } from "../screens/RecentExpenses";
import { AllExpenses } from "../screens/AllExpenses";
import { GlobalStyles } from "../constants/styles";
import {Ionicons} from "@expo/vector-icons"

export const ExpensesOverview = () => {
  const BottomTabs = createBottomTabNavigator();
  return (<BottomTabs.Navigator screenOptions={{
    headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: "white",
    tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500
  }}>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses}
     options={{title: "Recent Expenses", 
     tabBarLabel: "Recent", tabBarIcon:({color, size}) => <Ionicons name="hourglass"  size={size} color={color}/>
     }} />
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses}
    options={{title: "All Expenses", 
     tabBarLabel: "All", tabBarIcon:({color, size}) => <Ionicons name="calendar"  size={size} color={color}/>
     }} />
  </BottomTabs.Navigator>);
}

export const NavigationWrapper = () => {
  const Stack = createNativeStackNavigator();

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{headerShown: false}} />
      <Stack.Screen name="ManageExpense" component={ManageExpenses} />
    </Stack.Navigator>
  </NavigationContainer>
}