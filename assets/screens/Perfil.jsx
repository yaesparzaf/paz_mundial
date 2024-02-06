import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "../../fb/DatosUsers";

const Perfil = () => {
  const { usuario, setUsuario } = useUser();
  console.log(usuario);

  return (
    <View style={styles.container4}>
      <View style={styles.image_cont}>
        <Image
          source={{
            uri: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
          }}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.data_cont}>
        <Text style={styles.data_title}>Nombre</Text>
        <Text style={styles.data_info}>{usuario.nombre}</Text>
        <Text style={styles.data_title}>Correo</Text>
        <Text style={styles.data_info}>{usuario.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container4: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  image_cont: {
    borderWidth: 3,
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
  data_cont: {
    flex: 0.4,
    width: "90%",
    marginTop: 10,
    justifyContent: "space-around",
    //backgroundColor:'red'
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
  },
});

export default Perfil;
