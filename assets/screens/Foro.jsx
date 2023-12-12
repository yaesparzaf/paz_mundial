import {View,Text,StyleSheet,ScrollView,KeyboardAvoidingView,} from "react-native";
import { collection, onSnapshot, query,orderBy } from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../../fb/firebase-config';
import { doc } from "firebase/firestore";

const Foro = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {name_foro} = route.params;
  console.log(name_foro);
  useLayoutEffect(() => {
    const CollectionMen = collection(db,"foros","Hipnosis","Mensajes");
    const q = query(CollectionMen,orderBy('fecha', 'desc'));
    const NewMsg = onSnapshot(q, snapshot => {
      console.log('snapshot:', JSON.stringify(snapshot, null, 2));
      setMessages(
        snapshot.docs.map(doc => {
          return{
          _id: doc.id,
          autor: doc.data().autor,
          mensaje: doc.data().mensaje
          };
        })
        
      );
      
    });
    return () => NewMsg();
    
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const {_id, autor, mensaje}=messages[0];
    console.log("ID: "+_id);
    addDoc(collection(db,'foros',name_foro,'Mensajes'),{
      _id,autor,mensaje
    });
  }, []);
  return (
    messages && (
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id:  1}} 
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