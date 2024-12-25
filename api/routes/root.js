const express = require("express");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
    res.redirect("https://marketplace.visualstudio.com/items?itemName=snehasishcodes.vscode-status");
});

router.get("/docs", async (req, res) => {
    res.redirect("https://github.com/snehasishcodes/vscode-status");
});

module.exports = router;