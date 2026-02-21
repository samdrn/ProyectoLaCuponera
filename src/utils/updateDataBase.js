import {db} from "../services/firebase"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export async function updateDataBase(offer, coupon) {

    const newAmmountSold = offer.ammountSold + 1
    let newOfferRemaining = true

    if (offer.limitCoupons && newAmmountSold >= offer.limitCoupons){
        newOfferRemaining = false
    }
    
    updateDoc(doc(db, "offers", offer.id), {
        remaining: newOfferRemaining,
        ammountSold: newAmmountSold
    })


    addDoc(collection(db, "coupons"), {
        code: coupon.code,
        offerId: coupon.offerId,
        purchaseDate: coupon.purchaseDate,
        expirationDate: coupon.expirationDate,
        userId: coupon.userId
    })

}