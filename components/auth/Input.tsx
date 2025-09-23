import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type InputProps = {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  secure?: boolean;
  onUpdateValue: (val: string) => void;
  value: any;
  isInvalid?: boolean
  
}

function Input({
  label,
  keyboardType,
  secure = false,
  onUpdateValue,
  value,
  isInvalid = false,
}:InputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: GlobalStyles.colors.primary200,
    marginBottom: 4,
    fontWeight: "bold"
  },
  labelInvalid: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primaryGrey,
    borderRadius: 4,
    fontSize: 16,
    color: "black"
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});