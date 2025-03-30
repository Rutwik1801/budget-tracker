import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

export const Circle = ({isOn, setIsOn, operation}) => {
  return (<Pressable onPress={() => operation ? setIsOn(true) : setIsOn(false)}>
  <View style={{...styles.circle, backgroundColor: operation && isOn ? "black" : !operation && !isOn ? "black" : ""}}></View>
  </Pressable>)
}

export const ToggleButton = () => {
  const [isOn, setIsOn] = useState(true)
  return (<View style={styles.container}>
    <Circle isOn={isOn} setIsOn={setIsOn} operation={false} />
    <Circle isOn={isOn} setIsOn={setIsOn} operation={true} />
  </View>)
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderWidth:1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc"
  },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 25
  }
})