import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatButton from "../componentes/FloatButton";
import Publicaciones from "../componentes/Publicaciones";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import RemoveCache from "../cache/RemoveCache";
import GetAlls from "../cache/GetAlls";
import RemoveAlls from "../cache/RemoveAlls";

const Noticias = () => {
  const { usuario } = contexUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usuario && usuario.rol) setLoading(false);
  }, [usuario]);
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Publicaciones datos_usuario={usuario} />
        {usuario.rol === "admin" && <FloatButton pantalla="N" />}
        <TouchableOpacity onPress={()=>GetAlls()}>
          <Text>mostrar cache</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>RemoveCache({key:"usuario"})}>
          <Text>eliminar cache user</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>RemoveAlls()}>
          <Text>eliminar toda la cache</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

/*
return (
    <>
      {loading ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <Text>Cargando...</Text>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <Publicaciones />
          {usuario.rol === "admin" && <FloatButton pantalla="N" />}
        </SafeAreaView>
      )}
    </>
  );
*/
const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default Noticias;
