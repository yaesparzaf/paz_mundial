import { initializeApp } from 'firebase/app';
import  Constants  from 'expo-constants';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  measurementId: Constants.expoConfig.extra.measurementId,
};

initializeApp(firebaseConfig);
export const auth = initializeApp(firebaseConfig);
export const db = getFirestore(auth);

//IOS 133476762148-5ec612ukt96ohs88frg5emcaila6hff7.apps.googleusercontent.com

//android 133476762148-48idlu4v6elrn8t14v1msb7gbrvka3cc.apps.googleusercontent.com