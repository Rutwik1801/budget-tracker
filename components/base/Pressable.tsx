import React from 'react';
import { Pressable as GluestackPressable } from '../UI/pressable';
import { PressableProps } from 'react-native';

interface BasePressableProps extends PressableProps {
  className?: string;
  children?: React.ReactNode;
}

export const Pressable: React.FC<BasePressableProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <GluestackPressable className={className} {...props}>
      {children}
    </GluestackPressable>
  );
};
