import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../fb/firebase-config";
import { useNavigation } from "@react-navigation/native";
import RemoveCache from "../cache/RemoveCache";
import { Ionicons } from "@expo/vector-icons";

const LogOut = () => {
  const { usuario, setUsuario } = contexUser();
  const navegacion = useNavigation();
  const cerrarSesion = async () => {
    try {
      await RemoveCache({ key: "usuario" });
      setUsuario(null);
      navegacion.navigate("Login");
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={cerrarSesion} style={styles.button}>
        <Ionicons
          name="exit-outline"
          size={20}
          color="red"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "red",
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default LogOut;
