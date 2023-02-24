import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { getReportById, getMushroomByCommonName } from "../../utils/ApiCalls";

function ReportScreen({ route }) {
  const { id } = route.params;
  const [report, setReport] = useState(null);
  const [mushroomInfo, setMushroomInfo] = useState(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  useEffect(() => {
    getReportById(id).then((report) => {
      setReport(report);
      getMushroomByCommonName(report.species.species)
        .then((mushroom) => {
          console.log(mushroom);
          setMushroomInfo(mushroom);
          console.log(mushroomInfo);
        })
        .catch((error) => {
          console.log("Error while fetching mushroom info: ", error);
        });
    });
  }, []);

  const handleMoreInfo = () => {
    setIsInfoVisible(true);
  };

  const handleInfoClose = () => {
    setIsInfoVisible(false);
  };

  if (!report) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>
          lat: {report.location.lat} long: {report.location?.long}
        </Text>
        <Text>username: {report.username}</Text>
        <Text>timestamp: {report.time_stamp}</Text>
        <Text>notes: {report.notes}</Text>
        <Text>
          species: {report.species.species} votes: {report.species.votes}
        </Text>
        <Text>credibility: {report.credibility}</Text>
        <Text>alternate species:</Text>
        <FlatList
          data={report.alternate_species}
          renderItem={({ item: { species, votes } }) => (
            <View>
              <Text>
                {" "}
                - species: {species} votes: {votes}
              </Text>
            </View>
          )}
        />
        <Text>prevalence: {report.prevalence}</Text>

        <Button title="More Info" onPress={handleMoreInfo} />
        {isInfoVisible && (
          <Modal animationType="slide">
            <View>
              <Text>Common Name: {mushroomInfo?.commonName}</Text>
              <Text>Latin Name: {mushroomInfo?.latinName}</Text>
              <Text>Order: {mushroomInfo?.order}</Text>
              <Text>Genus: {mushroomInfo?.genus}</Text>
              <Text>Cap: {mushroomInfo?.attributes.cap}</Text>
              <Text>Stem: {mushroomInfo?.attributes.stem}</Text>
              <Text>Gills: {mushroomInfo?.attributes.gills}</Text>
              <Text>Spores: {mushroomInfo?.attributes.spores}</Text>
              <Text>Habitat: {mushroomInfo?.habitat}</Text>
              <Text>Months: {mushroomInfo?.months.join(", ")}</Text>
              <Text>Colors: {mushroomInfo?.colors.join(", ")}</Text>
              <Text>Toxic: {mushroomInfo?.toxic ? "Yes" : "No"}</Text>
              <Text>Average Height: {mushroomInfo?.averageHeight}cm</Text>
              <Button title="Close" onPress={handleInfoClose} />
            </View>
          </Modal>
        )}
      </View>
    );
  }
}
export default ReportScreen;
