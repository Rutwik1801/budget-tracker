import { KeyboardTypeOptions } from 'react-native';
import { View, Text } from '../base';
import { Input as BaseInput } from '../base';

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
}: InputProps) {
  return (
    <View className="my-2">
      <Text className={`mb-1 font-bold ${isInvalid ? 'text-red-500' : 'text-gray-600'}`}>
        {label}
      </Text>
      <BaseInput
        value={value}
        onChangeText={onUpdateValue}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        className={`${isInvalid ? 'border-red-500 bg-red-50' : 'bg-gray-200'}`}
        isInvalid={isInvalid}
      />
    </View>
  );
}

export default Input;