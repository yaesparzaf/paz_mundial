import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../fb/firebase-config";
import { useNavigation } from "@react-navigation/native";
//import queryString from "query-string";

const VideosEdit = () => {
  const navegacion = useNavigation();
  const [loading, setLoading] = useState(true);
  const [video1Url, setVideo1Url] = useState();
  const [video2Url, setVideo2Url] = useState();
  const [textoInput, onChangeText] = useState("");
  const [actualizar, setActualizar] = useState(false);
  const [docsIds, setDocsIds] = useState();
  //getDoc de firebase
  //verificar que exista la coleccion
  //  ´´  ´´  ´´  ´´      el documento
  useEffect(() => {
    const getDatos = async () => {
      const coleccionDocs = await getDocs(collection(db, "meditar"));
      if (!coleccionDocs.empty) {
        const datosVideos = coleccionDocs.docs.map((doc) => doc.data());
        const ids = coleccionDocs.docs.map((doc) => doc.id);
        setDocsIds(ids);
        const [video1, video2] = datosVideos;
        const { url: video1_Url } = video1;
        const { url: video2_Url } = video2;
        setVideo1Url(video1_Url);
        setVideo2Url(video2_Url);
      }
      setLoading(false);
    };
    getDatos();
  }, []);

  const getId = (url) => {
    const reglaUrl =
      /^(?:(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/i;
    const match = url.match(reglaUrl);
    return match;
  };

  const onActualizar = async (video1_id, video2_id) => {
   
    const datosUrl1 = getId(video1Url);
    const datosUrl2 = getId(video2Url);
    if (datosUrl1 !== null && datosUrl2 !== null) {
      console.log("se obtuvieron los datos");
      console.log(datosUrl1[1]);
      console.log(datosUrl2[1]);
      //enviar datos a los archivos en firebase
      try {
        const video1_ref = doc(db, "meditar", video1_id);
        const video2_ref = doc(db, "meditar", video2_id);
        await updateDoc(video1_ref,{
          url:datosUrl1[0],
          video_id: datosUrl1[1]
        });
        await updateDoc(video2_ref,{
          url:datosUrl2[0],
          video_id:datosUrl2[1]
        });
        console.log('se actualizaron los datos con exito');
        navegacion.navigate('Meditar');
      } catch (error) {
        console.error("hubo un error al actualizar los enlaces. ", error);
      }
    }
    //console.log('no se valido');
  };

  return (
    <SafeAreaView style={styles.main_cont}>
      <View style={styles.actualizar_cont}>
        <TouchableOpacity
          style={{
            ...styles.actualizar_btn,
            backgroundColor: actualizar ? "cyan" : "#A9A9A9",
          }}
          disabled={!actualizar}
          onPress={() => onActualizar(docsIds[0], docsIds[1])}
        >
          <Text
            style={{
              ...styles.text_btn,
              color: actualizar ? "#000000" : "#D3D3D3",
            }}
          >
            Actualizar
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.input_cont}>
        <Text style={styles.titulo_cont}>Video 1</Text>
        <TextInput
          placeholder=" ingrese URL"
          style={styles.url_input}
          value={video1Url}
          onPaste={() => setActualizar(true)}
          onChangeText={(url1) => {
            setVideo1Url(url1);
            setActualizar(url1 && url1.length > 0);
          }}
        />
      </View>
      <View style={styles.input_cont}>
        <Text style={styles.titulo_cont}>Video 2</Text>
        <TextInput
          placeholder="ingrese URL"
          style={styles.url_input}
          value={video2Url}
          onPaste={() => setActualizar(true)}
          onChangeText={(url2) => {
            setVideo2Url(url2);
            setActualizar(url2 && url2.length > 0);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_cont: {
    flex: 1,
    //backgroundColor:'red'
  },
  actualizar_cont: {
    alignItems: "flex-end",
    margin: 5,
    //backgroundColor: "green",
  },
  actualizar_btn: {
    width: "30%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  text_btn: {
    fontSize: 18,
    //fontWeight:'bold'
  },
  input_cont: {
    flex: 0.2,
    //justifyContent:'space-around',
    marginBottom: 10,
    marginHorizontal: 5,
    //backgroundColor:'yellow'
  },
  titulo_cont: {
    fontSize: 20,
    marginBottom: 20,
  },
  url_input: {
    fontSize: 18,
    backgroundColor: "red",
  },
});

export default VideosEdit;
