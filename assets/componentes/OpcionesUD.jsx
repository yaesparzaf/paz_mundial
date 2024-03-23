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

const OpcionesUD = ({ onClose, noticiaId, imagenUrl, onScreen, accion }) => {
  const navegacion = useNavigation();
  const [coleccionLeidas, setColeccionLeidas] = useState();

  useEffect(() => {
    if (onScreen === "noticias") {
      setColeccionLeidas("noticiasLeidas");
    } else if (onScreen === "entrenamiento") {
      setColeccionLeidas("entrenamientoVisto");
    }
  }, [onScreen]);

  const pressEditar = () => {
    console.log("Entro a editar");
    navegacion.navigate("NuevaPublicacion", {
      noticiaId: noticiaId,
      screen: onScreen,
    });
    console.log("Saliendo de editar");
  };

  const pressEliminar = async () => {
    console.log("Entro a eliminar");
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
    console.log("Termino eliminar");
  };

  useEffect(() => {
    if (accion === "editar") {
      pressEditar();
    } else if (accion === "eliminar") {
      pressEliminar();
    }
  }, [accion]);

  return null; // El componente no renderiza nada directamente
};

export default OpcionesUD;
