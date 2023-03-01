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

        //current user tracked in UserContext
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
      <TouchableOpacity onPress={() => handleLogIn()}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpField: {
    width: 300,
    height: 80,
    margin: 10,
    fontSize: 20,
    textAlign: "center",
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
    borderRadius: 10,
  },
  fieldHeading: {
    color: "rgba(255,255,255,.8)",
    fontSize: 30,
    fontWeight: "900",
  },
  button: {
    color: "rgb(15, 163, 177)",
    fontSize: 30,
    fontWeight: "900",
    backgroundColor: "#88",
  },
});

export default LogIn;
