import { View, Text } from "react-native";
import React from "react";
import { contexUser } from "./DatosUsers";
import { collection, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const OnMeditar = async ({ isMeditar }) => {
  const { usuario } = contexUser();
  const usuario_id = usuario.id;

  try {
    const docRef = getDoc(collection(db, "meditando", usuario_id));
    await updateDoc(docRef, {
      meditando: isMeditar,
    });
  } catch (error) {
    console.error("hubo un error en: ", error);
  }
};

export default OnMeditar;
