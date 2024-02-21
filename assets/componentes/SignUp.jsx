import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../fb/firebase-config";

const SignUp = ({ onBack }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarpassword, setConfirmarContraseña] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorpassword, setErrorContraseña] = useState("");
  const navegacion = useNavigation();

  const handleSignUpAndSend = async () => {
    if (!nombre || !email || !password || !confirmarpassword) {
      Alert.alert("Campos obligatorios", "Todos los campos son obligatorios");
      return;
    }
    if (password.length < 6 || !/\d/.test(password)) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 6 caracteres y contener al menos un número"
      );
      return;
    }
    if (password !== confirmarpassword) {
      Alert.alert("Contraseñas no coinciden", "Las contraseñas no coinciden");
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        Alert.alert(
          "Email ya registrado",
          "El email electrónico ingresado ya está registrado"
        );
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user a registar: ",user)
      const userDocRef = doc(db, "usuarios", user.uid);
      await setDoc(userDocRef, {
        nombre: nombre,
        email: email,
        telefono: telefono,
        rol: "usuario",
      });
      onBack();
    } catch (error) {
      console.error("Error al enviar datos:", error);
      Alert.alert(
        "Error",
        "Hubo un error al enviar los datos. Por favor, inténtalo de nuevo más tarde"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../meditar1.jpg")} style={styles.gif} />
      {/* <Image source={require("../meditar2.png")} style={styles.gif} /> */}
      {/* <Image source={require("../3.png")} style={styles.gif} /> */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#A9A9A9"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Email electrónico"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, errorpassword && styles.errorInput]}
          placeholder="Contraseña"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={[styles.input, errorpassword && styles.errorInput]}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          value={confirmarpassword}
          onChangeText={(text) => {
            setConfirmarContraseña(text);
            setErrorContraseña("");
          }}
        />
        {errorpassword !== "" && (
          <Text style={styles.errorText}>{errorpassword}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          placeholderTextColor="#A9A9A9"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUpAndSend}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onBack} style={styles.button1}>
          <Text style={styles.buttonText1}>Regresar</Text>
        </TouchableOpacity>

        {errorpassword !== "" && (
          <Text
            style={[styles.errorText, { textAlign: "center", color: "red" }]}
          >
            Las contraseñas no coinciden
          </Text>
        )}
      </View>
    </View>
  );
};
//Diseño Paloma
/* const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  gif: {
    position: "relative",
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: "-10%", // Añade esta línea para subir la imagen un 10%
    marginBottom: "5%",
  },
  formContainer: {
    backgroundColor: "#3cb4c4",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    padding: 15,
    alignItems: "center",
    width: "95%",
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1.2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    width: "95%",
  },
  button: {
    backgroundColor: "#8ce0e0",
    height: 40,
    marginVertical: "5%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "95%",
  },
  button1: {
    backgroundColor: "#dcfaf3",
    height: 40,
    marginVertical: "1%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "95%",
  },
  buttonText: {
    color: "#000",
    fontSize: 17,
  },
  buttonText1: {
    color: "#000",
    fontSize: 17,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
}); */

//Diseño Logo
/* const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  gif: {
    position: "relative",
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: 0, // Añade esta línea para subir la imagen un 10%
    marginBottom: "5%",
  },
  formContainer: {
    backgroundColor: "#c9b47d",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    padding: 15,
    alignItems: "center",
    width: "95%",
  },
  input: {
    height: 40,
    borderColor: "#ecebe8",
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    width: "100%",
  },
  button: {
    backgroundColor: "#46829c",
    height: 40,
    marginVertical: "5%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "100%",
  },
  button1: {
    backgroundColor: "#ad7a73",
    height: 40,
    marginVertical: "1%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonText1: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
}); */

//Diseño minimalist
const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  gif: {
    position: "relative",
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginTop: 0, // Añade esta línea para subir la imagen un 10%
    marginBottom: "5%",
  },
  formContainer: {
    backgroundColor: "#ececec",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
    padding: 15,
    alignItems: "center",
    width: "95%",
  },
  input: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
    width: "100%",
  },
  button: {
    backgroundColor: "#fff",
    height: 40,
    marginVertical: "5%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "100%",
  },
  button1: {
    backgroundColor: "#808080",
    height: 40,
    marginVertical: "1%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "100%",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
  },
  buttonText1: {
    color: "#000",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "red",
  },
});

export default SignUp;
