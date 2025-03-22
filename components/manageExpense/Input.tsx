import { StyleSheet, Text, TextInput, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"

type InputProps = {
  label: string,
  style?: Object,
  textInputConfig?: Record<string, any>,
  invalid?: boolean
}

export const Input:React.FC<InputProps> = ({label, style, textInputConfig, invalid}) => {
  const inputStyles: any = [styles.input]
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }
  if(invalid) {
    inputStyles.push(styles.inputInvalid)
  }
  return <View style={[styles.inputContainer, style]}>
    <Text style={[styles.label, invalid && styles.labelInvalid]}>{label}</Text>
    <TextInput style={inputStyles} {...textInputConfig}></TextInput>
  </View>
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.primary400,
    marginBottom: 4
  },
  input: {
backgroundColor: GlobalStyles.colors.primary100,
color:GlobalStyles.colors.primary800,
padding: 6,
borderRadius: 6,
fontSize: 18
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  labelInvalid : {
    color: GlobalStyles.colors.error500
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.error50
  }
}) 