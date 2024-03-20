import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import YouTube from "react-native-youtube-iframe";
import axios from "axios";
import { yt } from "../../fb/firebase-config";
import PutCache from "../cache/PutCache";
import GetCache from "../cache/GetCache";

const VideoYT = React.memo(({ video, esPublicacion }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [videoId, setVideoId] = useState(video);
  //const {cacheVideo, videoACache, setCacheVideo} = useVideoContext();
  //const [precargaVideo, setPrecargaVideo] = useState({});

  useEffect(() => {
    const getVideo = async () => {
      if (videoId && videoId !== "") {
        const videoEnCache = await GetCache({ key: String(videoId) });
        if (videoEnCache) {
          setVideoInfo(videoEnCache);
        } else {
          try {
            const response = await axios.get(
              `https://www.googleapis.com/youtube/v3/videos?key=${yt}&part=snippet&id=${videoId}`
            );
            if (response.data.items.length > 0) {
              const newInfo = {
                tittle: response.data.items[0].snippet.title,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                categoryId: response.data.items[0].snippet.categoryId,
              };
              setVideoInfo(newInfo);
              if (!esPublicacion)
                PutCache({ key: String(videoId), datos: newInfo });
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
  }, [videoId]);

  return (
    <View>
      {videoInfo ? (
        <View
          style={{
            marginTop: 10,
            alignSelf: "center",
            justifyContent: "center",
            resizeMode: "center",
          }}
        >
          <YouTube
            videoId={videoId}
            height={250}
            width={400}
            initialPlayerParams={{
              controls: 0,
            }}
          />
          <TouchableOpacity
            style={{ position: "absolute", top: 0, width: "100%", height: 55 }}
          />
        </View>
      ) : null}
    </View>
  );
});

export default VideoYT;
