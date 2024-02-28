import { View, Text } from "react-native";
import React from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase-config";
import RemoveCache from "../assets/cache/RemoveCache";
import PutCache from "../assets/cache/PutCache";

const ActualizarDatos = async ({ usuario_id, datos }) => {
  try {
    const usuarioRef = doc(db, "usuarios", usuario_id);
    await updateDoc(usuarioRef, {
      nombre: datos.nombre,
      telefono: datos.telefono,
    });

    await RemoveCache({ key: "usuario" });
    return true;
  } catch (error) {
    console.error("hubo un error", error);
    return false;
  }
};

export default ActualizarDatos;
