import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton } from "../UI/IconButton";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

const iconsList = [
  { label: "Addition", value: "add-circle-outline" },
  { label: "Travel", value: "airplane-outline" },
  { label: "Alarm", value: "alarm-outline" },
  { label: "Analytics", value: "analytics-outline" },
  { label: "Basket", value: "basket-outline" },
  { label: "Battery", value: "battery-full-outline" },
  { label: "Book", value: "book-outline" },
  { label: "Briefcase", value: "briefcase-outline" },
  { label: "Brush", value: "brush-outline" },
  { label: "Business", value: "business-outline" },
  { label: "Calendar", value: "calendar-outline" },
  { label: "Camera", value: "camera-outline" },
  { label: "Car", value: "car-outline" },
  { label: "Chat", value: "chatbubble-outline" },
  { label: "Checkmark", value: "checkmark-circle-outline" },
  { label: "Cloud", value: "cloud-outline" },
  { label: "Compass", value: "compass-outline" },
  { label: "Document", value: "document-text-outline" },
  { label: "Download", value: "download-outline" },
  { label: "Earth", value: "earth-outline" },
  { label: "Fitness", value: "fitness-outline" },
  { label: "Flag", value: "flag-outline" },
  { label: "Folder", value: "folder-outline" },
  { label: "Gift", value: "gift-outline" },
  { label: "Globe", value: "globe-outline" },
  { label: "Heart", value: "heart-outline" },
  { label: "Home", value: "home-outline" },
  { label: "Lock", value: "lock-closed-outline" },
  { label: "Mail", value: "mail-outline" },
  { label: "Settings", value: "settings-outline" },
  { label: "Others", value: "code-working-outline" }
];

// Function to split the array into two equal parts (rows)
const splitIntoRows = (array, numRows) => {
  const rowSize = Math.ceil(array.length / numRows);
  return [array.slice(0, rowSize), array.slice(rowSize)];
};

const chunkedIcons = splitIntoRows(iconsList, 2); // Split into 2 horizontal rows

export const CategorySelect = ({ onChange, defaultCategory }) => {
  const [category, setCategory] = useState(defaultCategory);

  const handleIconPress = (selectedCategory) => {
    setCategory(selectedCategory);
    onChange(selectedCategory);
  };

  return (
    <View>
      <Text style={{ marginBottom: 5 }}>Select A Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "column" }}>
          {chunkedIcons.map((row, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: "row", marginBottom: 10 }}>
              {row.map((icon) => (
                <View key={icon.value} style={{ width: 70, alignItems: "center" }}>
                  <IconButton
                    icon={icon.value}
                    size={30}
                    color={category?.value === icon.value ? GlobalStyles.colors.accent500 : GlobalStyles.colors.primary800}
                    onPress={() => handleIconPress(icon)}
                  />
                  <Text style={{ color: category?.value === icon.value ? GlobalStyles.colors.accent500 : GlobalStyles.colors.primary800, fontSize: 12 }}>{icon.label}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
