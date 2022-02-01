const express = require('express')

const { getProfiles, addProfile, getProfileById, editProfile, removeProfile } = require("../controllers/profile")
const { protect } = require("../middleware/auth")
const router = express.Router();

router.route("/")
    .get(getProfiles)
    .post(protect, addProfile)
router.route("/:id")
    .get(getProfileById)
    .put(protect, editProfile)
    .delete(protect, removeProfile)

module.exports = router;