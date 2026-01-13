import { PropsWithChildren } from "react"
import { Button as BaseButton } from "../base"

type CustomButtonProps = {
  onPress: () => void,
  mode?: "flat",
  className?: string,
  containerClassName?: string
}

export const Button: React.FC<PropsWithChildren<CustomButtonProps>> = ({ 
  children, 
  onPress, 
  mode, 
  className,
  containerClassName
}) => {
  return (
    <BaseButton
      onPress={onPress}
      mode={mode}
      className={className}
    >
      {children}
    </BaseButton>
  )
}