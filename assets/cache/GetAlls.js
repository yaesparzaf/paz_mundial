import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetAlls = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const datos = await AsyncStorage.multiGet(keys);
  } catch (error) {
    console.error("error al obtener datos de la cache");
  }
};

export default GetAlls;
