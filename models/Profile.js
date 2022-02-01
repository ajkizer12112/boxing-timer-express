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
    }
})

module.exports = mongoose.model("Profile", Profile)