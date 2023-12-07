import React, { createContext, useContext, useEffect, useState } from 'react'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Comunidad from '../assets/screens/Comunidad';
import Noticias from '../assets/screens/Noticias';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { mdiAccountGroup } from '@mdi/js';
import Entrenamiento from '../assets/screens/Entrenamiento';
import Notificaciones from '../assets/screens/Notificaciones';
import Meditar from '../assets/screens/Meditar';
import Foro from '../assets/screens/Foro';
import { auth } from '../firebase-config';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthenticatedUserContex = createContext({});

function Mytabs() {
  return (
    <Tab.Navigator initialRouteName='Comunidad' screenOptions={{ tabBarActiveTintColor: '#40E0D0' }}>
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
  const { user, setUser } = useContext(AuthenticatedUserContex);
  const { loading, setLoading } = useState(true);
  /*useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser =>{
        authenticatedUser ? setUser(authenticatedUser) :setUser(null);
        setLoading(false);
      })
  });*/
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  )
}

export default MainStack
