import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationWrapper } from './navigation/NavigationWrapper';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationWrapper />
    </>
  );
}


