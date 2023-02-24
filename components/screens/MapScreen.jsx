import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getReports } from "../../utils/ApiCalls";
import ReportList from "../ReportList";
import Map from "../Map";

function MapScreen() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    getReports().then((reports) => {
      setReports(reports);
    });
  }, []);

  if (!reports) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  } else {
    return (
      <View>
        <Map reports={reports} setReports={setReports}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default MapScreen;
