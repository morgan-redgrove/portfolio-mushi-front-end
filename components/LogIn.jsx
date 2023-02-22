import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setPassword("");
        setEmail("");
        //console.log(userCredential);
        //const user = userCredential.user; ///! Track logged in user
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Text style={styles.fieldHeading}>Login</Text>
      <TextInput
        style={styles.signUpField}
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.signUpField}
        placeholder="Enter Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleLogIn}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpField: {
    backgroundColor: "#0",
    width: 300,
    height: 80,
    margin: 10,
    fontSize: 20,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 30,
  },
  fieldHeading: {
    fontSize: 30,
    fontWeight: "900",
  },
  button: {
    fontSize: 30,
    fontWeight: "900",
    backgroundColor: "#88",
  },
});

export default LogIn;
