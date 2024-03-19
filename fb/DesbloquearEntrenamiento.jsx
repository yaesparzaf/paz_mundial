import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "./firebase-config";

const DesbloquearEntrenamiento = async ({ usuario_id, screen, datos }) => {
  const { fecha, id } = datos.datos;
  console.log(fecha);
  if (usuario_id && screen && datos) {
    const { fecha, id } = datos.datos;
    console.log(fecha);
    try {
      const coleccion = collection(db, screen);
      const consulta = query(
        coleccion,
        where("fecha", ">", fecha),
        orderBy("fecha", "asc"),
        limit(1)
      );
      const respuesta = await getDocs(consulta);
      respuesta.forEach(async (documento) => {
        console.log("Documento encontrado:", documento.id);
        //const documento = doc(coleccion, doc.id);
        const docEditRef = doc(coleccion, documento.id);
        await setDoc(docEditRef, { bloqueado: false }, { merge: true });
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export default DesbloquearEntrenamiento;
