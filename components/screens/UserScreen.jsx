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
      <TouchableOpacity>
        <Text onPress={() => handleSignOut()} style={styles.button}>
          Logout
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View>
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
  button: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "900",
    backgroundColor: "#88",
  },
});

export default UserScreen;
