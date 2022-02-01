const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Options = require("../models/Options")

exports.addOptions = asyncHandler(async (req, res, next) => {
     const options = await Options.create(req.body);
     res.json({success: true, data: options})
})

exports.getOptionss = asyncHandler(async (req, res, next) => {
     const query = {}
     const optionss = await Options.find(query);
     res.json({success: true, data: optionss})
})

exports.editOptions = asyncHandler(async (req, res, next) => {
     let options = await Options.findById(req.params.id);
     options = Object.assign(options, req.body);
     await options.save();     res.json({success: true, data: options})
})

exports.getOptionsById = asyncHandler(async (req, res, next) => {
     const options = await Options.findById(req.params.id);
     res.json({success: true, data: options})
})

exports.removeOptions = asyncHandler(async (req, res, next) => {
     await Options.findByIdAndRemove(req.params.id);
     res.json({success: true})
})

