import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";

const ForosBtn = () => {
  const handlePress = () => {
    // Acción al presionar el botón "Foro 1"
    console.log('Botón "Foro 1" presionado');
  };
  return (
    <View>
      <TouchableOpacity style={styles.foros} onPress={handlePress}>
        <Text style={styles.text}>Foro 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.foros} onPress={handlePress}>
        <Text style={styles.text}>Foro 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.foros} onPress={handlePress}>
        <Text style={styles.text}>Foro 3</Text>
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
    alignItems: "center",
    width: 350,
    height: 100,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00FFFF",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForosBtn;
