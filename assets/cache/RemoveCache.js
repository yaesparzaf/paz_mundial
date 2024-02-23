import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RemoveCache = async ({ key }) => {
  if (key !== null) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("no se pudo eliminar de cache");
    }
  }
};

export default RemoveCache;
