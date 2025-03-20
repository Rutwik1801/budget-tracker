import { StatusBar } from 'expo-status-bar';
import { NavigationWrapper } from './navigation/NavigationWrapper';
import { ExpensesContextProvider } from './store/expenses-context';

export default function App() {
  return (
    <>
    <ExpensesContextProvider>
      <StatusBar style="light" />
      <NavigationWrapper />
    </ExpensesContextProvider>
    </>
  );
}


