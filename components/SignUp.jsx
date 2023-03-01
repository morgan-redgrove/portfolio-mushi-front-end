import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            updateProfile(user, { displayName })
              .then(() => {
                setDisplayName("");
                setPassword("");
                setEmail("");
                console.log("Profile updated successfully.");
                unsubscribe(); // Unsubscribe the listener to avoid memory leaks
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
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
        placeholder="Display Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />
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
      <TouchableOpacity onPress={() => handleSignUp()}>
        <Text style={styles.button}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default SignUp;
