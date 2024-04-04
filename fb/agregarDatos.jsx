import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

const agregarDatos = async (coleccion, token, usuario_id) => {
  console.log("esto se recibe: ", coleccion, token, usuario_id);
  try {
    const coleccionRef = collection(db, coleccion);
    const referencia = doc(coleccionRef, usuario_id); 
    const referenciaDoc = await getDoc(referencia);
    if (referenciaDoc.exists()) {
      await updateDoc(referencia, {
        token: token,
      });
    } else {
      await setDoc(referencia, {
        token: token,
      });
    }
  } catch (error) {
    console.error("Error al agregar datos:", error);
  }
};

export default agregarDatos;
