import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = () => {
  const personasMeditando = 1000;
  const generateRandomCoordinate = () => {
    const randomLat = Math.random() * (90 - -90) + -90;
    const randomLng = Math.random() * (180 - -180) + -180;
    return { latitude: randomLat, longitude: randomLng };
  };

  return (
    <View style={styles.container3}>
      <MapView
        style={styles.map}
        minZoomLevel={1}
        maxZoomLevel={1.8}
        initialRegion={{
          latitude: 0,
          longitude: -40,
          latitudeDelta: 150,
          longitudeDelta: 150,
        }}
      >
        <Marker coordinate={generateRandomCoordinate()} />
        <Marker coordinate={generateRandomCoordinate()} />
        <Marker coordinate={generateRandomCoordinate()} />
      </MapView>
      <View style={styles.textContainer}>
        <Text style={styles.texto}>{personasMeditando}</Text>
        <Text style={styles.titulo}>personas meditando ahora</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: 300,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    marginRight: 10,
  },
  texto: {
    fontSize: 24,
    color: "red",
  },
});

export default Map;
