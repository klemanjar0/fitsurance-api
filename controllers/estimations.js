const moment = require('moment')

function StandardDeviation(arr) { // standard deviation
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
function Exp(number){ // функция корня из Х по числу Ейлера (обратная экспоненциальной)
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
    let mark = Exp(StandardDeviation(values));

    const avg = average(values);

    switch (avg){
        case avg >= 480: {mark*=1; break;}
        case avg < 480 && avg >= 420: {mark*=0.95; break;}
        case avg < 420 && avg >= 360: {mark*=0.9; break;}
        case avg < 360 && avg >= 300: {mark*=0.85; break;}
        case avg < 300: {mark*=0.8; break;}
    }

    const result = 10 - (mark%10);

    return {
        mark: mark,
        average : avg,
        result: `${result} | 10`,
        values : values
    };
}
function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}

const Estimations = {
    StandardDeviation : StandardDeviation,
    Exp : Exp,
    sleepDayCount : sleepDayCount
}
module.exports = Estimations;
