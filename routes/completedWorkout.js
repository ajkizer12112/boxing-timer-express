const express = require('express')

const { getCompletedWorkouts, addCompletedWorkout, getCompletedWorkoutById, editCompletedWorkout, removeCompletedWorkout } = require("../controllers/completedWorkout")

const { protect } = require("../middleware/auth")
const router = express.Router();

router.route("/")
    .get(getCompletedWorkouts)
    .post(protect, addCompletedWorkout)
router.route("/:id")
    .get(getCompletedWorkoutById)
    .put(editCompletedWorkout)
    .delete(removeCompletedWorkout)

module.exports = router;