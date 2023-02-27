import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getMushrooms, postReport } from "../../utils/ApiCalls";
import PinMap from "../PinMap";
import { UserContext } from "../contexts/UserContext";

function CreateReportScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const [complete, setComplete] = useState(false);
  const [species, setSpecies] = useState([]);
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [pinRegion, setPinRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  useEffect(() => {
    getMushrooms().then((mushrooms) => {
      setSpecies(
        mushrooms.map((mushroom) => {
          return { value: mushroom.commonName };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (
      //fields are completed
      selected !== "" &&
      image !== null &&
      pinRegion.latitude !== 0 &&
      pinRegion.longitude !== 0
    ) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [selected, image, pinRegion]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imgRef = ref(storage, `${imageName}`);
    const snapshot = await uploadBytes(imgRef, blob); // waits for img upload
    const url = await getDownloadURL(imgRef);
    return url;
  };

  function submitReport() {
    uploadImage(image, uuid.v4()).then((url) => {
      postReport(
        { lat: pinRegion.latitude, long: pinRegion.longitude },
        url,
        user.displayName,
        selected,
        note
      ).then((report) => {
        setSelected("");
        setNote("");
        setImage(null);
        setPinRegion({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        });
        navigation.navigate("Report", { id: report._id });
      }); //! Catch err if unsucseful post
    });
  }

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
        onChangeText={(text) => setNote(text)}
        value={note}
      />
      <Text>Your Location</Text>
      <PinMap pinRegion={pinRegion} setPinRegion={setPinRegion} />
      <Button title="Add Report" onPress={submitReport} disabled={!complete} />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "gray",
    color: "white",
  },
});

export default CreateReportScreen;
