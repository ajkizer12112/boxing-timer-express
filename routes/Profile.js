const express = require('express')

const { getProfiles, addProfile, getProfileById, editProfile, removeProfile } = require("../controllers/profile")

const router = express.Router();

router.route("/")
    .get(getProfiles)
    .post(addProfile)
router.route("/:id")
    .get(getProfileById)
    .put(editProfile)
    .delete(removeProfile)

module.exports = router;