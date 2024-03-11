import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import Publicaciones from "../componentes/Publicaciones";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
const Entrenamiento = () => {
  const { usuario } = contexUser();
  const [loading, setLoading] = useState(true);
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
  }
  return (
    <SafeAreaView>
      <Publicaciones datos_usuario={usuario} screen={"entrenamiento"} />
    </SafeAreaView>
  );
};

export default Entrenamiento;
