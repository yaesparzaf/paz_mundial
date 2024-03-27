import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const DatosUsers = async ({ usuario_id }) => {
  try {
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
    throw error;
  }
};

const addLeida = async (coleccion, noticia_id, usuario_id) => {
  try {
    const coleccionRef = collection(db, "usuarios", usuario_id, coleccion);
    const docs = await getDocs(coleccionRef);
    const existe = docs.docs.some((documento) => {
      if (documento.id === noticia_id) return true;
      return false;
    });
    if (!existe) {
      const noticiaRef = doc(db, "usuarios", usuario_id, coleccion, noticia_id);
      await setDoc(noticiaRef, {
        publicacion_id: noticia_id,
        leida: true,
      });
      return false;
    } else if (existe) return true;
  } catch (error) {}
};

const verBloqueados = () => {};

const desbloquear = () => {};

export { DatosUsers, addLeida };
