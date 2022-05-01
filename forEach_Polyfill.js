Array.prototype.myForEach = function(callback) {
    for(var index = 0; index < this.length; index++)
    {
        if(this.indexOf(this[index] > -1))
        {
            callback(this[index], index, this);
        }
    }
}

const words = ["adam", "ate", "an", "apple"];
const upperCaseList = [];

words.myForEach((word, index, context) => {
  upperCaseList.push(word.toUpperCase())
})

console.log(upperCaseList);
