const express = require('express')

const {getSettingss, addSettings, getSettingsById, editSettings, removeSettings} = require("../controllers/Settings")

const router = express.Router();

router.route("/")
            .get(getSettingss)
            .post(addSettings)
router.route("/:id")
            .get(getSettingsById)
            .put(editSettings)
            .delete(removeSettings)

module.exports = router;