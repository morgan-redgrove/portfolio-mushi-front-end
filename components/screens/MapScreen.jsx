import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getReports } from "../../utils/ApiCalls";
import ReportList from "../ReportList";
import Map from "../Map";

function MapScreen() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then((reports) => {
      setReports(reports);
    });
  }, []);

  return (
    <View>
      <Map />
      <ReportList />
    </View>
  );
}

export default MapScreen;
