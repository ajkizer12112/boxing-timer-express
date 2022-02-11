const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Profile = require("../models/Profile")

exports.addProfile = asyncHandler(async (req, res, next) => {
     req.body.account_id = req.user.id
     const profile = await Profile.create(req.body);
     res.json({ success: true, data: profile })
})

exports.getProfiles = asyncHandler(async (req, res, next) => {
     let query = {}
     if (req.query.currentUser) {
          query.account_id = req.user.id
     }
     const profiles = await Profile.find(query);
     res.json({ success: true, data: profiles })
})

exports.editProfile = asyncHandler(async (req, res, next) => {
     let profile = await Profile.findOne({ account_id: req.user.id });
     if (req.body.roundsCompleted) {
          let roundscompleted = 0
          if (profile.roundsCompleted) roundscompleted = profile.roundsCompleted

          req.body.roundsCompleted = roundscompleted + req.body.roundsCompleted
     }

     if (req.body.maneuverTracker) {
          let newData = {};
          const keys = Object.keys(profile.maneuverTracker);
          keys.forEach(key => {
               newData[key] = profile.maneuverTracker[key] + req.body.maneuverTracker[key]
          });

          req.body.maneuverTracker = newData;
     }

     profile = Object.assign(profile, req.body);
     await profile.save();
     res.json({ success: true, data: profile })
})

exports.getProfileById = asyncHandler(async (req, res, next) => {
     let profile = await Profile.findOne({ account_id: req.params.id })
     if (!profile) profile = await Profile.create({ account_id: req.params.id })
     res.json({ success: true, data: profile })
})

exports.removeProfile = asyncHandler(async (req, res, next) => {
     await Profile.findByIdAndRemove(req.params.id);
     res.json({ success: true })
})

