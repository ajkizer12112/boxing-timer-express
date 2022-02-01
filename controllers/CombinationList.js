const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const CombinationList = require("../models/CombinationList")

exports.addCombinationList = asyncHandler(async (req, res, next) => {
     const CombinationList = await CombinationList.create(req.body);
     res.json({success: true, data: CombinationList})
})

exports.getCombinationLists = asyncHandler(async (req, res, next) => {
     const query = {}
     const CombinationLists = await CombinationList.find(query);
     res.json({success: true, data: CombinationLists})
})

exports.editCombinationList = asyncHandler(async (req, res, next) => {
     let CombinationList = await CombinationList.findById(req.params.id);
     CombinationList = Object.assign(CombinationList, req.body);
     await CombinationList.save();     res.json({success: true, data: CombinationList})
})

exports.getCombinationListById = asyncHandler(async (req, res, next) => {
     const CombinationList = await CombinationList.findById(req.params.id);
     res.json({success: true, data: CombinationList})
})

exports.removeCombinationList = asyncHandler(async (req, res, next) => {
     await CombinationList.findByIdAndRemove(req.params.id);
     res.json({success: true})
})

