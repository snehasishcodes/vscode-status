import express, { Request, Response } from "express";
const router = express.Router();

// GET /download
router.get("/download", (req: Request, res: Response) => {
    res.redirect("https://marketplace.visualstudio.com/items?itemName=snehasishcodes.vscode-status");
});

export default router;