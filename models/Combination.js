const mongoose = require('mongoose')

const Combination = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required field"]
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: [true, "User_id is required"]
    },
    combos: [{
        sequence: [String],
        followups: [[String]]
    }]
})

module.exports = mongoose.model("Combination", Combination)