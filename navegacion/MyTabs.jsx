import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Comunidad from "../assets/screens/Comunidad";
import Noticias from "../assets/screens/Noticias";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Entrenamiento from "../assets/screens/Entrenamiento";
import Notificaciones from "../assets/screens/Notificaciones";
import Meditar from "../assets/screens/Meditar";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const tam = Dimensions.get("window").width * 0.05;
  return (
    <Tab.Navigator
      initialRouteName="Comunidad"
      screenOptions={{
        tabBarActiveTintColor: "#00adef",
        tabBarInactiveTintColor: "gray",
        headerTitleStyle: {
          fontSize: 20, // Ajusta el tamaño del texto del título
          color: "#000000",
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: "#ffffff",
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Noticias"
        component={Noticias}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={tam} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Comunidad"
        component={Comunidad}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Entrenamiento"
        component={Entrenamiento}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="head-cog-outline"
              size={tam}
              color={color}
            />
          ),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Meditar"
        component={Meditar}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.reset({ routes: [{ name: "Meditar" }] })
              }
            >
              <MaterialCommunityIcons
                name="meditation"
                size={tam}
                color={color}
              />
            </TouchableOpacity>
          ),
          headerShown: true,
        })}
      />
      <Tab.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={tam} color={color} />
          ),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
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
export default MyTabs;
