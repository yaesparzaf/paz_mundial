import { View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import VideoYT from "./VideoYT";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import RemoveCache from "../cache/RemoveCache";
import GetAlls from "../cache/GetAlls";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { Skeleton } from "moti/skeleton";

const Videos = () => {
  const { usuario } = contexUser();
  const [loading, setLoading] = useState(true);
  const [videosId, setVideosId] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const coleccionRef = collection(db, "meditar");
        const coleccionDocs = await getDocs(coleccionRef);
        if (!coleccionDocs.empty) {
          const datosVideos = coleccionDocs.docs.map((documento) =>
            documento.data()
          );
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
    await RemoveCache({ key: String(videosId[0].video_id) });
  };
  const mostrarCache = async () => {
    await GetAlls();
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 25,
            }}
          >
            <Skeleton width={"95%"} height={212} colorMode="ligth" />
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              marginTop: 25,
              marginBottom: 25,
            }}
          >
            <Skeleton width={"95%"} height={212} colorMode="ligth" />
          </View>
        </View>
      ) : (
        usuario && (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              height: 500,
              backgroundColor: "#F7FFFE",
            }}
          >
            <VideoYT video={videosId[0]} />
            <VideoYT video={videosId[1]} />
          </View>
        )
      )}
    </View>
  );
};

export default Videos;
