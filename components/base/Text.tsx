import React from 'react';
import { Text as GluestackText } from '../UI/text';
import { TextProps } from 'react-native';

interface BaseTextProps extends TextProps {
  className?: string;
  children?: React.ReactNode;
}

export const Text: React.FC<BaseTextProps> = ({ className, children, style, ...props }) => {
  return (
    <GluestackText className={className} style={style} {...props}>
      {children}
    </GluestackText>
  );
};
