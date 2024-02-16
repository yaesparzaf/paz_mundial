import React, { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

// DatosUsers.js
const DatosUsers = async ({ usuario_id }) => {
  try {
    const usuariosRef = collection(db, 'usuarios');
    const docRef = doc(usuariosRef, usuario_id);
    const docInfo = await getDoc(docRef);
    console.log(docInfo.exists());
    if (docInfo && docInfo.exists()) {
      console.log('datos del usuario: ',docInfo.data());
      const userData = { 
        id: docInfo.id,
        ...docInfo.data()
      };
      console.log('estos datos obtiene del usuario: ', userData);
      return userData;
    } else {
      console.log('Usuario no encontrado');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    throw error; // Importante: lanza el error para que pueda ser manejado por el componente
  }
};

export default DatosUsers;