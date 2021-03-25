function StandardDeviation(arr) { // standard deviation
    const numbersArr = arr.filter(num => num <= 100);
    let total = 0;
    for(let key in numbersArr)
        total += numbersArr[key];
    let meanVal = total / numbersArr.length;

    let SDprep = 0;
    for(let key in numbersArr)
        SDprep += Math.pow((parseFloat(numbersArr[key]) - meanVal),2);
    let SDresult = Math.sqrt(SDprep/numbersArr.length - 1);

    return SDresult;
}
function Exp(number){
    return number >= 1 ? Math.pow(number, 1/Math.E): 1;
}

const Estimations = {
    StandardDeviation : StandardDeviation,
    Exp : Exp
}
module.exports = Estimations;
