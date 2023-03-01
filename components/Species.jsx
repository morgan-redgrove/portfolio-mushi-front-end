import { Modal, View, Text, Button, StyleSheet, ScrollView, Dimensions} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import {addMonthsToGraph} from '../utils/utils'


export const Species = ({ mushroomInfo, setIsInfoVisible }) => {
  const handleInfoClose = () => {
    setIsInfoVisible(false);
  };

  const {width} = Dimensions.get("window")

  const graphData = addMonthsToGraph(mushroomInfo.months)

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modal}>
        <Text style={styles.h1}>{mushroomInfo?.commonName}</Text>
        <Text style={styles.h2}>{mushroomInfo?.latinName}</Text>

       <BarChart
       barWidth={22}
       noOfSections={1}
       barBorderRadius={4}
       frontColor="lightgray"
       data={graphData}
       yAxisThickness={0}
       hideYAxisText
       xAxisThickness={0}
       maxValue= {1}
       height= {20}
       initialSpacing= {0}
       spacing={5}
    hideRules
       />
    

        <Text>Order: {mushroomInfo?.order}</Text>
        <Text>Genus: {mushroomInfo?.genus}</Text>
        <Text>Cap: {mushroomInfo?.attributes.cap}</Text>
        <Text>Stem: {mushroomInfo?.attributes.stem}</Text>
        <Text>Gills: {mushroomInfo?.attributes.gills}</Text>
        <Text>Spores: {mushroomInfo?.attributes.spores}</Text>
        <ScrollView>
        <Text>Habitat: {mushroomInfo?.habitat}</Text>
        </ScrollView>
        <Text>Colors: {mushroomInfo?.colors.join(", ")}</Text>
        <Text>Toxic: {mushroomInfo?.toxic ? "Yes" : "No"}</Text>
        <Text>Average Height: {mushroomInfo?.averageHeight}mm</Text>
        <Button title="Close" onPress={handleInfoClose} />
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFF",
    marginVertical: 100,
    padding: 10,
    borderRadius: 20,
    width: "90%",
  },
  h1: {
    fontSize: 50,
  },
  h2: {
    fontSize: 25,
    fontStyle: "italic",
  },
  chart:{
    flex:1
  }
});
