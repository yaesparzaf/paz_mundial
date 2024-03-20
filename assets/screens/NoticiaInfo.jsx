import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DesbloquearEntrenamiento from "../../fb/DesbloquearEntrenamiento";
import VideoYT from "../componentes/VideoYT";
import { useNavigation } from "@react-navigation/native";

const NoticiaInfo = ({ route }) => {
  const { params } = route;
  const {
    align_asunto,
    align_texto,
    asunto,
    autor,
    fecha,
    id,
    imagen,
    texto,
    tipo_letra,
    titulo,
    video_id,
  } = params?.info || {};
  const screen = params?.screen;
  const usuario_id = params.usuario_id;
  const formato_fecha = fecha.toDate().toLocaleDateString();
  const navegacion = useNavigation();
  const aDesbloquear = async () => {
    const datos = { fecha, id };
    await DesbloquearEntrenamiento({
      usuario_id: usuario_id,
      screen: screen,
      datos: { datos },
    });

    navegacion.reset({
      routes: [{ name: "Entrenamiento" }],
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.header}>
            <Text style={styles.author}>{autor}</Text>
            <Text style={styles.date}>{fecha && formato_fecha}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{titulo}</Text>
            <Text
              style={[
                styles.subject,
                { textAlign: align_asunto, fontStyle: tipo_letra },
              ]}
            >
              {asunto}
            </Text>
            <Text
              style={[
                styles.text,
                { textAlign: align_texto, fontStyle: tipo_letra },
              ]}
            >
              {texto}
            </Text>
            {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
          </View>
          {video_id && <VideoYT video={video_id} esPublicacion={true} />}
          {screen === "entrenamiento" && (
            <TouchableOpacity style={styles.visto_btn} onPress={aDesbloquear}>
              <Text>Visto</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subject: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  visto_btn: {
    alignItems: "center",
    backgroundColor: "green",
    width: "20%",
  },
});

export default NoticiaInfo;
