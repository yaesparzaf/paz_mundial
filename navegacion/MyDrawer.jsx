import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Perfil from "../assets/screens/Perfil";
import { contexUser } from "../fb/AuthenticatedUserProvider";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import TabStack from "./TabStack";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const tam = Dimensions.get("window").width * 0.05;
  const col = "#fff";
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerLeft: false,
        drawerActiveBackgroundColor: "#00adef",
        drawerInactiveBackgroundColor: "#000000",
        headerTitleStyle: {
          fontSize: 24, // Ajusta el tamaño del texto del título
          color: "#fff",
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: "#ffffff",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Inicio"
        component={TabStack}
        options={{
          drawerPosition: "right",
          headerShown: false,
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
          },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={tam} color={col} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          drawerPosition: "right",
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
          },
          headerTitle:"Perfil",
          headerTitleStyle:{color:"#000000",fontWeight:'bold'},
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={tam} color={col} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
