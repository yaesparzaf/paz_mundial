import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const Ubicacion = ({getLocation}) => {
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

  async function getUserLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación del usuario:', location);
      return true;
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

};

export default Ubicacion;
