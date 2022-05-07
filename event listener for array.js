Array.prototype.pushWithEvent = function (element) {
    const size = this.length;
    if(element)
    {
        this[size] = element;
        this.triggerEvent("add","Element Added : " + element)
    }
}

Array.prototype.events = {}

Array.prototype.triggerEvent = function (eventName, args) {
    if(this.events[eventName] && this.events[eventName].length > 0)
    {
        for(let i = 0; i < this.events[eventName].length; i++)
        {
            const callback = this.events[eventName][i];
            callback(args);
        }
    }
}

Array.prototype.addEventListener = function (eventName, callback) {
    if(!this.events[eventName])
    {
        this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
}

const arr = [1,2,3]
arr.addEventListener('add', (res) => {
  console.log(res, arr)
})
arr.pushWithEvent(4)
arr.pushWithEvent(5)
