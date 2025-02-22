import express, { Request, Response } from "express";
import logger from "../../lib/logger";
import users from "../../database/models/users";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(400).json({ error: "`id` is a required parameter" }).end();
            return;
        }

        const data = await users.findOne({ id });

        const result = {
            id,
            current: data?.current ?? null,
            recent: data?.recent ?? null,
            updated: data?.updated,
            created: data?.created
        };

        res.status(200).json(result).end();
    }
    catch (e) {
        logger)(e);
    }
});

// POST /api/v1/users/:uid/update
router.post("/:id/update", async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;

        if (!token || typeof token !== "string") {
            res.status(401).json({ error: "Authentication Required." }).end();
            return;
        }

        // console.log(req.body)

        const id = req.params.id;
        const { activity } = req.body;

        if (!id || typeof id !== "string") {
            res.status(400).json({ error: "`id` is a required parameter." }).end();
            return;
        }

        if (!activity || typeof activity !== "object") {
            res.status(400).json({ error: "`activity` is a required parameter." }).end();
            return;
        }

        const user = await users.findOne({ id, token });

        if (!user || !user?.id || !user?.token || user?.id !== id || user?.token !== token) {
            res.status(401).json({ error: "Unauthorized." }).end();
            return;
        }

        if (activity && activity?.file && activity?.file?.name && activity?.file?.path) {
            const previous = user?.current;
            const isSameWorkspace = previous?.workspace?.path === activity?.workspace?.path;

            const curr = {
                started: isSameWorkspace ? previous?.started ?? new Date() : new Date(),
                ...activity
            }

            user.current = curr;
            user.recent = previous;
            user.save();

            res.status(200).json({ message: "User updated" }).end();
        } else {
            user.recent = user.current ?? null;
            user.current = null;
            user.save();

            res.status(200).json({ message: "User activity removed." }).end();
        }
    }
    catch (e) {
        logger(e);
    }
});

export default router;