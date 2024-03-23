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
      if (!respuesta.empty) {
        console.log("esto tiene 2:", respuesta.docs[0].id);
        const existe = await addLeida(
          "entrenamientoVisto",
          respuesta.docs[0].id,
          usuario_id
        );
        console.log("Esto recibo en desbloquear: ", existe);
        return existe;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default DesbloquearEntrenamiento;
