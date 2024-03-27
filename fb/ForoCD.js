import { View, Text } from "react-native";
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
    } catch (error) {}
  } else if (!accion) {
    try {
      const docRef = doc(db, "foros", datos.nombre);
      deleteDoc(docRef);
    } catch (error) {
      console.error("no se pudo eliminar: ", error);
    }
  }
};

export default ForoCD;
