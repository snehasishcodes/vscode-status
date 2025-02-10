const express = require("express");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>VSCode Status - Extension and API</title>
                <meta name="description" content="Export your VSCode Activity to a REST API and access it anytime. Use cases: Display coding activity on your website or GitHub profile.">
                <meta name="keywords" content="vscode, vscode-status, vscode status, status, vscode coding, coding activity, activity">
                <meta property="og:title" content="VSCode Status - Extension and API">
                <meta property="og:description" content="Export your VSCode Activity to a REST API and access it anytime. Use cases: Display coding activity on your website or GitHub profile.">
                <meta property="og:image" content="https://vscode-status.snehasish.xyz/icon.png">
                <meta property="og:url" content="https://vscode.snehasish.xyz/">
                <meta property="og:type" content="website">
                <meta property="og:locale" content="en_US">
                <meta name="twitter:card" content="summary">
                <meta name="twitter:title" content="VSCode Status - Extension and API">
                <meta name="twitter:description" content="Export your VSCode Activity to a REST API and access it anytime. Use cases: Display coding activity on your website or GitHub profile.">
                <meta name="twitter:image" content="https://vscode-status.snehasish.xyz/icon.png">
                <meta name="twitter:site" content="@snehasishcodes">
                <meta name="twitter:creator" content="@snehasishcodes">
                <link rel="icon" href="https://vscode-status.snehasish.xyz/icon.png" type="image/png">
                <meta name="robots" content="index, follow">

                <style>
                    body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    }
                    iframe {
                    border: none;
                    width: 100vw;
                    height: 100vh;
                    }
                </style>
            </head>
            <body>
                <iframe src="https://vscode-status.snehasish.xyz"></iframe>
            </body>
        </html>
      `);
});

router.get("/download", async (req, res) => {
    res.redirect("https://marketplace.visualstudio.com/items?itemName=snehasishcodes.vscode-status");
});

router.get("/docs", async (req, res) => {
    res.redirect("https://github.com/snehasishcodes/vscode-status/blob/main/README.md");
});

module.exports = router;