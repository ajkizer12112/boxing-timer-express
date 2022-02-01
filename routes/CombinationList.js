const express = require('express')

const {getCombinationLists, addCombinationList, getCombinationListById, editCombinationList, removeCombinationList} = require("../controllers/CombinationList")

const router = express.Router();

router.route("/")
            .get(getCombinationLists)
            .post(addCombinationList)
router.route("/:id")
            .get(getCombinationListById)
            .put(editCombinationList)
            .delete(removeCombinationList)

module.exports = router;