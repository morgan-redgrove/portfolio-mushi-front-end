import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { getReportById } from "../../utils/ApiCalls";

function ReportScreen({route}) {
    const { id } = route.params

    const [report, setReport] = useState({})

    useEffect(() => {
        getReportById(id)
        .then((report) => {
            setReport(report)
        })
    }, [])

    // console.log(report)
    const { username, location, time_stamp, notes, species,alternate_species, credibility, prevalence } = report
    console.log(username)
    console.log(location)
    console.log(time_stamp)
    console.log(notes)
    console.log(species)
    console.log(alternate_species)
    console.log(credibility)
    console.log(prevalence)



  return (
    <View>
      <Text>lat: {report?.location?.lat}  long: {report?.location?.long}</Text>
      <Text>username: {report?.username}</Text>
      <Text>timestamp: {report?.time_stamp}</Text>
      <Text>notes: {report?.notes}</Text>
      <Text>species: {report?.species.species} votes: {report?.species.votes}</Text>
      <Text>credibility: {report?.credibility}</Text>

      <FlatList
        data={report?.alternate_species}
        renderItem={({ species }) => (
            <Text>species: {species.species} votes: {species.votes}</Text>
        )}
      />

      <Text>prevalence{report?.prevalence}</Text>
    </View>
  );
}

export default ReportScreen;
