import {StyleSheet, Text, View } from "react-native"
import { Button } from "./Button"
import { GlobalStyles } from "../../constants/styles"

export type OverlayProps = {
  message: string;
  onConfirm: () => void;
}

export const ErrorOverlay = ({message, onConfirm}: OverlayProps) => {
  return (<View style={styles.container}>
    <Text style={styles.text} >An Error Occured</Text>
    <Text style={styles.text} >{message}</Text>
    <Button onPress={onConfirm} >Okay</Button>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    color: GlobalStyles.colors.primary50
  }
})