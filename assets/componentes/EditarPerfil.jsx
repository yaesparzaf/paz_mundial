import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../fb/firebase-config";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import DatosUsers from "../../fb/DatosUsers";
import ActualizarDatos from "../../fb/ActualizarDatos";
import { useNavigation } from "@react-navigation/native";
import PutCache from "../cache/PutCache";

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
      navegacion.navigate("Perfil");
    }
  };
  return (
    <View>
      <View style={styles.contenedor_btn}>
        <TouchableOpacity style={styles.actualizar_btn} onPress={actualizar}>
          <Text style={styles.texto_btn}>Actualizar</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Nombre</Text>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <Text>Telefono</Text>
        <TextInput
          placeholder="Telefono"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor_btn: {
    alignItems: "flex-end",
  },
  actualizar_btn: {
    width: "20%",
    height: 30,
    backgroundColor: "blue",
  },
  texto_btn: {
    textAlign: "center",
    justifyContent: "center",
  },
});

export default EditarPerfil;
