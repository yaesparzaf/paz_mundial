import React, { createContext, useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  DrawerLayoutAndroid,
  Image,
  Dimensions,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Comunidad from "../assets/screens/Comunidad";
import Noticias from "../assets/screens/Noticias";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Entrenamiento from "../assets/screens/Entrenamiento";
import Notificaciones from "../assets/screens/Notificaciones";
import Meditar from "../assets/screens/Meditar";
import Foro from "../assets/screens/Foro";
import Perfil from "../assets/screens/Perfil";
import Publicar from "../assets/screens/Publicar";
import NoticiaInfo from "../assets/screens/NoticiaInfo";
import MeditarEdit from "../assets/screens/MeditarEdit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../fb/firebase-config";
import Login from "../assets/componentes/Login";
import SignUp from "../assets/componentes/SignUp";
import { AuthenticatedUserContex } from "../fb/AuthenticatedUserProvider";
import GetCache from "../assets/cache/GetCache";
import { contexUser } from "../fb/AuthenticatedUserProvider";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import LinearGradient from "react-native-linear-gradient";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { usuario, setUsuario } = contexUser();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: usuario.image,
            }}
            style={styles.profileImage}
            resizeMode="cover"
            onError={() => {
              console.log("Error al cargar la imagen");
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{usuario.nombre}</Text>
          <Text style={styles.userRole}>{usuario.rol}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MyTabs() {
  const tam = Dimensions.get("window").width * 0.05;
  const col = "#fff";
  return (
    <Drawer.Navigator
      initialRouteName="Noticias"
      screenOptions={{
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#000",

        headerTitleStyle: {
          fontSize: 24, // Ajusta el tamaño del texto del título
          color: "#fff",
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: "#00ADEF", // Color de fondo de la barra de navegación superior
          borderBottomLeftRadius: 40, // Agrega un radio de borde en la esquina inferior izquierda
          borderBottomRightRadius: 40, // Agrega un radio de borde en la esquina inferior derecha
          height: 80, // Ajusta la altura de la barra de navegación superior
        },
        drawerStyle: {
          backgroundColor: "#00ADEF",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
            backgroundColor: "#47C8FF",
          },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={tam} color={col} />
          ),
        }}
      />
      <Drawer.Screen
        name="Noticias"
        component={Noticias}
        options={{
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
            backgroundColor: "#47C8FF",
          },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={tam} color={col} />
          ),
        }}
      />
      <Drawer.Screen
        name="Comunidad"
        component={Comunidad}
        options={{
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
            backgroundColor: "#47C8FF",
          },
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={tam}
              color={col}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Entrenamiento"
        component={Entrenamiento}
        options={{
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
            backgroundColor: "#47C8FF",
          },
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="head-cog-outline"
              size={tam}
              color={col}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Meditar"
        component={Meditar}
        options={({ navigation }) => ({
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
            backgroundColor: "#47C8FF",
          },
          drawerIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.reset({ routes: [{ name: "Meditar" }] })
              }
            >
              <MaterialCommunityIcons
                name="meditation"
                size={tam}
                color={col}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{
          drawerLabelStyle: {
            color: "#fff",
            fontSize: 14,
          },
          drawerItemStyle: {
            marginBottom: 2,
            marginTop: 2,
            borderRadius: 100,
            backgroundColor: "#47C8FF",
          },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={tam} color={col} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function TabStack() {
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
          headerStyle: { backgroundColor: "#fff" },
          headerShown: false,
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
    </Stack.Navigator>
  );
}

const MainStack = () => {
  const { usuario, setUsuario } = useContext(AuthenticatedUserContex);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      const usuario_cache = await GetCache({ key: "usuario" });
      authenticatedUser && usuario_cache
        ? setUsuario(usuario_cache)
        : setUsuario(null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsAuthenticated(usuario !== null);
  }, [usuario]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen
              name="Tabs"
              component={TabStack}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Authentication"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  account: {
    alignItems: "center",
    marginRight: 5,
  },
  account_text: {
    fontSize: 10,
  },
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

export default MainStack;
