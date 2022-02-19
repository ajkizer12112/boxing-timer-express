const express = require('express')

const { getProfiles, addProfile, getProfileById, editProfile, removeProfile } = require("../controllers/profile")
const { protect } = require("../middleware/auth")
const router = express.Router();

router.route("/")
    .get(protect, getProfiles)
    .post(protect, addProfile)
    .put(protect, editProfile)
router.route("/:id")
    .get(getProfileById)
    .delete(protect, removeProfile)


module.exports = router;