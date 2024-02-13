import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RemoveAlls = async() => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        console.log('Todos los elementos de AsyncStorage han sido eliminados.');
      } catch (error) {
        console.error('Error al eliminar elementos de AsyncStorage:', error);
      }
}

export default RemoveAlls