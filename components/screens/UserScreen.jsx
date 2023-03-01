import React, { useState, useContext } from "react";
import LogIn from "../LogIn";
import SignUp from "../SignUp";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

function UserScreen() {
  const { user } = useContext(UserContext);
  const [showSignUp, setShowSignUp] = useState(false);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  if (user) {
    return (
      <View style={styles.main}>
        <TouchableOpacity>
          <Text onPress={() => handleSignOut()} style={styles.button}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        {showSignUp ? <SignUp /> : <LogIn />}
        <TouchableOpacity>
          <Text
            onPress={() => setShowSignUp(!showSignUp)}
            style={styles.button}
          >
            {showSignUp === false
              ? "Click here to create a new account"
              : "Click here to login"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 40,
    backgroundColor: "rgb(31, 35, 53)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    padding: 10,
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "900",
    width: 200,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
    borderWidth: 3,
    borderRadius: 10,
  },
});

export default UserScreen;
