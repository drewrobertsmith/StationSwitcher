import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import { STATIONDATA } from "../api/stationData";
import StationTitle from "./stationTitle";
import renderItem from "./stationTitle";
import { useState } from "react";

export default function StationFeed({ activeTrack }) {
  const [data, setData] = useState(STATIONDATA);

  /* renderItem needs ot be wrapped to pass other properties down wiht it */
  const renderItemWithActiveTrack = ({ item, drag, isActive }) => {
    return renderItem({ activeTrack, item, drag, isActive });
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      renderItem={renderItemWithActiveTrack}
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
