import React from 'react'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Comunidad from '../assets/screens/Comunidad';
import Noticias from '../assets/screens/Noticias';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { mdiAccountGroup } from '@mdi/js';



const Tab = createBottomTabNavigator()

function Mytabs(){
  return(
    <Tab.Navigator initialRouteName='Noticias' screenOptions={{tabBarActiveTintColor:'#40E0D0'}}>
      <Tab.Screen name='noticias' component={Noticias} 
      options={{
        tabBarLabel:'Noticias',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="newspaper-outline" size={24} color="black" />
          ),
          headerShown:false,
      }}/>
      <Tab.Screen name= 'Comunidad' component = {Comunidad}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
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
