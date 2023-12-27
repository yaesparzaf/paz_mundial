import React, { useEffect } from 'react';
import * as Location from 'expo-location';

const Ubicacion = () => {
  useEffect(() => {
    // Llamamos a la función que solicita permisos cuando el componente se monta.
    getPermisos();
  }, []);

  async function getPermisos() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permisos no concedidos');
        // Puedes mostrar un mensaje al usuario informándole sobre la necesidad de conceder permisos.
      } else {
        // Si los permisos son concedidos, obtenemos la ubicación del usuario.
        getUserLocation();
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  }

  async function getUserLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log('Ubicación del usuario:', location);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

};

export default Ubicacion;
