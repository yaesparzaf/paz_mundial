import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import CrearEntrenamiento from "../componentes/CrearEntrenamiento";

const NuevoEntrenamiento = ({ route }) => {
  const [noticiaID, setNoticiaID] = useState();
  const [loading, setLoading] = useState(true);
  console.log("route ", route);

  useEffect(() => {
    if (route) {
      const { params } = route;
      const { noticiaId } = params;
      setNoticiaID(noticiaId);
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
      {console.log("NoticiaID: ", noticiaID)}
      {noticiaID ? (
        <CrearEntrenamiento docId={noticiaID} />
      ) : (
        <CrearEntrenamiento />
      )}
    </SafeAreaView>
  );
};

export default NuevoEntrenamiento;
