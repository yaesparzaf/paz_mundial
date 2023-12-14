import {View,Text,StyleSheet,ScrollView,KeyboardAvoidingView,} from "react-native";
import { collection, onSnapshot, query,orderBy, addDoc, Timestamp } from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../../fb/firebase-config';
import { doc } from "firebase/firestore";
import { useUser } from "../../fb/DatosUsers";

const Foro = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {name_foro} = route.params;
  const {usuario,setUsuario} =useUser();
  //console.log(name_foro);
  useLayoutEffect(() => {
    const CollectionMen = collection(db,"foros",name_foro,"Mensajes");
    const q = query(CollectionMen,orderBy('fecha', 'desc'));
    const NewMsg = onSnapshot(q, snapshot => {
      //console.log('snapshot:', JSON.stringify(snapshot.docs, null, 2));
      setMessages(
        snapshot.docs.map(doc => {
          console.log("id: "+doc.data().autor_id+" usuario logeado: "+usuario.id,
            doc.data().autor)
          return{
          _id: doc.data().msj_id,
          text: doc.data().mensaje,
          user:{
            _id:doc.data().autor_id,
            name:doc.data().autor,
          },
          };
        })
        
      );
      
    });
    return () => NewMsg();
    
  }, [name_foro]);
  const onSend = useCallback((messages = []) => {
    //const fechaActual = Timestamp.now();
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const {user,_id:msj_id,createdAt:fecha,text: mensaje}=messages[0];
    const {name:autor,_id:autor_id} =user;
    //console.log(messages[0]);
    //console.log(user);
    const datos ={
      msj_id,autor,autor_id,fecha,mensaje
    };
    console.log(datos);
    addDoc(collection(db, 'foros', name_foro, 'Mensajes'), {
      autor,
      autor_id,
      fecha,
      mensaje,
      msj_id
    });
  }, []);
  return (
    messages && (
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ 
          _id:  usuario.id,
          name: usuario.nombre,
        }}
      />
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollContainer: {
    flexGrow: 0,
    justifyContent: "flex-end",
  },
});

export default Foro;