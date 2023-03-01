import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import {
  getReportById,
  getMushroomByCommonName,
  patchReportById,
  getMushrooms,
  deleteReportById,
} from "../../utils/ApiCalls";
import { SelectList } from "react-native-dropdown-select-list";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../../firebaseConfig";
import { Species } from "../Species";

function ReportScreen({ route, navigation }) {
  const { id } = route.params;
  // const { user } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState("");
  const [report, setReport] = useState(null);
  const [mushroomInfo, setMushroomInfo] = useState(null);
  const [mushrooms, setMushrooms] = useState([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const options = mushrooms.map(({ commonName }) => {
    return { value: commonName };
  });

  useEffect(() => {});

  useEffect(() => {
    getMushrooms()
      .then((mushrooms) => {
        setMushrooms(mushrooms);
      })
      .then(() => {
        if (auth.currentUser) {
          setCurrentUser(auth.currentUser.displayName);
        }
        getReportById(id).then((report) => {
          setReport(report);
          console.log(report);
          getMushroomByCommonName(report.species.species)
            .then((mushroom) => {
              setMushroomInfo(mushroom);
            })
            .catch((error) => {
              console.log("Error while fetching mushroom info: ", error);
            });
        });
      });
  }, []);

  const voteForSpecies = (id, suggestedSpecies) => {
    patchReportById(id, suggestedSpecies).then((report) => {
      console.log("Vote cast");
      setReport(report);
    });
  };

  const deleteReport = (id) => {
    deleteReportById(id).then(() => {
      navigation.navigate("Map", { paramPropKey: "paramPropValue" });
    });
  };

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
      <View style={styles.main}>
        <View style={styles.topSection}>
          <Image style={styles.img} source={{ uri: report.img_url }} />
          <View style={styles.mainSpecies}>
            <View style={styles.tab}></View>
            <Text style={styles.label}>Species </Text>
            <Text>{report.species.species}</Text>
            <Button title="More Info" onPress={handleMoreInfo} />
            <Text>credibility: {report.credibility}</Text>
            <View style={styles.userDate}>
              <Text>Submitted by: {report.username}</Text>
              <Text>{report.time_stamp.slice(0, 16)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.notes}>
          <View style={styles.tab}></View>
          <Text style={styles.label}>Notes</Text>
          <Text>{report.notes}</Text>
        </View>

        <View style={styles.voteSection}>
          <View style={styles.tab}></View>
          <Text style={styles.label}>Votes</Text>
          <View style={styles.voteSectionLeft}>
            <SelectList
              boxStyles={styles.dropDown}
              setSelected={(val) => setSelected(val)}
              data={options}
              save="value"
              placeholder="Vote on species"
            />
            <TouchableOpacity
              onPress={() => {
                voteForSpecies(id, selected);
              }}
            >
              <Text>Submit Vote</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.speciesList}
            data={report.alternate_species}
            renderItem={({ item: { species, votes } }) => (
              <View style={styles.speciesListCard}>
                <Text>{species}</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text>votes: {votes}</Text>
                  <TouchableOpacity
                    style={styles.voteButton}
                    onPress={() => {
                      voteForSpecies(id, species);
                    }}
                  >
                    <Text>Up vote!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {report.username === currentUser ? (
          <Button
            title="Delete Report"
            onPress={() => {
              deleteReport(id);
            }}
          />
        ) : null}

        {isInfoVisible && (
          <Species
            mushroomInfo={mushroomInfo}
            setIsInfoVisible={setIsInfoVisible}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgb(31, 35, 53)",
    height: "100%",
    padding: 10,
  },
  label: { position: "absolute", left: 10, top: 5 },
  tab: {
    borderRadius: 5,
    width: 80,
    height: 30,
    backgroundColor: "rgb(15, 163, 177)",
    position: "absolute",
  },
  img: { width: 200, height: 200 },
  topSection: { display: "flex", flexDirection: "row" },
  mainSpecies: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 10,
    padding: 10,
    paddingTop: 35,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
    borderWidth: 2,
    borderRadius: 10,
  },
  userDate: {
    marginTop: 30,
  },

  notes: {
    marginVertical: 10,
    padding: 10,
    paddingTop: 35,
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
    borderWidth: 2,
    borderRadius: 10,
  },
  voteSection: {
    paddingTop: 35,
    minHeight: 200,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
    borderWidth: 2,
    borderRadius: 10,
  },
  voteSectionLeft: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
  },

  dropDown: {
    marginTop: "6%",
    backgroundColor: "rgba(255,255,255,.8)",
    borderColor: "rgb(15, 163, 177)",
  },
  speciesList: {
    marginLeft: 20,
  },
  speciesListCard: {
    padding: 10,
    marginVertical: 10,
    marginLeft: 10,
    textAlign: "center",
    position: "relative",
    backgroundColor: "rgba(255,255,255,.8)",
    borderRadius: 10,
  },
  voteButton: { position: "absolute", right: 10 },
});

export default ReportScreen;
