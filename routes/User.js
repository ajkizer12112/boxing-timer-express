const express = require('express')

const {getUsers, addUser, getUserById, editUser, removeUser} = require("../controllers/User")

const router = express.Router();

router.route("/")
            .get(getUsers)
            .post(addUser)
router.route("/:id")
            .get(getUserById)
            .put(editUser)
            .delete(removeUser)

module.exports = router;