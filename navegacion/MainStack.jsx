import React from 'react'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Comunidad from '../assets/screens/Comunidad';
import Noticias from '../assets/screens/Noticias';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { mdiAccountGroup } from '@mdi/js';
import Entrenamiento from '../assets/screens/Entrenamiento';
import Notificaciones from '../assets/screens/Notificaciones';
import Meditar from '../assets/screens/Meditar';



const Tab = createBottomTabNavigator()

function Mytabs(){
  return(
    <Tab.Navigator initialRouteName='Noticias' screenOptions={{tabBarActiveTintColor:'#40E0D0'}}>
      <Tab.Screen name='noticias' component={Noticias} 
      options={{
        tabBarLabel:'Noticias',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="newspaper-outline" size={24} color={color} />
          ),
          headerShown:false,
      }}/>
      <Tab.Screen name= 'Comunidad' component = {Comunidad}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
            ),
            headerShown:false,
        }}
      />
      <Tab.Screen name= 'Entrenamiento' component = {Entrenamiento} 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="head-cog-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name = 'Meditar' component = {Meditar}
        options={{
          tabBarIcon: ({color,size})=> (
            <MaterialCommunityIcons name="meditation" size={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen name = 'notificaciones' component = {Notificaciones}
        options={{
          tabBarIcon: ({color,size}) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  )
}

const MainStack = () => {
  return (
    <NavigationContainer>
        <Mytabs/>
    </NavigationContainer>
  )
}

export default MainStack
