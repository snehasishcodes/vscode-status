const express = require("express");
const router = express.Router();
const Data = require("../database/models/data");
const format = require("../lib/format");
const sharp = require("sharp");

// experimental

router.get("/users/:uid/png", async (req, res) => {
    const uid = req.params.uid;
    if (!uid || typeof uid !== "string") return res.status(400).json({ error: "UID is a required string." }).end();

    const {
        line1 = "Editing {file}",
        line2 = "Line {currentLine} Col {currentCol} - {size}",
        line3 = "Workspace: {workspaceName} - {debugging}",
        line4 = "Elapsed {elapsedTime}",
        theme = "dark"
    } = req.query;
    const data = await Data.findOne({ uid: uid });

    if (!data || data.uid !== uid) return res.status(404).json({ error: "User not found." }).end();

    const current = data.current;
    const recent = data.recent;

    const status = current ? { ...current, type: "current" } : recent ? { ...recent, type: "recent" } : null;

    const vscodeSVG = `<svg height="70" width="70" viewBox="-11.9 -2 1003.9 995.6" xmlns="http://www.w3.org/2000/svg"><path d="m12.1 353.9s-24-17.3 4.8-40.4l67.1-60s19.2-20.2 39.5-2.6l619.2 468.8v224.8s-.3 35.3-45.6 31.4z" fill="#2489ca"/><path d="m171.7 498.8-159.6 145.1s-16.4 12.2 0 34l74.1 67.4s17.6 18.9 43.6-2.6l169.2-128.3z" fill="#1070b3"/><path d="m451.9 500 292.7-223.5-1.9-223.6s-12.5-48.8-54.2-23.4l-389.5 354.5z" fill="#0877b9"/><path d="m697.1 976.2c17 17.4 37.6 11.7 37.6 11.7l228.1-112.4c29.2-19.9 25.1-44.6 25.1-44.6v-671.2c0-29.5-30.2-39.7-30.2-39.7l-197.7-95.3c-43.2-26.7-71.5 4.8-71.5 4.8s36.4-26.2 54.2 23.4v887.5c0 6.1-1.3 12.1-3.9 17.5-5.2 10.5-16.5 20.3-43.6 16.2z" fill="#3c99d4"/></svg>`;

    // Create the SVG with embedded HTML
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" style="background: ${theme === "dark" ? "#191919" : "#fff"
        }">
            <rect x="0" y="0" width="800" height="400" fill="${theme === "dark" ? "#191919" : "#fff"}" />
            <circle cx="50" cy="50" r="15" fill="${status ? (status.type === "recent" ? "#9ca3af" : "#4ade80") : "#f87171"
            }" />
            <text x="80" y="60" fill="${theme === "dark" ? "#d4d4d4" : "#6b7280"
            }" font-family="Arial, sans-serif" font-size="16">
                ${!status ? "NO CURRENT ACTIVITY" : "VISUAL STUDIO CODE"}
            </text>
            <text x="80" y="90" fill="${theme === "dark" ? "#fff" : "#000"
            }" font-family="Arial, sans-serif" font-size="14">
                ${format(line1, status)}
            </text>
            <text x="80" y="110" fill="${theme === "dark" ? "#d4d4d4" : "#6b7280"
            }" font-family="Arial, sans-serif" font-size="14">
                ${format(line2, status)}
            </text>
            <text x="80" y="130" fill="${theme === "dark" ? "#d4d4d4" : "#6b7280"
            }" font-family="Arial, sans-serif" font-size="14">
                ${format(line3, status)}
            </text>
            <text x="80" y="150" fill="${theme === "dark" ? "#d4d4d4" : "#6b7280"
            }" font-family="Arial, sans-serif" font-size="12">
                ${format(line4, status)}
            </text>
        </svg>
    `;


    try {
        const svgBuffer = Buffer.from(svgContent, "utf-8"); // Ensure proper encoding

        const pngBuffer = await sharp(svgBuffer)
            .png()
            .toBuffer();

        res.setHeader("Content-Type", "image/png");
        res.send(pngBuffer);
    }
    catch (error) {
        console.error("Error generating PNG:", error);
        res.status(500).json({ error: "Failed to generate image." }).end();
    }
});

module.exports = router;