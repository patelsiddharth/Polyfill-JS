const person = {
    firstName : "Siddharth",
    lastName : "Patel",
    age : 26
}

function getPersonInfo() {
    console.log(this.firstName + " " + this.lastName);
}

function getPersonFullInfo(city, state) {
    console.log(this.firstName + " " + this.lastName + ". I am from " + city + ", " + state);
}

const getInfo1 = getPersonInfo.bind(person);
getInfo1();

Function.prototype.myBind = function (context, ...args1) {
    const obj = this;
    return function (...args2) {
        const argument = args1.concat(args2);
        obj.apply(context, argument);
    }
}

const getInfo2 = getPersonInfo.myBind(person);
getInfo2();

const getFullInfo2 = getPersonFullInfo.myBind(person, "Jabalpur");
getFullInfo2("MP")
