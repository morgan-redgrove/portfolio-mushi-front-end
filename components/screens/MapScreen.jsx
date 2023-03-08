import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { getReports } from "../../utils/ApiCalls";
import ReportList from "../ReportList";
import Map from "../Map";

function MapScreen({ route }) {
  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getReports().then((reports) => {
      setReports(reports);
      setIsLoading(false);
      console.log("getting reports");
    });
  }, [route]);

  if (isLoading) {
    return(
      <View style={styles.iconWrapper}>
        <Image
          style={styles.mapIcon}
          source={require("../../assets/map-icon.png")}
        />
        <Text style={styles.iconText}>Loading...</Text>
      </View>
    )
  } else {
    return (
      <View>
        <Map reports={reports} setReports={setReports} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapIcon: {
    height: 250,
    width: 250,
    marginTop: 250
  },
  iconText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
  }
});

export default MapScreen;
