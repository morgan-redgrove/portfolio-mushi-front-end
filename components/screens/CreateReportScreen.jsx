import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { getMushrooms, postReport } from "../../utils/ApiCalls";

function CreateReportScreen() {
  const [species, setSpecies] = useState([]);
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    getMushrooms().then((mushrooms) => {
      setSpecies(
        mushrooms.map((mushroom) => {
          return { value: mushroom.commonName };
        })
      );
    });
  }, []);

  function submitReport() {
    //postReport()
    //* species, note done, username - email
    //! img_url, location
  }

  return (
    <View>
      <Text>Create a new report</Text>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={species}
        save="value"
      />
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setNote({ text })}
        value={note}
      />
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
