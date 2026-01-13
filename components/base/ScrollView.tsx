import React from 'react';
import { ScrollView as GluestackScrollView } from '../UI/scroll-view';
import { ScrollViewProps } from 'react-native';

interface BaseScrollViewProps extends ScrollViewProps {
  className?: string;
  children?: React.ReactNode;
}

export const ScrollView: React.FC<BaseScrollViewProps> = ({ 
  className, 
  children, 
  ...props 
}) => {
  return (
    <GluestackScrollView className={className} {...props}>
      {children}
    </GluestackScrollView>
  );
};
