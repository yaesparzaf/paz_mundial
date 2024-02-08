import { View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import VideoYT from "./VideoYT";
import { useUser } from "../../fb/DatosUsers";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import RemoveCache from "../cache/RemoveCache";
import GetAlls from "../cache/GetAlls";
//import OnMeditar from "../../fb/OnMeditar";

const Videos = () => {
  const { usuario } = useUser();
  const [loading, setLoading] = useState(true);
  const [videosId, setVideosId] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const coleccionRef = collection(db, "meditar");
        const coleccionDocs = await getDocs(coleccionRef);
        if (!coleccionDocs.empty) {
          const datosVideos = coleccionDocs.docs.map((documento) => documento.data());
          setVideosId(datosVideos);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  const eliminarCache = async () => {
    console.log("esto se envia: ", videosId[0]);
    await RemoveCache({ key: String(videosId[0].video_id) });
  };
  const mostrarCache = async () => {
    await GetAlls();
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#40E0D0"
          style={{ flex: 1, alignItems: "center" }}
        />
      ) : (
        usuario && (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <VideoYT video={videosId[0]}/>
            <VideoYT video={videosId[1]}/>
            <TouchableOpacity onPress={() => eliminarCache()}>
              <Text>Eliminar cache</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => mostrarCache()}>
              <Text>Mostrar cache</Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </View>
  );
};

export default Videos;
