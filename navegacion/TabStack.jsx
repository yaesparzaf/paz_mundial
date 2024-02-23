import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import Foro from "../assets/screens/Foro";
import Perfil from "../assets/screens/Perfil";
import Publicar from "../assets/screens/Publicar";
import NoticiaInfo from "../assets/screens/NoticiaInfo";
import MeditarEdit from "../assets/screens/MeditarEdit";
import MyTabs from "./MyTabs";
import Login from "../assets/componentes/Login";

const Stack = createStackNavigator();

const TabStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#00ADEF", // Color de fondo de la barra de navegación superior
        },
        headerTintColor: "#fff", // Color del texto en la barra de navegación superior
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
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { color: "#000", fontSize: 24, fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerStyle: { backgroundColor: "white" } }}
      />
      <Stack.Screen name="Foro" component={Foro} />
      <Stack.Screen
        name="Publicar"
        component={Publicar}
        options={{ title: "Crear noticia" }}
      />
      <Stack.Screen
        name="NoticiaInfo"
        component={NoticiaInfo}
        options={{
          title: "Noticia",
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
