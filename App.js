import React, { useState, useEffect } from 'react';
import { View, Text,Platform, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import Video from 'react-native-video';

function App() {
  //const earth = require('./assets/earth.mp4');
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingTop: Platform.OS === "android" && 30}}>
      <Text style={styles.text}>Por la Paz Mundial</Text>
    </View>
    <View style={styles.cont_tierra}>
      <Image source={require('./assets/tierra.jpg')}  style={styles.gif}/>
    </View>
    <View style={styles.cont_leyenda}>
      <Text style={styles.leyenda}>Medita, entrénate, únete a nuestra comunidad.</Text>
    </View>
    <View style={styles.cont_btn}>
      <Text>botones</Text>
      <TouchableOpacity style={styles.continua_btn}>
        <Text style={styles.texto_centrado}>Continúa con google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continua_btn}>
        <Text style={styles.texto_centrado}>Continúa con Microsoft</Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
    
  );
}

export default App;
