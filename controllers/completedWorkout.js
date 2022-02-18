const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const CompletedWorkout = require("../models/CompletedWorkout")

exports.addCompletedWorkout = asyncHandler(async (req, res, next) => {
     req.body.account_id = req.user.id
     const completedWorkout = await CompletedWorkout.create(req.body);
     res.json({ success: true, data: completedWorkout })
})

exports.getCompletedWorkouts = asyncHandler(async (req, res, next) => {
     const query = {}
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

