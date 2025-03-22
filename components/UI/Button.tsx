import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { PropsWithChildren } from "react"

type ButtonProps = {
  onPress: () => void,
  mode?: "flat",
  buttonContainerStyle: Object
}
export const Button:React.FC<PropsWithChildren<ButtonProps>> = ({ children, onPress, mode, buttonContainerStyle }) => {
  return <View style={buttonContainerStyle}>
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed} >
      <View style={[styles.button, mode === "flat" && styles.flat]} >
        <Text style={[styles.buttonText, mode === "flat" && styles.flatText]} >{children}</Text>
      </View>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.accent500,
  },
  flat: {
    backgroundColor: GlobalStyles.colors.primary200
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4
  }
})