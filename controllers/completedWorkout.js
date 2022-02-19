const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const CompletedWorkout = require("../models/CompletedWorkout")




exports.addCompletedWorkout = asyncHandler(async (req, res, next) => {
     req.body.account_id = req.user.id
     const completedWorkout = await CompletedWorkout.create(req.body);
     console.log({ completedWorkout })
     res.json({ success: true, data: completedWorkout })
})

exports.getCompletedWorkouts = asyncHandler(async (req, res, next) => {
     let query = { account_id: req.user.id }

     if (!req.query.endDate) {
          req.query.endDate = 7
     }

     if (!req.query.startDate) {
          req.query.startDate = 0
     }

     const today = new Date();
     today.setHours(0)
     today.setMinutes(0)
     today.setSeconds(0)
     today.setMilliseconds(0);

     let { endDate, startDate } = req.query;
     endDate = parseInt(endDate, 10) - 1
     startDate = parseInt(startDate, 10) - 1


     const earliestDate = today.getTime() - (24 * 60 * 60 * 1000) * endDate
     const latestDate = today.getTime() - (24 * 60 * 60 * 1000) * startDate
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

