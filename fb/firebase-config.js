import { initializeApp } from 'firebase/app';
import  Constants  from 'expo-constants';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
//import { getReactNativePersistence } from '@react-native-firebase/auth';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth'; // Importa initializeAuth y getReactNativePersistence
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage si no lo has hecho


const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  measurementId: Constants.expoConfig.extra.measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
//const db = getFirestore(app);
const db = initializeFirestore(app,{
  experimentalForceLongPolling:true,
});

// Configurar autenticación con persistencia
/*initializeAuth(auth, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});*/
const yt = Constants.expoConfig.extra.ytKey;
const mapbox = Constants.expoConfig.extra.mapboxKey;
export { app, auth, db, yt, mapbox };

//IOS 133476762148-5ec612ukt96ohs88frg5emcaila6hff7.apps.googleusercontent.com

//android 133476762148-48idlu4v6elrn8t14v1msb7gbrvka3cc.apps.googleusercontent.com