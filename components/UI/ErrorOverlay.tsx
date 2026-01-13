import { Button } from "./Button"
import { View, Text } from "../base"

export type OverlayProps = {
  message: string;
  onConfirm: () => void;
}

export const ErrorOverlay = ({message, onConfirm}: OverlayProps) => {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-white text-lg mb-4">An Error Occurred</Text>
      <Text className="text-white text-base mb-6 text-center">{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  )
}