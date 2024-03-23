import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../fb/firebase-config";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import DatosUsers from "../../fb/DatosUsers";
import ActualizarDatos from "../../fb/ActualizarDatos";
import { useNavigation } from "@react-navigation/native";
import PutCache from "../cache/PutCache";
const { height: screenHeight } = Dimensions.get("window");

const EditarPerfil = () => {
  const { usuario, setUsuario } = contexUser();
  const navegacion = useNavigation();
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState(usuario.nombre);
  const [telefono, setTelefono] = useState(usuario.telefono);
  const [actualizado, setActualizado] = useState(false);
  const [datosPrev, setDatosPrev] = useState(usuario);

  useEffect(() => {
    const ActualizarCache = async () => {
      if (actualizado) {
        try {
          await PutCache({ key: "usuario", datos: usuario });
        } catch (error) {}
      }
    };
    return () => ActualizarCache();
  }, [actualizado]);

  const actualizar = async () => {
    try {
      setActualizado(true);
      const datosActualizar = {
        nombre: nombre,
        telefono: telefono,
      };
      const respuesta = await ActualizarDatos({
        usuario_id: usuario.id,
        datos: datosActualizar,
      });
      setUsuario((prevDatos) => ({
        ...prevDatos,
        nombre: datosActualizar.nombre,
        telefono: datosActualizar.telefono,
      }));
      if (respuesta) {
        setActualizado(true);
      }
    } catch (error) {
    } finally {
      setActualizado(false);
      navegacion.navigate("Perfil");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          maxLength={30}
        />
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={actualizar}>
          <Text style={styles.buttonText}>Actualizar datos!</Text>
        </TouchableOpacity>
      </View>
      {actualizado && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00adef" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: screenHeight,
    padding: 20,
  },
  buttonContainer: {
    margin: 15,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00adef",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    color: "#000000",
    fontWeight: "200",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditarPerfil;
