const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Profile = require("../models/Profile")

exports.addProfile = asyncHandler(async (req, res, next) => {
     const Profile = await Profile.create(req.body);
     res.json({success: true, data: Profile})
})

exports.getProfiles = asyncHandler(async (req, res, next) => {
     const query = {}
     const Profiles = await Profile.find(query);
     res.json({success: true, data: Profiles})
})

exports.editProfile = asyncHandler(async (req, res, next) => {
     let Profile = await Profile.findById(req.params.id);
     Profile = Object.assign(Profile, req.body);
     await Profile.save();     res.json({success: true, data: Profile})
})

exports.getProfileById = asyncHandler(async (req, res, next) => {
     const Profile = await Profile.findById(req.params.id);
     res.json({success: true, data: Profile})
})

exports.removeProfile = asyncHandler(async (req, res, next) => {
     await Profile.findByIdAndRemove(req.params.id);
     res.json({success: true})
})

