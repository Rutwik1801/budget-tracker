# Base Components Architecture

This folder contains the base UI components that serve as a single source of truth for all UI elements in the application.

## Why Base Components?

1. **Single Source of Truth**: All UI components are defined in one place
2. **Easy Library Migration**: If we need to switch from Gluestack to another UI library, we only need to update these base components
3. **Consistent Styling**: All components follow the same design patterns
4. **Simple Customization**: Global changes can be made in one place

## Structure

```
components/base/
├── index.tsx          # Exports all base components
├── View.tsx           # Base View component
├── Text.tsx           # Base Text component
├── Button.tsx         # Base Button component
├── Input.tsx          # Base Input component
├── Pressable.tsx      # Base Pressable component
├── ScrollView.tsx     # Base ScrollView component
├── Spinner.tsx        # Base Spinner component
├── FlatList.tsx       # Base FlatList component
└── Switch.tsx         # Base Switch component
```

## Usage

Instead of importing directly from UI library:
```tsx
// ❌ Don't do this
import { View, Text } from "../UI/view"
import { Button } from "../UI/button"
```

Import from base components:
```tsx
// ✅ Do this
import { View, Text, Button } from "../base"
```

## Example: Switching Libraries

If we wanted to switch from Gluestack to NativeBase, we would only need to update the base components:

```tsx
// Before (Gluestack)
import { View as GluestackView } from '../UI/view';

export const View = ({ children, ...props }) => (
  <GluestackView {...props}>{children}</GluestackView>
);

// After (NativeBase) 
import { View as NativeBaseView } from 'native-base';

export const View = ({ children, ...props }) => (
  <NativeBaseView {...props}>{children}</NativeBaseView>
);
```

All components throughout the app would automatically use the new library without any changes!

## Benefits

- **Maintainable**: Changes in one place affect the entire app
- **Consistent**: All components follow the same patterns
- **Flexible**: Easy to add custom logic or styling
- **Future-proof**: Library migration becomes trivial
