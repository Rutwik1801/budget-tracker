import React from 'react';
import { Input as GluestackInput, InputField } from '../UI/input';
import { KeyboardTypeOptions } from 'react-native';

interface BaseInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  className?: string;
  variant?: "outline" | "underlined" | "rounded";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  isInvalid?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export const Input: React.FC<BaseInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  className,
  variant = "outline",
  size = "md",
  disabled = false,
  isInvalid = false,
  autoCapitalize = "none",
  ...props
}) => {
  return (
    <GluestackInput
      variant={variant}
      size={size}
      isDisabled={disabled}
      isInvalid={isInvalid}
      className={className}
      {...props}
    >
      <InputField
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </GluestackInput>
  );
};
