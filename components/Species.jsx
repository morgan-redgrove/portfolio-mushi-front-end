import { Modal, View, Text, Button, StyleSheet, ScrollView, Dimensions} from "react-native";
import { BarChart } from "react-native-gifted-charts";



export const Species = ({ mushroomInfo, setIsInfoVisible }) => {
  const handleInfoClose = () => {
    setIsInfoVisible(false);
  };

  const {width} = Dimensions.get("window")

  const barData = [
    {value: 1, label: 'Jan'},
    {value: 1, label: 'Feb', frontColor: '#177AD5'},
    {value: 1, label: 'Mar', frontColor: '#177AD5'},
    {value: 1, label: 'Apr'},
    {value: 1, label: 'May', frontColor: '#177AD5'},
    {value: 1, label: 'Jun'},
    {value: 1, label: 'Jul'},
    {value: 1, label: 'Aug'},
    {value: 1, label: 'Sep'},
    {value: 1, label: 'Oct'},
    {value: 1, label: 'Nov'},
    {value: 1, label: 'Dec'},
];


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
       data={barData}
       yAxisThickness={0}
       hideYAxisText
       xAxisThickness={0}
       maxValue= {1}
       height= {20}
       initialSpacing= {0}
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
        <Text>Months: {mushroomInfo?.months.join(", ")}</Text>
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
