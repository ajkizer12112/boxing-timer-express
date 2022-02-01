const express = require('express')

const { getOptionss, addOptions, getOptionsById, editOptions, removeOptions } = require("../controllers/options")

const router = express.Router();

router.route("/")
    .get(getOptionss)
    .post(addOptions)
router.route("/:id")
    .get(getOptionsById)
    .put(editOptions)
    .delete(removeOptions)

module.exports = router;