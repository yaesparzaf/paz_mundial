import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import ForosBtn from "../componentes/ForosBtn";

const Comunidad = () => {
  return (
    <View style={styles.contenedor}>
      <ForosBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
});

export default Comunidad;
