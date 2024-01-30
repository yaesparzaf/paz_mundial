import { View, Text, Image } from 'react-native'
import React from 'react'
import { mapbox } from '../../fb/firebase-config'

const Map = () => {
  const p ="hola";
const mapaURL = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-31.9307,5.7314,0.59,0/400x320?access_token=${mapbox}`;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Personas meditando:</Text>
      <Image
      source={{uri: mapaURL}}
        style={{width:400,height:350}}
        resizeMode='cover'
      />
    </View>
  )
}

export default Map