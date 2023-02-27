import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import { SelectList } from "react-native-dropdown-select-list";
import * as Location from "expo-location";

function Map({ reports }) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [filtReports, setFiltReports] = useState(reports);
  const [isHidden, setIsHidden] = useState(true);
  const [modalInfo, setModalInfo] = useState({
    species: "Select a Mushroom",
    img_url: "",
  });

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
  }, [modalInfo]);

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
          ({ _id, img_url, location: { lat, long }, species: { species } }) => {
            return (
              <View
                onPress={() => {
                  setIsHidden(false);
                  setModalInfo({ species, img_url, _id });
                }}
              >
                <Marker
                  key={_id}
                  coordinate={
                    lat && long
                      ? { latitude: lat, longitude: long }
                      : { latitude: 1, longitude: 1 } // this needs a value on first load to prevent err
                  }
                  image={require("../assets/mushroom-icon.png")}
                ></Marker>
              </View>
            );
          }
        )}
      </MapView>

      {isHidden ? null : (
        <View style={styles.modal}>
          <View style={styles.card}>
            <Image source={{uri: modalInfo.img_url}}/>
            <Text>{modalInfo.species}</Text>
            <TouchableOpacity
              onPress={() => {
                setIsHidden(true);
              }}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Report", { id: modalInfo._id })
              }
            >
              <Text>View Report</Text>
              <Text>{modalInfo._id}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    position: "absolute",
    bottom: 200,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#FFF",
    height: 220,
    width: 220,
  },
});
export default Map;
