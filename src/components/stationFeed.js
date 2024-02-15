import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import DraggableFlatList from "react-native-draggable-flatlist";
import LocalStation from "./localStation";
import RenderItem from "./stationTitle";
import { STATIONDATA } from "../api/stationData";

export default function StationFeed({ activeTrack }) {
  const [data, setData] = useState(STATIONDATA);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("station order");
        if (storedData !== null) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("station order", jsonValue);
      } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
      }
    };

    if (data !== null) {
      saveData();
    }
  }, [data]);

  /* renderItem for DraggableFlatlist needs to be wrapped to pass other properties down wiht it */
  const RenderItemWithActiveTrack = ({ item, drag, isActive }) => {
    return RenderItem({ activeTrack, item, drag, isActive });
  };

  return (
    <View>
      <LocalStation />
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        renderItem={RenderItemWithActiveTrack}
        keyExtractor={(item) => item.callLetters}
        contentContainerStyle={styles.stationFeed}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  stationFeed: {
    justifyContent: "space-evenly",
    height: "90%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
  },
});
