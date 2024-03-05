import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React from "react";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import FloatButton from "../componentes/FloatButton";
import ForosBtn from "../componentes/ForosBtn";

const Comunidad = () => {
  const { usuario } = contexUser();
  if (usuario) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <ForosBtn />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
});

export default Comunidad;
