export function generateCouponCode (company){
    let code = company;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i<7; i++){
        code += characters.charAt(Math.floor(Math.random()*characters.length));
    }

    return code;

}