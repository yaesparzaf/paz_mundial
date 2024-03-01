import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React from "react";
import Foros from "../componentes/Foros";
import SocialBotones from "../componentes/SocialBotones";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import FloatButton from "../componentes/FloatButton";
const windowWidth = Dimensions.get("window").width;

const Comunidad = () => {
  const { usuario } = contexUser();

  if (usuario) {
    return (
      <SafeAreaView style={styles.contenedor}>
        <SocialBotones />
        <View style={styles.cont_titulo_foros}>
          <Text style={styles.titulos}>Foros</Text>
        </View>
        <View style={styles.cont_foros}>
          <Foros />
        </View>
        {usuario.rol === "admin" && <FloatButton pantalla="C" />}
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color="#1bd6c3"
          style={{ flex: 1, alignItems: "center" }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
  },
  cont_titulo_foros: {
    flex: 0.1,
    marginTop: 10,
    marginLeft: 5,
  },
  cont_foros: {
    flex: 0.7,
    width: windowWidth,
    alignItems: "center",
    //backgroundColor: "#FFFF00",
    paddingTop: 10,
  },
  titulos: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Comunidad;
