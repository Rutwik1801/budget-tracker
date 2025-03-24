import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";

const PieChartExample = () => {
  const widthAndHeight = 150; // Set the size
  const series = [
    { value: 430, color: '#fbd203' },
    { value: 321, color: '#ffb300' },
    { value: 200, color: '#ff9100' },
    { value: 2, color: '#ff6c00' },
  ]

  return (
    <View style={{  justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Pie Chart Example
      </Text>
      <PieChart widthAndHeight={widthAndHeight} series={series}  />
    </View>
  );
};

export default PieChartExample;
