import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import foto from "../foto.png";

const AbrirGaleria = ({ respuesta }) => {
  const [esImagen, setesImagen] = useState();
  const [imageUri, setImagenUri] = useState();
  const [resultados, setResultados] = useState();

  const onOpenGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        ("Permiso denegado para acceder a la galería");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.6,
      });

      if (!result.canceled) {
        const selectedAsset =
          result.assets && result.assets.length > 0 ? result.assets[0] : null;
        const isImagen = selectedAsset?.type.startsWith("image");
        const uri = selectedAsset ? selectedAsset.uri : null;
        respuesta({ isImagen, uri });
      }
    } catch (error) {
      console.error("Error al abrir la galería: ", error);
    }
  };

  return (
    <TouchableOpacity style={styles.up_fv} onPress={onOpenGallery}>
      <Image
        source={foto}
        style={{
          width: 25,
          height: 25,
          tintColor: "black",
          marginHorizontal: 10,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  up_fv: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: "40",
  },
});

export default AbrirGaleria;
