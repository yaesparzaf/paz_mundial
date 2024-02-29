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

const Publicaciones = ({ datos_usuario }) => {
  //const { usuario } = contexUser();
  const usuario = datos_usuario;
  const [loading, setLoading] = useState(true);
  const [publicaciones, setPublicaciones] = useState([]);
  const [noticiaLeida, setNoticiaLeida] = useState();

  useEffect(() => {
    if (usuario) {
      const q = query(collection(db, "noticias"));
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
    return (
      <ActivityIndicator
        size="large"
        color="#1bd6c3"
        style={{ flex: 1, alignItems: "center" }}
      />
    );
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
        />
      )}
    />
  );
};

const Info = ({ item, rol, usuario_id }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [nueva, setNueva] = useState();
  const navegacion = useNavigation();
  const fecha = item.fecha ? item.fecha.toDate() : null;
  useEffect(() => {
    const NuevaNoticia = async () => {
      try {
        const coleccionRef = collection(
          db,
          "usuarios",
          usuario_id,
          "noticiasLeidas"
        );
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
    const coleccionRef = await getDocs(
      collection(db, "usuarios", usuario_id, "noticiasLeidas")
    );
    //const querySnapshot = await getDocs(query(coleccionRef, where('noticia_id', '==', noticia_id)));
    setNueva(false);
    //if (coleccionRef.empty) {
    const noticiaRef = doc(
      db,
      "usuarios",
      usuario_id,
      "noticiasLeidas",
      noticia_id
    );
    await setDoc(noticiaRef, {
      noticia_id: noticia_id,
      leida: true,
    });
    // }
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
      <View style={styles.publicacionContainer}>
        <View style={styles.encabezado}>
          <Text style={styles.autorTexto}>{item.autor}</Text>
          {fecha !== null && (
            <Text style={styles.fechaTexto}>{FormatoFecha(fecha)}</Text>
          )}
          {nueva && (
            <MaterialIcons name="fiber-new" size={24} color="#00ADEF" />
          )}
          <View style={styles.menu_publicacion}>
            {rol === "admin" && (
              <TouchableOpacity activeOpacity={1.0} onPress={toggleOpciones}>
                <Entypo name="dots-three-vertical" size={15} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.noticia_btn}
          onPress={() => pressButton(item)}
        >
          <Text style={styles.titulo_publicacion}>{item.titulo}</Text>
          <Text
            style={[
              styles.asunto_publicacion,
              { textAlign: item.align_asunto, fontStyle: item.tipo_letra },
            ]}
          >
            {item.asunto}
          </Text>
          {
            item.imagen && <FontAwesome name="photo" size={18} color="black" />
            //<Image source={{ uri: item.imagen }} style={styles.imagenPublicacion}
          }
        </TouchableOpacity>
        {mostrarOpciones && (
          <OpcionesUD
            onClose={toggleOpciones}
            noticiaId={item.id}
            imagenUrl={item.imagen}
          />
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  publicacionContainer: {
    //height:500,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#00abef42",
    backgroundColor: "#fff",
  },
  skeletonItem: {
    marginBottom: 10,
    borderRadius: 5,
    height: 100,
    width: "100%",
  },
  noticia_btn: {
    //backgroundColor:'brown'
  },
  encabezado: {
    alignItems: "center",
    flexDirection: "row",
    height: 25,
    //backgroundColor: 'red'
  },
  titulo_publicacion: {
    fontSize: 20,
    fontWeight: "bold",
  },
  asunto_publicacion: {
    fontSize: 18,
  },
  autorTexto: {
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 10,
  },
  textoPublicacion: {
    fontSize: 15,
    textAlign: "justify",
  },
  imagenPublicacion: {
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  fechaTexto: {
    fontSize: 12,
    color: "#888",
    marginTop: 0,
  },
  menu_publicacion: {
    flexDirection: "row-reverse",
    flex: 1,
    //backgroundColor:'green'
  },
});

export default Publicaciones;
