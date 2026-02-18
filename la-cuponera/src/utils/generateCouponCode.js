export function generateCouponCode (length = 8){
    let codigo = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i<length; i++){
        codigo += characters.charAt(Math.floor(Math.random()*characters.length));
    }

    return codigo;

}