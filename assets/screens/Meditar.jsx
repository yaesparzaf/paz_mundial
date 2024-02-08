import {
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import { useUser } from "../../fb/DatosUsers";
import FloatButton from "../componentes/FloatButton";
import Videos, { notLoading } from "../componentes/Videos";
import Ubicacion from "../componentes/Ubicacion";
import Map from "../componentes/Map";
import PermisosUbi from "./PermisosUbi";
import Contador from "../../fb/Contador";
import { useFocusEffect } from "@react-navigation/native";

const Meditar = () => {
  const { usuario } = useUser();
  const [ubicacion, setUbicacion] = useState(null);
  const [reload, setReload] = useState(false);
  const [contador, setContador] = useState();

  useFocusEffect(
    React.useCallback(() => {
     
      const OnMeditar = async (isMeditar) => {
        const usuario_id = usuario.id;
        console.log("id: ", usuario_id);
        console.log("recibe: ", isMeditar);
        try {
          const coleccionRef = collection(db, "meditando");
          const docRef = doc(coleccionRef,usuario_id);
          const docEdit = await getDoc(docRef);
          //if (doc.exist()) {
            await updateDoc(docRef, {
              meditando: isMeditar,
            });
            await obtContador();
            console.log("se actualizaron los datos");
         // }
        } catch (error) {
          console.error("hubo un error en: ", error);
        }
      };
      OnMeditar(true);
      console.log("enfoque en pantalla");
      console.log("Perosnas meditando: ",contador);
      return () => {
        OnMeditar(false);
        console.log("se cambio de pantalla.Perosnas meditando: ",contador);

      };
    }, [contador])
  );

  const obtenerUbicacion = async (ubicacion) => {
    setUbicacion(ubicacion);
    console.log("entro a buscar ubicacion: ", ubicacion);
  };

  const obtContador = async () => {
    const total_usuarios = await Contador();
    setContador(total_usuarios);
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
            <View style={{ flex: 0.5, backgroundColor: "red" }}>
              <Videos />
            </View>
            <View>
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
