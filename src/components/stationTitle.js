import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import TrackPlayer from "react-native-track-player";

export default function StationTitle({ station, activeTrack }) {
  const [selectedStation, setSelectedStation] = useState(null);
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    if (activeTrack && activeTrack.id === selectedStation) {
      setTextColor(station.textColor);
    } else {
      setTextColor("black");
    }
  }, [selectedStation, activeTrack]);

  return (
    <View style={styles.titleContainer}>
      <Pressable
        onPress={() => {
          TrackPlayer.load({
            id: station.callLetters,
            url: station.url,
            title: station.name,
            artist: "Moody Radio",
            isLiveStream: true,
          });
          TrackPlayer.play();
          setSelectedStation(station.callLetters);
        }}
        onLongPress={() => {
          TrackPlayer.stop();
        }}
      >
        <Text style={[styles.title, { color: textColor }]}>{station.name}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 32,
    paddingBottom: null,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
  },
});
