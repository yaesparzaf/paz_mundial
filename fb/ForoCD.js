import { View, Text } from "react-native";
import React from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const ForoCD = async ({ datos, accion }) => {
  console.log("foroCD");
  if (accion) {
    console.log("esto tiene datos.nombre: ", datos.nombre);
    try {
      const docRef = doc(db, "foros", datos.nombre);
      await setDoc(docRef, {
        descripcion: datos.descripcion,
      });
    } catch (error) {
      console.log("no se pudo crear el foro: ", error);
    }
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
