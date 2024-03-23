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
  
  const Publicaciones = ({ datos_usuario, screen }) => {
    const usuario = datos_usuario;
    const [loading, setLoading] = useState(true);
    const [publicaciones, setPublicaciones] = useState([]);
    const [noticiaLeida, setNoticiaLeida] = useState();
    const [primero, setPrimero] = useState(null);
  
    useEffect(() => {
      const getColeccion = async () => {
        if (usuario && screen) {
          const colecc = collection(db, screen);
          const isEmpty = await getDocs(colecc);
          if (!isEmpty.empty) {
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
              setPrimero(newPublicacion[0].id);
              setPublicaciones(newPublicacion);
              setLoading(false);
            });
            return () => {
              subscripcion();
            };
          } else {
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
    if (publicaciones !== null) {
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
              primero={item.id === primero ? true : false}
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
    const fecha = item.fecha ? item.fecha.toDate() : null;
    let coleccion;
    if (screen === "noticias") {
      coleccion = "noticiasLeidas";
    } else if (screen === "entrenamiento") {
      coleccion = "entrenamientoVisto";
    }
    useEffect(() => {
      const NuevaNoticia = async () => {
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
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      return fecha.toLocaleDateString(undefined, options);
    };
    const pressButton = (info) => {
      if (screen === "noticias") {
        setNueva(false);
        addLeida(coleccion, info.id, usuario_id);
        //navegacion.navigate("NoticiaInfo", { info, screen, usuario_id });
      }
      navegacion.navigate("NoticiaInfo", { info, screen, usuario_id });
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
            {nueva && screen === "noticias" && (
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
            style={{ ...publicaciones.noticia_btn }}
            disabled={
              enEntrenamiento && item.bloqueado === false
                ? false
                : enEntrenamiento && item.bloqueado === true
                ? nueva
                : false
            }
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
            {item.imagen && <FontAwesome name="photo" size={18} color="black" />}
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
  