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
        <Image style = {styles.speciesImage}source= {{uri:mushroomInfo.img_url}}/>
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

<View style= {styles.propertiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style= {styles.propertiesCard}>
            <Text>~{mushroomInfo?.averageHeight}mm</Text>
          </View>
          <View style = {styles.propertiesCard}>
            <Text>{mushroomInfo?.toxic ? "Toxic" : "Non-Toxic"}</Text>
          </View> 
          <View style= {styles.propertiesCard}>
            <Text>{mushroomInfo?.habitat}</Text>
          </View>
        </ScrollView>
</View>

        <View style= {styles.colorsContainer}>
          {mushroomInfo.colors.map((color)=>{
            
            return <View key = {color} style= {[styles.speciesColorCard, {backgroundColor: `${color.toLowerCase()}`}]}></View>
          })}
        </View>
          <Text>{mushroomInfo?.colors.join(", ")}</Text>

       <View style = {styles.detailsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval= {cardWidth} snapToAlignment= {"center"} decelerationRate= {0}>
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
       <View style={styles.closeButton}>
        <Button  title="Close" onPress={handleInfoClose} />
       </View>

      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFF",
    marginVertical: 50,
    padding: 10,
    borderRadius: 20,
    width: "90%",
  },
  h1: {
    fontSize: 40,
  },
  h2: {
    fontSize: 20,
    fontStyle: "italic",
  },
  h3:{
    fontSize: 20
  },
  chart: {
    flex: 1,
  },
  propertiesContainer: {
    height:30,
    marginVertical: 10,
  },
  propertiesCard: {
    justifyContent: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  detailsContainer : {
    marginVertical:10,
    height: 100
  }, 
  detailsCard: {
    width: cardWidth,
    paddingHorizontal: 10
  },
  colorsContainer:{
    width: cardWidth,
    flexDirection: "row",
    justifyContent: "space-evenly"
  }, 
  speciesColorCard: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    shadowOffset: {
      width: 3,
      height: 3

    },
    shadowOpacity: 10,
    shadowColor: "grey"
  
  },
  closeButton: {
    position: "absolute",
    padding: 10,
    bottom:0
  },
  speciesImage: {
    width:0.9 *cardWidth,
    height: 0.9 * cardWidth
  }
});
