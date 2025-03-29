import { StatusBar } from 'expo-status-bar';
import { NavigationWrapper } from './navigation/NavigationWrapper';
import { ExpensesContextProvider } from './store/expenses-context';
import { AuthContextProvider } from './store/auth-context';

export default function App() {
  return (
    <>
    <AuthContextProvider>
    <ExpensesContextProvider>
      <StatusBar style="light" />
      <NavigationWrapper />
    </ExpensesContextProvider>
    </AuthContextProvider>
    </>
  );
}


