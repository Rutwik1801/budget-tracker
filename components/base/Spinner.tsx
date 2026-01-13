import React from 'react';
import { Spinner as GluestackSpinner } from '../UI/spinner';

interface BaseSpinnerProps {
  size?: "small" | "large";
  color?: string;
  className?: string;
}

export const Spinner: React.FC<BaseSpinnerProps> = ({ 
  size = "large", 
  color, 
  className,
  ...props 
}) => {
  return (
    <GluestackSpinner 
      size={size} 
      color={color}
      className={className}
      {...props} 
    />
  );
};
