import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { PropsWithChildren } from "react"

type ButtonProps = {
  onPress: () => void,
  mode?: "flat",
  buttonContainerStyle?: Object,
  buttonStyle?: Object
}
export const Button:React.FC<PropsWithChildren<ButtonProps>> = ({ children, onPress, mode, buttonContainerStyle, buttonStyle }) => {
  return <View style={buttonContainerStyle}>
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed} >
      <View style={[styles.button, mode === "flat" ? styles.flat : buttonStyle]} >
        <Text style={styles.buttonText} >{children}</Text>
      </View>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.accent500,
    borderColor: GlobalStyles.colors.primary800,
  },
  flat: {
    backgroundColor: GlobalStyles.colors.primaryGrey
  },
  buttonText: {
    color: GlobalStyles.colors.primary50,
    textAlign: "center"
  },
  pressed: {
    opacity: 0.75,
  }
})