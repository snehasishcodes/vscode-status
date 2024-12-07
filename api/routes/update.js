const express = require("express");
const router = express.Router();
const Data = require("../database/models/data");

router.post("/update", async (req, res) => {
    const { uid, details } = req.body;

    if (!uid || typeof uid !== "string") return res.status(400).json({ error: "UID is a required string." }).end();
    if (details && typeof details !== "object") return res.status(401).json({ error: "Details must be of type: object." }).end();

    const data = await Data.findOne({ uid: uid });

    if (data && data.uid === uid) {
        if (details && details.file && details.file.name) {
            const sameWorkspace = data?.current?.workspace?.path === details?.workspace?.path ?? false;
            const current = {
                started: `${sameWorkspace ? (data?.current?.started ?? Date.now()) : Date.now()}`,
                ...details
            };

            data.recent = {
                ended: `${Date.now()}`,
                ...data.current
            };
            data.current = current;
            data.save();

            return res.status(200).json({
                success: "Status Updated."
            }).end();
        } else {
            data.recent = {
                ended: `${Date.now()}`,
                ...data.current
            };
            data.current = {};
            data.save();

            return res.status(200).json({
                success: "Status Removed."
            }).end();
        }
    } else {
        if (details && details.file && details.file.name) {
            Data.create({
                uid: uid,
                current: {
                    started: `${Date.now()}`,
                    ...details
                },
                recent: {}
            });

            return res.status(201).json({
                success: "Status Created."
            }).end();
        }
    }
});

module.exports = router;