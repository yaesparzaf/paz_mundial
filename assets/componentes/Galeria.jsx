import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

const Galeria = () => {
  const [imageUri, setImageUri] = useState(null);

  const abrirGaleria = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        console.log("Permiso denegado para acceder a la galería");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset =
          result.assets && result.assets.length > 0 ? result.assets[0] : null;
        setImageUri(selectedAsset ? selectedAsset.uri : null);
      }
    } catch (error) {
      console.error("Error al abrir la galería: ", error);
    }
  };

  return (
    <View style={styles.container1}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.up_fv} onPress={abrirGaleria}>
          <FontAwesome5 name="photo-video" size={24} color="black" />
          <Text style={styles.buttonText}>Foto/Video</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  content: {
    alignItems: "flex-start",
  },
  up_fv: {
    width: "35%",
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginHorizontal: 20,
  },
  buttonText: {
    marginLeft: 5,
  },
});

export default Galeria;
