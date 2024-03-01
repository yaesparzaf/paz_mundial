import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const FloatButton = ({ pantalla }) => {
  const navegacion = useNavigation();
  const navegarAPublicar = () => {
    if (pantalla === "V") {
      navegacion.navigate("MeditarEdit");
    } else if (pantalla === "N") {
      navegacion.navigate("Publicar");
    } else if (pantalla === "C") {
      navegacion.navigate("NuevoForo");
    }
  };
  return (
    <FAB
      style={styles.fab}
      icon={pantalla === "C" ? "plus" : "pencil"}
      onPress={navegarAPublicar}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 10,
    bottom: 20,
    backgroundColor: "#00ADEF",
  },
});
export default FloatButton;
