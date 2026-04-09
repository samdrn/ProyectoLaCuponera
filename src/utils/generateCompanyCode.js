export function generateCompanyCode (){
    let code = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789"

    for (let i = 0; i<3; i++){
        code += letters.charAt(Math.floor(Math.random()*letters.length));
    }

    for (let i = 0; i<3; i++){
        code += numbers.charAt(Math.floor(Math.random()*numbers.length));
    }

    return code;

}