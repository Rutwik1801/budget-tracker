import React from 'react';
import { View as GluestackView } from '../UI/view';
import { ViewProps } from 'react-native';

interface BaseViewProps extends ViewProps {
  className?: string;
  children?: React.ReactNode;
}

export const View: React.FC<BaseViewProps> = ({ className, children, style, ...props }) => {
  return (
    <GluestackView className={className} style={style} {...props}>
      {children}
    </GluestackView>
  );
};
