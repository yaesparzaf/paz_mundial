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
import { createStackNavigator } from "@react-navigation/stack";
import PerfilEdit from "../assets/screens/PerfilEdit";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
          fontSize: 24,
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
      <Stack.Screen
        name=" Mi Perfil"
        component={PerfilStack}
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
          headerShown: false,
          headerTitle: "Perfil",
          headerTitleStyle: { color: "#000000", fontWeight: "bold" },
          drawerIcon: ({ size, color }) => (
            <Ionicons name="person" size={tam} color={col} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const PerfilStack = () => {
  //const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen
        name="PerfilEdit"
        component={PerfilEdit}
        options={{ title: "Editar Perfil" }}
      />
    </Stack.Navigator>
  );
};

export default MyDrawer;
