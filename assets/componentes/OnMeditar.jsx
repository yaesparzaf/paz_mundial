import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../fb/firebase-config";

const OnMeditar = async (isMeditar, usuario_id) => {
  try {
    const coleccionRef = collection(db, "meditando");
    const docRef = doc(coleccionRef, usuario_id);
    const docEdit = await getDoc(docRef);
    if (docEdit.exists()) {
      await updateDoc(docRef, {
        meditando: isMeditar,
      });
    } else {
      await setDoc(usuario_id, {
        meditando: isMeditar,
      });
    }
  } catch (error) {
    console.error("hubo un error en: ", error);
  }
};

export default OnMeditar;
