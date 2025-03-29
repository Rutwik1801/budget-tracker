import { ActivityIndicator, StyleSheet, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"

export const LoadingOverlay = () => {
  return (<View style={styles.container}>
    <ActivityIndicator size="large" color={GlobalStyles.colors.primary800} />
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})