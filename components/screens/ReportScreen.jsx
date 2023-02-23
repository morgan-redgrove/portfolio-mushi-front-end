import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Image, FlatList } from "react-native";
import { getReportById } from "../../utils/ApiCalls";

function ReportScreen({route}) {
    const { id } = route.params

    const [report, setReport] = useState(null)

    useEffect(() => {
        getReportById(id)
        .then((report) => {
            setReport(report)
        })
    }, [])

    if (!report) {
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } else {
       return (
            <View>
                <Text>lat: {report.location.lat}  long: {report.location?.long}</Text>
                <Text>username: {report.username}</Text>
                <Text>timestamp: {report.time_stamp}</Text>
                <Text>notes: {report.notes}</Text>
                <Text>species: {report.species.species} votes: {report.species.votes}</Text>
                <Text>credibility: {report.credibility}</Text>
                <Text>alternate species:</Text>
                <FlatList
                    data={report.alternate_species}
                    renderItem={({item: {species, votes}} ) => (
                        <View>
                            <Text>   - species: {species}  votes: {votes}</Text>
                        </View>
 
                    )}
                />

                <Text>prevalence: {report.prevalence}</Text>
            </View>
        )  
    }
}

export default ReportScreen;
