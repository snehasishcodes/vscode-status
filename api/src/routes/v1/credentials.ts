import express, { Request, Response } from "express";
import crypto from "crypto";
import logger from "../../lib/logger";
import users from "../../database/models/users";

const router = express.Router();

// POST /api/v1/credentials
router.post("/credentials", (req: Request, res: Response) => {
    try {
        const id = `${Math.floor(Date.now())}${Math.floor(Math.random() * 10000000)}`;
        const token = crypto.randomBytes(64).toString("hex");

        users.create({
            id,
            token,
            current: null,
            recent: null,
            updated: new Date(),
            created: new Date()
        })
            .then(() => {
                res.status(201).json({ id, token }).end();
            })
            .catch((e) => {
                logger(e);
                res.status(500).json({ error: "Internal Server Error" }).end();
            });
    }
    catch (e) {
        logger(e);
        res.status(500).json({ error: "Internal Server Error" }).end();
    }
});

export default router;