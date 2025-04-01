import { Pressable, StyleSheet, View } from "react-native"
import {Ionicons} from "@expo/vector-icons"

type IconProps = {
  icon: string,
  color: string,
  size: number,
  background?: string,
  onPress?: () => void
}
export const IconButton: React.FC<IconProps> = ({icon, color, size, background, onPress}) => {
  return <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed} >
    <View style={{...styles.buttonContainer, backgroundColor: background}}>
      <Ionicons name={icon} size={size} color={color} />
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 20,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75
  }
})