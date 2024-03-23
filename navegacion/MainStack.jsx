import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../fb/firebase-config";
import Login from "../assets/componentes/Login";
import SignUp from "../assets/componentes/SignUp";
import { AuthenticatedUserContex } from "../fb/AuthenticatedUserProvider";
import GetCache from "../assets/cache/GetCache";
import MyDrawer from "./MyDrawer";
import TabStack from "./TabStack";
const { height: screenHeight } = Dimensions.get("window");

const Stack = createStackNavigator();

const MainStack = () => {
  const { usuario, setUsuario } = useContext(AuthenticatedUserContex);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authInstance = getAuth();
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para el indicador de carga

  useEffect(() => {
    const logeado = onAuthStateChanged(
      authInstance,
      async (authenticatedUser) => {
        const usuario_cache = await GetCache({ key: "usuario" });
        authenticatedUser && usuario_cache
          ? setUsuario(usuario_cache)
          : setUsuario(null);
        setIsLoading(false);
      }
    );
    return () => logeado();
  }, []);

  useEffect(() => {
    setIsAuthenticated(usuario !== null);
  }, [usuario]);

  //const usuario_cache =async()=>{}
  const isLogin = async (onLogin) => {
    if (onLogin) {
      setIsAuthenticated(true);
    }
  };

  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleBackToLogin = () => {
    setShowSignUp(false);
  };

  const handleShowSignUp = () => {
    setShowSignUp(true);
  };
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loading_container}>
        <Image style={styles.loading} source={require("../assets/lod.gif")} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen
              name="Tabs"
              component={MyDrawer}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name={showSignUp ? "Registrate" : "Login"}
              options={{
                headerShown: false,
                cardStyle: { backgroundColor: "lightblue" },
              }}
            >
              {(props) =>
                showSignUp ? (
                  <SignUp
                    {...props}
                    onLogin={isLogin}
                    onBack={handleBackToLogin}
                  />
                ) : (
                  <Login
                    {...props}
                    onLogin={handleLogin}
                    onShowSignUp={handleShowSignUp}
                  />
                )
              }
            </Stack.Screen>
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
  loading_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: screenHeight,
  },
  loading: {
    width: 70,
    height: 70,
    resizeMode: "cover",
  },
});

export default MainStack;
