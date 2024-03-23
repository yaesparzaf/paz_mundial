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
import { addLeida } from "../../fb/DatosUsers";
import { Swipeable } from "react-native-gesture-handler";

const Publicaciones = ({ datos_usuario, screen }) => {
  const usuario = datos_usuario;
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [noticiaLeida, setNoticiaLeida] = useState();
  const [primero, setPrimero] = useState(false);

  useEffect(() => {
    const getColeccion = async () => {
      if (usuario && screen) {
        const colecc = collection(db, screen);
        const isEmpty = await getDocs(colecc);
        if (!isEmpty.empty) {
          console.log("en empty");
          if (isEmpty.size === 1) setPrimero(true);
          else setPrimero(false);
          const q = query(colecc);
          const subscripcion = onSnapshot(q, (snapshot) => {
            const newPublicacion = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            if (screen === "noticias")
              newPublicacion.sort((a, b) => b.fecha - a.fecha);
            else if (screen === "entrenamiento")
              newPublicacion.sort((a, b) => a.fecha - b.fecha);
            if (
              newPublicacion.length > 0 &&
              newPublicacion[0].bloqueado === true
            ) {
              newPublicacion[0].bloqueado = false;
            }
            setPublicaciones(newPublicacion);
            setLoading(false);
          });
          return () => {
            subscripcion();
          };
        } else {
          setPrimero(null);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    getColeccion();
  }, [usuario, screen]);

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
  if (publicaciones.length > 0) {
    console.log("en flaslist: ", publicaciones.length);
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
            primero={primero}
          />
        )}
      />
    );
  }
};

const Info = ({ item, rol, usuario_id, screen, primero }) => {
  const navegacion = useNavigation();
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [nueva, setNueva] = useState();
  const [enEntrenamiento, setEnEntrenamiento] = useState();
  const [opcionVisible, setOpcionVisible] = React.useState(null);
  const fecha = item.fecha ? item.fecha.toDate() : null;
  const [esPrimero, setEsprimero] = useState(null);
  let coleccion;

  if (screen === "noticias") {
    coleccion = "noticiasLeidas";
  } else if (screen === "entrenamiento") {
    coleccion = "entrenamientoVisto";
  }
  useEffect(() => {
    const NuevaNoticia = async () => {
      setEsprimero(primero);
      if (screen === "entrenamiento") setEnEntrenamiento(true);
      try {
        const coleccionRef = collection(db, "usuarios", usuario_id, coleccion);
        const datosColeccion = await getDocs(coleccionRef);
        const vacia = datosColeccion.empty;
        if (vacia) {
          await addLeida(coleccion, item.id, usuario_id);
          setNueva(true);
        } else {
          const noticia_leida = datosColeccion.docs.some((doc) => {
            if (doc.id === item.id) {
              return true;
            }
            return false;
          });
          setNueva(!noticia_leida);
        }
      } catch (error) {}
    };
    NuevaNoticia();
  }, [usuario_id, item.id]);

  const FormatoFecha = (fecha) => {
    if (!fecha) return "";
    const diferenciaTiempo = Date.now() - fecha.getTime();
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
    if (diferenciaDias === 0) {
      return "Hoy";
    } else if (diferenciaDias === 1) {
      return "Ayer";
    } else {
      return `Hace ${diferenciaDias} días`;
    }
  };

  const pressButton = (info) => {
    if (screen === "noticias") {
      setNueva(false);
      addLeida(coleccion, info.id, usuario_id);
    }
    navegacion.navigate("NoticiaInfo", { info, screen, usuario_id });
  };

  const handleEditarPress = () => {
    console.log("Botón de editar presionado");
    setOpcionVisible("editar");
  };

  const handleEliminarPress = () => {
    console.log("Botón de eliminar presionado");
    setOpcionVisible("eliminar");
  };

  const handleClose = () => {
    setOpcionVisible(null);
  };

  const onSwipeRight = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={handleEditarPress}
          style={[publicaciones.editar]}
        >
          <Text style={{ color: "#000000", fontWeight: "bold", fontSize: 10 }}>
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEliminarPress}
          style={[publicaciones.eliminar]}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 10 }}>
            Eliminar
          </Text>
        </TouchableOpacity>
        {opcionVisible === "editar" && (
          <OpcionesUD
            onClose={handleClose}
            noticiaId={item.id}
            imagenUrl={item.imagen}
            onScreen={screen}
            accion="editar"
          />
        )}
        {opcionVisible === "eliminar" && (
          <OpcionesUD
            onClose={handleClose}
            noticiaId={item.id}
            imagenUrl={item.imagen}
            onScreen={screen}
            accion="eliminar"
          />
        )}
      </View>
    );
  };

  const resultado =
    enEntrenamiento && item.bloqueado === false
      ? false
      : enEntrenamiento && item.bloqueado === true
      ? nueva
      : false;
  console.log(
    "primero: ",
    primero + "  disabled: ",
    esPrimero === true ? false : resultado
  );
  const datos = () => {
    return (
      <TouchableOpacity
        style={{
          ...publicaciones.noticia_btn,
          opacity: resultado ? 0.9 : 1,
        }}
        disabled={resultado}
        onPress={() => pressButton(item)}
      >
        {resultado && (
          <View style={publicaciones.candado}>
            <FontAwesome name="lock" size={50} color="#00adef" />
          </View>
        )}
        <View style={publicaciones.encabezado}>
          <Text style={publicaciones.autorTexto}>{item.autor}</Text>
          {fecha !== null && (
            <Text style={publicaciones.fechaTexto}>{FormatoFecha(fecha)}</Text>
          )}
          {nueva && screen === "noticias" && (
            <MaterialIcons name="fiber-new" size={20} color="#00ADEF" />
          )}
        </View>
        <Text style={publicaciones.titulo_publicacion}>{item.titulo}</Text>
        <Text
          style={[
            publicaciones.asunto_publicacion,
            { textAlign: item.align_asunto, fontStyle: item.tipo_letra },
          ]}
        >
          {item.asunto}
        </Text>
        {item.imagen && (
          <FontAwesome
            style={{ paddingHorizontal: "5%" }}
            name="photo"
            size={16}
            color="black"
          />
        )}
        <View style={publicaciones.separador} />
      </TouchableOpacity>
    );
  };

  return (
    usuario_id &&
    item && (
      <View style={publicaciones.publicacionContainer}>
        {rol === "admin" && usuario_id == item.autor_id ? (
          <Swipeable
            friction={1.5}
            leftThreshold
            renderRightActions={() => onSwipeRight()}
          >
            {datos()}
          </Swipeable>
        ) : (
          datos()
        )}
      </View>
    )
  );
};

export default Publicaciones;
