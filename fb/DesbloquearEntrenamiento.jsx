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
import { addLeida } from "./DatosUsers";

const DesbloquearEntrenamiento = async ({ usuario_id, screen, datos }) => {

  if (usuario_id && screen && datos) {
    const { fecha, id } = datos.datos;
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
        //const documento = doc(coleccion, doc.id);
        const docEditRef = doc(coleccion, documento.id);
        await addLeida("entrenamientoVisto", documento.id, usuario_id);
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export default DesbloquearEntrenamiento;
