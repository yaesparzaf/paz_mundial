import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import YouTube from "react-native-youtube-iframe";
import axios from "axios";

const apiKey = "AIzaSyAWSs96Vfv5skthhcwKiob9HKskRrxkco4";
const videoId = "JILf4X6khcs";

const Videos = React.memo((props) => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet&id=${videoId}`
        )
        .then((response) => {
          if (response.data.items.length > 0) {
            setVideoInfo(response.data.items[0].snippet);
          } else {
            console.error("No se encontró información del video.");
          }
        })
        .catch((error) => {
          console.error(
            "Error al obtener información del video de YouTube:",
            error
          );
        });
    };
    getVideo();
  }, []);

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
          {/*<Text>{videoInfo.title}</Text>*/}
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

export default Videos;
