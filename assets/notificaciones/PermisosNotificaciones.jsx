import { useEffect } from "react";
import * as Notifications from "expo-notifications";

const ObtenerTokenDeDispositivo = () => {
  useEffect(() => {
    Notifications.requestPermissionsAsync().then((status) => {
      console.log(status);
      if (status.granted) {
        Notifications.getExpoPushTokenAsync().then((response) => {
          const token = response.data;
          console.log("Token del dispositivo:", token);
          // Aquí puedes enviar el token a tu servidor para almacenarlo y usarlo posteriormente para enviar notificaciones push
        });
      } else {
        console.log(
          "El usuario no otorgó permisos para recibir notificaciones push."
        );
      }
    });
  }, []);

  return null;
};

export default ObtenerTokenDeDispositivo;
