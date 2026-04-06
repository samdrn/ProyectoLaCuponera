import { useState } from 'react';
import redeemService from '../services/redeemService';

export const useRedeem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const redeem = async (code) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Paso 1: Verificar
      const coupon = await redeemService.verifyCoupon(code);
      // Paso 2: Canjear
      await redeemService.markAsRedeemed(coupon.id);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { redeem, loading, error, success };
};