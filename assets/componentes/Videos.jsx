import { View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Ubicacion from "../componentes/Ubicacion";
import VideoYT from "./VideoYT";
import FloatButton from "./FloatButton";
import { useUser } from "../../fb/DatosUsers";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fb/firebase-config";

export const getVideos = async () => {
    const coleccionRef = collection(db, "meditar");
    const coleccionDocs = await getDocs(coleccionRef);
    if (!coleccionDocs.empty){
        console.log('entro al if')
        const datosVideos = coleccionDocs.docs.map(doc => doc.data());
      return datosVideos;
    }else{
        console.log('entro al else')
        return [];
    }
  };

const Videos = () => {
  const { usuario } = useUser();
  const [ubicacion, setUbicacion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    getVideos();
  },[]);

  const obtenerUbicacion = async (ubicacion) => {
    setUbicacion(ubicacion);
    if (ubicacion) setLoading(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <Ubicacion getLocation={obtenerUbicacion} />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#40E0D0"
          style={{ flex: 1, alignItems: "center" }}
        />
      ) : (
        ubicacion && (
          <View style={{ flex: 1 }}>
            <VideoYT />
            {usuario && usuario.rol === "admin" && <FloatButton pantalla="V" />}
          </View>
        )
      )}
    </View>
  );
};

export default Videos;
