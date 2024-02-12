import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../fb/firebase-config";
import { useNavigation } from "@react-navigation/native";

const LogOut = () => {
  const { usuario, setUsuario } = contexUser();
  const navegacion = useNavigation();
  const cerrarSesion = async () => {
    console.log('datos del usuario: ',usuario);
    try {
      await signOut(auth);
      setUsuario(null);
      navegacion.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={cerrarSesion}>
        <Text>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;
