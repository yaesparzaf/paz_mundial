import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import LogOut from "../componentes/LogOut";
import { useNavigation } from "@react-navigation/native";
import GetAlls from "../cache/GetAlls";

const Perfil = () => {
  const { usuario, setUsuario } = contexUser();
  const navegacion = useNavigation();
  const onNavegacion = () => {
    navegacion.navigate("PerfilEdit");
  };
  return (
    <View style={styles.container}>
      {usuario !== null && (
        <>
          <View style={styles.image_cont}>
            <Image
              source={{
                uri: usuario.image,
              }}
              style={styles.profileImage}
              resizeMode="cover"
              onError={() => {}}
            />
          </View>
          <View style={styles.boton_cont}>
            <TouchableOpacity style={styles.boton_edit} onPress={onNavegacion}>
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.data_cont}>
            <Text style={styles.data_title}>Nombre</Text>
            <Text style={styles.data_info}>{usuario.nombre}</Text>
            <Text style={styles.data_title}>Correo</Text>
            <Text style={styles.data_info}>
              {usuario.email || usuario.correo}
            </Text>
            <Text style={styles.data_title}>No. Telefono</Text>
            <Text style={styles.data_info}>
              {usuario.telefono || usuario.correo}
            </Text>
          </View>
        </>
      )}
      <LogOut />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "white",
  },
  image_cont: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 100,
    marginBottom: 20,
    overflow: "hidden",
    marginTop: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 75,
  },
  boton_cont: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  boton_edit: {
    width: "100%",
    backgroundColor: "red",
  },
  data_cont: {
    flex: 0.4,
    width: "90%",
    marginTop: 20,
    justifyContent: "space-around",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  data_title: {
    fontSize: 15,
    color: "#808080",
    borderBottomWidth: 1,
    borderBottomColor: "#808080",
    fontWeight: "bold",
  },
  data_info: {
    fontSize: 17,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default Perfil;
