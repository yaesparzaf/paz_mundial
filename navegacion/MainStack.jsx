import React, { createContext, useContext, useEffect, useState, useLayoutEffect } from 'react'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Comunidad from '../assets/screens/Comunidad';
import Noticias from '../assets/screens/Noticias';
import { MaterialIcons, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Entrenamiento from '../assets/screens/Entrenamiento';
import Notificaciones from '../assets/screens/Notificaciones';
import Meditar from '../assets/screens/Meditar';
import Foro from '../assets/screens/Foro';
import Perfil from '../assets/screens/Perfil';
import Publicar from '../assets/componentes/Publicar';
import NoticiaInfo from '../assets/screens/NoticiaInfo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Mytabs() {
  const navigacion = useNavigation();
  return (
    <Tab.Navigator initialRouteName='Noticias'
      screenOptions={{
        tabBarActiveTintColor: '#40E0D0',
        headerTitleStyle: {
          fontSize: 10,
        },
      }}>
      <Tab.Screen name='Noticias' component={Noticias}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
          headerShown: false,
        }} />
      <Tab.Screen name='Comunidad' component={Comunidad}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen name='Entrenamiento' component={Entrenamiento}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="head-cog-outline" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen name='Meditar' component={Meditar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="meditation" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen name='notificaciones' component={Notificaciones}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

function TabStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={Mytabs} options={{
        title: 'Por la paz mundial',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.account}>
            <MaterialIcons name="account-circle" size={30} color="black" />
            <Text style={styles.account_text}>Mi cuenta</Text>
          </TouchableOpacity>
        ),
        headerStyle: { backgroundColor: 'white' }
      }} />
      <Stack.Screen name="Perfil" component={Perfil} options={{ headerStyle: { backgroundColor: 'cyan' } }} />
      <Stack.Screen name="Foro" component={Foro} />
      <Stack.Screen name='Publicar' component={Publicar} options={{ title: 'Crear noticia' }} />
      <Stack.Screen name='NoticiaInfo' component={NoticiaInfo} options={{
        title: 'Noticia',
      }} />
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

const styles = StyleSheet.create({
  account: {
    alignItems: 'center',
    marginRight: 5
  },
  account_text: {
    fontSize: 10,
  }
})
export default MainStack;