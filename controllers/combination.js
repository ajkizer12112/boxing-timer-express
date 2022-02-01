const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Combination = require("../models/Combination")

exports.addCombination = asyncHandler(async (req, res, next) => {
     const combination = await Combination.create(req.body);
     res.json({ success: true, data: combination })
})

exports.getCombinations = asyncHandler(async (req, res, next) => {
     let query = {}
     query.account_id = req.user.id
     const combinations = await Combination.find(query);
     res.json({ success: true, data: combinations })
})

exports.editCombination = asyncHandler(async (req, res, next) => {
     let combination = await Combination.findById(req.params.id);
     combination = Object.assign(combination, req.body);
     await combination.save();
     res.json({ success: true, data: combination })
})

exports.getCombinationById = asyncHandler(async (req, res, next) => {
     const combination = await Combination.findById(req.params.id);
     res.json({ success: true, data: combination })
})

exports.removeCombination = asyncHandler(async (req, res, next) => {
     await Combination.findByIdAndRemove(req.params.id);
     res.json({ success: true })
})

