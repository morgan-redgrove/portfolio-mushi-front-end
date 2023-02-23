import React from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native'

function ReportList({ reports }) {

  const navigation = useNavigation();
  function goToReport() {}

  return (
    <View style={styles.reportList}>
      <FlatList
        data={reports}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Report', { id: item._id})}>
            <View style={styles.reportCard} onPress={goToReport}>
              <Text style={styles.reportCardText}>
                {"Species: " + item.species.species}
              </Text>
              <Text style={styles.reportCardText}>{item.notes}</Text>
            </View>
          </TouchableOpacity>

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
