import React, { createContext, useContext, useEffect, useState,useLayoutEffect } from 'react'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Comunidad from '../assets/screens/Comunidad';
import Noticias from '../assets/screens/Noticias';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Entrenamiento from '../assets/screens/Entrenamiento';
import Notificaciones from '../assets/screens/Notificaciones';
import Meditar from '../assets/screens/Meditar';
import Foro from '../assets/screens/Foro';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../fb/firebase-config';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/*
const AuthenticatedUserProvider = ({children})=>{
  const [usuario,setUsuario] = useState(null);
  return (
    <AuthenticatedUserContex.Provider value={{usuario,setUsuario}}>
      {children}
    </AuthenticatedUserContex.Provider>
  )
}

const useUser = () =>{
  const context = useContext(AuthenticatedUserContex);
  if (!context) {
    throw new Error('useUser debe ser utilizado dentro de un UserProvider');
  }
  return context;
}
export { AuthenticatedUserProvider,useUser };*/

/*export  function DatosUsers() {
  const { usuario, setUsuario } = useUser();
  
  useLayoutEffect(() => {
    async function fetchUser(nombre, email) {
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('nombre', '==', nombre), where('email', '==', email));
      const querySnapShot = await getDocs(q);
      if (querySnapShot.docs.length > 0) {
        const userData = querySnapShot.docs[0].data();
        setUsuario(userData);
        console.log('el usuario existe');
        return true;
      } else {
        console.log('NO existe existe');
        return false;
      }
    }
    const usernameABuscar = 'Yamil';
    const correoABuscar = 'yamilya.esparza25@gmail.com';
    fetchUser(usernameABuscar, correoABuscar);
  }, [setUsuario]);
  return{usuario};
}*/

function Mytabs() {
  return (
    <Tab.Navigator initialRouteName='Noticias' screenOptions={{ tabBarActiveTintColor: '#40E0D0' }}>
      <Tab.Screen name='noticias' component={Noticias}
        options={{
          tabBarLabel: 'Noticias',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={24} color={color} />
          ),
          //headerShown:false,
        }} />
      <Tab.Screen name='Comunidad' component={Comunidad}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
          //headerShown:false,
        }}
      />
      <Tab.Screen name='Entrenamiento' component={Entrenamiento}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="head-cog-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name='Meditar' component={Meditar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="meditation" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name='notificaciones' component={Notificaciones}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

function TabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={Mytabs} options={{ headerShown: false }} />
      <Stack.Screen name="Foro" component={Foro} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
 
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  )
}

export default MainStack;