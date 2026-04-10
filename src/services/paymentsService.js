import { db } from "./firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

/**
 * simula el procesamiento de un pago con tarjeta
 * retorna un objeto con el resultado del pago simulado.
 */
export const processPayment = async ({ cardName, cardNumber, expiry, cvc, amount }) => {
    // si la tarjeta empieza con 0000 la rechaza
    const cleanNumber = cardNumber.replace(/\s/g, "");
    if (cleanNumber.startsWith("0000")) {
        throw new Error("Tarjeta rechazada. Verifica los datos e intenta de nuevo.");
    }

    // simula la latencia de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    // generar un id de transaccion simulado
    const transactionId = "TXN-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    return {
        success: true,
        transactionId,
        amount,
        paidAt: new Date().toISOString(),
    };
};

/**
 * registra el pago de manera persistente
 */
export const savePayment = async ({ userId, offerId, companyId, amount, transactionId }) => {
    const paymentData = {
        userId,
        offerId,
        companyId: companyId || null,
        amount,
        transactionId,
        status: "completed",
        createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "payments"), paymentData);
    return { paymentId: docRef.id, ...paymentData };
};
