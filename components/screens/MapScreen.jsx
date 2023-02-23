import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { getReports } from "../../utils/ApiCalls";

function MapScreen() {
  const [ reports, setReports ] = useState([])

  useEffect(() => {
    getReports().then((reports) => {
      setReports(reports)
      console.log(reports)
    })
  }, [])

  return <Text>MapScreen</Text>;
}

export default MapScreen;
