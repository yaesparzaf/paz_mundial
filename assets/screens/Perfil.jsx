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

  const mostrarCache = async () => {
    await GetAlls();
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

          <View style={styles.data_cont}>
            <Text style={styles.data_title}>Nombre</Text>
            <Text style={styles.data_info}>{usuario.nombre}</Text>
            <Text style={styles.data_title}>Correo</Text>
            <Text style={styles.data_info}>
              {usuario.email || usuario.correo}
            </Text>
            <Text style={styles.data_title}>No. Telefono</Text>
            <Text style={styles.data_info}>{usuario.telefono}</Text>
          </View>
        </>
      )}
      <View style={styles.boton_cont}>
        <TouchableOpacity style={styles.boton_edit} onPress={onNavegacion}>
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>
      <LogOut />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image_cont: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 90,
    marginBottom: 20,
    overflow: "hidden",
    marginTop: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
  },
  boton_cont: {
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  boton_edit: {
    marginTop: 30,
    backgroundColor: "#00adef",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: 250,
  },
  data_cont: {
    height: 180,
    width: "90%",
    justifyContent: "space-around",
    marginLeft: 30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  data_title: {
    fontSize: 13,
    color: "#8a8a8a",
    fontWeight: "300",
  },
  data_info: {
    color: "#000000",
    fontSize: 18,
  },
});

export default Perfil;
