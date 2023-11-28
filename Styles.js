import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    //backgroundColor: 'red',
    
  },
  cont_tierra:{
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: 'blue',
    
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  gif:{
    width: 300,
    height: 300,
    resizeMode: 'contain',
    //backgroundColor: 'blue',
  },
  cont_leyenda:{
    flex:0.2,
    alignItems:'center',
    justifyContent:'center',
    //width:400,
    //backgroundColor:'green',
  },
  cont_btn:{
    flex:0.2,
    //backgroundColor:'red'
  },
  continua_btn:{
    alignItems:'center',
    justifyContent:'center',
    width:350,
    height:50,
    borderRadius:20,
    marginBottom:10,
    backgroundColor:'#40E0D0',
  },
  texto_centrado:{
    fontSize:20,
  },
  leyenda:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold'
  }
});
