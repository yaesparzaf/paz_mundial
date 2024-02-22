import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import { contexUser } from "../../fb/AuthenticatedUserProvider";

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

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: usuario.id,
        name: usuario.nombre,
      }}
      loadEarlier={false}
      isLoadingEarlier={false}
    />
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
