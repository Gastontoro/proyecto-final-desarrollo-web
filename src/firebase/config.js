// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// 🚨 Línea agregada: Importar getFirestore para la base de datos
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWDHYv59VKDnIdTJVt_RO0-aNlacpOgYE",
  authDomain: "proyecto-final-desarroll-4e824.firebaseapp.com",
  projectId: "proyecto-final-desarroll-4e824",
  storageBucket: "proyecto-final-desarroll-4e824.firebasestorage.app",
  messagingSenderId: "411328184117",
  appId: "1:411328184117:web:94f894fbd6be7e5210d67c",
  measurementId: "G-PHDJQ862SG"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (déjalo, es opcional)
const analytics = getAnalytics(app);

// 🚨 Línea agregada: Inicializar y EXPORTAR la instancia de Firestore
export const db = getFirestore(app);
