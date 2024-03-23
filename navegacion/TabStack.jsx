import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import Foro from "../assets/screens/Foro";
import Perfil from "../assets/screens/Perfil";
import NoticiaInfo from "../assets/screens/NoticiaInfo";
import MeditarEdit from "../assets/screens/MeditarEdit";
import MyTabs from "./MyTabs";
import Login from "../assets/componentes/Login";
import PerfilEdit from "../assets/screens/PerfilEdit";
import NuevoForo from "../assets/screens/NuevoForo";
import NuevaPublicacion from "../assets/screens/NuevaPublicacion";

const Stack = createStackNavigator();

const TabStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MyTabs}
        options={{
          title: "Por la paz mundial",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={styles.account}
            >
              <MaterialIcons name="account-circle" size={30} color="black" />
              <Text style={styles.account_text}>Mi cuenta</Text>
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: "#ffffff" },
          headerTitleStyle: { color: "#000", fontSize: 24, fontWeight: "bold" },
        }}
      />
      {/* <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: "Mi Perfil", // Título del encabezado
          headerStyle: { backgroundColor: "red" }, // Estilo del fondo del encabezado
          headerTintColor: "white", // Color del texto del encabezado
          headerTitleStyle: { fontWeight: "bold" }, // Estilo del título del encabezado
        }}
      /> */}

      <Stack.Screen
        name="Foro"
        component={Foro}
        options={({ route }) => ({
          title: route.params.name_foro,
        })}
      />
      <Stack.Screen
        name="NoticiaInfo"
        component={NoticiaInfo}
        options={{
          title: "Post",
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 17, fontWeight: "900" },
        }}
      />
      <Stack.Screen
        name="MeditarEdit"
        component={MeditarEdit}
        options={{ title: "Editar Videos" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NuevoForo"
        component={NuevoForo}
        options={{ title: "Nuevo foro" }}
      />
      <Stack.Screen name="NuevaPublicacion" component={NuevaPublicacion} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  account: {
    alignItems: "center",
    marginRight: 5,
  },
  account_text: {
    fontSize: 10,
  },
});

export default TabStack;
