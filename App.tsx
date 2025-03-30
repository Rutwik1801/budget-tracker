import { StatusBar } from 'expo-status-bar';
import { NavigationWrapper } from './navigation/NavigationWrapper';
import { ExpensesContextProvider } from './store/expenses-context';
import { AuthContext, AuthContextProvider } from './store/auth-context';
import { useContext, useEffect } from 'react';
import { refreshFirebaseToken } from './utils/rest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Root = () => {
  const { login } = useContext(AuthContext)

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) return null;
  
        const newTokens = await refreshFirebaseToken(JSON.parse(userData)?.refreshToken);  
        if (newTokens) {
          await AsyncStorage.setItem('userData', JSON.stringify(newTokens));
          login(newTokens)
        }
      } catch (error) { 
        console.error('Error checking token:', error);
      }
      return null;
    };
    
    checkAndRefreshToken();
  }, [])
  return (
    <ExpensesContextProvider>
      <NavigationWrapper />
    </ExpensesContextProvider>
  );
}

export default function App() {
  return (
    <>
    <StatusBar style="light" />
    <AuthContextProvider>
    <Root />
    </AuthContextProvider>
    </>
  );
}


