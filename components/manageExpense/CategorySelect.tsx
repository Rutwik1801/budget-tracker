import { ScrollView, StyleSheet, Text, View } from "react-native";
import { IconButton } from "../UI/IconButton";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { iconsList } from "../../store/expenses-context";


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
