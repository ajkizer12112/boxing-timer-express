const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

const User = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is a required field"]
    },
    password: {
        type: String,
        required: [true, "Password is a required field"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: [true, "Email is a required field"],
        validate: [validateEmail, "Please enter a valid email"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})



User.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    };
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
})

User.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, username: this.username, email: this.email, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

User.methods.matchPassword = async function (userInput) {
    return bcrypt.compare(userInput, this.password);
}


module.exports = mongoose.model("User", User)