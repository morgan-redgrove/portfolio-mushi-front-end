import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

function ReportList({ reports }) {
  function goToReport() {}

  return (
    <View style={styles.reportList}>
      <FlatList
        data={reports}
        renderItem={({ item }) => (
          <View style={styles.reportCard} onPress={goToReport}>
            <Text style={styles.reportCardText}>
              {"Species: " + item.species.species}
            </Text>
            <Text style={styles.reportCardText}>{item.notes}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  reportList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  reportCard: {
    margin: 5,
    padding: 10,
    backgroundColor: "#222",
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
  },
  reportCardText: {
    color: "white",
  },
});

export default ReportList;
