import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { allowsNotificationsAsync, requestPermissionsAsync } from "../../utils/notifications";
import { View, Switch } from "../base";

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
    <View className="rounded-full border border-gray-300 flex-row items-center bg-gray-200">
      <Switch value={isOn} onValueChange={handleValueChange} />
    </View>
  );
};
