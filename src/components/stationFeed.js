import { FlatList, StyleSheet } from "react-native";

import { STATIONDATA } from "../api/stationData";
import StationTitle from "./stationTitle";

export default function StationFeed({activeTrack}) {
  return (
    <FlatList
      data={STATIONDATA}
      renderItem={({ item }) => <StationTitle station={item} activeTrack={activeTrack}/>}
      keyExtractor={(item) => item.callLetters}
      contentContainerStyle={styles.stationFeed}
    />
  );
}
const styles = StyleSheet.create({
  stationFeed: {
    justifyContent: "space-evenly",
  },
});
