//const apiKey = "AIzaSyAWSs96Vfv5skthhcwKiob9HKskRrxkco4";
//const playlistId = "et6qEl6rxlI";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import YouTube from 'react-native-youtube-iframe';
import axios from "axios";

const apiKey = "AIzaSyAWSs96Vfv5skthhcwKiob9HKskRrxkco4";
const videoId = "et6qEl6rxlI"; // Reemplaza esto con el ID de tu video de YouTube

const Videos = () => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
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
        console.error("Error al obtener información del video de YouTube:", error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {videoInfo ? (
        <View style={{ flex: 1 }}>
          <Text>{videoInfo.title}</Text>
          <YouTube
            videoId={videoId}
            height={200}
          />
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default Videos;