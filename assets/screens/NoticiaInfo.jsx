import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DesbloquearEntrenamiento from "../../fb/DesbloquearEntrenamiento";
import VideoYT from "../componentes/VideoYT";
import { FontAwesome5 } from "@expo/vector-icons";

const NoticiaInfo = ({ route }) => {
  const { params } = route;
  const { resultado } = route.params;
  const {
    align_asunto,
    align_texto,
    asunto,
    autor,
    fecha,
    id,
    imagen,
    texto,
    texto2,
    tipo_letra,
    titulo,
    video_id,
  } = params?.info || {};
  const screen = params?.screen;
  const usuario_id = params.usuario_id;
  const navegacion = useNavigation();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [desbloqueado, setDesbloqueado] = useState(false);
  const [urlPreview, setUrlPreview] = useState(null);
  const handleOpenModal = () => {
    setShowVideoModal(true);
  };

  const handleCloseModal = () => {
    setShowVideoModal(false);
  };

  const aDesbloquear = async () => {
    const datos = { fecha, id };
    const existe = await DesbloquearEntrenamiento({
      usuario_id: usuario_id,
      screen: screen,
      datos: { datos },
    });
    navegacion.reset({
      routes: [{ name: "Entrenamiento" }],
    });
    setDesbloqueado(true);
    setModalVisible(true);
  };

  useEffect(() => {
    if (
      video_id &&
      video_id !== "" &&
      video_id !== undefined &&
      video_id !== null
    ) {
      const handlePreview = async () => {
        try {
          const response = await fetch(
            `https://www.youtube.com/oembed?url=https://youtu.be/${video_id}&format=json`
          );
          if (!response.ok) {
            throw new Error("Error al obtener la previsualización del video");
          }
          const data = await response.json();
          const previewUrl = data.thumbnail_url;
          setUrlPreview(previewUrl);
        } catch (error) {
          console.error("Error:", error.message);
        }
      };

      handlePreview();
    }
  }, [video_id]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <View style={styles.postContainer}>
              <View style={styles.header}>
                <Text style={styles.author}>{autor}</Text>
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
                {imagen && (
                  <Image source={{ uri: imagen }} style={styles.image} />
                )}
                <Text
                  style={[
                    styles.text,
                    { textAlign: align_texto, fontStyle: tipo_letra },
                  ]}
                >
                  {texto2}
                </Text>
                {video_id && (
                  <View>
                    <View style={{ marginVertical: 10 }}>
                      <TouchableOpacity onPress={handleOpenModal}>
                        <Image
                          source={{ uri: urlPreview }}
                          style={{
                            width: "100%",
                            height: 180,
                            borderRadius: 20,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={handleOpenModal}
                        style={{
                          position: "absolute",
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: 180,
                          top: 0,
                          right: 0,
                          backgroundColor: "#00000030",
                          padding: 20,
                          borderRadius: 20,
                        }}
                      >
                        <FontAwesome5 name="play" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>

                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showVideoModal}
                      onRequestClose={handleCloseModal}
                    >
                      <View style={styles.modalContainer2}>
                        <TouchableOpacity
                          style={styles.background}
                          onPress={handleCloseModal}
                        />
                        <View style={styles.videoContainer}>
                          <VideoYT video={video_id} esPublicacion={true} />
                          <TouchableOpacity onPress={handleCloseModal}>
                            <Text style={styles.cerrarModal2}>
                              Cerrar Video
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                )}
                <Text style={styles.date}>
                  {fecha &&
                    fecha.toDate().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                  · {fecha && fecha.toDate().toLocaleDateString()}
                </Text>
              </View>
            </View>
            {desbloqueado && (
              <View style={styles.visto_btn}>
                <MaterialIcons name="lock-open" size={20} color="black" />
                <Text style={styles.text_btn}> Desbloqueado</Text>
              </View>
            )}
            {screen === "entrenamiento" && !desbloqueado && (
              <TouchableOpacity
                style={styles.visto_btn}
                onPress={aDesbloquear}
                disabled={desbloqueado}
              >
                <MaterialIcons name="lock" size={20} color="#000000" />
                <Text style={styles.text_btn}>
                  Desbloquea la siguiente clase
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTexto}>
              ¡Ya puedes ver la siguiente publicación!
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cerrarModal}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    fontSize: 18,
    fontWeight: "900",
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  subject: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontWeight: "300",
    fontSize: 14,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  visto_btn: {
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#dfdfdf",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
  },
  text_btn: {
    color: "#0e0d0d",
    fontWeight: "700",
  },
  visto_btn2: {
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#aaaaaa",
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
  },
  text_btn2: {
    color: "#525252",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 10,
  },
  modalTexto: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "300",
  },
  cerrarModal: {
    color: "#00adef",
    textAlign: "center",
    marginTop: 10,
    padding: 10,
    fontWeight: "600",
  },
  modalContainer2: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.397)",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  videoContainer: {
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  cerrarModal2: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#ffffff",
    width: 300,
    padding: 10,
    borderRadius: 20,
  },
  abrirModal: {
    color: "#ffffff",
    fontWeight: "900",
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 20,
    marginVertical: 20,
  },
});

export default NoticiaInfo;
