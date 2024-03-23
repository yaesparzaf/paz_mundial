import { updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
const SubirImagen = async (coleccionRef, imagenUri) => {
  const storage = getStorage();
  const extension = imagenUri.split(".").pop();
  const storageRef = ref(
    storage,
    `uploads/noticias/imagenes/${coleccionRef.id}.${extension}`
  );

  try {
    const response = await fetch(imagenUri);
    const blob = await response.blob();
    const snapshot = await uploadBytes(storageRef, blob);
    const imageUrl = await getDownloadURL(snapshot.ref);
    await updateDoc(coleccionRef, { imagen: imageUrl });
    return true;
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return false;
  }
};

export default SubirImagen;
