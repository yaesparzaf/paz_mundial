
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { db, auth } from "../../fb/firebase-config"; // Asegúrate de importar auth de firebase-config
import { useNavigation } from "@react-navigation/native";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const SignUp = ({ onBack }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarpassword, setConfirmarContraseña] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorpassword, setErrorContraseña] = useState("");
  const navegacion = useNavigation();

  const handleSignUpAndSend = async () => {
    // Verificar si los campos obligatorios están vacíos
    if (!nombre || !email || !password || !confirmarpassword || !telefono) {
      Alert.alert("Campos obligatorios", "Todos los campos son obligatorios");
      return;
    }

    // Verificar si la contraseña tiene al menos 6 caracteres y un número
    if (password.length < 6 || !/\d/.test(password)) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 6 caracteres y contener al menos un número"
      );
      return;
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmarpassword) {
      Alert.alert("Contraseñas no coinciden", "Las contraseñas no coinciden");
      return;
    }

    try {
      // Verificar si el email ya está registrado
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        Alert.alert(
          "Email ya registrado",
          "El email electrónico ingresado ya está registrado"
        );
        return;
      }

      // Crear el usuario y guardar los datos en Firestore
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Crear una referencia al documento con el uid del usuario como ID
      const userDocRef = doc(db, "usuarios", user.uid);

      // Establecer los datos del usuario en el documento con el uid como ID
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
      <View>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Email electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, errorpassword && styles.errorInput]}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={[styles.input, errorpassword && styles.errorInput]}
          placeholder="Confirmar contraseña"
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

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "10%",
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backButtonText: {
    color: "#1E82D9",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  button: {
    backgroundColor: "blue",
    height: 40,
    marginVertical: "5%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  button1: {
    backgroundColor: "#f80000",
    height: 40,
    marginVertical: "1%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonText1: {
    color: "white",
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