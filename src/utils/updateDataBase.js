import {db} from "../services/firebase"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export async function updateDataBase(offer, coupon) {

    const newAmmountSold = offer.ammountSold + 1
    const newOfferRemaining = true

    if (offer.limitCoupons && newAmmountSold >= offer.limitCoupons){
        newOfferRemaining = false
    }
    
    updateDoc(doc(db, "offers", offer.offerId), {
        remaining: newOfferRemaining,
        ammountSold: newAmmountSold
    })


    addDoc(collection(db, "coupons"), {
        code: coupon.code,
        offerId: coupon.offerId,
        purchaseDate: coupon.purchaseDate,
        expirationDate: coupon.expirationDate,
        status: coupon.status,
        userId: coupon.userId
    })

}