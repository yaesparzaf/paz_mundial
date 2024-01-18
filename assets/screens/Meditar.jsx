import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Videos from '../componentes/Videos'

const Meditar = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Videos />
    </SafeAreaView>
  )
}

export default Meditar