import React, {useState, useEffect} from "react";
import { View, StyleSheet } from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';


function Map() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 53.4809634,
    longitude: -2.2369427,
    latitudeDelta: 0.00922,
    longitudeDelta:0.00421
  })

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
    getUserLocation();
  }, []);


  return (
    <MapView region = {mapRegion} style = {styles.map}>
      <Marker coordinate={mapRegion} title="Your Location" />
    </MapView>
)}


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '75%',
  },
});
export default Map;
