const mongoose = require('mongoose')

const CompletedWorkout = mongoose.Schema({
    account_id: {
        type: mongoose.Schema.ObjectId,
        required: [true, "account id is required"],
        index: 1
    },
    rounds: {
        type: Number,
        required: [true, "number of rounds is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model("CompletedWorkout", CompletedWorkout)