import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../fb/firebase-config";
import { firebase } from "@react-native-firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import ForoCD from "../../fb/ForoCD";

const ForosBtn = () => {
  //const foros = ["PoderMental", "Hipnosis"];
  const navigacion = useNavigation();
  const [foros, setForos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "foros"));
    const subscripcion = onSnapshot(q, (snapshot) => {
      const allForos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setForos(allForos);
      //nuevoGrupo.sort((a, b) => b.fecha - a.fecha);
      //setPublicaciones(nuevoGrupo);
      //setLoading(false);
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
      <TouchableOpacity onPress={() => onEliminar(id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView>
      {foros.map((foro) => (
        <Swipeable
          key={foro.id}
          renderRightActions={() => onSwipeRight(foro.id)}
        >
          <TouchableOpacity
            key={foro.id}
            style={styles.foros}
            onPress={() => botonPresionado(foro.id)}
          >
            <Text style={styles.titulo_btn}>{foro.id}</Text>
            <Text style={{ marginLeft: 10 }}>{foro.descripcion}</Text>
          </TouchableOpacity>
        </Swipeable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titulos: {
    fontSize: 25,
    fontWeight: "bold",
  },
  foros: {
    width: 350,
    height: 100,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#00FFFF",
  },
  titulo_btn: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForosBtn;
