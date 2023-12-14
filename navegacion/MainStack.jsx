import React, { createContext, useContext, useEffect, useState,useLayoutEffect } from 'react'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Comunidad from '../assets/screens/Comunidad';
import Noticias from '../assets/screens/Noticias';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Entrenamiento from '../assets/screens/Entrenamiento';
import Notificaciones from '../assets/screens/Notificaciones';
import Meditar from '../assets/screens/Meditar';
import Foro from '../assets/screens/Foro';
import Perfil from '../assets/screens/Perfil';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Mytabs() {
  const navigacion =useNavigation();
  return (
    <Tab.Navigator initialRouteName='Noticias' screenOptions={{ tabBarActiveTintColor: '#40E0D0' }}>
      <Tab.Screen name='Noticias' component={Noticias}
        options={{
          tabBarLabel: 'Noticias',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
          //headerShown:false,
          headerRight: () => (
            <TouchableOpacity onPress={()=>navigacion.navigate('Perfil')} style={{ padding: 10 }}>
            <Text>Perfil</Text>
          </TouchableOpacity>
          ),
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
      <Stack.Screen name= "Perfil" component={Perfil}/>
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