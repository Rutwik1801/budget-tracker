import { Pressable, View } from "../base"
import { Ionicons } from "@expo/vector-icons"

type IconProps = {
  icon: string,
  color: string,
  size: number,
  background?: string,
  onPress?: () => void
}

type IconName = keyof typeof Ionicons.glyphMap

export const IconButton: React.FC<IconProps> = ({ icon, color, size, background, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View 
        className="rounded-full p-1.5 mx-2 my-0.5"
        style={{ backgroundColor: background }}
      >
        <Ionicons name={icon as IconName} size={size} color={color} />
      </View>
    </Pressable>
  )
}