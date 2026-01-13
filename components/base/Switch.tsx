import React from 'react';
import { Switch as GluestackSwitch } from '../UI/switch';

interface BaseSwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Switch: React.FC<BaseSwitchProps> = ({ 
  value, 
  onValueChange, 
  disabled = false,
  className,
  size = "md",
  ...props 
}) => {
  return (
    <GluestackSwitch 
      value={value}
      onValueChange={onValueChange}
      isDisabled={disabled}
      size={size}
      className={className}
      {...props} 
    />
  );
};
