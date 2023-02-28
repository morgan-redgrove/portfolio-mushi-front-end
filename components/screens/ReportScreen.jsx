import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
} from "react-native";
import { getReportById, getMushroomByCommonName, patchReportById } from "../../utils/ApiCalls";
import Map from "../Map";
import { getMushrooms } from "../../utils/ApiCalls";
import { SelectList } from "react-native-dropdown-select-list";
import {Species} from '../Species'

function ReportScreen({ route }) {
  const { id } = route.params;
  const [report, setReport] = useState(null);
  const [mushroomInfo, setMushroomInfo] = useState(null);
  const [mushrooms, setMushrooms] = useState([])
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [selected, setSelected] = useState("");

  const options = mushrooms.map(({commonName}) => {
    return { value: commonName }
    })
  


  useEffect(() => {

  })

  useEffect(() => {
    getMushrooms().then((mushrooms) => {
      setMushrooms(mushrooms)
    })
    .then(() => {
          getReportById(id).then((report) => {
      setReport(report);
      getMushroomByCommonName(report.species.species)
        .then((mushroom) => {
          setMushroomInfo(mushroom);
        })
        .catch((error) => {
          console.log("Error while fetching mushroom info: ", error);
        });
    });
    })

  }, []);

  const voteForSpecies = (id, suggestedSpecies) => {
    patchReportById(id, suggestedSpecies).then((report) => {
      console.log("Vote cast")
      setReport(report)
    })
  }

  const handleMoreInfo = () => {
    setIsInfoVisible(true);
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
                - species: {species} votes: {votes}
              </Text>
              <Button   
                onPress={() => {voteForSpecies(id, species)}}
                title="Up vote!"/>
            </View>
          )}
        />
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={options}
          save="value"
          placeholder="Suggest an alternate species..."
        />
        <Button   
          onPress={() => {voteForSpecies(id, selected)}}
          title="Submit suggestion"/>
        <Button title="More Info" onPress={handleMoreInfo} />
        {isInfoVisible && (<Species mushroomInfo = {mushroomInfo} setIsInfoVisible= {setIsInfoVisible}/>)}
      </View>
    );
  }
}

export default ReportScreen;
