import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';


const Publicar = () => {
  const [text, onChangeText] = React.useState(text);
  const [number, onChangeNumber] = React.useState('');
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholder='Escribe un texto...'
          style={{
            height: 100,
            margin: 12,
            borderWidth: 1,
            textAlignVertical: 'top',
            padding: 10, 
            fontSize:20,
            backgroundColor: 'red'
          }}
          value={text}
        />
      </View>
    </SafeAreaView>
  )
}

export default Publicar