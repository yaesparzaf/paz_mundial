import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDoc } from "firebase/firestore";
import { db } from "../../fb/firebase-config";

const VideosEdit = () => {
  const [video1Url, setVideo1Url] = useState();

  //getDoc de firebase
  //verificar que exista la coleccion
  //  ´´  ´´  ´´  ´´      el documento
  // useEffect(() => {
  //   const coleccionRef = collection(db, "meditar");
  //   if(coleccionRef.empty)
  //     console.log('la coleccion esta vacia');
  //   console.log(coleccionRef);

  // },[]);

  return (
    <SafeAreaView style={styles.main_cont}>
      <View style={styles.actualizar_cont}>
        <TouchableOpacity style={styles.actualizar_btn}>
          <Text>Actualizar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.video1}>
        <TextInput
          placeholder="URL"
          style={styles.video1_input}
          value={video1Url}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_cont: {
    flex: 1,
  },
  actualizar_cont: {
    flex: 0.1,
    alignItems: "flex-end",
    backgroundColor: "green",
  },
  actualizar_btn: {
    backgroundColor: "blue",
  },
  video1: {},
});

export default VideosEdit;
