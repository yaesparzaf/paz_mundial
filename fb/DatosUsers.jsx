import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

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
    throw error;
  }
};

const addLeida = async (coleccion, noticia_id, usuario_id) => {
  const noticiaRef = doc(db, "usuarios", usuario_id, coleccion, noticia_id);
  await setDoc(noticiaRef, {
    publicacion_id: noticia_id,
    leida: true,
  });
};

const verBloqueados = ()=>{
  
}

const desbloquear = ()=>{

}

export { DatosUsers, addLeida };
