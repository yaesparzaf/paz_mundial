import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import { TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { db } from "../../fb/firebase-config";
import { ref, getStorage, deleteObject } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  deleteField,
  getDocs,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import AbrirGaleria from "./AbrirGaleria";
import SubirImagen from "../../fb/SubirImagen";
import getId from "../rules/reglas";
import { Alert } from "react-native";
import { addLeida } from "../../fb/DatosUsers";
import Icon from "react-native-vector-icons/FontAwesome";
import YTVideo from "../YTVideo.png";
import Agrega from "../Agrega.png";
import { FontAwesome } from "@expo/vector-icons"; // Importa el icono de FontAwesome

const Publicar = ({ docId, screen }) => {
  const { usuario } = contexUser();
  const [numEnt, setNumEnt] = useState();
  const [titulo, setTitulo] = React.useState();
  const [asunto, setAsunto] = useState("");
  const [text, onChangeText] = React.useState("");
  const [alignAsunto, setAlignAsunto] = useState("left");
  const [alignTexto, setAlignTexto] = useState("left");
  const [alignTexto2, setAlignTexto2] = useState("left");
  const [italica, setItalica] = useState(false);
  const [menuEdicion, setMenuEdicion] = useState(true);
  const [publicar, setPublicar] = useState(false);
  const [imagenUri, setImagenUri] = useState();
  const [imagenUri_prev, setImagenUri_prev] = useState();
  const [guardandoImagen, setGuardandoImagen] = useState(false);
  const navegacion = useNavigation();
  const [esImagen, setesImagen] = useState();
  const [esVideo, setesVideo] = useState();
  const [editar, setEditar] = useState(false);
  const [documentoId, setDocumentoId] = useState();
  const [texto2, setTexto2] = useState("");
  const [segundoInput, setSegundoInput] = useState(false);
  const [coleccion, setColeccion] = useState();
  const [nameNavigate, setNameNavigate] = useState();
  const [addVideo, setAddVideo] = useState(false);
  const [loading, setloading] = useState(false);
  const [nuevaVariable, setNuevaVariable] = useState(false);
  const [urlPreview, setUrlPreview] = useState(null);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const obtenerDatos = async () => {
      const datos = docId;
      const coleccionEffect = screen;
      setColeccion(screen);
      if (screen === "noticias") {
        setNameNavigate("Noticias");
      } else if (screen === "entrenamiento") {
        setNameNavigate("Entrenamiento");
      }
      if (datos) {
        setDocumentoId(datos);
        const documentoRef = collection(db, coleccionEffect);
        const docEdit = await getDoc(doc(documentoRef, datos));
        if (docEdit.exists()) {
          const datos_doc = docEdit.data();
          setTitulo(datos_doc.titulo);
          setAlignAsunto(datos_doc.align_asunto);
          setAlignTexto(datos_doc.align_texto);
          setAlignTexto2(datos_doc.align_texto2);
          setAsunto(datos_doc.asunto);
          onChangeText(datos_doc.texto);
          setTexto2(datos_doc.texto2);
          setImagenUri(datos_doc.imagen);
          setItalica(datos_doc.tipo_letra === "italic");
          setUrl(datos_doc.url);
          setEditar(!editar);
          if (datos_doc.texto2) {
            setSegundoInput(true);
          }
        } else {
          "no hay datos para mostrar " + documentoId;
        }
      }
    };
    obtenerDatos();
  }, [docId]);

  const eliminarImagen = () => {
    if (editar) {
      setImagenUri_prev(imagenUri);
    }
    setImagenUri(null);
    setPublicar(titulo && titulo.length > 0);
  };

  const keyboardHide = () => {
    setMenuEdicion(false);
  };

  const handlePreview = async () => {
    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=${url}&format=json`
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

  const getRespuesta = async (response) => {
    if (response) {
      if (editar) setImagenUri_prev(imagenUri);
      const { isImagen, uri } = response;
      setesImagen(isImagen);
      setImagenUri(uri);
      setPublicar(titulo && titulo.length > 0);
      if (isImagen) {
        agregarInput("image", uri);
      }
    }
  };

  const onSend = async (
    titulo,
    asunto,
    alignAsunto,
    alignTexto,
    alignTexto2,
    text,
    texto2,
    imagenUri,
    video_id
  ) => {
    try {
      let coleccionRef, bloqueado;
      if (coleccion === "entrenamiento") {
        const colecc = collection(db, coleccion);
        const isEmpty = await getDocs(colecc);
        if (isEmpty.empty) bloqueado = false;
        else bloqueado = true;

        coleccionRef = await addDoc(colecc, {
          titulo: titulo,
          asunto: asunto,
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          align_texto2: alignTexto2,
          autor: usuario.nombre,
          autor_id: usuario.id,
          bloqueado: bloqueado,
          fecha: serverTimestamp(),
          leida: false,
          tipo_letra: italica ? "italic" : "normal",
          texto: text,
          texto2: texto2,
          ...(video_id && video_id[0] !== undefined && { url: video_id[0] }),
          ...(video_id &&
            video_id[1] !== undefined && { video_id: video_id[1] }),
        });
        if (isEmpty.empty)
          await addLeida("entrenamientoVisto", coleccionRef.id, usuario.id);
      } else {
        coleccionRef = await addDoc(collection(db, coleccion), {
          titulo: titulo,
          asunto: asunto,
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          align_texto2: alignTexto2,
          autor: usuario.nombre,
          autor_id: usuario.id,
          fecha: serverTimestamp(),
          leida: false,
          tipo_letra: italica ? "italic" : "normal",
          texto: text,
          ...(texto2 !== undefined && { texto2: texto2 }),
          ...(video_id && video_id[0] !== undefined && { url: video_id[0] }),
          ...(video_id &&
            video_id[1] !== undefined && { video_id: video_id[1] }),
        });
      }

      if (coleccionRef) {
        if (imagenUri) {
          setGuardandoImagen(true);
          const imagenSubida = await SubirImagen(coleccionRef, imagenUri);
          if (imagenSubida) {
            setGuardandoImagen(false);
          }
          if (!imagenSubida) {
            await deleteDoc(coleccionRef);
          }
        }
      } else {
        console.error("Error al obtener la referencia del nuevo documento");
      }
      navegacion.navigate(nameNavigate, { screen: coleccion });
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  const onSendEdit = async (
    documentoId,
    new_titulo,
    new_asunto,
    alignAsunto,
    alignTexto,
    alignTexto2,
    new_texto,
    new_texto2,
    new_imagen,
    prev_imagen,
    video_id
  ) => {
    const documentoRef = doc(db, coleccion, documentoId);
    try {
      if (prev_imagen || new_imagen) {
        await updateDoc(documentoRef, {
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          align_texto2: alignTexto2,
          asunto: new_asunto,
          ...(new_imagen !== undefined && { imagen: new_imagen }),
          titulo: new_titulo,
          texto: new_texto,
          ...(texto2 !== undefined && { texto2: new_texto2 }),
          tipo_letra: italica ? "italic" : "normal",
          ...(video_id !== undefined && { url: video_id[0] }),
          ...(video_id !== undefined && { video_id: video_id[1] }),
        });
        setGuardandoImagen(true);
        const imagenSubida = await SubirImagen(documentoRef, new_imagen);
        if (imagenSubida) {
          setGuardandoImagen(false);
        }
      } else if (prev_imagen && !new_imagen) {
        await updateDoc(documentoRef, {
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          align_texto2: alignTexto2,
          asunto: new_asunto,
          imagen: deleteField(),
          titulo: new_titulo,
          texto: new_texto,
          texto2: new_texto2,
          tipo_letra: italica ? "italic" : "normal",
          ...(video_id !== undefined && { url: video_id[0] }),
          ...(video_id !== undefined && { video_id: video_id[1] }),
        });
        const storage = getStorage();
        const imagenRef = ref(storage, prev_imagen);
        try {
          await deleteObject(imagenRef);
        } catch (error) {
          console.error("ee", error);
        }
        //else if cuando no hay imagen previa pero si imagen nueva
      } else {
        await updateDoc(documentoRef, {
          align_asunto: alignAsunto,
          align_texto: alignTexto,
          align_texto2: alignTexto2,
          titulo: new_titulo,
          asunto: new_asunto,
          texto: new_texto,
          texto2: new_texto2,
          tipo_letra: italica ? "italic" : "normal",
          ...(video_id !== undefined && { url: video_id[0] }),
          ...(video_id !== undefined && { video_id: video_id[1] }),
        });
      }
      navegacion.navigate(nameNavigate, { screen: coleccion });
    } catch (error) {
      console.error("eerrrorrr", error);
    }
  };

  const MenuEdicion = (input, input2) => {
    if (input === "A") {
      return (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              setItalica(!italica);
            }}
          >
            <Feather name="italic" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              setAlignAsunto("left");
            }}
          >
            <Feather name="align-left" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              setAlignAsunto("center");
            }}
          >
            <Feather name="align-center" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              setAlignAsunto("right");
            }}
          >
            <Feather name="align-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      );
    } else if (input === "T") {
      return (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              input2 ? setAlignTexto2("left") : setAlignTexto("left");
            }}
          >
            <Feather name="align-left" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              input2 ? setAlignTexto2("center") : setAlignTexto("center");
            }}
          >
            <Feather name="align-center" size={20} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const agregarInput = () => {
    setSegundoInput(true);
  };

  const validarEnvio = () => {
    if (addVideo) {
      const video_id = getId(url);
      if (video_id !== null) {
        onSend(
          titulo,
          asunto,
          alignAsunto,
          alignTexto,
          alignTexto2,
          text,
          texto2,
          imagenUri,
          video_id
        );
      } else Alert.alert("URL no válida.");
    } else {
      const video_id = "";
      onSend(
        titulo,
        asunto,
        alignAsunto,
        alignTexto,
        alignTexto2,
        text,
        texto2,
        imagenUri,
        video_id
      );
    }
    setloading(true);
  };

  const validarEdicion = () => {
    if (addVideo) {
      const video_id = getId(url);
      if (video_id !== null) {
        onSendEdit(
          documentoId,
          titulo,
          asunto,
          alignAsunto,
          alignTexto,
          alignTexto2,
          text,
          texto2,
          imagenUri,
          imagenUri_prev,
          video_id
        );
      } else Alert.alert("URL no válida.");
    } else {
      onSendEdit(
        documentoId,
        titulo,
        asunto,
        alignAsunto,
        alignTexto,
        alignTexto2,
        text,
        texto2,
        imagenUri,
        imagenUri_prev
      );
    }
    setloading(true);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 15 }}
    >
      <ScrollView>
        <View style={styles.botones_cont}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AbrirGaleria respuesta={getRespuesta} />
            <TouchableOpacity
              onPress={() => {
                setAddVideo(true);
                setNuevaVariable(true);
                if (url && url !== "" && url !== undefined && url !== null) {
                  handlePreview();
                }
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={YTVideo}
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: "black",
                    marginHorizontal: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={agregarInput}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={Agrega}
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: "black",
                    marginHorizontal: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={editar ? validarEdicion : validarEnvio}
            style={{
              ...styles.publicar_btn,
              backgroundColor: publicar ? "#00adef" : "#cccccc",
            }}
            disabled={!publicar || guardandoImagen}
          >
            <Text
              style={{
                ...styles.text_botones,
                color: publicar ? "#ffffff" : "#D3D3D3",
              }}
            >
              {guardandoImagen ? "Publicando..." : "Publicar"}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            placeholder="Título"
            style={styles.titulo_asunto_input}
            value={titulo}
            onChangeText={(title) => {
              setTitulo(title);
              {
                numEnt
                  ? setPublicar(
                      numEnt && title && (imagenUri || title.length > 0)
                    )
                  : setPublicar(title && (imagenUri || title.length > 0));
              }
            }}
          />
          {menuEdicion && MenuEdicion("A")}
          <TextInput
            placeholder="Asunto (opcional)"
            style={[
              styles.titulo_asunto_input,
              {
                textAlign: alignAsunto,
                fontStyle: italica ? "italic" : "normal",
              },
            ]}
            value={asunto}
            onChangeText={(newAsunto) => {
              if (editar) {
                setPublicar(newAsunto && newAsunto.length > 0);
              }
              setAsunto(newAsunto);
            }}
          />
          {menuEdicion && MenuEdicion("T")}
          <TextInput
            placeholder="Escribe un texto..."
            style={[styles.texto_input, { textAlign: alignTexto }]}
            multiline={true}
            numberOfLines={4}
            value={text}
            onChangeText={(newText) => {
              if (editar) {
                setPublicar(newText && newText.length > 0);
              }
              onChangeText(newText);
            }}
          />
        </View>
        {imagenUri ? (
          <View style={styles.prev_cont}>
            {(esImagen || editar) && (
              <Image
                source={{ uri: imagenUri }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={styles.eliminarButton}
              onPress={eliminarImagen}
            >
              <FontAwesome5 name="times-circle" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        ) : null}

        <View>
          {menuEdicion && segundoInput && MenuEdicion("T", "T2")}
          {segundoInput && (
            <TextInput
              placeholder="Escribe un texto..."
              style={[styles.texto_input, { textAlign: alignTexto2 }]}
              multiline={true}
              numberOfLines={4}
              value={texto2}
              onChangeText={(newTexto2) => {
                if (editar) {
                  setPublicar(newTexto2 && newTexto2.length > 0);
                }
                setTexto2(newTexto2);
              }}
            />
          )}
          {addVideo && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={nuevaVariable}
              onRequestClose={() => setNuevaVariable(false)}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    margin: 10,
                    borderRadius: 10,
                    width: "90%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <FontAwesome
                      name="youtube"
                      size={50}
                      color="red"
                      style={{ marginRight: 10 }}
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Agrega video
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Ingrese URL del video"
                    value={url}
                    onChangeText={setUrl}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#ef0000",
                      marginBottom: 5,
                    }}
                  />
                  {urlPreview && (
                    <Image
                      source={{ uri: urlPreview }}
                      style={{
                        alignSelf: "center",
                        width: "100%",
                        height: 150,
                        margin: 20,
                        borderRadius: 10,
                      }}
                    />
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "red",
                        borderRadius: 5,
                        padding: 10,
                        width: "48%", // Ajusta el ancho según sea necesario
                      }}
                      onPress={() => {
                        handlePreview();
                        setNuevaVariable(false); // Aquí se actualiza la nueva variable al cerrar el modal
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        Aceptar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#eeeeee",
                        borderRadius: 5,
                        padding: 10,
                        width: "48%",
                      }}
                      onPress={() => setNuevaVariable(false)} // Aquí se actualiza la nueva variable al cerrar el modal
                    >
                      <Text
                        style={{
                          color: "#000",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        Cancelar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00adef" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto_input: {
    textAlignVertical: "top",
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  botones_cont: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 5,
  },
  menu_edicion: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  align_Text: {
    marginRight: 5,
  },
  up_fv: {
    alignItems: "center",
    flexDirection: "row",
  },

  titulo_asunto_input: {
    //backgroundColor: '#FEA',
    height: 50,
    fontSize: 16,
  },
  prev_cont: {
    backgroundColor: "#ffffff",
    height: 300,
    position: "relative",
  },
  eliminarButton: {
    width: 25,
    height: 25,
    backgroundColor: "rgba(255,255,255,0.5)", // Ajusta el color y la opacidad según tu diseño
    position: "absolute",
    top: 5,
    right: 5,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  image: {
    backgroundColor: "#ffffff",
    flex: 1,
    width: null,
    height: null,
  },
  publicar_btn: {
    width: "25%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  text_botones: {
    fontSize: 15,
    fontWeight: "700",
    justifyContent: "space-between",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Publicar;
