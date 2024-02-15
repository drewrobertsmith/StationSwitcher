import * as Location from "expo-location";

import { Pressable, Text } from "react-native";
import { useEffect, useState } from "react";

export default function LocalStation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocationForLocalStation = () => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };
  };

  let text = "Select Local Station";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <Pressable onPress={getLocationForLocalStation()}>
      <Text>{text}</Text>
    </Pressable>
  );
}
