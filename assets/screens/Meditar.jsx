import {
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../fb/DatosUsers";
import FloatButton from "../componentes/FloatButton";
import Videos, { notLoading } from "../componentes/Videos";
import Ubicacion from "../componentes/Ubicacion";
import Map from "../componentes/Map";
import PermisosUbi from "./PermisosUbi";
import Contador from "../../fb/Contador";
import { useFocusEffect } from "@react-navigation/native";
import OnMeditar from "../componentes/OnMeditar";

const Meditar = () => {
  const { usuario } = useUser();
  const [ubicacion, setUbicacion] = useState(null);
  const [reload, setReload] = useState(false);
  const [contador, setContador] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const PersonasMeditando = async(estaMeditando)=>{
        OnMeditar(estaMeditando,usuario.id);
        const totalPersonas = await Contador();
        setContador(totalPersonas);
      };
      PersonasMeditando(true);
      console.log("enfoque en pantalla");
      console.log("Perosnas meditando: ",contador);
      return () => {
        PersonasMeditando(false);
        console.log("se cambio de pantalla.Perosnas meditando: ",contador);

      };
    }, [contador])
  );

  const obtenerUbicacion = async (ubicacion) => {
    setUbicacion(ubicacion);
    console.log("entro a buscar ubicacion: ", ubicacion);
  };

  const onReload = (reset) => {
    if (reset) {
      console.log("reset: ", reset);
      setReload(!reload);
    }
  };

  return (
    <>
      <Ubicacion getLocation={obtenerUbicacion} />
      {ubicacion ? (
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ flex: 0.5 }}>
              <Videos />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Personas meditando ahora:{contador} </Text>
              <Map />
            </View>
          </ScrollView>
          {usuario && usuario.rol === "admin" && <FloatButton pantalla="V" />}
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: "blue" }}>
          {reload && <Ubicacion getLocation={obtenerUbicacion} />}
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <PermisosUbi getUbi={onReload} />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Meditar;
