import React, { useState } from "react";
import { Text, Image, View, Modal, StyleSheet, TouchableOpacity } from "react-native";

function HomeScreen() {
  const [modalVisibility, setModalVisibility] = useState(true)

  const aknowledgeDisclaimer = () => {
    setModalVisibility(false)
  }

  return (
    <View>
      <Modal style={styles.modal} visible={modalVisibility}>
        <View style={{height: "94%", alignItems: 'center'}}>
          <Text style={styles.disclaimerTitle}>DISCLAIMER</Text>
          <Text style={styles.disclaimerText}>This mushroom finding app (“Mushi App”) is intended for informational and educational purposes only. The App does not provide advice regarding the safety or edibility of any mushroom. Eating wild mushrooms can be dangerous, and you should never eat a mushroom unless you are positive that it is safe. The App does not guarantee the accuracy of any information contained within the App and is not responsible for any harm or illness that may result from ingesting mushrooms. By using the App, you agree to assume all responsibility for any such risks.</Text>
          <Image 
            style={styles.image}
            source={require("../../assets/mushroom-question.png")}
          />
        </View>

        <View style={{height: "6%"}}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {aknowledgeDisclaimer()}}
          >
              <Text style={styles.buttonText}>Agree</Text>
          </TouchableOpacity>
        </View>

      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
  },
  button: {
    height: "100%",
    backgroundColor: "lightseagreen"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold"
  },
  disclaimerTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    marginTop: "30%",
    marginLeft: "6%",
    marginRight: "6%"
  },
  disclaimerText: {
    textAlign: "center",
    fontSize: 18,
    marginLeft: "6%",
    marginRight: "6%"

  },
  image: {
    height: 350,
    width: 350,
    opacity: .6,
    marginLeft: "50%",
    marginRight: "50%"
  }

})

export default HomeScreen;
