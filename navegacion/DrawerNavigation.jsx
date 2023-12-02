import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Perfil from '../assets/componentes/Perfil';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="Editar Perfil" component={Perfil}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigation