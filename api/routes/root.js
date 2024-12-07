const express = require("express");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
    res.redirect("https://github.com/snehasishcodes/vscode-status/blob/main/extension/README.md")
});

module.exports = router;