import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import Publicar from "../componentes/Publicar";

const NuevoEntrenamiento = ({ route }) => {
  const [noticiaID, setNoticiaID] = useState();
  const [loading, setLoading] = useState(true);
  const [ventana, setVentana] = useState();

  useEffect(() => {
    if (route) {
      const { params } = route;
      const { noticiaId, screen } = params;
      setNoticiaID(noticiaId);
      setVentana(screen);
      setLoading(false);
    }
  }, []);
  if (loading) {
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Cargando...</Text>
    </SafeAreaView>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {noticiaID && ventana ? (
        <Publicar docId={noticiaID} screen={ventana} />
      ) : (
        ventana && <Publicar screen={ventana} />
      )}
    </SafeAreaView>
  );
};

export default NuevoEntrenamiento;
