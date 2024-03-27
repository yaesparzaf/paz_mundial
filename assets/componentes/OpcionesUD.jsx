import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { db } from "../../fb/firebase-config";
import { Alert } from "react-native";

const OpcionesUD = ({ onClose, noticiaId, imagenUrl, onScreen, accion }) => {
  const navegacion = useNavigation();
  const [coleccionLeidas, setColeccionLeidas] = useState();

  useEffect(() => {
    if (onScreen === "noticias") {
      setColeccionLeidas("noticiasLeidas");
    } else if (onScreen === "entrenamiento") {
      setColeccionLeidas("entrenamientoVisto");
    }
  }, [onScreen]);

  const pressEditar = () => {
    navegacion.navigate("NuevaPublicacion", {
      noticiaId: noticiaId,
      screen: onScreen,
    });
  };

  const pressEliminar = async () => {
    const storage = getStorage();
    const imagenRef = ref(storage, imagenUrl);
    try {
      await deleteDoc(doc(db, onScreen, noticiaId));
      if (imagenUrl) await deleteObject(imagenRef);
      const allUsuarios = await getDocs(collection(db, "usuarios"));
      await Promise.all(
        allUsuarios.docs.map(async (usuarioDoc) => {
          const usuario_id = usuarioDoc.id;
          const noticiaLeidaRef = doc(
            db,
            "usuarios",
            usuario_id,
            coleccionLeidas,
            noticiaId
          );
          if (noticiaLeidaRef) await deleteDoc(noticiaLeidaRef);
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (accion === "editar") {
      pressEditar();
    } else if (accion === "eliminar") {
      // Mostrar la alerta de confirmación aquí
      Alert.alert(
        "Eliminar Noticia",
        "¿Está seguro de que desea eliminar esta noticia?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            onPress: pressEliminar,
          },
        ]
      );
    }
  }, [accion]);

  return null; // El componente no renderiza nada directamente
};

export default OpcionesUD;
