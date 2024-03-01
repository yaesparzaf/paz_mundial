import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const SocialBotones = (nombre) => {
  const openFacebook = async () => {
    const AppFbUrl = "fb://page/1231272500288305";
    const WebFbUrl = "https://www.facebook.com/1231272500288305";

    try {
      const isSupported = await Linking.canOpenURL(AppFbUrl);
      if (isSupported) {
        await Linking.openURL(AppFbUrl);
      } else {
        await Linking.openURL(WebFbUrl);
      }
    } catch (error) {}
  };
  const openYouTube = () => {
    // Lógica para abrir YouTube
  };

  const openInstagram = () => {
    // Lógica para abrir Instagram
  };

  return (
    <View style={{ alignItems: "center", margin: 10 }}>
      <Text style={styles.titulo}>
        ¡Encuentranos en nuestras redes sociales!
      </Text>
      <View style={styles.cont_botones}>
        <TouchableOpacity style={styles.fb_boton} onPress={openFacebook}>
          <Entypo name="facebook" size={30} color="#ffffff" />
          <Text style={styles.texto}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.yt_boton} onPress={openYouTube}>
          <Entypo name="youtube" size={30} color="#ffffff" />
          <Text style={styles.texto}>YouTube</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ig_boton} onPress={openInstagram}>
          <Entypo name="instagram" size={30} color="#ffffff" />
          <Text style={styles.texto}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  cont_botones: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    height: "auto",
    justifyContent: "space-around",
    // backgroundColor:'yellow'
  },
  fb_boton: {
    width: "30%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  yt_boton: {
    width: "30%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  ig_boton: {
    width: "30%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    fontSize: 12, // Tamaño de la fuente
    color: "#ffffff", // Color del texto
    marginTop: 5, // Espacio superior
    textAlign: "center", // Alineación centrada
  },
});

export default SocialBotones;
