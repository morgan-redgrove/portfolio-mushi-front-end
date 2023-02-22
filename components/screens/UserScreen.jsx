import React, { useState } from "react";
import LogIn from "../LogIn";
import SignUp from "../SignUp";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

function UserScreen() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <View>
      {showSignUp ? <SignUp /> : <LogIn />}
      <TouchableOpacity>
        <Text onPress={() => setShowSignUp(!showSignUp)} style={styles.button}>
          {showSignUp === false
            ? "Click here to create a new account"
            : "Click here to login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
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
