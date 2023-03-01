import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { addMonthsToGraph } from "../utils/utils";

const { width } = Dimensions.get("window");
const cardWidth = width *0.9

export const Species = ({ mushroomInfo, setIsInfoVisible }) => {
  const handleInfoClose = () => {
    setIsInfoVisible(false);
  };

  const graphData = addMonthsToGraph(mushroomInfo.months);
  
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modal}>
        <Text style={styles.h1}>{mushroomInfo?.commonName}</Text>
        <Text style={styles.h2}>{mushroomInfo?.latinName} - {mushroomInfo?.order}</Text>

        <BarChart
          barWidth={22}
          noOfSections={1}
          barBorderRadius={4}
          frontColor="lightgray"
          data={graphData}
          yAxisThickness={0}
          hideYAxisText
          xAxisThickness={0}
          maxValue={1}
          height={20}
          initialSpacing={0}
          spacing={5}
          hideRules
        />

<View style= {styles.speciesProperties}>
        <ScrollView horizontal >
          <View style= {styles.speciesProperty}>
            <Text>~{mushroomInfo?.averageHeight}mm</Text>
          </View>
          <View style = {styles.speciesProperty}>
            <Text>{mushroomInfo?.toxic ? "Toxic" : "Non-Toxic"}</Text>
          </View> 
          <View>
            <Text>{mushroomInfo?.habitat}</Text>
          </View>
        </ScrollView>
</View>

        <View>
          <Text>Colors: {mushroomInfo?.colors.join(", ")}</Text>
        </View>

       <View style = {styles.detailsContainer}>
        <ScrollView horizontal snapToInterval= {cardWidth} snapToAlignment= {"center"} decelerationRate= {0}>
          <View style = {styles.detailsCard}>
            <Text style = {styles.h3}>Cap</Text>
              <Text>{mushroomInfo?.attributes.cap}</Text>
            </View>


        <View style = {styles.detailsCard}>
          <Text style= {styles.h3}>Stem</Text>
          <Text>{mushroomInfo?.attributes.stem}</Text>
        </View>

        <View style = {styles.detailsCard}>
          <Text style= {styles.h3}>Spores</Text>
          <Text>{mushroomInfo?.attributes.spores}</Text>
        </View>

       

        <View style = {styles.detailsCard}>
          <Text style = {styles.h3}>Gills</Text>
          <Text>{mushroomInfo?.attributes.gills}</Text>
        </View>  

        </ScrollView>
       </View>
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
  h3:{
    fontSize: 20
  },
  chart: {
    flex: 1,
  },
  speciesProperties: {
    height:30,
    marginVertical: 10
  },
  speciesProperty: {
    paddingHorizontal: 10,
  },
  speciesDetails: {
    backgroundColor: "grey"
  },
  detailsContainer : {
    paddingVertical:10,
    height: 100
  }, 
  detailsCard: {
    width: cardWidth,
    paddingHorizontal: 10
  }
});
