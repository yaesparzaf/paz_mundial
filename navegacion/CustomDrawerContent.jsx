import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
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
        <ImageBackground style={styles.profileContainer}>
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
        </ImageBackground>
      )}
      <DrawerItemList {...props} />
      {/*       <ImageBackground
        source={require("../assets/Chakras1.png")}
        style={styles.drawerBackground}
      ></ImageBackground> */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    height: 160,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -30,
    backgroundColor: "#00adef",
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
  drawerContent: {
    flex: 1,
  },
  drawerBackground: {
    marginTop: 200,
    height: 250,
    flex: 1,
    resizeMode: "center",
    backgroundColor: "transparent",
  },
});
export default CustomDrawerContent;
