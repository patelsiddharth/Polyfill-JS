
const uppercase = (str) => str.toUpperCase();
const first6Char = (str) => str.substring(0,6);
const reverseStr = (str) => str.split("").reverse().join("");



const pipe = function(...functions) {
    return (obj) => {
        return functions.reduce((acc, currentFunc) => {
            acc = currentFunc(acc);
            return acc;
        }, obj.name)
    }
}
const res = pipe(uppercase, first6Char,reverseStr)({name : 'Siddharth'})
console.log(res);
