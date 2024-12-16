const express = require("express");
const router = express.Router();
const Data = require("../database/models/data");

router.get("/users/:uid", async (req, res) => {
    const uid = req.params.uid;
    if (!uid || typeof uid !== "string") return res.status(400).json({ error: "UID is a required string." }).end();

    const data = await Data.findOne({ uid: uid });

    if (data && data.uid === uid) {
        const current = data.current;
        const recent = data.recent;

        let currentData;

        if (current.file && current?.file?.name && typeof current?.file?.name === "string")
            currentData = {
                started: current?.started ?? null,
                file: {
                    name: current?.file?.name ?? null,
                    extension: current?.file?.extension ?? null,
                    path: current?.file?.path ?? null,
                    language: current?.file?.language ?? null,
                    size: current?.file?.size ?? null,
                    lines: current?.file?.lines ?? 0,
                    position: current?.file?.position ?? { line: 0, column: 0 },
                    errors: current?.file?.errors ?? null,
                },
                workspace: {
                    name: current?.workspace?.name ?? null,
                    path: current?.workspace?.path ?? null,
                },
                debugging: current?.debugging === true
            }
        else currentData = null;

        const result = {
            uid,
            current: currentData,
            recent: recent
        };

        return res.status(200).json({
            success: true,
            data: result,
            code: 200
        }).end();
    } else {
        return res.status(404).json({
            success: false,
            message: "UID not found.",
            code: 404
        }).end();
    }
});

module.exports = router;