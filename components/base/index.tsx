// Base components - Single source of truth for all UI components
// This layer abstracts the underlying UI library (Gluestack) 
// Making it easy to switch libraries in the future

export { View } from './View';
export { Text } from './Text';
export { Button } from './Button';
export { Input } from './Input';
export { Pressable } from './Pressable';
export { ScrollView } from './ScrollView';
export { Spinner } from './Spinner';
export { FlatList } from './FlatList';
export { Switch } from './Switch';
export { Card } from './Card';

// Re-export types for convenience
export type { ViewProps, TextProps, PressableProps, ScrollViewProps, FlatListProps } from 'react-native';
