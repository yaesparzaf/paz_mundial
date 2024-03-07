import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase-config";

const GetUbicacion = ({ allDatos }) => {
  useEffect(() => {
    const obtenerUbicaciones = async () => {
      try {
        const q = query(
          collection(db, "meditando"),
          where("meditando", "==", true)
        );

        const getDatos = onSnapshot(q, (snapshot) => {
          const coords = snapshot.docs.map((doc) => ({
            latitud: doc.data().latitud,
            longitud: doc.data().longitud,
          }));
          allDatos(coords);
        });

        return () => {
          getDatos();
        };
      } catch (error) {
        console.error("Error al obtener las ubicaciones:", error);
      }
    };

    obtenerUbicaciones();
  }, [allDatos]);

  return null;
};

export default GetUbicacion;
