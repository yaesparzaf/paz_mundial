import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import ContadorAnimado from "./ContadorAnimado";
import { db } from "../../fb/firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const authInstance = getAuth();
      await signInWithEmailAndPassword(authInstance, email, password);
      console.log("Inicio sesión", email, password);
      onLogin(); // Llama a la función onLogin para indicar que el usuario ha iniciado sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  const handleRegisterEmail = () => {
    // Lógica para registrar mediante correo electrónico
  };

  const handleRegisterGoogle = () => {
    // Lógica para registrar mediante Google
  };

  const handleRegisterMicrosoft = () => {
    // Lógica para registrar mediante Microsoft
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={150}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Image
            source={require("../../assets/Planet.gif")}
            style={styles.gif}
          />
          <View style={styles.textContainer}>
            <ContadorAnimado numero={8} />
            <Text style={styles.titulo}>personas meditando ahora</Text>
          </View>
          <Text style={styles.bienvenida}>
            ¡Bienvenido de vuelta! ¿Listo para ingresar?
          </Text>
          <TextInput
            style={[styles.input, { color: "white" }]}
            placeholder="Ingresa tu email"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, { color: "white" }]}
            placeholder="Contraseña"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <Text style={styles.registro}>
            ¿Nuevo? ¡Regístrate ahora y únete!
          </Text>
          <View style={styles.registerSection}>
            {/* <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegisterEmail}
            >
              <Ionicons name="mail" size={24} color="white" />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegisterGoogle}
            >
              <FontAwesome name="google" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegisterMicrosoft}
            >
              <FontAwesome name="windows" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.extraSpace} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#081526",
  },
  extraSpace: {
    height: 400, // Altura del espacio extra
    backgroundColor: "yellow", // Color de fondo del espacio extra
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    width: "80%",
  },
  gif: {
    width: 500,
    height: 300,
    resizeMode: "contain",
  },
  bienvenida: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
  },
  registro: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 20,
  },
  input: {
    height: 50,
    width: 300,
    borderColor: "#ffffff",
    color: "white",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16, // Tamaño de texto fijo
  },
  button: {
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#1E82D9",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ff",
    marginBottom: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    marginRight: 10,
    color: "white",
  },
  texto: {
    fontSize: 18,
    color: "#56A5B2",
  },
});

export default Login;
