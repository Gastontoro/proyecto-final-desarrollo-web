import { db } from '../firebase/config';
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Referencia a la colección 'recetas'
const recetasCollection = collection(db, 'recetas');

// ************* LECTURA (READ - Obtener todos) *************
export const getRecetas = async () => {
  try {
    const data = await getDocs(recetasCollection);
    const recetas = data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id // Incluye el ID del documento
    }));
    return recetas;
  } catch (error) {
    console.error("Error al obtener recetas: ", error);
    return [];
  }
};

// ************* LECTURA (READ - Obtener por ID) *************
export const getRecetaById = async (id) => {
  try {
    const docRef = doc(db, 'recetas', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      console.log("No se encontró la receta!");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la receta: ", error);
    return null;
  }
};

// ************* CREACIÓN (CREATE) *************
export const addReceta = async (recetaData) => {
  try {
    const docRef = await addDoc(recetasCollection, {
        ...recetaData,
        createdAt: new Date() // Opcional: marca de tiempo
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al añadir receta: ", error);
    return null;
  }
};

// ************* ACTUALIZACIÓN (UPDATE) *************
export const updateReceta = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'recetas', id);
    await updateDoc(docRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error al actualizar receta: ", error);
    return false;
  }
};

// ************* ELIMINACIÓN (DELETE) *************
export const deleteReceta = async (id) => {
  try {
    const docRef = doc(db, 'recetas', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error al eliminar receta: ", error);
    return false;
  }
};