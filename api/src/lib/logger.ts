import Webhook from "@lacerity/webhook";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const wh = new Webhook("discord", process.env.LOGGER_WEBHOOK_URL!);

const logger = (e: unknown) => {
    wh.sendError(e);
    console.error(e);
}

export default logger;