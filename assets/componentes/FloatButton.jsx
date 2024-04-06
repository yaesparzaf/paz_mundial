import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

const FloatButton = ({ pantalla }) => {
  const navegacion = useNavigation();
  const navegarAPublicar = () => {
    if (pantalla === "V") {
      navegacion.navigate("MeditarEdit");
    } else if (pantalla === "N") {
      navegacion.navigate("NuevaPublicacion", { screen: "noticias" });
    } else if (pantalla === "C") {
      navegacion.navigate("NuevoForo");
    } else if (pantalla === "E") {
      navegacion.navigate("NuevaPublicacion", { screen: "entrenamiento" });
    }
  };
  return (
    <Entypo
      name={pantalla === "C" ? "circle-with-plus" : "new-message"}
      size={20}
      color="black"
      onPress={navegarAPublicar}
      style={{ backgroundColor: "#ffffff", padding: 10 }} // Ejemplo de estilo agregado
    />
  );
};

const styles = StyleSheet.create({});
export default FloatButton;
