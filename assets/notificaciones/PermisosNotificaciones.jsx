import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform, AppState } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import agregarDatos from "../../fb/agregarDatos";
import GetCache from "../cache/GetCache";
import * as Linking from "expo-linking";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function PermisosNotificaciones() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync();
    const notificationListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const screen = response.notification.request.content.data.screen;
        // Abrir la aplicación directamente en la pantalla especificada
        Linking.openURL(`exp://192.168.1.35:8081/--/${screen}`);
      });

    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "background") {
      console.log("La aplicación está en segundo plano");
    }
  };

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.url &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      console.log(
        "se: ",
        lastNotificationResponse.notification.request.content.data.url
      );
      Linking.openURL(
        lastNotificationResponse.notification.request.content.data.url
      );
    }
  }, [lastNotificationResponse]);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      const usuario = await GetCache({ key: "usuario" });
      await agregarDatos("usuariosTokens", token, usuario.id);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
}

async function enviarNotificacion(tokenExcluido, ventana) {
  const response = await fetch(
    "http://192.168.1.35:3000/api/pazmundial/notificaciones",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ventana: ventana,
        tokenExcluido: tokenExcluido,
      }),
    }
  );
  if (response.status) console.log("ook");
  else console.error("error", response.status);
}

export { enviarNotificacion };
