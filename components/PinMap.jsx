import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'
import MapView, {Marker, Callout} from "react-native-maps";
import { SelectList } from 'react-native-dropdown-select-list'
import * as Location from 'expo-location';


function PinMap() {
  
  const [isLoading, setIsLoading] = useState(true)

  const [mapRegion, setMapRegion] = useState({
    latitude: 53.4809634,
    longitude: -2.2369427,
    latitudeDelta: 0.00922,
    longitudeDelta:0.00421
  })

  const [pinRegion, setPinRegion] = useState({
    latitude: 0,
    longitude: 0,
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
    getUserLocation().then(()=>{
      setIsLoading(false)
    });
  }, []);

  return (
    <View>
        <MapView 
            region = {mapRegion} 
            mapType="satellite" 
            style = {styles.map}
            onPress={(e) => {
                const {coordinate: {latitude, longitude}} = e.nativeEvent
                console.log("latitude = ", latitude)
                console.log("longtitude = ", longitude)
                setPinRegion(    {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta:0.00421
                })
            }}           
        >
        <Marker coordinate={pinRegion} title="Your Location" />
      </MapView>
    </View>
    )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
export default PinMap;
