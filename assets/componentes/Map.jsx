import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import GetUbicacion from "../../fb/GetUbicacion";

const iosPinIcon = require("../pin.png");

const INITIAL_REGION = {
  latitude: 23.6345,
  longitude: -102.5528,
  latitudeDelta: 90,
  longitudeDelta: 90,
};

const Map = () => {
  const mapRef = useRef();
  const [coordsRecibidas, setCoordsRecibidas] = useState(false);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    if (datos.length > 0 && !coordsRecibidas) {
      console.log("Coordenadas recibidas:", datos);
      setCoordsRecibidas(true);
    }
  }, [datos, coordsRecibidas]);

  const getDatos = (coords) => {
    if (coords) {
      setDatos(coords);
    }
  };

  const animateToRegion = () => {
    let region = {
      latitude: 19.7069,
      longitude: -101.1953,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    mapRef.current.animateToRegion(region, 4000);
  };

  return (
    <View style={styles.container3}>
      {!coordsRecibidas && <GetUbicacion allDatos={getDatos} />}
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="satellite"
        loadingEnabled={true}
        toolbarEnabled={false}
        clusteringEnabled={true}
        clusterColor="#00abef70"
        maxZoomLevel={7}
        initialRegion={INITIAL_REGION}
      >
        {datos.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coord.latitud,
              longitude: coord.longitud,
            }}
            icon={iosPinIcon}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  map: {
    width: "100%",
    height: 400,
  },
});

export default Map;
