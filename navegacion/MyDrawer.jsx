import { Dimensions, TouchableOpacity } from "react-native";
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
  const col = "#000000";
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerLeft: false,
        drawerActiveBackgroundColor: "#ececec",
        drawerInactiveBackgroundColor: "#ffffff76",
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
            color: "#000000",
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
        name=" Mi Perfil"
        component={PerfilStack}
        options={({ navigation }) => ({
          drawerPosition: "right",
          drawerLabelStyle: {
            color: "#000000",
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
        })}
      />
    </Drawer.Navigator>
  );
};

const PerfilStack = () => {
  //const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 20 }}
            >
              <Ionicons name="arrow-back" size={24} color="#000000" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PerfilEdit"
        component={PerfilEdit}
        options={{ title: "Editar Perfil" }}
      />
    </Stack.Navigator>
  );
};

export default MyDrawer;
