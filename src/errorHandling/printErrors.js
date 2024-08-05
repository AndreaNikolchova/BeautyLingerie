export function printErrors(error){
    let str = "";
    for (const key in error) {
        str+=`${error[key]}\n`;
    }
    return str;
}