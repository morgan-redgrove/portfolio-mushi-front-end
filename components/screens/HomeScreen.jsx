import React, { useState, useEffect } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { getMushrooms } from "../../utils/ApiCalls";

function HomeScreen({ navigation }) {
  const [mushroom, setMushroom] = useState(null);

  useEffect(() => {
    getMushrooms().then((mushrooms) => {
      const date = new Date().getDate();
      const extendedMushroomArr = [...mushrooms, ...mushrooms];

      setMushroom(extendedMushroomArr[date]);
    });
  }, []);

  return (
    <View style={styles.main}>
      <Image
        source={require("../../assets/mushi.png")}
        style={styles.titleImg}
      />
      <View style={styles.loginBox}>
        <Text style={styles.loginBoxText}>
          Welcome to Mushi! please login or signup to join the mushroom spotting
          community!
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate("User");
          }}
        >
          <Text>Login / SignUp</Text>
        </TouchableOpacity>
      </View>

      {mushroom ? (
        <View style={styles.motd}>
          <Text style={styles.motdTitle}>Mushroom of the Day!</Text>
          <Image
            style={styles.motdImage}
            source={{
              uri: mushroom.img_url,
            }}
          />
          <Text style={styles.motdText}>{mushroom.commonName}</Text>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}

      <View style={styles.disclaimerBox}>
        <Image
          style={styles.image}
          source={require("../../assets/mushroom-question.png")}
        />
        <Text style={styles.disclaimerTitle}>Disclaimer</Text>

        <Text style={styles.disclaimerText}>
          Mushi App is intended for educational purposes only and does not
          provide advice regarding the safety or edibility of any mushroom.
          Eating or handling wild mushrooms can be dangerous, and you should
          never touch a mushroom unless you are positive that it is safe. Mushi
          does not guarantee the accuracy of any information contained within
          the App and is not responsible for any harm that may result from
          touching or ingesting mushrooms. By using the App, you agree to assume
          all responsibility for any such risks.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(31, 35, 53)",
    height: "100%",
  },
  titleImg: {
    marginTop: 20,
    alignSelf: "center",
    tintColor: "rgb(15, 163, 177)",
  },
  loginBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
    borderWidth: 2,
    borderRadius: 10,
  },
  loginBoxText: {
    textAlign: "center",
  },
  loginButton: {
    margin: 10,
    backgroundColor: "rgb(15, 163, 177)",
    borderRadius: 10,
    padding: 10,
  },

  disclaimerHeader: {
    display: "flex",
    flexDirection: "row",
  },

  disclaimerBox: {
    marginTop: "auto",
    position: "relative",
    margin: 10,
    padding: 10,
    borderWidth: 3,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(255, 30, 80)",
    color: "rgb(255, 130, 80)",
    borderRadius: 10,
  },
  disclaimerTitle: {
    alignSelf: "center",
    fontSize: 22,
    margin: 12,
    marginTop: 8,

    color: "rgb(255, 30, 80)",
  },
  disclaimerText: {
    textAlign: "center",
    fontSize: 12,
  },
  image: {
    height: 80,
    width: 80,
    position: "absolute",
    right: 0,
    top: -8,
  },
  motd: {
    justifyContent: "center",
    alignItems: "center",
  },
  motdImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderColor: "white",
    borderWidth: 3,
    textAlign: "center",
    marginBottom: 10,
  },
  motdTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 15,
  },
  motdText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
});

export default HomeScreen;
