import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
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
        console.log("entro al if de prev_imagen && new_imagen");
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
        console.log("_______________");
        console.log("esto tiene imagenURI: ", imagenUri);
        const imagenSubida = await SubirImagen(documentoRef, new_imagen);
        console.log("respuesta: ", imagenSubida);
        if (imagenSubida) {
          setGuardandoImagen(false);
        }
      } else if (prev_imagen && !new_imagen) {
        console.log("entro al else  de  prev_imagen && !new_imagen");
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
        console.log("entro al else 207");
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
            <Feather name="italic" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              setAlignAsunto("left");
            }}
          >
            <Feather name="align-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              setAlignAsunto("center");
            }}
          >
            <Feather name="align-center" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              setAlignAsunto("right");
            }}
          >
            <Feather name="align-right" size={24} color="black" />
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
            <Feather name="align-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.align_Text}
            onPress={() => {
              input2 ? setAlignTexto2("center") : setAlignTexto("center");
            }}
          >
            <Feather name="align-center" size={24} color="black" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  //   const agregarTexto = (index, value) => {
  //     const nuevoTexto = [...textos];
  //     nuevoTexto[index] = value;
  //     setTextos(nuevoTexto);
  //   };

  const agregarInput = () => {
    setSegundoInput(true);
  };

  const validarEnvio = () => {
    console.log("en validar envio");
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
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={styles.botones_cont}>
          <AbrirGaleria respuesta={getRespuesta} />
          <TouchableOpacity onPress={agregarInput}>
            <Text
              style={{
                padding: 10,
                backgroundColor: "#00adef",
                borderRadius: 10,
              }}
            >
              Añadir texto
            </Text>
          </TouchableOpacity>
          {/* boton para agregar video -------------*/}
          <TouchableOpacity onPress={() => setAddVideo(true)}>
            <Text>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={editar ? validarEdicion : validarEnvio}
            style={{
              ...styles.publicar_btn,
              backgroundColor: publicar ? "#00FFFF" : "#A9A9A9",
            }}
            disabled={!publicar || guardandoImagen}
          >
            <Text
              style={{
                ...styles.text_botones,
                color: publicar ? "#000000" : "#D3D3D3",
              }}
            >
              {guardandoImagen ? "Publicando..." : "Publicar"}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* {coleccion === "entrenamiento" && (
            <TextInput
              placeholder="Num. entrenamiento"
              keyboardType="numeric"
              maxLength={3}
              value={numEnt}
              style={styles.texto_input}
              onChangeText={(numero) => {
                setNumEnt(numero);
                setPublicar(
                  numero && titulo && (imagenUri || titulo.length > 0)
                );
              }}
            />
          )} */}
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
        <View style={styles.prev_cont}>
          {imagenUri ? (
            <View style={styles.prev_cont}>
              <TouchableOpacity
                style={styles.eliminarButton}
                onPress={eliminarImagen}
              >
                <FontAwesome5 name="times-circle" size={25} color="#000" />
              </TouchableOpacity>
              {(esImagen || editar) && (
                <Image source={{ uri: imagenUri }} style={styles.image} />
              )}
              {esVideo && (
                <Video
                  source={{ uri: imagenUri }}
                  style={styles.video}
                  controls={true}
                  resizeMode="cover"
                />
              )}
            </View>
          ) : null}
        </View>
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
            <TextInput
              placeholder="Ingrese url del video"
              value={url}
              onChangeText={setUrl}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto_input: {
    textAlignVertical: "top",
    fontSize: 20,
    //backgroundColor: 'red'
  },
  botones_cont: {
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-between",
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
  prev_cont: {
    marginTop: 20,
    backgroundColor: "white",
  },
  imagen_prev: {
    alignItems: "center",
    //backgroundColor: 'green'
  },
  titulo_asunto_input: {
    //backgroundColor: '#FEA',
    height: 50,
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  publicar_btn: {
    width: "30%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  eliminarButton: {
    alignItems: "flex-end",
    //position: 'absolute',
    width: 25,
    flexDirection: "row-reverse",
    right: 0,
    backgroundColor: "#D3D3D3",
  },
  text_botones: {
    fontSize: 18,
    color: "#00000",
  },
});

export default Publicar;
