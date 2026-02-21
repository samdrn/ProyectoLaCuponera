import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export const createCoupon = async (couponData) => {
    return await addDoc(collection(db, "coupons"), couponData);
};
