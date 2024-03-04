import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatButton from "../componentes/FloatButton";
import Publicaciones from "../componentes/Publicaciones";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { Skeleton } from "moti/skeleton";
import RemoveCache from "../cache/RemoveCache";
import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";

const Noticias = () => {
  const { usuario } = contexUser();
  const [loading, setLoading] = useState(true);

  const mostrarCache = async () => {
    GetAlls();
  };

  useEffect(() => {
    if (usuario) setLoading(false);
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
        <Publicaciones datos_usuario={usuario} />
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
