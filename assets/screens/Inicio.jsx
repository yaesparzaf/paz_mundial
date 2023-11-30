import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../componentes/Header";

const Inicio = (navigation) => {
  return (
    <View>
      <Header />
      <View style={styles.cont_tierra}>
        <Image source={require("../../assets/tierra.jpg")} style={styles.gif} />
      </View>
      <View style={styles.cont_leyenda}>
        <Text style={styles.leyenda}>
          Medita, entrénate, únete a nuestra comunidad.
        </Text>
      </View>
      <View style={styles.cont_btn}>
        <Text>botones</Text>
        <TouchableOpacity
          style={styles.continua_btn}
          onPress={() => navigation.navigate("InApp")}
        >
          <Text style={styles.texto_centrado}>Continúa con google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continua_btn}>
          <Text style={styles.texto_centrado}>Continúa con Microsoft</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  cont_tierra: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "start",
    backgroundColor: "blue",
  },
  gif: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    //backgroundColor: 'blue',
  },
  cont_leyenda: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    //width:400,
    //backgroundColor:'green',
  },
  cont_btn: {
    flex: 0.2,
    //backgroundColor:'red'
  },
  continua_btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    height: 50,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#40E0D0",
  },
  texto_centrado: {
    fontSize: 20,
  },
  leyenda: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Inicio;
