import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Animated} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker} from "react-native-maps";
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
  const [focusMarker, setFocusMarker] = useState(null)
  const _map = useRef(null)


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

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    });
  };

  const mapAnimation = new Animated.Value(0)

  useEffect(() => {
    getUserLocation().then(() => {
      setIsLoading(false);
    });
    mapAnimation.addListener(({value}) => {
      clearTimeout(regionTimeout)

      const regionTimeout = setTimeout(()=>{
         _map.current.animateToRegion(
          {
            ...focusMarker,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          }
          , 350
         )
         
      }, 10)
    })
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

      {isLoading ?
      <View>
        <Text>
          Loading...
        </Text>
      </View>
      : null
    }

      <MapView region={mapRegion} ref= {_map} mapType="satellite" showsUserLocation= "true" style={styles.map}>
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
                  image={require("../assets/mushroom-icon.png")}
                  onPress={() => {
                    setIsHidden(false);
                    setModalInfo({ species, img_url, _id, lat, long});
                    // setMapRegion({latitude: lat, longitude: long, latitudeDelta: 0.00922,
                    //   longitudeDelta: 0.00421,})
                    setFocusMarker({latitude: lat, longitude: long})
                    Animated.event(
                      [
                        {
                          nativeEvent:{
                            contentOffSet: {
                              x: mapAnimation
                            }
                          }
                        }
                      ],
                      {useNativeDriver: true}
                    )
                  }}
                ></Marker>
            )
          }
        )}
      </MapView>

      {isHidden ? null : (
        <View style={styles.modal}>
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                setIsHidden(true);
              }}
              >
                <Text>X</Text>
            </TouchableOpacity>
            <Image source={{uri: modalInfo.img_url}} alt ={`sighting of a ${modalInfo.species}`} style = {styles.cardImage}/>
            <Text>{modalInfo.species}</Text>
            <TouchableOpacity
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
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#FFF",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
});
export default Map;
