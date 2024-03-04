import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../fb/firebase-config";
import SocialBotones from "./SocialBotones";
import { collection, onSnapshot, query } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import ForoCD from "../../fb/ForoCD";
import { Skeleton } from "moti/skeleton";
import { contexUser } from "../../fb/AuthenticatedUserProvider";

const ForosBtn = () => {
  const navigacion = useNavigation();
  const [foros, setForos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario } = contexUser();

  useEffect(() => {
    const q = query(collection(db, "foros"));
    const subscripcion = onSnapshot(q, (snapshot) => {
      const allForos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setForos(allForos);
      setLoading(false);
    });
    return () => {
      subscripcion();
    };
  }, []);

  const botonPresionado = (name_foro) => {
    navigacion.navigate("Foro", { name_foro });
  };

  const onEliminar = (id) => {
    const datos = {
      nombre: id,
    };
    ForoCD({ datos: datos, accion: false });
  };

  const onSwipeRight = (id) => {
    return (
      <TouchableOpacity onPress={() => onEliminar(id)} style={styles.eliminar}>
        {/*  <MaterialIcons name="delete" size={24} color="#fff" /> */}
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Eliminar</Text>
      </TouchableOpacity>
    );
  };

  const MAX_CARACTERES = 100; // El número máximo de caracteres que deseas mostrar

  const recortarDescripcion = (descripcion) => {
    return descripcion.length > MAX_CARACTERES
      ? `${descripcion.substring(0, MAX_CARACTERES)}...`
      : descripcion;
  };

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
          <Skeleton width={"150%"} height={100} colorMode="light" />
        </View>
      );
    }

    return <View>{skeletonViews}</View>;
  }

  return (
    <View style={{ height: "100%", backgroundColor: "#ffffff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ margin: 1 }}></View>
        {foros.map((foro) => (
          <React.Fragment key={foro.id}>
            {usuario.rol === "usuario" ? (
              <Swipeable
                friction={1}
                leftThreshold
                renderRightActions={() => onSwipeRight(foro.id)}
              >
                <TouchableOpacity
                  onPress={() => botonPresionado(foro.id)}
                  style={{ width: 360 }}
                >
                  <View style={styles.profileContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require("../meditar11.jpg")}
                        style={styles.profileImage}
                        resizeMode="cover"
                        onError={() => {
                          ("Error al cargar la imagen");
                        }}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.userName}>{foro.id}</Text>
                      <Text style={styles.userRole}>
                        {recortarDescripcion(foro.descripcion)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            ) : (
              <TouchableOpacity
                onPress={() => botonPresionado(foro.id)}
                style={{ width: 360 }}
              >
                <View style={styles.profileContainer}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("../meditar11.jpg")}
                      style={styles.profileImage}
                      resizeMode="cover"
                      onError={() => {
                        ("Error al cargar la imagen");
                      }}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.userName}>{foro.id}</Text>
                    <Text style={styles.userRole}>
                      {recortarDescripcion(foro.descripcion)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            <View style={{ margin: "2.5%" }}></View>
          </React.Fragment>
        ))}
        <View style={{ margin: "2%" }}></View>
        <SocialBotones />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: "auto",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    color: "#000000",
    fontWeight: "900",
    fontSize: 14,
    textTransform: "uppercase", // Convertir texto a mayúsculas
  },
  itemSubText: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#000000",
  },
  eliminar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef0000",
    width: "20%",
    borderRadius: 2,
  },
  profileContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageContainer: {
    marginRight: 20,
    marginLeft: 10,
  },
  textContainer: {
    flexDirection: "column",
    width: "70%",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  userName: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 13,
    color: "#8a8a8a",
    fontWeight: "300",
  },
});

export default ForosBtn;
