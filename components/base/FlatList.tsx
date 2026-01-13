import React from 'react';
import { FlatList as GluestackFlatList } from '../UI/flat-list';
import { FlatListProps } from 'react-native';

interface BaseFlatListProps<T> extends FlatListProps<T> {
  className?: string;
}

export const FlatList = <T,>({ 
  className, 
  ...props 
}: BaseFlatListProps<T>) => {
  return (
    <GluestackFlatList 
      className={className} 
      {...props} 
    />
  );
};
