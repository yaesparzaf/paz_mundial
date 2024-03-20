import { View, Text, Alert } from "react-native";
import React from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const ForoCD = async ({ datos, accion }) => {
  if (accion) {
    try {
      const docRef = doc(db, "foros", datos.nombre);
      await setDoc(docRef, {
        descripcion: datos.descripcion,
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo crear el foro. ");
    }
  } else if (!accion) {
    try {
      const docRef = doc(db, "foros", datos.nombre);
      deleteDoc(docRef);
    } catch (error) {
      Alert.alert("Error.", "No se pudo eliminar el foro. ");
    }
  }
};

export default ForoCD;
