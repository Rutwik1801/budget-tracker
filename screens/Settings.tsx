import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { IconButton } from "../components/UI/IconButton"
import { ToggleButton } from "../components/UI/ToggleButton"
import { useContext } from "react"
import { AuthContext } from "../store/auth-context"

export const Settings = () => {
  const { logout } = useContext(AuthContext);
  return <ScrollView style={{paddingHorizontal: 8, marginTop: 16}}>
    <View style={styles.notificationContainer}>
    <Text>Enable Notifications</Text>
    <ToggleButton />
    </View>
    <Pressable onPress={async () => await logout()} style={({ pressed }) => pressed && styles.pressed}>
    <View style={styles.logoutContainer}>
    <IconButton icon="log-out-outline" color="black" size={24} />
    <Text>Logout</Text>
    </View>
    </Pressable>
  </ScrollView>
}

const styles = StyleSheet.create({
  notificationContainer:{
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom: 8
  }, 
  logoutContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems:"center",
    marginBottom: 8,
    paddingVertical: 4
  },
  pressed: {
    opacity: 0.75
  } 
})