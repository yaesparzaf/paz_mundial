import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../fb/firebase-config";
import { useNavigation } from "@react-navigation/native";
import RemoveCache from "../cache/RemoveCache";

//Arreglar borrar el usuario de cache
//al momento de crear nuevo usuario persiste la informacion 

const LogOut = () => {
  const { usuario, setUsuario } = contexUser();
  const navegacion = useNavigation();
  const cerrarSesion = async () => {
    try {
      await RemoveCache({key:'usuario'});
      setUsuario(null);
      navegacion.navigate("Login");
      await signOut(auth);
      console.log("datos del usuario: ", usuario);
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
