import React, { useEffect, useState } from "react";
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
import { FontAwesome } from "@expo/vector-icons";
import ContadorAnimado from "./ContadorAnimado";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Contador from "../../fb/Contador";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import DatosUsers from "../../fb/DatosUsers";
import PutCache from "../cache/PutCache";
import GetAlls from "../cache/GetAlls";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ onLogin, onShowSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contador, setContador] = useState(null);
  const [uid, setUid] = useState();
  const authInstance = getAuth();
  const { usuario, setUsuario } = contexUser({});
  const [haveDatos, setHaveDatos] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const datos = {};
  const [request, response, promtAsyn] = Google.useAuthRequest({
    androidClientId:
      "133476762148-48idlu4v6elrn8t14v1msb7gbrvka3cc.apps.googleusercontent.com",
  });

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: "Bearer ${token}" },
        }
      );
      const user = await request.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const getContador = async () => {
      const total_personas = await Contador();
      console.log("get contador: ", total_personas);
      setContador(total_personas);
    };
    getContador();
  }, [contador]);

  useEffect(() => {
    const aCache = async () => {
      if (haveDatos) {
        console.log("A CACHE: ", haveDatos, "con: ", datos);
        onLogin(true);
      }
    };
    aCache();
  }, [haveDatos]);

  const handleLogin = async () => {
    try {
      console.log("entro en handlelogin");
      const response = await signInWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const get_uid = response.user.uid;
      setUid(get_uid);
      console.log("esto se envia a uid: ", get_uid);
      const datos = await DatosUsers({ usuario_id: get_uid });
      console.log("esto llega de DatosUser: ", datos);
      console.log("haveDatos1: ", haveDatos);
      setHaveDatos(true);
      await PutCache({ key: "usuario", datos: datos });
      setUsuario(datos);
      console.log("haveDatos2: ", haveDatos);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={150}
    >
      <View style={styles.content}>
        <Image source={require("../../assets/Planet.gif")} style={styles.gif} />
        <View style={styles.formContainer}>
          <View style={styles.textContainer}>
            <ContadorAnimado numero={contador} />
            <Text style={styles.titulo}>personas meditando ahora</Text>
          </View>
          <Text style={styles.bienvenida}>
            ¡Bienvenido de vuelta! ¿Listo para ingresar?
          </Text>
          <TextInput
            style={[styles.input]}
            placeholder="Ingresa tu email"
            placeholderTextColor="gray"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[styles.input, { color: "black", paddingRight: 40 }]}
              placeholder="Contraseña"
              placeholderTextColor="gray"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={{ position: "absolute", right: 20, bottom: 36 }}
            >
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={18}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <Text style={styles.registro}>
            ¿Nuevo? ¡
            <Text style={styles.registroLink} onPress={onShowSignUp}>
              Regístrate{" "}
            </Text>
            ahora y únete!
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        height: "100%",
        width: "100%",
      },
      android: {
        minHeight: "100%", // Para asegurar que el contenedor tenga al menos el 100% de la altura
        width: "100%",
      },
    }),
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    alignItems: "center",
    width: "80%",
  },
  gif: {
    position: "relative",
    width: "140%",
    height: 300,
    resizeMode: "contain",
    marginTop: "0%", // Añade esta línea para subir la imagen un 10%
  },
  bienvenida: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
  },
  registro: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
    marginBottom: 50,
  },
  registroLink: {
    color: "#3981BF", // Cambia el color del enlace
  },
  input: {
    height: 50,
    width: "90%",
    borderColor: "#000",
    color: "#000",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 14, // Tamaño de texto fijo
  },
  button: {
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#3981BF",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
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
    marginRight: 1,
    color: "#000",
  },
  formContainer: {
    position: "absolute",
    top: "70%",
    width: "105%",
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    padding: 15,
    alignItems: "center",
  },
});

export default Login;
