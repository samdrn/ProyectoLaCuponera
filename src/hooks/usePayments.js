import { useState } from "react";
import { processPayment, savePayment } from "../services/paymentsService";
import { generateCouponCode } from "../utils/generateCouponCode";
import { updateDataBase } from "../utils/updateDataBase";
import { createCoupon } from "../services/couponsService";
import { Timestamp } from "firebase/firestore";

/**
 * hook del flujo completo de compra 
 * - procesar pago simulado
 * - registrar el pago en Firestore
 * - generar código único de cupón
 * - guardar el cupón en Firestore
 * - actualizar el inventario de la oferta
 */
export default function usePayments(user) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [newCoupon, setNewCoupon] = useState(null);

    const reset = () => {
        setError(null);
        setSuccess(false);
        setNewCoupon(null);
    };

    const purchaseCoupon = async ({ offer, cardName, cardNumber, expiry, cvc }) => {
        if (!user) {
            setError("Debes iniciar sesión para comprar un cupón.");
            return false;
        }

        reset();
        setLoading(true);

        try {
            // simula procesamiento del pago con tarjeta
            const paymentResult = await processPayment({
                cardName,
                cardNumber,
                expiry,
                cvc,
                amount: offer.offerPrice,
            });

            // registra el pago en Firestore
            await savePayment({
                userId: user.uid,
                offerId: offer.id || offer.offerId,
                companyId: offer.companyId || null,
                amount: offer.offerPrice,
                transactionId: paymentResult.transactionId,
            });

            // genera el código único del cupón
            const couponCode = generateCouponCode(offer.company || "CUP");

            // construye el objeto del cupón
            const couponData = {
                userId: user.uid,
                offerId: offer.id || offer.offerId,
                companyId: offer.companyId || null,
                code: couponCode,
                purchaseDate: Timestamp.now(),
                expirationDate: offer.couponEndDate || offer.endDate || null,
                status: "active",
            };

            // guarda el cupón en Firestore y actualiza inventario de la oferta
            await updateDataBase(offer, couponData);

            setNewCoupon({ ...couponData, offer });
            setSuccess(true);
            return true;
        } catch (err) {
            console.error("Error en la compra:", err);
            setError(err.message || "Ocurrió un error al procesar la compra.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        purchaseCoupon,
        loading,
        error,
        success,
        newCoupon,
        reset,
    };
}
