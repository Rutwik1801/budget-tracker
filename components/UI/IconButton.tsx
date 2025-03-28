import { Pressable, StyleSheet, View } from "react-native"
import {Ionicons} from "@expo/vector-icons"

type IconProps = {
  icon: string,
  color: string,
  size: number,
  onPress: () => void
}
export const IconButton: React.FC<IconProps> = ({icon, color, size, onPress}) => {
  return <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed} >
    <View style={styles.buttonContainer}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75
  }
})