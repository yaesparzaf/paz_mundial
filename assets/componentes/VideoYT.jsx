import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import YouTube from "react-native-youtube-iframe";
import axios from "axios";
import { useVideoContext } from "./MeditarContext";
import { yt } from "../../fb/firebase-config";

const VideoYT = React.memo(({ video }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [videoId, setVideoId] = useState(video.video_id);
  const {cacheVideo, videoACache, setCacheVideo} = useVideoContext();
  const [precargaVideo, setPrecargaVideo] = useState({});

  useEffect(() => {
    const getVideo = async () => {
      if (videoId !== "") {
        const cacheInfo = cacheVideo[videoId];
        const precargaInfo = precargaVideo[videoId];
        //console.log("Esto se recibió de la caché:", cacheInfo);
        if (cacheInfo) {
          //console.log("Esto se recibió de la caché:", cacheInfo);
        } else if (precargaInfo) {
          setVideoInfo(precargaInfo);
        } else {
          try {
            console.log('entro al try')
            const response = await axios.get(
              `https://www.googleapis.com/youtube/v3/videos?key=${yt}&part=snippet&id=${videoId}`
            );
            if (response.data.items.length > 0) {
              const newInfo = response.data.items[0].snippet;
              setVideoInfo((prevInfo) =>
                prevInfo !== newInfo ? newInfo : prevInfo
              );
              setCacheVideo((prevCache) => ({
                ...prevCache,
                [videoId]: newInfo,
              }));
            } else {
              console.error("No se encontró información del video.");
            }
          } catch (error) {
            console.error(
              "Error al obtener información del video de YouTube:",
              error
            );
          }
        }
      }
    };
    getVideo();
  }, [videoId,cacheVideo,setCacheVideo,precargaVideo]);
  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      {videoInfo ? (
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            width: "95%",
            resizeMode: "contain",
          }}
        >
          <YouTube
            videoId={videoId}
            height={270}
            initialPlayerParams={{
              controls: 0,
            }}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: 0, width: "100%", height: 55 }}
          />
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
});

export default VideoYT;