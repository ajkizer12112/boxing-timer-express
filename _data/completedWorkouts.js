const mongoose = require("mongoose");


let date = new Date()

date.setHours(0);
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);


const millisecondsInSecond = 1000;
const secondsInMinute = 60;
const minutesInHour = 60;
const hoursInDay = 24;

let data = []
const roundSelections = [6, 8, 10, 12, 24]
const account_id = process.argv[5]

for (let i = 0; i <= process.argv[3]; i++) {

    const createdAt = date.getTime() - millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * process.argv[4] * i
    const rounds = roundSelections[Math.floor(Math.random() * roundSelections.length)]
    data.push({ account_id, rounds, createdAt })
}


console.log(data)
const completedWorkouts = data;


module.exports = completedWorkouts

