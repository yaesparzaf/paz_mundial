import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import ForoCD from "../../fb/ForoCD";
import { useNavigation } from "@react-navigation/native";

const CrearForo = () => {
  const navegacion = useNavigation();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [crear, setCrear] = useState(false);

  const onCrearForo = () => {
    console.log("crear foro");
    const datosForo = { nombre: nombre, descripcion: descripcion };
    ForoCD({ datos: datosForo, accion: true });
    navegacion.navigate("Comunidad");
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.crear_btn,
          backgroundColor: crear ? "#00ADEF" : "#ffff",
        }}
        disabled={crear ? false : true}
        onPress={onCrearForo}
      >
        <Text>Crear Foro</Text>
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={(titulo) => {
            setNombre(titulo);
            setCrear(titulo && titulo.length);
          }}
        />
        <TextInput
          placeholder="Descripción (Opcional)"
          value={descripcion}
          onChangeText={(texto) => {
            setDescripcion(texto);
          }}
          maxLength={150}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  crear_btn: {
    width: "30%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default CrearForo;
