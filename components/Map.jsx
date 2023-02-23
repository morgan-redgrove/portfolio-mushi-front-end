import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'
import MapView, {Marker, Callout} from "react-native-maps";
import * as Location from 'expo-location';


function Map({reports}) {

  const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(true)

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
    getUserLocation().then(()=>{
      setIsLoading(false)
    });
  }, []);

  return (
    <View>

    <MapView region = {mapRegion} style = {styles.map}>
      <Marker coordinate={mapRegion} title="Your Location" />

      {reports.map(({_id, location:{lat, long}, species:{species}}, index)=>{
        return (<Marker key={_id} coordinate={{
          latitude: lat,
          longitude: long
        }} title= ""  image={require("../assets/mushroom-icon.png")}>
          <Callout onPress={() => navigation.navigate('Report', { id: _id})}>
            <View>
              <Image
                source={require("../assets/mushroom_photo.jpeg")}
              />
              <Text>{species}</Text>     
            </View>
          </Callout>
        </Marker>)
      })}
    </MapView>
    <Text>{isLoading? "Loading...": null}</Text>
    <Image
      source={require("../assets/mushroom_photo.jpeg")}
    />
    </View>

)}


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '75%',
  },
});
export default Map;
