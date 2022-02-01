const express = require('express')

const { getCombinations, addCombination, getCombinationById, editCombination, removeCombination } = require("../controllers/combination")

const router = express.Router();

router.route("/")
    .get(getCombinations)
    .post(addCombination)
router.route("/:id")
    .get(getCombinationById)
    .put(editCombination)
    .delete(removeCombination)

module.exports = router;