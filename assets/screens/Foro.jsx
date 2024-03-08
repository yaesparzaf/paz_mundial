import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat, Bubble, Time } from "react-native-gifted-chat";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import { contexUser } from "../../fb/AuthenticatedUserProvider";
import { Ionicons } from "@expo/vector-icons";

const Foro = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { name_foro } = route.params;
  const { usuario } = contexUser();

  const initialLoadRef = useRef(false);

  useEffect(() => {
    if (!initialLoadRef.current) {
      const CollectionMen = collection(db, "foros", name_foro, "Mensajes");
      const q = query(CollectionMen, orderBy("fecha", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data().msj_id,
            text: doc.data().mensaje,
            user: {
              _id: doc.data().autor_id,
              name: doc.data().autor,
            },
            createdAt: doc.data().fecha.toDate(), // Asegúrate de convertir la fecha a un objeto Date
          }))
        );

        initialLoadRef.current = true;
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, [name_foro]);

  const onSend = useCallback(
    (newMessages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
      const {
        user,
        _id: msj_id,
        createdAt: fecha,
        text: mensaje,
      } = newMessages[0];
      const { name: autor, _id: autor_id } = user;
      addDoc(collection(db, "foros", name_foro, "Mensajes"), {
        autor,
        autor_id,
        fecha,
        mensaje,
        msj_id,
      });
    },
    [name_foro]
  );

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#00adef",
            padding: 2,
          },
          left: {
            backgroundColor: "#EBECEC",
            padding: 2,
          },
        }}
        timeTextStyle={{
          right: { color: "#ffffff", fontSize: 8, alignSelf: "flex-end" }, // Color del texto de la hora para mensajes del usuario
          left: { color: "#a5a5a5", fontSize: 8, alignSelf: "flex-end" }, // Color del texto de la hora para mensajes de otros usuarios
        }}
        textStyle={{
          right: {
            fontSize: 13,
            color: "#ffffff",
            alignSelf: "flex-end",
          },
          left: {
            fontSize: 13,
            color: "#000000",
            alignSelf: "flex-start",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    const { text } = props;

    if (!text || text.trim() === "") {
      return null;
    }

    return (
      <Ionicons
        name="send"
        size={26}
        color="#00adef"
        style={{ marginRight: 10, marginBottom: 8 }}
        onPress={() => props.onSend({ text: text.trim() }, true)}
      />
    );
  };

  return (
    <View style={[styles.container]}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: usuario.id,
          name: usuario.nombre,
        }}
        loadEarlier={false}
        isLoadingEarlier={false}
        renderBubble={renderBubble}
        placeholder="Escribe tu mensaje..."
        renderSend={renderSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-end",
  },
});

export default Foro;
