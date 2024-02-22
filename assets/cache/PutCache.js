import AsyncStorage from "@react-native-async-storage/async-storage";

const PutCache = async ({ key, datos }) => {
  try {
    if (key !== null) {
      await AsyncStorage.setItem(key, JSON.stringify(datos));
    }
  } catch (error) {
    console.error("hubo un error al almacenar: ", error);
  }
};

export default PutCache;
