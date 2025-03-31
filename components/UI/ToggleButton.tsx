import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { allowsNotificationsAsync, requestPermissionsAsync } from "../../App";

export const ToggleButton = () => {
  const [isOn, setIsOn] = useState(true);

  const scheduleNotificationHandler = async () => {
    const hasPushNotificationPermissionGranted = await allowsNotificationsAsync();

    if (!hasPushNotificationPermissionGranted) {
      await requestPermissionsAsync();
    }

    // Cancel all existing notifications to prevent duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule a daily notification at 11:59 PM
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey there...",
        body: "Just a remoinder to add your transactions for today !!",
        data: { userName: "Max" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 23,
        minute: 59,
      },
    });
  };

  const cancelNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const handleValueChange = () => setIsOn((prev) => !prev);

  useEffect(() => {
    if (isOn) {
      scheduleNotificationHandler();
    } else {
      cancelNotifications();
    }
  }, [isOn]);

  return (
    <View style={styles.container}>
      <Switch value={isOn} onValueChange={handleValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
});
