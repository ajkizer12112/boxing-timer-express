const mongoose = require('mongoose')

const Profile = mongoose.Schema({
    account_id: {
        type: mongoose.Schema.ObjectId,
        unique: true,
        required: [true, "user's account_id is required to create a profile."]
    },
    roundsCompleted: {
        type: Number,
        default: 0
    },
    maneuverTracker: {
        "1": {
            type: Number,
            default: 0
        },
        "1b": {
            type: Number,
            default: 0
        },
        "2": {
            type: Number,
            default: 0
        },
        "2b": {
            type: Number,
            default: 0
        },
        "3": {
            type: Number,
            default: 0
        },
        "3b": {
            type: Number,
            default: 0
        },
        "4": {
            type: Number,
            default: 0
        },
        "4b": {
            type: Number,
            default: 0
        },
        "5": {
            type: Number,
            default: 0
        },
        "5b": {
            type: Number,
            default: 0
        },
        "6": {
            type: Number,
            default: 0
        },
        "6b": {
            type: Number,
            default: 0
        },
        "Pull": {
            type: Number,
            default: 0
        },
        "Slip": {
            type: Number,
            default: 0
        },
        "Roll": {
            type: Number,
            default: 0
        },
        "Duck": {
            type: Number,
            default: 0
        },
    }
})

module.exports = mongoose.model("Profile", Profile)