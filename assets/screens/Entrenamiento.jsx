import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Videos from "../componentes/VideoYT";
import LogOut from "../componentes/LogOut";
import GetAlls from "../cache/GetAlls";
const Entrenamiento = () => {
  const mostrarCache = async () => {
    await GetAlls();
  };

  return (
    <View>
      <Text>Entrenamiento</Text>
      <TouchableOpacity onPress={() => mostrarCache}>
        <Text>Mostrar cache user</Text>
      </TouchableOpacity>
      <LogOut />
    </View>
  );
};

export default Entrenamiento;
