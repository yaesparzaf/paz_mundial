import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { contexUser } from "../fb/AuthenticatedUserProvider";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { usuario, setUsuario } = contexUser();
  return (
    <DrawerContentScrollView {...props}>
      {usuario !== null && (
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: usuario.image,
              }}
              style={styles.profileImage}
              resizeMode="cover"
              onError={() => {
                ("Error al cargar la imagen");
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{usuario.nombre}</Text>
            <Text style={styles.userRole}>{usuario.rol}</Text>
          </View>
        </View>
      )}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#0092d2",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -20,
  },
  imageContainer: {
    marginRight: 20,
    marginLeft: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "300",
  },
});
export default CustomDrawerContent;
