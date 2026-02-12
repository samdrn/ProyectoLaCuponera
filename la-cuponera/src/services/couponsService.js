import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export const createCoupon = async (couponData) => {
    return await addDoc(collection(db, "coupons"), couponData);
};

/* 
    Estados:
    - Disponible
    - Usado
    - Expirado

    (Por el momento al ser Fase 1, no se divide entre diferentes rubros separados, empleados reales, empresas, historial complejo y pagos reales)
*/