import React, { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

// DatosUsers.js
const DatosUsers = async ({ usuario_id }) => {
  try {
    console.log("esto recibe datos user: ", usuario_id);
    const usuariosRef = collection(db, "usuarios");
    const docRef = doc(usuariosRef, usuario_id);
    const docInfo = await getDoc(docRef);
    docInfo.exists();
    if (docInfo && docInfo.exists()) {
      const userData = {
        id: docInfo.id,
        ...docInfo.data(),
      };
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    throw error; // Importante: lanza el error para que pueda ser manejado por el componente
  }
};

export default DatosUsers;
