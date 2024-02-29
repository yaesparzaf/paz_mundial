import {
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useCallback, useState } from "react";
import FloatButton from "../componentes/FloatButton";
import Videos from "../componentes/Videos";
import Ubicacion from "../componentes/Ubicacion";
import Map from "../componentes/Map";
import PermisosUbi from "./PermisosUbi";
import Contador from "../../fb/useContador";
import { useFocusEffect } from "@react-navigation/native";
import OnMeditar from "../componentes/OnMeditar";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import useContador from "../../fb/useContador";
import ContadorAnimado from "../componentes/ContadorAnimado";

const Meditar = () => {
  const { usuario } = contexUser();
  const [ubicacion, setUbicacion] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const contador = useContador();

  useFocusEffect(
    useCallback(() => {
      const PersonasMeditando = async (estaMeditando) => {
        OnMeditar(estaMeditando, usuario.id);
      };
      PersonasMeditando(true);
      return () => {
        PersonasMeditando(false);
      };
    }, [])
  );

  const obtenerUbicacion = async (ubicacion) => {
    setUbicacion(ubicacion);
    if (ubicacion) setIsLoading(false);
  };

  const onReload = (reset) => {
    if (reset) {
      setReload(!reload);
    }
  };
  if (!ubicacion) {
    return (
      <SafeAreaView style={styles.loading_container}>
        <Ubicacion getLocation={obtenerUbicacion} />
        <Image style={styles.loading} source={require("../loading.gif")} />
      </SafeAreaView>
    );
  } else if (isLoading) {
    return (
      <SafeAreaView style={styles.loading_container}>
        <Ubicacion getLocation={obtenerUbicacion} />
        {reload && <Ubicacion getLocation={obtenerUbicacion} />}
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <PermisosUbi getUbi={onReload} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flex: 0.5 }}>
          <Videos />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F7FFFE",
          }}
        >
          <Image
            //source={require("../meditarplanta.png")}
            source={require("../meditar.gif")}
            //source={require("../meditar1.gif")}
            style={{ width: "100%", height: 250 }}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.titulo}>Personas meditando ahora:</Text>
            <ContadorAnimado numero={contador} />
          </View>
          <Map />
        </View>
      </ScrollView>
      {usuario && usuario.rol === "admin" && <FloatButton pantalla="V" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7FFFE",
    flex: 1,
  },
  loading_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  loading: {
    width: 150,
    height: 150,
  },
  drawerBackground: {
    marginTop: 200,
    height: 250,
    flex: 1,
    resizeMode: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    marginRight: 1,
    color: "#000",
  },
});

export default Meditar;
