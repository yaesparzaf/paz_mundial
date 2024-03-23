import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import * as Notifications from "expo-notifications";

const PermisosNotificaciones = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  const solicitarPermisos = async () => {
    const status = await Notifications.requestPermissionsAsync();
    if (status.granted) {
      setPermissionGranted(true);
      Notifications.getExpoPushTokenAsync().then((response) => {
        const token = response.data;
        console.log("Token del dispositivo:", token);
        // Aquí puedes enviar el token a tu servidor para almacenarlo y usarlo posteriormente para enviar notificaciones push
      });
    } else {
      setPermissionGranted(false);
      console.log(
        "El usuario no otorgó permisos para recibir notificaciones push."
      );
    }
  };

  return (
    <View style={{justifyContent: "center", alignItems: "center" }}>
      <Text>Permisos de notificaciones:</Text>
      <Button title="Solicitar permisos" onPress={solicitarPermisos} />
      {permissionGranted && <Text>Permisos concedidos</Text>}
    </View>
  );
};

export default PermisosNotificaciones;
