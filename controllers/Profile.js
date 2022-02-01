const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Profile = require("../models/Profile")

exports.addProfile = asyncHandler(async (req, res, next) => {
     req.body.account_id = req.user.id
     const profile = await Profile.create(req.body);
     res.json({ success: true, data: profile })
})

exports.getProfiles = asyncHandler(async (req, res, next) => {
     const query = {}
     const profiles = await Profile.find(query);
     res.json({ success: true, data: profiles })
})

exports.editProfile = asyncHandler(async (req, res, next) => {
     let profile = await Profile.findById(req.params.id);
     profile = Object.assign(profile, req.body);
     await profile.save(); res.json({ success: true, data: profile })
})

exports.getProfileById = asyncHandler(async (req, res, next) => {
     const profile = await Profile.findById(req.params.id);
     res.json({ success: true, data: profile })
})

exports.removeProfile = asyncHandler(async (req, res, next) => {
     await Profile.findByIdAndRemove(req.params.id);
     res.json({ success: true })
})

