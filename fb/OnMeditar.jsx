import { View, Text } from "react-native";
import React from "react";
import { useUser } from "./DatosUsers";
import { collection, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const OnMeditar = async ({isMeditar}) => {
  const { usuario } = useUser();
  const usuario_id = usuario.id;
  console.log('id: ',usuario_id);
  console.log('recibe: ',isMeditar);
  try {
    const docRef = getDoc(collection(db, "meditando", usuario_id));
    await updateDoc(docRef, {
      meditando: isMeditar,
    });
    console.log('se actualizaron los datos');
  } catch (error) {
    console.error("hubo un error en: ", error);
  }
};

export default OnMeditar;
