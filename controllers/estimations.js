const moment = require('moment')

function StandardDeviation(arr) { // стандартное отклонение
    const numbersArr = arr;
    let total = 0;
    for(let key in numbersArr)
        total += numbersArr[key];
    let meanVal = total / numbersArr.length;

    let SDprep = 0;
    for(let key in numbersArr)
        SDprep += Math.pow(
            (parseFloat(numbersArr[key]) - meanVal),
            2);
    let SDresult = Math.sqrt(SDprep/numbersArr.length - 1);

    return SDresult;
}
function Exp(number){ // функция корня из Х по числу Ейлера
    return number >= 1 ? Math.pow(number, 1/Math.E): 1;
}

function getEveryDayMinutesSleep(data){
    const result = data.reduce((accumulator, {date_measure, minutes_slept}) => {
        const key = moment(date_measure).format('YYYY MM DD');
        return {
            ...accumulator,
            [key]: accumulator[key] ? accumulator[key] + minutes_slept : minutes_slept,
        }
    }, {})

    return result;
}
function sleepDayCount(data){
    let values = [];
    for (const [key, value] of Object.entries(getEveryDayMinutesSleep(data))) {
        values.push(value);
        console.log(`${key}: ${value}`);
    }
    console.log(values);
    return values;
}
function Average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

const Estimations = {
    StandardDeviation : StandardDeviation,
    Exp : Exp,
    sleepDayCount : sleepDayCount,
    Average : Average
}
module.exports = Estimations;
