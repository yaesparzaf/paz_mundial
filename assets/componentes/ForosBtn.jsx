import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const ForosBtn = () => {
    const navigacion =useNavigation();
  const handlePress = () => {
    // Acción al presionar el botón "Foro 1"
    console.log('Botón "Foro 1" presionado');
    navigacion.navigate('Foro');
  };
  return (
    <View>
      <TouchableOpacity style={styles.foros} onPress={handlePress}>
        <Text style={styles.titulo_btn}>Foro 1</Text>
        <Text style={{marginLeft:10,}}>Descubre todo sobre tus chakras</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.foros} onPress={handlePress}>
        <Text style={styles.titulo_btn}>Foro 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.foros} onPress={handlePress}>
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
    marginLeft:10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForosBtn;
