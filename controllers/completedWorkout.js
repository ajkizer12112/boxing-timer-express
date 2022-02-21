const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const CompletedWorkout = require("../models/CompletedWorkout")

const queryPropExists = (queryObj, prop) => {
     return queryObj[prop]
}

const genToday = () => {
     let today = new Date();
     today.setHours(0);
     today.setMinutes(0);
     today.setSeconds(1);
     today.setMilliseconds(0);
     return today
}

const getDateInMilliseconds = (today, days) => {

     const hoursInDay = 24;
     const minutesInHour = 60;
     const secondsInMinute = 60;
     const millisecondsInSeconds = 1000;

     const dateInMilliseconds = today.getTime() - hoursInDay * minutesInHour * secondsInMinute * millisecondsInSeconds * days

     return dateInMilliseconds
}

exports.addCompletedWorkout = asyncHandler(async (req, res, next) => {
     req.body.account_id = req.user.id
     const completedWorkout = await CompletedWorkout.create(req.body);
     res.json({ success: true, data: completedWorkout })
})

exports.getCompletedWorkouts = asyncHandler(async (req, res, next) => {
     let query = { account_id: req.user.id }

     if (!queryPropExists(req.query, "endDate")) req.query.endDate = 7
     if (!queryPropExists(req.query, "startDate")) req.query.startDate = 0

     let today = genToday();
     let { endDate, startDate } = req.query;

     const earliestDate = getDateInMilliseconds(today, parseInt(endDate, 10));
     const latestDate = getDateInMilliseconds(today, parseInt(startDate, 10))

     query.createdAt = { $gte: earliestDate, $lte: latestDate }

     const completedWorkouts = await CompletedWorkout.find(query);
     res.json({ success: true, data: completedWorkouts })
})

exports.editCompletedWorkout = asyncHandler(async (req, res, next) => {
     let completedWorkout = await CompletedWorkout.findById(req.params.id);
     completedWorkout = Object.assign(completedWorkout, req.body);
     await completedWorkout.save();
     res.json({ success: true, data: completedWorkout })
})

exports.getCompletedWorkoutById = asyncHandler(async (req, res, next) => {
     const completedWorkout = await CompletedWorkout.findById(req.params.id);
     res.json({ success: true, data: completedWorkout })
})

exports.removeCompletedWorkout = asyncHandler(async (req, res, next) => {
     await CompletedWorkout.findByIdAndRemove(req.params.id);
     res.json({ success: true })
})

