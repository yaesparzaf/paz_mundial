import {View,Text,StyleSheet,ScrollView,KeyboardAvoidingView,} from "react-native";
import { collection, onSnapshot, query,orderBy } from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { db } from '../../firebase-config';
const Foro = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {name_foro} = route.params;
  console.log(name_foro);
  useLayoutEffect(() => {
    const CollectionMen = collection(db, 'foros', name_foro, 'mensajes');
    const q = query(CollectionMen,orderBy('createAt', 'desc'));
    
    const NewMsg = onSnapshot(q, snapshot => {
      console.log('snapshot');
      setMessages(
        snapshot.docs.map(doc => {
          console.log('id:'+doc.id);
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
    addDoc(collection(db,'foros',name_foro,'mensajes'),{
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