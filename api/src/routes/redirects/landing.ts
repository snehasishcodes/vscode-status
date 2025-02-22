import express, { Request, Response } from "express";
const router = express.Router();

// GET /
router.get("/", (req: Request, res: Response) => {
    res.redirect("https://vscode-status.snehasish.xyz");
});

export default router;