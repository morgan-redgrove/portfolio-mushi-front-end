import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getMushrooms, postReport } from "../../utils/ApiCalls";
import PinMap from "../PinMap";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../../firebaseConfig";

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
      pinRegion.longitude !== 0 &&
      auth.currentUser !== null
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
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.imgButton} onPress={pickImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.img}
              resizeMode={"cover"}
            />
          ) : (
            <Image
              onPress={pickImage}
              style={styles.imgIcon}
              source={require("../../assets/add-image.png")}
            />
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Add a description ..."
          style={styles.textInput}
          multiline={true}
          // numberOfLines={4}
          onChangeText={(text) => setNote(text)}
          value={note}
        />
      </View>
      <SelectList
        placeholder="Select Species... (or your best guess!)"
        boxStyles={styles.dropDown}
        dropdownStyles={[styles.dropDown, styles.dropDownBox]}
        setSelected={(val) => setSelected(val)}
        data={species}
        save="value"
      />
      <PinMap
        pinRegion={pinRegion}
        setPinRegion={setPinRegion}
        style={styles.map}
      />

      {auth.currentUser === null ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("User");
          }}
        >
          <Text style={styles.warn}>Please Sign in to post a report!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={submitReport}
          disabled={!complete}
        >
          <Text>Add Report</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgb(31, 35, 53)",
    height: "100%",
  },
  dropDown: {
    width: "90%",
    alignSelf: "center",
    margin: 15,
    marginTop: 10,
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
  },
  dropDownBox: {
    marginTop: 0,
  },
  imgIcon: {
    width: 100,
    height: 100,
    margin: 25,
    tintColor: "rgb(15, 163, 177)",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
  },
  imgButton: {
    borderRadius: 10,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  textInput: {
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
    borderWidth: 3,
    borderRadius: 10,
    flex: 1,
    padding: 10,
    marginLeft: 15,
  },
  button: {
    margin: 15,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
  },
  warn: {
    alignSelf: "center",
    marginTop: 15,
    textAlign: "center",
    fontSize: 20,
    borderWidth: 3,
    borderColor: "rgb(255, 130, 80)",
    color: "rgb(255, 130, 80)",
    width: "90%",
    padding: 8,
    borderRadius: 10,
  },
});

export default CreateReportScreen;
