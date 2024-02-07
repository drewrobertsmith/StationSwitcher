import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { addTracks, setupPlayer } from "../services/trackplayerService";
import { useEffect, useState } from "react";

import FloatingPlayer from "../components/floatingPlayer";
import { STATIONDATA } from "../api/stationData";
import StationFeed from "../components/stationFeed";

export default function HomePage() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(null);
  const activeTrack = useActiveTrack();
  const queryClient = new QueryClient();

  //this intantiates the player using the setupPlayer() function from the trackservice
  useEffect(() => {
    async function setup() {
      const isSetup = await setupPlayer(); // The player is ready to be used
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
    }
    setup();
  }, []);

  useEffect(() => {
    if (activeTrack && activeTrack.url) {
      const station = STATIONDATA.find((s) => s.url === activeTrack.url);
      if (station) {
        setCurrentBackgroundColor(station.backgroundColor);
      }
    }
  }, [activeTrack]);


  if (!isPlayerReady) {
    return <Text>Player is loading...</Text>;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <View
          style={[
            styles.container,
            { backgroundColor: currentBackgroundColor },
          ]}
        >
          <StationFeed activeTrack={activeTrack} />
          <FloatingPlayer />
        </View>
      </QueryClientProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
