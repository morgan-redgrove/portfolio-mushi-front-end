import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getMushrooms, postReport } from "../../utils/ApiCalls";

function CreateReportScreen() {
  const [species, setSpecies] = useState([]);
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 53.4809634,
    longitude: -2.2369427,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMushrooms().then((mushrooms) => {
      setSpecies(
        mushrooms.map((mushroom) => {
          return { value: mushroom.commonName };
        })
      );
    });

    getUserLocation().then(() => {
      setIsLoading(false);
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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

  function submitReport() {}

  return (
    <View>
      <Text>Select a species</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={species}
        save="value"
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Text>Add a description</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setNote({ text })}
        value={note}
      />
      <Text>Your Location</Text>
      <MapView
        region={mapRegion}
        mapType="satellite"
        style={{ width: 200, height: 200 }}
      >
        <Marker coordinate={mapRegion} />
      </MapView>
      <Button title="Add Report" onPress={submitReport} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "black",
    color: "white",
  },
});

export default CreateReportScreen;
