import React from 'react';
import { Button as GluestackButton, ButtonText } from '../UI/button/index';

interface BaseButtonProps {
  onPress: () => void;
  mode?: "flat" | "outline" | "solid";
  variant?: "solid" | "outline" | "link";
  action?: "primary" | "secondary" | "positive" | "negative";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<BaseButtonProps> = ({ 
  children, 
  onPress, 
  mode = "solid",
  variant,
  action = "primary",
  size = "md",
  className,
  disabled = false,
  ...props
}) => {
  // Map mode prop to Gluestack props for backward compatibility
  const gluestackVariant = variant || (mode === "flat" ? "outline" : mode === "outline" ? "outline" : "solid");
  const gluestackAction = mode === "flat" ? "secondary" : action;

  return (
    <GluestackButton
      onPress={onPress}
      action={gluestackAction}
      variant={gluestackVariant}
      size={size}
      className={className}
      disabled={disabled}
      {...props}
    >
      <ButtonText>
        {children}
      </ButtonText>
    </GluestackButton>
  );
};
