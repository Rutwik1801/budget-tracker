import { ScrollView, Text, View } from "react-native";
import { IconButton } from "../UI/IconButton";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { iconsList } from "../../store/expenses-context";
import { Category } from "../../utils/types";
import { splitIntoRows } from "../../utils/utilFunctions";

const chunkedIcons = splitIntoRows(iconsList, 2); // Split into 2 horizontal rows

export const CategorySelect: React.FC<{onChange: (category: Category) => void, defaultCategory: Category}> = ({ onChange, defaultCategory }) => {
  const [category, setCategory] = useState(defaultCategory);

  const handleIconPress = (selectedCategory: Category) => {
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
