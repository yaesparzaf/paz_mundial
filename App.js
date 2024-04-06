import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import MainStack from "./navegacion/MainStack";
import { AuthenticatedUserProvider } from "./fb/AuthenticatedUserProvider";
import PermisosNotificaciones from "./assets/notificaciones/PermisosNotificaciones";

function App() {
  PermisosNotificaciones();
  return (
    <AuthenticatedUserProvider>
      <MainStack />
    </AuthenticatedUserProvider>
  );
}

export default App;
