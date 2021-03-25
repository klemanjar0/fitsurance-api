function getRandomArbitrary(min, max) { // Getting a random number between two values
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) { // Getting a random integer between two values
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function getRandomIntInclusive(min, max) { // Getting a random integer between two values, inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const Random = {
    getRandomArbitrary : getRandomArbitrary,
    getRandomInt : getRandomInt,
    getRandomIntInclusive : getRandomIntInclusive
}
module.exports = Random;
