import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Publicar from "./Publicar";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { db } from "../../fb/firebase-config";

const OpcionesUD = ({ onClose, noticiaId, imagenUrl, onScreen }) => {
  const navegacion = useNavigation();
  const [coleccionLeidas, setColeccionLeidas] = useState();
  const [ventana, setVentana] = useState();
  useEffect(() => {
    if (onScreen === "noticias") {
      setColeccionLeidas("noticiasLeidas");
    } else if (onScreen === "entrenamiento") {
      setColeccionLeidas("entrenamientoVisto");
    }
    console.log("noticiaId ", noticiaId);
  }, [onScreen]);

  const pressEditar = () => {
    navegacion.navigate("NuevaPublicacion", { noticiaId });
    onClose();
  };

  const pressEliminar = async () => {
    const storage = getStorage();
    const imagenRef = ref(storage, imagenUrl);
    try {
      await deleteDoc(doc(db, onScreen, noticiaId));
      if (imagenUrl) await deleteObject(imagenRef);
      const allUsuarios = await getDocs(collection(db, "usuarios"));
      await Promise.all(
        allUsuarios.docs.map(async (usuarioDoc) => {
          const usuario_id = usuarioDoc.id;
          const noticiaLeidaRef = doc(
            db,
            "usuarios",
            usuario_id,
            coleccionLeidas,
            noticiaId
          );
          if (noticiaLeidaRef) await deleteDoc(noticiaLeidaRef);
        })
      );
    } catch (error) {}
    onClose();
  };
  const pressOverlay = () => {
    onClose();
  };
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <TouchableWithoutFeedback onPress={pressOverlay}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.acciones_btn} onPress={pressEditar}>
          <Text style={styles.acciones_texto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acciones_btn}>
          <Text
            style={{ ...styles.acciones_texto, color: "red" }}
            onPress={pressEliminar}
          >
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    //backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    backgroundColor: "white",
  },
  acciones_btn: {
    justifyContent: "center",
    width: "50%",
    height: 50,
    borderBottomWidth: 0.8,
    borderColor: "black",
    //backgroundColor: 'red',
  },
  acciones_texto: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default OpcionesUD;
