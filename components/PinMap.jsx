import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

function PinMap({ pinRegion, setPinRegion }) {
  const [isLoading, setIsLoading] = useState(true);

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
      <MapView
        region={mapRegion}
        mapType="satellite"
        style={styles.map}
        onPress={(e) => {
          const {
            coordinate: { latitude, longitude },
          } = e.nativeEvent;
          setPinRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          });
        }}
      >
        <Marker coordinate={pinRegion} title="Mushroom siting">
        <Image
          source={require("../assets/mushroom-icon.png")}
          style={styles.marker}
        />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "90%",
    height: 300,
    alignSelf: "center",
    borderRadius: 10,
  },
  marker: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
export default PinMap;
