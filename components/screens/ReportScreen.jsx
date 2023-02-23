import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

function ReportScreen({route}) {
    const { id } = route.params

  return (
    <View>
      <Text>This is a report for mushroom #{id}</Text>
    </View>
  );
}

export default ReportScreen;
