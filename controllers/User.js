const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const User = require("../models/User")

exports.addUser = asyncHandler(async (req, res, next) => {
     const User = await User.create(req.body);
     res.json({success: true, data: User})
})

exports.getUsers = asyncHandler(async (req, res, next) => {
     const query = {}
     const Users = await User.find(query);
     res.json({success: true, data: Users})
})

exports.editUser = asyncHandler(async (req, res, next) => {
     let User = await User.findById(req.params.id);
     User = Object.assign(User, req.body);
     await User.save();     res.json({success: true, data: User})
})

exports.getUserById = asyncHandler(async (req, res, next) => {
     const User = await User.findById(req.params.id);
     res.json({success: true, data: User})
})

exports.removeUser = asyncHandler(async (req, res, next) => {
     await User.findByIdAndRemove(req.params.id);
     res.json({success: true})
})

