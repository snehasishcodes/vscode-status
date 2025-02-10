const express = require("express");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
    res.redirect("https://vscode-status.snehasish.xyz")
});

router.get("/download", async (req, res) => {
    res.redirect("https://marketplace.visualstudio.com/items?itemName=snehasishcodes.vscode-status");
});

router.get("/docs", async (req, res) => {
    res.redirect("https://github.com/snehasishcodes/vscode-status/blob/main/README.md");
});

module.exports = router;