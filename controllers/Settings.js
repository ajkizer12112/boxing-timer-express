const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Settings = require("../models/Settings")

exports.addSettings = asyncHandler(async (req, res, next) => {
     const Settings = await Settings.create(req.body);
     res.json({success: true, data: Settings})
})

exports.getSettingss = asyncHandler(async (req, res, next) => {
     const query = {}
     const Settingss = await Settings.find(query);
     res.json({success: true, data: Settingss})
})

exports.editSettings = asyncHandler(async (req, res, next) => {
     let Settings = await Settings.findById(req.params.id);
     Settings = Object.assign(Settings, req.body);
     await Settings.save();     res.json({success: true, data: Settings})
})

exports.getSettingsById = asyncHandler(async (req, res, next) => {
     const Settings = await Settings.findById(req.params.id);
     res.json({success: true, data: Settings})
})

exports.removeSettings = asyncHandler(async (req, res, next) => {
     await Settings.findByIdAndRemove(req.params.id);
     res.json({success: true})
})

