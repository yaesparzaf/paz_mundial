import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import OpcionesUD from "./OpcionesUD";
import { Skeleton } from "moti/skeleton";
import publicaciones from "../styles/publicacionesStyles";

const Publicaciones = ({ datos_usuario, screen }) => {
  //const { usuario } = contexUser();
  const usuario = datos_usuario;
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [noticiaLeida, setNoticiaLeida] = useState();

  useEffect(() => {
    if (usuario && screen) {
      console.log("screen: ", screen);
      const q = query(collection(db, screen));
      const subscripcion = onSnapshot(q, (snapshot) => {
        const newPublicacion = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        newPublicacion.sort((a, b) => b.fecha - a.fecha);
        setPublicaciones(newPublicacion);
        setLoading(false);
      });
      return () => {
        subscripcion();
      };
    } else {
      setLoading(false);
    }
  }, [usuario]);

  if (loading) {
    const skeletonViews = [];
    for (let i = 0; i < 7; i++) {
      skeletonViews.push(
        <View
          key={i}
          style={{
            alignItems: "center",
            flexDirection: "column",
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          <Skeleton width={"150%"} height={90} colorMode="light" />
        </View>
      );
    }

    return <View>{skeletonViews}</View>;
  }

  return (
    <FlatList
      data={publicaciones}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Info
          item={item}
          rol={usuario ? usuario.rol : ""}
          usuario_id={usuario ? usuario.id : ""}
          screen={screen}
        />
      )}
    />
  );
};

const Info = ({ item, rol, usuario_id, screen }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [nueva, setNueva] = useState();
  const navegacion = useNavigation();
  const fecha = item.fecha ? item.fecha.toDate() : null;
  let coleccion;
  if (screen === "noticias") {
    coleccion = "noticiasLeidas";
  } else if (screen === "entrenamiento") {
    coleccion = "entrenamientoVisto";
  }
  useEffect(() => {
    const NuevaNoticia = async () => {
      try {
        const coleccionRef = collection(db, "usuarios", usuario_id, coleccion);
        const datosColeccion = await getDocs(coleccionRef);
        const vacia = datosColeccion.empty;
        if (vacia) setNueva(vacia);
        const noticia_leida = datosColeccion.docs.some(
          (doc) => doc.data().noticia_id === item.id
        );
        setNueva(!noticia_leida);
      } catch (error) {}
    };
    NuevaNoticia();
  }, [usuario_id, item.id]);

  const addLeida = async (noticia_id) => {
    // const coleccionRef = await getDocs(
    //   collection(db, "usuarios", usuario_id, coleccion)
    // );
    setNueva(false);
    const noticiaRef = doc(db, "usuarios", usuario_id, coleccion, noticia_id);
    await setDoc(noticiaRef, {
      noticia_id: noticia_id,
      leida: true,
    });
  };

  const FormatoFecha = (fecha) => {
    if (!fecha) return "";
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return fecha.toLocaleDateString(undefined, options);
  };
  const pressButton = (info) => {
    //if(nueva)
    //setNueva(true);
    addLeida(info.id);
    navegacion.navigate("NoticiaInfo", { info });
  };
  const toggleOpciones = () => {
    setMostrarOpciones(!mostrarOpciones);
  };
  return (
    usuario_id && (
      <View style={publicaciones.publicacionContainer}>
        <View style={publicaciones.encabezado}>
          <Text style={publicaciones.autorTexto}>{item.autor}</Text>
          {fecha !== null && (
            <Text style={publicaciones.fechaTexto}>{FormatoFecha(fecha)}</Text>
          )}
          {nueva && (
            <MaterialIcons name="fiber-new" size={24} color="#00ADEF" />
          )}
          <View style={publicaciones.menu_publicacion}>
            {rol === "admin" && usuario_id == item.autor_id && (
              <TouchableOpacity activeOpacity={1.0} onPress={toggleOpciones}>
                <Entypo name="dots-three-vertical" size={15} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={publicaciones.noticia_btn}
          onPress={() => pressButton(item)}
        >
          <Text style={publicaciones.titulo_publicacion}>{item.titulo}</Text>
          <Text
            style={[
              publicaciones.asunto_publicacion,
              { textAlign: item.align_asunto, fontStyle: item.tipo_letra },
            ]}
          >
            {item.asunto}
          </Text>
          {
            item.imagen && <FontAwesome name="photo" size={18} color="black" />
            //<Image source={{ uri: item.imagen }} style={publicaciones.imagenPublicacion}
          }
        </TouchableOpacity>
        {mostrarOpciones && (
          <OpcionesUD
            onClose={toggleOpciones}
            noticiaId={item.id}
            imagenUrl={item.imagen}
            onScreen={screen}
          />
        )}
      </View>
    )
  );
};

export default Publicaciones;
