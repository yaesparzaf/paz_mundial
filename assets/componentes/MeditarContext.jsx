import { View, Text } from "react-native";
import React, { createContext, useContext, useState } from "react";

const videosContext = createContext({});

export const MeditarContext = ({ children }) => {
  const [cacheVideo, setCacheVideo] = useState({});
  const videoACache = (videoId, videoInfo) => {
    setCacheVideo((prevCache) => ({
      ...prevCache,
      [videoId]: videoInfo,
    }));
  };
  return (
    <videosContext.Provider value={{ cacheVideo, videoACache,setCacheVideo }}>
      {children}
    </videosContext.Provider>
  );
};

export const useVideoContext = () =>{
    return useContext(videosContext);
};

