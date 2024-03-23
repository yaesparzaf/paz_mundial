import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
          <ImageBackground
            source={require("../a.jpg")}
            style={styles.backgroundImage}
          >
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
          </ImageBackground>

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onNavegacion}>
          <Text style={styles.buttonText}>Editar datos!</Text>
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
  backgroundImage: {
    width: "100%",
    resizeMode: "cover",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image_cont: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 90,
    marginBottom: 20,
    overflow: "hidden",
    marginTop: 20,
    width: 130,
    height: 130,
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
  buttonContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#74caff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Perfil;
