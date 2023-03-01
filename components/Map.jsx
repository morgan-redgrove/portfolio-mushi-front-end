import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
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

  const [mapRegion, setMapRegion] = useState(null);

  const species = reports.map((report) => {
    return report.species.species;
  });
  let uniqueSpecies = ["Show All", ...new Set(species)];

  const options = uniqueSpecies.map((str) => {
    return { value: str };
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


    return ({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    })
   
  };

  useEffect(() => {
    getUserLocation().then((currentLocation) => {
      setMapRegion(currentLocation);
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

      <MapView
        region = {mapRegion}
        mapType="satellite"
        showsUserLocation="true"
        style={styles.map}
      >
        {filtReports.map(
          ({ _id, img_url, location: { lat, long }, species: { species } }) => {
            return (
              <Marker
                key={_id}
                coordinate={
                  lat && long
                    ? { latitude: lat, longitude: long }
                    : { latitude: 1, longitude: 1 } // this needs a value on first load to prevent err
                }
                //image={require("../assets/mushroom-icon.png")}
                //style={styles.marker}
                onPress={() => {
                  setIsHidden(false);
                  setModalInfo({ species, img_url, _id, lat, long });
                }}
              >
                <Image
                  source={require("../assets/mushroom-icon.png")}
                  style={styles.marker}
                />
              </Marker>
            );
          }
        )}
      </MapView>
      {isLoading ? (
        <View style={styles.loadingModal}>
          <Text>Getting your Location...</Text>
        </View>
      ) : null}

      {isHidden ? null : (
        <View style={styles.modal}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => {
                setIsHidden(true);
              }}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <View style={styles.flexBox}>
              <Image
                source={{ uri: modalInfo.img_url }}
                alt={`sighting of a ${modalInfo.species}`}
                style={styles.cardImage}
              />

              <View style={styles.cardText}>
                <Text>{modalInfo.species}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() =>
                navigation.navigate("Report", { id: modalInfo._id })
              }
            >
              <Text>View Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 0.25 * height;
const CARD_WIDTH = width * 0.8;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    position: "absolute",
    bottom: 0.12 * height,
    left: 0,
    right: 0,
    paddingVertical: 10,
    margin: 10,
  },
  modalClose: {
    position: "absolute",
    right: 0,
  },
  card: {
    backgroundColor: "#FFF",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
  },
  flexBox: {
    width: "100%",
    height: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  cardText: {
    flex: 1,
    alignItems: "center",
  },
  reportButton: {
    padding: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  loadingModal: {
    position: "absolute",
    backgroundColor: "#FFF",
    padding: 10,
    top: "25%",
    alignSelf: "center",
  },
  marker: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
export default Map;
