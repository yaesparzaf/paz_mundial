import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FAB } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

const FloatButton = ({ pantalla }) => {
  const navegacion = useNavigation();
  const navegarAPublicar = () => {
    if (pantalla === "V") {
      navegacion.navigate("MeditarEdit");
    } else if (pantalla === "N") {
      navegacion.navigate("Publicar");
    } else if (pantalla === "C") {
      navegacion.navigate("NuevoForo");
    } else if (pantalla === "E") {
      navegacion.navigate("NuevaPublicacion");
    }
  };
  return (
    <Entypo
      name={pantalla == "C" ? "circle-with-plus" : "new-message"}
      size={24}
      color="black"
      onPress={navegarAPublicar}
    />
  );
};

const styles = StyleSheet.create({});
export default FloatButton;
