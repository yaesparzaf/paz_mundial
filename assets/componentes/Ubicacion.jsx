import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import PutCache from "../cache/PutCache";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { Alert } from "react-native"; // Importar Alert desde react-native

const Ubicacion = ({ getLocation }) => {
  const { usuario } = contexUser();
  const [ubicacionObtenida, setUbicacionObtenida] = useState(null);

  useEffect(() => {
    getPermisos();
  }, []);

  async function getPermisos() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos necesarios",
          "Para acceder a este apartado, necesitas activar los permisos de ubicación."
        );
        return false;
      } else {
        const location = await getUserLocation();
        setUbicacionObtenida(location);
        if (getLocation) getLocation(location);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron obtener los permisos de ubicación");
    }
  }

  async function getUserLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      /* const location = {
        coords: {
          latitude: 19.6807101,
          longitude: -101.1856651,
        },
      }; */
      const location_copy = location;
      try {
        const coleccionRef = collection(db, "meditando");
        const docRef = doc(coleccionRef, usuario.id);
        const docEdit = await getDoc(docRef);
        if (docEdit.exists()) {
          await updateDoc(docRef, {
            latitud: location.coords.latitude,
            longitud: location.coords.longitude,
          });
        } else {
          const meditandoRef = doc(db, "meditando", usuario.id);
          await setDoc(meditandoRef, {
            id: usuario.id,
            latitud: location.coords.latitude,
            longitud: location.coords.longitude,
          });
          if (meditandoRef) {
          }
        }
        //PutCache({key: 'ubicacion',datos: location_copy.coords});
      } catch (error) {
        Alert.alert("Error", "Hubo un error al añadir a la colección");
      }
      return true;
    } catch (error) {
      Alert.alert(
        "Oops, algo falta...",
        "Para sumergirte en la meditación, necesitamos acceso a tu ubicación. Actívalos para comenzar tu viaje hacia la paz interior."
      );
    }
  }
};

export default Ubicacion;