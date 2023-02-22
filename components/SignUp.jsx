import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setPassword("");
        setEmail("");
        console.log(userCredential);
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
      <Text style={styles.fieldHeading}>Create an Account</Text>
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
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default SignUp;
