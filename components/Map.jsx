import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import { SelectList } from "react-native-dropdown-select-list";
import * as Location from "expo-location";

function Map({ reports }) {
  const navigation = useNavigation();


  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [filtReports, setFiltReports] = useState(reports);

  const species = reports.map((report) => {
    return report.species.species;
  });
  let uniqueSpecies = ["Show All", ...new Set(species)];

  const options = uniqueSpecies.map((str) => {
    return { value: str };
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: 53.4809634,
    longitude: -2.2369427,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    });
  };

  useEffect(() => {
    getUserLocation().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <View>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={options}
        save="value"
        placeholder="Search for a species..."
        onSelect={() =>
          setFiltReports(
            reports.filter((report) => {
              if (selected === "Show All") {
                return true;
              } else {
                return report.species.species === selected;
              }
            })
          )
        }
      />

      <MapView region={mapRegion} mapType="satellite" style={styles.map}>
        <Marker coordinate={mapRegion} title="Your Location" />

        {filtReports.map(
          ({ _id, location: { lat, long }, species: { species } }) => {
            return (
              <Marker
                key={_id}
                coordinate={
                  lat && long
                    ? { latitude: lat, longitude: long }
                    : { latitude: 1, longitude: 1 } // this needs a value on first load to prevent err
                }
                image={require("../assets/mushroom-icon.png")}
              >
                <Callout
                  onPress={() => navigation.navigate("Report", { id: _id })}
                >
                  <View>
                    <Text style={{ padding: 0, height: 200, width: 200 }}>
                      <Image
                        source={require("../assets/mushroom-photo.jpeg")}
                      />
                    </Text>
                    <Text>{species}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          }
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
export default Map;
