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
        console.log("Permisos no concedidos");
        return false;
      } else {
        const location = await getUserLocation();
        setUbicacionObtenida(location);
        if (getLocation) getLocation(location);
      }
    } catch (error) {
      console.error("Error al solicitar permisos:", error);
    }
  }
  //obtener el id del usuario sin errores.
  //mandar a la coleccion meditando

  async function getUserLocation() {
    try {
      // const location = await Location.getCurrentPositionAsync({});
      const location = {
        coords: {
          latitude: 19.6807101,
          longitude: -101.1856651,
        },
      };
      const location_copy = location;
      try {
        const coleccionRef = collection(db, "meditando");
        const docRef = doc(coleccionRef, usuario.id);
        const docEdit = await getDoc(docRef);
        if (docEdit.exists()) {
          console.log("ya existe: ");
          await updateDoc(docRef, {
            latitud: location.coords.latitude,
            longitud: location.coords.longitude,
          });
          console.log("se actualizo la ubicacion");
        } else {
          const meditandoRef = doc(db, "meditando", usuario.id);
          await setDoc(meditandoRef, {
            id: usuario.id,
            latitud: location.coords.latitude,
            longitud: location.coords.longitude,
          });
          console.log(meditandoRef);
          if (meditandoRef) {
            console.log('se añadio a "meditando"');
          }
        }
        //PutCache({key: 'ubicacion',datos: location_copy.coords});
      } catch (error) {
        console.error("hubo un error al añadir a la coleccion", error);
      }
      return true;
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  }
};

export default Ubicacion;
