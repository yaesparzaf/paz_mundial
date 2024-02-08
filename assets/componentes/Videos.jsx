import { View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import VideoYT from "./VideoYT";
import { useUser } from "../../fb/DatosUsers";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import RemoveCache from "../cache/RemoveCache";
import GetAlls from "../cache/GetAlls";
//import OnMeditar from "../../fb/OnMeditar";

const Videos = ({CambioCont}) => {
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
        CambioCont(isMeditar);
        console.log("se actualizaron los datos");
     // }
    } catch (error) {
      console.error("hubo un error en: ", error);
    }
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
            <VideoYT video={videosId[0]} meditar={false}/>
            <VideoYT
              video={videosId[1]}
              meditar={true}
              setMeditar={OnMeditar}
            />
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
