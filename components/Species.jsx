import {Modal, View, Text, Button} from 'react-native'



export const Species = ({mushroomInfo, setIsInfoVisible}) => {
    const handleInfoClose = () => {
        setIsInfoVisible(false);
      };

    return (
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
)
}