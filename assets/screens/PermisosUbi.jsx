import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

const PermisosUbi = ({ getUbi }) => {
  const [getUbicacion, setGetUbicacion] = useState(false);

  const onGetUbi = () => {
    setGetUbicacion(true);
    getUbi(true);
  };
  return (
    <View style={styles.cont}>
      <View>
        <Text style={styles.titulo}>Activa la ubicación</Text>
      </View>
      <View style={styles.leyenda_cont}>
        <Text style={styles.leyenda_text}>
          Necesitas dar permisos de ubicación para tener la mejor experiencia
          con tu meditación
        </Text>
      </View>
      <TouchableOpacity style={styles.permisos_btn} onPress={() => onGetUbi()}>
        <Text>Activar ubicación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-around",
    //backgroundColor:'yellow',
    marginBottom: 70,
  },
  leyenda_cont: {
    margin: 10,
    //backgroundColor:'red'
  },
  leyenda_text: {
    fontSize: 18,
    textAlign: "center",
  },
  permisos_btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#00ADEF",
    backgroundColor: "white",
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default PermisosUbi;