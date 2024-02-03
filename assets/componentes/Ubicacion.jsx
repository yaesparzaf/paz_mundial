import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useUser } from '../../fb/DatosUsers';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../fb/firebase-config';

const Ubicacion = ({getLocation}) => {
  const {usuario} =useUser();
  const [ubicacionObtenida, setUbicacionObtenida] = useState(null);

  useEffect(() => {
    getPermisos();
  }, []);

  async function getPermisos() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permisos no concedidos');
        return false;
      } else {
        const location = await getUserLocation();
        setUbicacionObtenida(location);
        if(getLocation)
          getLocation(location);
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  }
  //obtener el id del usuario sin errores.
  //mandar a la coleccion meditando

  async function getUserLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación del usuario:', location);
      const coleccionRef = collection(db,'meditando');
      const docRef = await getDoc(doc(coleccionRef,usuario.id));
      if(docRef.exists()){
      //   await updateDoc(docRef,{
      //     longitud:docRef.coords.altitude,
      //   })
       }else{
        console.log('no existe referencia al usuario: ',location.coords.altitude);
      }
      return true;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

};

export default Ubicacion;
