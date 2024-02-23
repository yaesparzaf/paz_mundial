import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const ForosBtn = () => {
  const foros = ["PoderMental", "Hipnosis"];
  const navigacion = useNavigation();
  const botonPresionado = (name_foro) => {
    // Acción al presionar el botón "Foro 1"
    navigacion.navigate("Foro", { name_foro });
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.foros}
        onPress={() => botonPresionado(foros[0])}
      >
        <Text style={styles.titulo_btn}>Poder mental</Text>
        <Text style={{ marginLeft: 10 }}>Poderes mentales</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.foros}
        onPress={() => botonPresionado(foros[1])}
      >
        <Text style={styles.titulo_btn}>Hipnosis</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.foros} onPress={botonPresionado}>
        <Text style={styles.titulo_btn}>Foro 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titulos: {
    fontSize: 25,
    fontWeight: "bold",
  },
  foros: {
    width: 350,
    height: 100,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00FFFF",
  },
  titulo_btn: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForosBtn;
