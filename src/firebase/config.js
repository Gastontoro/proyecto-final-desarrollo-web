// Archivo: firebase.js o firebase-config.js

// 1. Importar funciones de inicialización y los servicios que usarás
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Si usas Analytics:
// import { getAnalytics } from "firebase/analytics";

// 2. Tu configuración de Firebase
const firebaseConfig = {
  // Aquí van tus credenciales reales
  apiKey: "TU_API_KEY", 
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// 3. Inicializar la aplicación
const app = initializeApp(firebaseConfig);

// 4. Obtener y exportar los servicios que usarás
// Esto te permite importar 'db' directamente donde lo necesites
export const db = getFirestore(app);

// Si usas Analytics:
// export const analytics = getAnalytics(app);