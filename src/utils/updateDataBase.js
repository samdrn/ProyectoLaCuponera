import { db } from "../services/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

/**
 * Actualiza el inventario de la oferta y crea el cupón en Firestore.
 * Guarda todos los campos del nuevo schema: companyId, status="active", etc.
 */
export async function updateDataBase(offer, coupon) {
    const offerId = offer.id || offer.offerId;
    const newAmmountSold = (offer.ammountSold || 0) + 1;
    let newOfferRemaining = true;

    if (offer.limitCoupons && newAmmountSold >= offer.limitCoupons) {
        newOfferRemaining = false;
    }

    // Actualizar el inventario de la oferta (con await para capturar errores)
    await updateDoc(doc(db, "offers", offerId), {
        remaining: newOfferRemaining,
        ammountSold: newAmmountSold,
    });

    // Crear el cupón con el schema completo
    const docRef = await addDoc(collection(db, "coupons"), {
        userId: coupon.userId,
        offerId: coupon.offerId,
        companyId: coupon.companyId || null,
        code: coupon.code,
        purchaseDate: coupon.purchaseDate,
        expirationDate: coupon.expirationDate || null,
        status: coupon.status || "active",
    });

    return docRef.id;
}