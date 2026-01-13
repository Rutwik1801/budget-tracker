import { Spinner, View } from "../base";

export const LoadingOverlay = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Spinner size="large" />
    </View>
  )
}