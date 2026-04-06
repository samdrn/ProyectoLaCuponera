import { db } from './firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const redeemService = {
  // 1. Buscar y Validar cupón
  verifyCoupon: async (code) => {
    try {
      // 1️⃣ PRIMERO: Buscamos el documento en Firestore
      const q = query(collection(db, "coupons"), where("code", "==", code));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("El cupón no existe.");
      }

      // 2️⃣ SEGUNDO: Extraemos los datos del primer documento encontrado
      const couponDoc = querySnapshot.docs[0];
      const couponData = couponDoc.data(); // <--- AQUÍ SE DEFINE couponData

      // 3️⃣ TERCERO: Ahora sí, validamos todo usando couponData
      
      // A. Validar Vencimiento
      const now = new Date();
      // Usamos ?.toDate() por si el campo no existe o no es un Timestamp
      const expirationDate = couponData.expirationDate?.toDate ? couponData.expirationDate.toDate() : null;

      if (expirationDate && now > expirationDate) {
        throw new Error("El cupón ha expirado y no puede ser canjeado.");
      }  

      // B. Validar si ya fue usado
      if (couponData.status === 'redeemed' || couponData.status === 'canjeado') {
        throw new Error("Este cupón ya fue canjeado.");
      }

      // C. Validar si está activo
      if (couponData.status !== 'active') {
        throw new Error("El cupón no está en estado activo.");
      }

      // Si todo está bien, retornamos la data
      return { id: couponDoc.id, ...couponData };

    } catch (error) {
      // Re-lanzamos el error para que el Hook lo capture
      throw error;
    }
  },

  // 2. Marcar como canjeado... (el resto está perfecto)
  markAsRedeemed: async (couponId) => {
    try {
      const couponRef = doc(db, "coupons", couponId);
      await updateDoc(couponRef, {
        status: 'canjeado',
        redeemedAt: new Date()
      });
      return true;
    } catch (error) {
      throw new Error("Error al procesar el canje.");
    }
  }
};

export default redeemService;