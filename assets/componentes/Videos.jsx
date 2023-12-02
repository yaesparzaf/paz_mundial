// API KEY YT AIzaSyAWSs96Vfv5skthhcwKiob9HKskRrxkco4
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import YouTube from 'react-native-youtube';
import axios from "axios";

const apiKey = "AIzaSyAWSs96Vfv5skthhcwKiob9HKskRrxkco4";
const playlistId = "et6qEl6rxlI";

  
const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
  
    useEffect(() => {
      axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=10&q=${playlistId}`)
        .then((response) => {
          setVideos(response.data.items);
        })
        .catch((error) => {
          console.error('Error al obtener videos de YouTube:', error);
        });
    }, []);
  
    const playVideo = (videoId) => {
        setSelectedVideo(videoId);
      };
  
      return (
        <View>
          {selectedVideo ? (
            <YouTube
              videoId={selectedVideo}
              play={true}
              style={{ alignSelf: 'stretch', height: 300 }}
            />
          ) : (
            <View style={{ height: 100, width: 300 }}>
              {videos.map((video) => (
                <View key={video.id.videoId}>
                  <Text //onPress={() => playVideo(video.id.videoId)}
                  >{video.snippet.title}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      );
  };
  
  export default Videos;
