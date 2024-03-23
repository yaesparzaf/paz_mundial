import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Publicaciones from "../componentes/Publicaciones";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import PermisosNotificaciones from "../notificaciones/PermisosNotificaciones";

const Noticias = () => {
  const { usuario } = contexUser();
  const [loading, setLoading] = useState(true);

  const mostrarCache = async () => {
    GetAlls();
  };

  useEffect(() => {
    if (usuario) setLoading(false);
    //PermisosNotificaciones();
  }, [usuario]);
  if (loading || !usuario) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        {/* <PermisosNotificaciones /> */}
        <Publicaciones datos_usuario={usuario} screen={"noticias"} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default Noticias;
