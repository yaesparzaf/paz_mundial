import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../fb/firebase-config";
import { useNavigation } from "@react-navigation/native";

const LogOut = () => {
  const { usuario, setUsuario } = contexUser();
  const navegacion = useNavigation();
  const cerrarSesion = async () => {
    console.log("datos del usuario: ", usuario);
    try {
      await signOut(auth);
      setUsuario(null);
      navegacion.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={cerrarSesion} style={styles.button}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FC441D",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LogOut;
